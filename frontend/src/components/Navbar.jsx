import { useAuth } from '@/hooks/useAuth'

export default function Navbar() {
  const { user, logoutUser } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">AI Assistant</h1>
        
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{user.name}</span>
            <button
              onClick={logoutUser}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
