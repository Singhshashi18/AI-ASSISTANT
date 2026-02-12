




import { useState } from 'react'
import { documentService } from '@/services/api'

export default function DocumentUpload() {
  const [file, setFile] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

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
      setLoading(true)
      setStatus('Uploading...')

      const res = await documentService.upload(fd)

      setStatus('Uploaded successfully — checking embeddings...')
      setFile(null)
      setTitle('')
      setDescription('')

      const docId =
        res.data?.document?._id ||
        res.data?.data?._id ||
        res.data?.data?.id ||
        res.data?._id ||
        res.data?.id ||
        res.data?.documentId

      if (docId) {
        let attempts = 0
        const maxAttempts = 15

        const iv = setInterval(async () => {
          attempts += 1
          try {
            const r = await documentService.get(docId)
            const chunks =
              r.data?.chunks ||
              r.data?.data?.chunks ||
              []
            const chunksCount =
              chunks.length ||
              r.data?.chunksCount ||
              r.data?.data?.chunksCount ||
              0

            if (chunksCount > 0) {
              setStatus(`Embeddings ready — ${chunksCount} chunks`)
              clearInterval(iv)
            } else if (attempts >= maxAttempts) {
              setStatus(
                'Uploaded but embeddings not ready yet. Try again shortly.'
              )
              clearInterval(iv)
            } else {
              setStatus('Processing embeddings...')
            }
          } catch (err) {
            console.error('Polling failed', err)
          }
        }, 2000)
      }
    } catch (err) {
      setStatus(err.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }




return (
  <div
    className="max-w-4xl mx-auto
    bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#1e293b]
    border border-indigo-500/20
    rounded-2xl
    shadow-xl shadow-black/40
    hover:shadow-indigo-900/40
    transition-all duration-300
    p-8 text-white"
  >
    <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-indigo-300">
      📄 Upload Document
    </h2>

    <form onSubmit={handleSubmit} className="space-y-6">

      <input
        type="text"
        placeholder="Document title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-5 py-3 rounded-xl
        bg-indigo-900/40
        border border-indigo-600/30
        placeholder-indigo-300
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-all duration-200"
        required
      />

      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full px-5 py-3 rounded-xl
        bg-indigo-900/40
        border border-indigo-600/30
        placeholder-indigo-300
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-all duration-200"
      />

      {/* <div>
        <label className="text-sm text-indigo-400 block mb-2">
          Supported formats: PDF, TXT, DOC, DOCX
        </label>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm text-indigo-200
          file:mr-4 file:py-2 file:px-4
          file:rounded-xl file:border-0
          file:bg-gradient-to-r file:from-indigo-500 file:to-purple-600
          file:text-white
          hover:file:opacity-90"
          accept=".pdf,.txt,.doc,.docx"
          required
        />
      </div> */}




      <div className="flex flex-col gap-3">
  <label className="text-sm text-indigo-400">
    Drag & Drop Your File Here or Click to Browse *
  </label>

  <label
    htmlFor="file-upload"
    className="
      flex flex-col items-center justify-center
      h-44 cursor-pointer
      rounded-xl
      border-2 border-dashed border-indigo-500/40
      bg-indigo-900/30
      hover:bg-indigo-900/40
      hover:border-indigo-400
      transition-all duration-200
      text-center
    "
  >
    <div className="text-indigo-300 text-3xl mb-2">⬆️</div>
    <p className="font-semibold text-indigo-200">Upload File</p>
    <p className="text-sm text-indigo-400">Click to upload or drag & drop</p>
    <p className="text-xs text-indigo-500 mt-1">
      Supported file types: PDF, TXT, DOC, DOCX
    </p>

    {file && (
      <p className="mt-2 text-sm text-green-400">
        Selected: {file.name}
      </p>
    )}

    <input
      id="file-upload"
      type="file"
      accept=".pdf,.txt,.doc,.docx"
      onChange={(e) => setFile(e.target.files[0])}
      className="hidden"
      required
    />
  </label>
</div>




      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 rounded-xl
          bg-gradient-to-r from-indigo-500 to-purple-600
          hover:from-indigo-400 hover:to-purple-500
          active:scale-95
          shadow-lg shadow-indigo-900/40
          transition-all duration-200
          disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {status && (
          <span className="text-sm text-indigo-300 animate-pulse">
            {status}
          </span>
        )}
      </div>

    </form>
  </div>
)


}
