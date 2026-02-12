



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



  // return (
  //   <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 text-white">
      
  //     <h2 className="text-2xl font-bold mb-6">Search / Ask AI</h2>

  //     {/* Input Section */}
  //     <div className="flex flex-col sm:flex-row gap-3 mb-6">
  //       <input
  //         value={query}
  //         onChange={(e) => setQuery(e.target.value)}
  //         placeholder="Enter question or keywords..."
  //         className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
  //       />

  //       <button
  //         onClick={doSearch}
  //         disabled={loading}
  //         className="px-5 py-3 rounded-lg bg-gray-600 hover:bg-gray-700 transition disabled:opacity-50"
  //       >
  //         {loading ? 'Searching...' : 'Search'}
  //       </button>

  //       <button
  //         onClick={doAsk}
  //         disabled={loading}
  //         className="px-5 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition disabled:opacity-50"
  //       >
  //         {loading ? 'Thinking...' : 'Ask AI'}
  //       </button>
  //     </div>

  //     {/* AI Answer */}
  //     {answer && (
  //       <div className="mb-6 p-5 rounded-xl bg-indigo-600/20 border border-indigo-400/30">
  //         <h3 className="font-semibold mb-2 text-indigo-300">AI Answer</h3>
  //         <p className="text-gray-200 whitespace-pre-wrap">{answer}</p>
  //       </div>
  //     )}

  //     {/* Results */}
  //     <div className="space-y-4">
  //       {results.map((r) => (
  //         <div
  //           key={r._id || r.id || r.hash || Math.random()}
  //           className="p-4 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition"
  //         >
  //           <div className="text-xs text-indigo-300 mb-2">
  //             {r.source || r.filename || r.meta?.source || r.meta?.filename || 'Document Source'}
  //           </div>
  //           <div className="text-sm text-gray-200">
  //             {r.content || r.text || r.body}
  //           </div>
  //         </div>
  //       ))}
  //     </div>

  //     {results.length === 0 && !answer && !loading && (
  //       <p className="text-gray-400 text-sm text-center mt-6">
  //         No results yet. Try asking something about your uploaded documents.
  //       </p>
  //     )}
  //   </div>
  // )





// return (
//   <div
//     className="max-w-4xl mx-auto
//     bg-gradient-to-br from-indigo-900/40 to-indigo-800/30
//     backdrop-blur-xl
//     border border-indigo-700/40
//     rounded-2xl
//     shadow-xl shadow-indigo-900/40
//     hover:shadow-indigo-800/60
//     transition-all duration-300
//     p-8 text-white"
//   >
//     <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
//       <span className="text-indigo-400 text-3xl"></span>
//       Ask QueryX
//     </h2>

//     {/* Input Section */}
//     <div className="flex flex-col sm:flex-row gap-4 mb-8">

//       <input
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Enter question or keywords..."
//         className="flex-1 px-5 py-3 rounded-xl
//         bg-indigo-800/40 border border-indigo-600/40
//         placeholder-indigo-300
//         focus:outline-none focus:ring-2 focus:ring-indigo-500
//         focus:scale-[1.01]
//         transition-all duration-200"
//       />

//       <button
//         onClick={doSearch}
//         disabled={loading}
//         className="px-6 py-3 rounded-xl
//         bg-indigo-700/60 hover:bg-indigo-600/80
//         active:scale-95
//         shadow-md
//         transition-all duration-200
//         disabled:opacity-50"
//       >
//         {loading ? (
//           <span className="animate-pulse">Searching...</span>
//         ) : (
//           "Search"
//         )}
//       </button>

//       <button
//         onClick={doAsk}
//         disabled={loading}
//         className="px-6 py-3 rounded-xl
//         bg-gradient-to-r from-indigo-500 to-purple-600
//         hover:from-indigo-400 hover:to-purple-500
//         active:scale-95
//         shadow-lg shadow-indigo-900/40
//         transition-all duration-200
//         disabled:opacity-50"
//       >
//         {loading ? (
//           <span className="animate-pulse">Thinking...</span>
//         ) : (
//           "Ask AI"
//         )}
//       </button>

