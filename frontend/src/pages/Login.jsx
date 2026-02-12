
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import { Mail, Lock } from 'lucide-react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {}
  }

  return (
    <div
      className="min-h-screen flex text-white bg-cover bg-center relative"
      style={{
        backgroundImage:
         "url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')"
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0b1120]/90 via-[#1e1b4b]/85 to-black/90 backdrop-blur-sm"></div>

      <div className="relative z-10 flex w-full">

        {/* LEFT SIDE - Animated Branding */}
        <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">

          {/* Floating Glow Blobs */}
          <div className="absolute w-96 h-96 bg-indigo-600/30 rounded-full blur-3xl animate-pulse top-20 -left-10"></div>
          <div className="absolute w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse bottom-10 -right-10"></div>

          {/* Glass Branding Card */}
          <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 max-w-lg w-full 
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
              Trusted by 2,000+ developers worldwide
            </div>

          </div>
        </div>


        {/* RIGHT SIDE - Login Card */}
        <div className="flex w-full lg:w-1/2 justify-center items-center px-6">

          <div className="w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8">

            <h2 className="text-3xl font-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-gray-300 mb-8">
              Sign in to your AI Knowledge Assistant
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

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
                {loading ? 'Signing in...' : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-3 text-gray-400 text-sm">
                <div className="flex-1 h-px bg-white/20"></div>
                OR
                <div className="flex-1 h-px bg-white/20"></div>
              </div>

              {/* Google Button (UI Only) */}
              <button
                type="button"
                className="w-full py-3 rounded-lg bg-white text-gray-800 font-medium hover:bg-gray-200 transition"
              >
                Continue with Google
              </button>

              {/* Register */}
              <p className="text-center text-sm text-gray-300">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-indigo-400 font-semibold hover:text-white transition"
                >
                  Sign Up
                </Link>
              </p>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}
