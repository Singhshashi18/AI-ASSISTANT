import ChatUI from '@/components/ChatUI'

export default function Chat() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Chat</h1>
        <ChatUI />
      </div>
    </div>
  )
}
