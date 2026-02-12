// import { Clock, FileText, Search, LogIn } from 'lucide-react'

// export default function ActivityLog() {
//   // abhi dummy data, baad me backend se aa jayega
//   const activities = [
//     {
//       id: 1,
//       type: 'upload',
//       text: 'Uploaded document "resume.pdf"',
//       time: '2 minutes ago',
//       icon: <FileText size={18} />
//     },
//     {
//       id: 2,
//       type: 'search',
//       text: 'Asked AI: "Summarize project report"',
//       time: '12 minutes ago',
//       icon: <Search size={18} />
//     },
//     {
//       id: 3,
//       type: 'login',
//       text: 'Logged in successfully',
//       time: 'Today at 4:12 PM',
//       icon: <LogIn size={18} />
//     }
//   ]

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
//       <div className="max-w-6xl mx-auto px-8 py-10">

//         {/* HEADER */}
//         <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
//           <div>
//             <h2 className="text-xl font-bold text-orange-400">
//               Activity Log
//             </h2>
//             <p className="text-orange-200/80 text-sm mt-1">
//               Recent actions on your account
//             </p>
//           </div>

//           <Clock className="text-orange-400" />
//         </div>

//         {/* ACTIVITY LIST */}
//         <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 divide-y divide-orange-500/10">
//           {activities.map((a) => (
//             <div
//               key={a.id}
//               className="flex items-center gap-4 px-6 py-5 hover:bg-orange-500/5 transition"
//             >
//               <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
//                 {a.icon}
//               </div>

//               <div className="flex-1">
//                 <p className="font-medium">
//                   {a.text}
//                 </p>
//                 <p className="text-sm text-orange-200/60">
//                   {a.time}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }





import { useEffect, useState } from 'react'
import { Clock, FileText, Bot } from 'lucide-react'
import { documentService, chatService } from '@/services/api'

export default function ActivityLog() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const items = []

        /* DOCUMENT UPLOADS */
        const docsRes = await documentService.list()
        const docs =
          docsRes.data?.documents ||
          docsRes.data?.data ||
          []

        docs.forEach((d) => {
          items.push({
            id: `doc-${d._id}`,
            type: 'upload',
            text: `Uploaded document "${d.title || d.filename}"`,
            time: formatTime(d.createdAt),
            icon: <FileText size={18} />
          })
        })

        /* CHAT / AI USAGE */
        const chatRes = await chatService.getSessions()
        const sessions =
          chatRes.data?.sessions ||
          chatRes.data?.data ||
          []

        sessions.forEach((s) => {
          items.push({
            id: `chat-${s._id}`,
            type: 'chat',
            text: `Started AI chat "${s.title || 'New Session'}"`,
            time: formatTime(s.createdAt),
            icon: <Bot size={18} />
          })
        })

        /* SORT LATEST FIRST */
        items.sort((a, b) => new Date(b.timeRaw) - new Date(a.timeRaw))

        setActivities(items)
      } catch (err) {
        console.error('Failed to load activity log', err)
      } finally {
        setLoading(false)
      }
    }

    loadActivity()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-400">
        Loading activity…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* HEADER */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-400">
              Activity Log
            </h2>
            <p className="text-orange-200/80 text-sm mt-1">
              Recent actions on your account
            </p>
          </div>
          <Clock className="text-orange-400" />
        </div>

        {/* LIST */}
        {activities.length === 0 ? (
          <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 p-10 text-center text-orange-200/70">
            No activity yet.
          </div>
        ) : (
          <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 divide-y divide-orange-500/10">
            {activities.map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-4 px-6 py-5 hover:bg-orange-500/5 transition"
              >
                <div className="h-10 w-10 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                  {a.icon}
                </div>

                <div className="flex-1">
                  <p className="font-medium">{a.text}</p>
                  <p className="text-sm text-orange-200/60">
                    {a.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

/* -------- utils -------- */
function formatTime(date) {
  if (!date) return '—'
  const d = new Date(date)
  return d.toLocaleString()
}
