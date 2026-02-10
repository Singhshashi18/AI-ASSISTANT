import { useState } from 'react'
import { documentService } from '@/services/api'
import { useNavigate } from 'react-router-dom'

export default function DocumentUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file || !title) {
      setStatus('Please provide file and title')
      return
    }
    const fd = new FormData()
    fd.append('file', file)
    fd.append('title', title)
    fd.append('description', description)
    try {
      setStatus('Uploading...')
      const res = await documentService.upload(fd)
      setStatus('Uploaded successfully — checking embeddings...')
      setFile(null)
      setTitle('')
      setDescription('')

      // try extract document id from multiple possible shapes
      const docId = res.data?.document?._id || res.data?.data?._id || res.data?.data?.id || res.data?._id || res.data?.id || res.data?.documentId

      if (docId) {
        // poll document status for embeddings / chunks
        let attempts = 0
        const maxAttempts = 15 // ~30s
        const iv = setInterval(async () => {
          attempts += 1
          try {
            const r = await documentService.get(docId)
            const chunks = r.data?.chunks || r.data?.data?.chunks || []
            const chunksCount = chunks.length || r.data?.chunksCount || r.data?.data?.chunksCount || 0
            if (chunksCount > 0) {
              setStatus(`Embeddings ready — ${chunksCount} chunks`) 
              clearInterval(iv)
            } else if (attempts >= maxAttempts) {
              setStatus('Uploaded but embeddings not ready yet. Try again in a moment.')
              clearInterval(iv)
            } else {
              setStatus('Processing embeddings...')
            }
          } catch (err) {
            console.error('Polling document status failed', err)
          }
        }, 2000)
      }
    } catch (err) {
      setStatus(err.response?.data?.message || 'Upload failed')
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Upload Document</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full"
          accept=".pdf,.txt,.doc,.docx"
          required
        />
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Upload</button>
          <span className="text-sm text-gray-600">{status}</span>
        </div>
      </form>
    </div>
  )
}
