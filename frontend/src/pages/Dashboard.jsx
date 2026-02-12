
// import { useState, useEffect } from 'react'
// import { useAuth } from '@/hooks/useAuth'
// import { adminService } from '@/services/api'
// import DocumentUpload from '@/components/DocumentUpload'
// import SearchAsk from '@/components/SearchAsk'

// export default function Dashboard() {
//   const { user } = useAuth()
//   const [stats, setStats] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         if (user?.role === 'admin') {
//           const response = await adminService.getDashboardStats()
//           setStats(response.data.stats)
//         }
//       } catch (err) {
//         console.error('Failed to fetch stats:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchStats()
//   }, [user])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-6">
//       <div className="max-w-7xl mx-auto">

        

//         {user?.role === 'admin' && stats && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
//             <StatCard title="Total Users" value={stats.totalUsers} />
//             <StatCard title="Total Documents" value={stats.totalDocuments} />
//             <StatCard title="Total Chunks" value={stats.totalChunks} />
//             <StatCard title="Chat Sessions" value={stats.totalChatSessions} />
//           </div>
//         )}

//         {loading && (
//           <p className="text-gray-300 animate-pulse">Loading dashboard...</p>
//         )}

//         <div className="space-y-8">
//           <SectionCard>
//             <DocumentUpload />
//           </SectionCard>

//           <SectionCard>
//             <SearchAsk />
//           </SectionCard>
//         </div>

//       </div>
//     </div>
//   )
// }

// function StatCard({ title, value }) {
//   return (
//     <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300">
//       <p className="text-sm text-gray-300">{title}</p>
//       <p className="text-4xl font-bold mt-2 text-white">{value}</p>
//     </div>
//   )
// }

// function SectionCard({ children }) {
//   return (
//     <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl">
//       {children}
//     </div>
//   )
// }









import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { adminService } from '@/services/api'
import DocumentUpload from '@/components/DocumentUpload'
import SearchAsk from '@/components/SearchAsk'
import ReadyToSummarize from '@/components/ReadyToSummarize'

export default function Dashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (user?.role === 'admin') {
          const response = await adminService.getDashboardStats()
          setStats(response.data.stats)
        }
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [user])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#111827] to-[#1e1b4b] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Admin Stats */}
        {user?.role === 'admin' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Documents" value={stats.totalDocuments} />
            <StatCard title="Total Chunks" value={stats.totalChunks} />
            <StatCard title="Chat Sessions" value={stats.totalChatSessions} />
          </div>
        )}

        {loading && (
          <p className="text-gray-400 animate-pulse">Loading dashboard...</p>
        )}

        {/* Main 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-8">

            <SectionCard>
              <DocumentUpload />
            </SectionCard>

            <SectionCard>
              <SearchAsk />
            </SectionCard>

          </div>

          {/* RIGHT SIDE */}
          <div className="hidden lg:block">
            <ReadyToSummarize />
          </div>

        </div>

      </div>
    </div>
  )
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ title, value }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-indigo-800/40 
    rounded-2xl p-6 shadow-xl hover:scale-105 transition-transform duration-300">
      <p className="text-sm text-gray-400">{title}</p>
      <p className="text-4xl font-bold mt-2 text-white">{value}</p>
    </div>
  )
}

function SectionCard({ children }) {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-indigo-800/40 
    rounded-3xl p-6 shadow-2xl">
      {children}
    </div>
  )
}