//     </div>

//     {/* AI Answer */}
//     {answer && (
//       <div
//         className="mb-8 p-6 rounded-2xl
//         bg-gradient-to-r from-indigo-800/40 to-purple-800/30
//         border border-indigo-500/40
//         shadow-md
//         animate-fade-in"
//       >
//         <h3 className="font-semibold mb-3 text-indigo-300">
//           AI Answer
//         </h3>
//         <p className="text-indigo-100 whitespace-pre-wrap leading-relaxed">
//           {answer}
//         </p>
//       </div>
//     )}

//     {/* Results */}
//     <div className="space-y-5">
//       {results.map((r) => (
//         <div
//           key={r._id || r.id || r.hash || Math.random()}
//           className="p-5 rounded-2xl
//           bg-indigo-800/30
//           border border-indigo-600/30
//           hover:border-indigo-500
//           hover:scale-[1.01]
//           transition-all duration-300"
//         >
//           <div className="text-xs text-indigo-400 mb-2 tracking-wide uppercase">
//             {r.source ||
//               r.filename ||
//               r.meta?.source ||
//               r.meta?.filename ||
//               "Document Source"}
//           </div>

//           <div className="text-sm text-indigo-100 leading-relaxed">
//             {r.content || r.text || r.body}
//           </div>
//         </div>
//       ))}
//     </div>

//     {results.length === 0 && !answer && !loading && (
//       <p className="text-indigo-300 text-sm text-center mt-8 opacity-70">
//         No results yet. Try asking something about your uploaded documents.
//       </p>
//     )}
//   </div>
// )





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
    <h2 className="text-2xl font-bold mb-8 text-indigo-300">
           Ask QueryX
    </h2>

    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter question or keywords..."
        className="flex-1 px-5 py-3 rounded-xl
        bg-indigo-900/40
        border border-indigo-600/30
        placeholder-indigo-300
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        transition-all duration-200"
      />

      <button
        onClick={doSearch}
        disabled={loading}
        className="px-6 py-3 rounded-xl
        bg-indigo-700/60
        hover:bg-indigo-600/80
        active:scale-95
        transition-all duration-200
        disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>

      <button
        onClick={doAsk}
        disabled={loading}
        className="px-6 py-3 rounded-xl
        bg-gradient-to-r from-indigo-500 to-purple-600
        hover:from-indigo-400 hover:to-purple-500
        active:scale-95
        shadow-lg shadow-indigo-900/40
        transition-all duration-200
        disabled:opacity-50"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
    </div>

    {answer && (
      <div className="mb-8 p-6 rounded-2xl
      bg-indigo-900/40
      border border-indigo-500/30">
        <h3 className="font-semibold mb-3 text-indigo-400">
          🤖 AI Answer
        </h3>
        <p className="text-indigo-100 whitespace-pre-wrap">
          {answer}
        </p>
      </div>
    )}

    <div className="space-y-5">
      {results.map((r) => (
        <div
          key={r._id || r.id || r.hash || Math.random()}
          className="p-5 rounded-2xl
          bg-indigo-900/30
          border border-indigo-600/30
          hover:border-indigo-400
          hover:scale-[1.01]
          transition-all duration-300"
        >
          <div className="text-xs text-indigo-400 mb-2">
            {r.source ||
              r.filename ||
              r.meta?.source ||
              r.meta?.filename ||
              "Document Source"}
          </div>

          <div className="text-sm text-indigo-100">
            {r.content || r.text || r.body}
          </div>
        </div>
      ))}
    </div>

    {results.length === 0 && !answer && !loading && (
      <p className="text-indigo-400 text-sm text-center mt-6">
        No results yet. Try asking something about your uploaded documents.
      </p>
    )}
  </div>
)



}
