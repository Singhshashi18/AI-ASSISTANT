

import { useState } from 'react'
import { searchService } from '@/services/api'

export default function SearchAsk() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const doSearch = async () => {
    try {
      setLoading(true)
      const res = await searchService.query(query)
      setResults(res.data.chunks || res.data.data?.chunks || [])
      setAnswer('')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const doAsk = async () => {
    try {
      setLoading(true)
      const res = await searchService.ask(query)
      setAnswer(res.data.answer || res.data.data?.answer || '')

      if (res.data.sources || res.data.data?.sources) {
        const srcs = res.data.sources || res.data.data?.sources
        setResults(srcs)
      }
    } catch (err) {
      console.error(err)
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
            Ask QueryX
          </h2>
          <p className="text-orange-200/80 text-sm mt-1">
            Search your documents or ask AI questions
          </p>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* CONTENT */}
          <div className="col-span-12 ">
            <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/20" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/20" />

              <div className="relative z-10 space-y-6">

                {/* INPUT */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask something about your documents..."
                    className="flex-1 px-5 py-3 rounded-xl
                    bg-black/40 border border-orange-500/30
                    placeholder-orange-300
                    focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />

                  <button
                    onClick={doSearch}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl
                    bg-orange-500/20 hover:bg-orange-500/30
                    text-orange-200 font-semibold
                    disabled:opacity-50 transition"
                  >
                    {loading ? 'Searching…' : 'Search'}
                  </button>

                  <button
                    onClick={doAsk}
                    disabled={loading}
                    className="px-6 py-3 rounded-xl font-semibold
                    bg-gradient-to-r from-orange-500 to-orange-600
                    hover:from-orange-400 hover:to-orange-500
                    disabled:opacity-50 transition"
                  >
                    {loading ? 'Thinking…' : 'Ask AI'}
                  </button>
                </div>

                {/* ANSWER */}
                {answer && (
                  <div className="p-6 rounded-2xl bg-black/40 border border-orange-500/30">
                    <h3 className="font-semibold text-orange-400 mb-2">
                      AI Answer
                    </h3>
                    <p className="text-orange-100 whitespace-pre-wrap">
                      {answer}
                    </p>
                  </div>
                )}

                {/* RESULTS */}
                <div className="space-y-4">
                  {results.map((r) => (
                    <div
                      key={r._id || r.id || r.hash || Math.random()}
                      className="p-5 rounded-2xl
                      bg-black/40 border border-orange-500/30
                      hover:bg-black/50 transition"
                    >
                      <div className="text-xs text-orange-400 mb-2">
                        {r.source ||
                          r.filename ||
                          r.meta?.source ||
                          r.meta?.filename ||
                          'Document Source'}
                      </div>

                      <div className="text-sm text-orange-100">
                        {r.content || r.text || r.body}
                      </div>
                    </div>
                  ))}
                </div>

                {results.length === 0 && !answer && !loading && (
                  <p className="text-orange-300 text-sm text-center">
                    No results yet. Ask something about your uploaded documents.
                  </p>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
