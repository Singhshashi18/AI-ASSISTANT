


import ChatUI from '@/components/ChatUI'

export default function Chat() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold tracking-tight">
            💬 AI Chat
          </h1>
          <span className="text-sm text-gray-400">
            Ask questions about your uploaded documents
          </span>
        </div>

        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6">
          <ChatUI />
        </div>

      </div>
    </div>
  )
}
