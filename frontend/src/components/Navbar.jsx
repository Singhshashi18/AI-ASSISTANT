



import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import {
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronDown,
  Clock
} from 'lucide-react'

export default function Navbar() {
  const { user, logoutUser } = useAuth()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () =>
      document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-gradient-to-r from-[#0b1120] to-[#1e1b4b] shadow-lg border-b border-orange-500/20 relative z-50">
      <div className="w-full px-8 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold tracking-wide text-orange-400"
        >
          QueryX
        </Link>

        {/* User */}
        {user && (
          <div className="relative flex items-center" ref={dropdownRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-4 py-2 rounded-full
              bg-orange-500/20 border border-orange-400/30
              text-orange-200 font-semibold
              hover:bg-orange-500/30 transition"
            >
              <User size={18} className="text-orange-400" />
              {user.name}
              <ChevronDown
                size={16}
                className={`text-orange-300 transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open && (
              <div
                className="absolute top-full right-0 mt-3 w-80
                bg-[#0f172a] border border-orange-500/30
                rounded-2xl shadow-2xl overflow-hidden"
              >
                {/* Profile */}
                <div className="p-5 flex items-center gap-4 border-b border-orange-500/20">
                  <div
                    className="w-14 h-14 flex items-center justify-center
                    rounded-full bg-gradient-to-br from-orange-400 to-orange-600
                    text-white text-xl font-bold"
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-white font-semibold">
                      {user.name}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Links */}
                <div className="py-2">
                  <Link
                    to="/activity"
                    className="flex items-center gap-3 px-5 py-3
                    text-gray-300 hover:bg-orange-500/10 transition"
                  >
                    <Clock size={18} className="text-orange-400" />
                    Activity Log
                  </Link>

                  

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-5 py-3
                    text-gray-300 hover:bg-orange-500/10 transition"
                  >
                    <Settings size={18} className="text-orange-400" />
                    Settings
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-5 py-3
                    text-gray-300 hover:bg-orange-500/10 transition"
                  >
                    <HelpCircle size={18} className="text-orange-400" />
                    Help & Support
                  </Link>
                </div>

                {/* Logout */}
                <div className="p-4 border-t border-orange-500/20">
                  <button
                    onClick={() => {
                      logoutUser()
                      navigate('/login')
                    }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl
                    bg-red-500/10 text-red-400 font-semibold
                    hover:bg-red-500/20 transition"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
