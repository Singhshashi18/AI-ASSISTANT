import PageLayout from '@/components/PageLayout'

export default function Refer() {
  return (
    <PageLayout
      title="Refer & Earn"
      subtitle="Invite friends and earn credits"
    >
      <div className="max-w-2xl p-8 rounded-2xl bg-indigo-900/30 border border-indigo-800/40 animate-slide-up">
        <p className="text-indigo-300 mb-4">
          Share your referral link and earn rewards.
        </p>

        <div className="flex items-center gap-4">
          <input
            readOnly
            value="https://queryx.ai/ref/your-id"
            className="flex-1 px-4 py-3 rounded-xl bg-black/40 border border-indigo-700/40 text-indigo-200"
          />
          <button
            className="px-6 py-3 rounded-xl
            bg-indigo-600 hover:bg-indigo-500 transition"
          >
            Copy
          </button>
        </div>
      </div>
    </PageLayout>
  )
}
