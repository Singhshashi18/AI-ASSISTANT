
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import {
  User,
  Settings,
  LogOut,
  HelpCircle,
  ChevronDown
} from 'lucide-react'

export default function Navbar() {
  const { user, logoutUser } = useAuth()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-gradient-to-r from-[#0b1120] to-[#1e1b4b] shadow-lg border-b border-indigo-900/40 relative z-50">
      <div className="w-full px-8 py-4 flex items-center justify-between">

        {/* Left: Logo */}
        <Link
          to="/dashboard"
          className="text-2xl font-bold text-white tracking-wide"
        >
          QueryX
        </Link>

        {/* Center: Nav Links (BOLD + ANIMATION) */}
        <div className="hidden md:flex items-center gap-12 text-lg font-bold text-indigo-200">
          {[
            { to: '/pricing', label: 'Pricing' },
            { to: '/refer', label: 'Refer & Earn' },
            { to: '/services', label: 'Services' },
            { to: '/help', label: 'Help' }
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="
                relative transition-all duration-300
                hover:text-white hover:-translate-y-0.5
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-indigo-400
                after:transition-all after:duration-300
                hover:after:w-full
              " 
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: User */}
        {user && (
          <div
            className="relative flex items-center"
            ref={dropdownRef}
          >
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-3 px-4 py-2 rounded-full 
              bg-indigo-600/40 border border-indigo-400/30 
              backdrop-blur-md text-white font-semibold
              hover:bg-indigo-600/60 transition-all duration-200"
            >
              <User size={18} />
              {user.name}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${
                  open ? 'rotate-180' : ''
                }`}
              />
            </button>

            {open && (
              <div
                className="absolute top-full right-0 mt-3 w-80
                bg-[#0f172a] border border-indigo-800/40 
                rounded-2xl shadow-2xl overflow-hidden"
              >
                <div className="p-5 flex items-center gap-4 border-b border-indigo-800/40">
                  <div
                    className="w-14 h-14 flex items-center justify-center 
                    rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
                    text-white text-xl font-bold"
                  >
                    {user.name?.charAt(0).toUpperCase()}
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

                <div className="py-2">
                  <Link
                    to="/billing"
                    className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-indigo-600/20 transition"
                  >
                    <Settings size={18} className="text-indigo-400" />
                    Billing & Subscription
                  </Link>

                  <Link
                    to="/refer"
                    className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-indigo-600/20 transition"
                  >
                    <User size={18} className="text-indigo-400" />
                    Refer & Earn
                  </Link>

                  <Link
                    to="/settings"
                    className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-indigo-600/20 transition"
                  >
                    <Settings size={18} className="text-indigo-400" />
                    Settings
                  </Link>

                  <Link
                    to="/help"
                    className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-indigo-600/20 transition"
                  >
                    <HelpCircle size={18} className="text-indigo-400" />
                    Help & Support
                  </Link>
                </div>

                <div className="p-4 border-t border-indigo-800/40">
                  <button
                    onClick={logoutUser}
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
