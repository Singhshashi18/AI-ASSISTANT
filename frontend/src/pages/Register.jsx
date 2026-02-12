




import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock, User } from 'lucide-react'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(name, email, password)
      navigate('/dashboard')
    } catch (err) {}
  }

  return (
    <div
      className="min-h-screen flex bg-cover bg-center relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

      {/* LEFT SIDE - Branding */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative z-10 px-12">
        <div className="backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 max-w-lg w-full 
                        hover:scale-105 transition-all duration-500">

          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            🤖 QueryX
          </h1>

          <p className="text-indigo-200 mb-10 text-lg">
            AI Knowledge Assistant built for intelligent document analysis
          </p>

          <ul className="space-y-5 text-gray-300 text-base">
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Smart Document AI
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Context Aware Chat
            </li>
            <li className="flex items-center gap-3">
              <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
              Lightning Fast Embeddings
            </li>
          </ul>

          <div className="mt-12 text-sm text-indigo-300">
            Join 2,000+ developers building smarter apps
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Register Card */}
      <div className="flex w-full lg:w-1/2 justify-center items-center px-6 relative z-10">

        <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

          <h2 className="text-3xl font-bold mb-2">
            Create Account
          </h2>

          <p className="text-gray-300 mb-8">
            Start using your AI Knowledge Assistant
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {error && (
              <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 font-semibold shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Sign Up'}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 text-gray-400 text-sm">
              <div className="flex-1 h-px bg-white/20"></div>
              OR
              <div className="flex-1 h-px bg-white/20"></div>
            </div>

            {/* Google UI Button */}
            <button
              type="button"
              className="w-full py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-200 transition"
            >
              Continue with Google
            </button>

            {/* Login */}
            <p className="text-center text-sm text-gray-300">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-indigo-400 font-semibold hover:text-white transition"
              >
                Sign In
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  )
}
