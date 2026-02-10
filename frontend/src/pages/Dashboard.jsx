import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { adminService } from '@/services/api'
import DocumentUpload from '@/components/DocumentUpload'
import SearchAsk from '@/components/SearchAsk'

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
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>

        {user?.role === 'admin' && stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard title="Total Users" value={stats.totalUsers} />
            <StatCard title="Total Documents" value={stats.totalDocuments} />
            <StatCard title="Total Chunks" value={stats.totalChunks} />
            <StatCard title="Chat Sessions" value={stats.totalChatSessions} />
          </div>
        )}

        {loading && <p className="text-gray-600">Loading...</p>}

        <div className="space-y-6">
          <DocumentUpload />
          <SearchAsk />
        </div>
      </div>
    </div>
  )
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-sm font-medium text-gray-600">{title}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function Button({ href, children }) {
  return (
    <a
      href={href}
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      {children}
    </a>
  )
}
