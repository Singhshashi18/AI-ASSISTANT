import { useState } from 'react'
import { searchService } from '@/services/api'

export default function SearchAsk() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [answer, setAnswer] = useState('')

  const doSearch = async () => {
    try {
      const res = await searchService.query(query)
      setResults(res.data.chunks || res.data.data?.chunks || [])
    } catch (err) {
      console.error(err)
    }
  }

  const doAsk = async () => {
    try {
      const res = await searchService.ask(query)
      setAnswer(res.data.answer || res.data.data?.answer || '')
      // if the API returns sources, add them to results
      if (res.data.sources || res.data.data?.sources) {
        const srcs = res.data.sources || res.data.data?.sources
        setResults(srcs)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Search / Ask</h2>
      <div className="flex gap-2 mb-4">
        <input value={query} onChange={(e) => setQuery(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Enter question or keywords" />
        <button onClick={doSearch} className="px-4 py-2 bg-gray-200 rounded">Search</button>
        <button onClick={doAsk} className="px-4 py-2 bg-blue-600 text-white rounded">Ask</button>
      </div>

      {answer && (
        <div className="mb-4 p-4 bg-gray-50 rounded">{answer}</div>
      )}

      <div className="space-y-2">
        {results.map((r) => (
          <div key={r._id || r.id || r.hash || Math.random()} className="p-3 border rounded">
            <div className="text-sm text-gray-700 mb-1">{r.source || r.filename || r.meta?.source || r.meta?.filename}</div>
            <div className="text-sm text-gray-900">{r.content || r.text || r.body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
