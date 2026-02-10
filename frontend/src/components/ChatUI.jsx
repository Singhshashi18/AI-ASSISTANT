import { useState, useEffect } from 'react'
import { chatService } from '@/services/api'

export default function ChatUI() {
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const res = await chatService.getSessions()
      setSessions(res.data.data || [])
    } catch (err) {
      console.error(err)
    }
  }

  const createSession = async () => {
    try {
      const res = await chatService.createSession('New Session')
      // controller returns { session: { id, title } }
      const id = res.data?.session?.id || res.data?.data?._id || res.data?.data?.id || res.data?._id || res.data?.id
      if (id) setCurrentSession(id)
      fetchSessions()
    } catch (err) {
      console.error(err)
    }
  }

  const [sending, setSending] = useState(false)

  const send = async () => {
    if (!currentSession) return alert('Select or create a session first')
    const text = (message || '').trim()
    if (!text) return
    try {
      setSending(true)
      const res = await chatService.sendMessage(currentSession, text)
      const assistant = res.data?.assistantMessage || res.data?.assistant || res.data?.assistantMessage || res.data?.assistantMessage
      const userMsg = { role: 'user', content: text }
      const assistantMsg = { role: 'assistant', content: assistant || res.data?.assistantMessage || res.data?.assistant }
      setMessages(prev => [assistantMsg, userMsg, ...prev])
      setMessage('')
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    if (!currentSession) return
    const load = async () => {
      try {
        const res = await chatService.getHistory(currentSession)
        setMessages(res.data.messages || res.data.data || res.data || [])
      } catch (err) {
        console.error(err)
      }
    }
    load()
  }, [currentSession])

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded shadow grid grid-cols-4 gap-6">
      <div className="col-span-1">
        <button onClick={createSession} className="w-full mb-4 px-3 py-2 bg-blue-600 text-white rounded">New Session</button>
        <div className="space-y-2">
          {sessions.map(s => (
            <div key={s._id} className={`p-2 border rounded cursor-pointer ${currentSession === s._id ? 'bg-blue-50' : ''}`} onClick={() => setCurrentSession(s._id)}>
              {s.title}
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-3">
        <div className="space-y-3 mb-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`p-3 rounded ${m.role === 'assistant' ? 'bg-gray-50' : 'bg-blue-50'}`}>
              <div className="text-sm text-gray-700">{m.content}</div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input value={message} onChange={(e) => setMessage(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message" />
          <button onClick={send} disabled={sending} className={`px-4 py-2 text-white rounded ${sending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
