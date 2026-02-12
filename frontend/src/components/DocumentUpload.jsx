
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
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6">
          <h2 className="text-xl font-bold text-orange-400">
            Upload Document
          </h2>
          <p className="text-orange-200/80 text-sm mt-1">
            Add documents to generate embeddings
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* CONTENT */}
          <div className="col-span-12 ">
            <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/20" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/20" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">

                <div>
                  <label className="block text-sm text-orange-300 mb-2">
                    Document Title
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl
                    bg-black/40 border border-orange-500/30
                    focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-orange-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl
                    bg-black/40 border border-orange-500/30
                    focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                {/* FILE UPLOAD */}
                <div className="flex flex-col gap-3">
                  <label className="text-sm text-orange-300">
                    Upload File
                  </label>

                  <label
                    htmlFor="file-upload"
                    className="flex flex-col items-center justify-center h-44
                    cursor-pointer rounded-xl border-2 border-dashed
                    border-orange-500/40 bg-orange-500/10
                    hover:bg-orange-500/20 transition"
                  >
                    <div className="text-orange-400 text-3xl mb-2">⬆️</div>
                    <p className="font-semibold text-orange-200">
                      Drag & Drop or Click
                    </p>
                    <p className="text-xs text-orange-300 mt-1">
                      PDF, TXT, DOC, DOCX
                    </p>

                    {file && (
                      <p className="mt-2 text-sm text-green-400">
                        {file.name}
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

                {/* ACTIONS */}
                <div className="flex items-center gap-4 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500
                    disabled:opacity-50 transition"
                  >
                    {loading ? 'Uploading…' : 'Upload'}
                  </button>

                  {status && (
                    <span className="text-sm text-orange-200">
                      {status}
                    </span>
                  )}
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
