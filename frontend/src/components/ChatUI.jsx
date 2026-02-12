



import { useState, useEffect } from 'react'
import { chatService } from '@/services/api'

export default function ChatUI() {
  const [sessions, setSessions] = useState([])
  const [currentSession, setCurrentSession] = useState(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const [sending, setSending] = useState(false)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const res = await chatService.getSessions()
      setSessions(res.data.data || res.data.sessions || [])
    } catch (err) {
      console.error(err)
    }
  }

  const createSession = async () => {
    try {
      const res = await chatService.createSession('New Session')
      const id =
        res.data?.session?.id ||
        res.data?.session?._id ||
        res.data?._id

      if (id) setCurrentSession(id)
      fetchSessions()
    } catch (err) {
      console.error(err)
    }
  }

  const send = async () => {
    if (!currentSession) return alert('Select or create a session first')

    const text = message.trim()
    if (!text) return

    try {
      setSending(true)

      const res = await chatService.sendMessage(currentSession, text)

      const assistant =
        res.data?.assistantMessage ||
        res.data?.assistant

      const userMsg = { role: 'user', content: text }
      const assistantMsg = { role: 'assistant', content: assistant }

      setMessages(prev => [...prev, userMsg, assistantMsg])
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
        setMessages(res.data.messages || [])
      } catch (err) {
        console.error(err)
      }
    }

    load()
  }, [currentSession])

  return (
    <div className="max-w-6xl mx-auto h-[80vh] grid grid-cols-4 rounded-2xl overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5 text-white">

      {/* Sidebar */}
      <div className="col-span-1 bg-black/30 p-4 flex flex-col">
        <button
          onClick={createSession}
          className="mb-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
        >
          + New Chat
        </button>

        <div className="space-y-2 overflow-y-auto">
          {sessions.map(s => (
            <div
              key={s._id}
              onClick={() => setCurrentSession(s._id)}
              className={`p-3 rounded-lg cursor-pointer transition ${
                currentSession === s._id
                  ? 'bg-indigo-600'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              {s.title}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="col-span-3 flex flex-col">

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-lg px-4 py-3 rounded-2xl text-sm ${
                  m.role === 'user'
                    ? 'bg-indigo-600'
                    : 'bg-white/10 border border-white/20'
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10 flex gap-3 bg-black/30">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask something about your documents..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-white placeholder-gray-400"
          />
          <button
            onClick={send}
            disabled={sending}
            className={`px-6 py-3 rounded-xl transition ${
              sending
                ? 'bg-gray-500'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {sending ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  )
}
