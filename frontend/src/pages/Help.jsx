import PageLayout from '@/components/PageLayout'

export default function Help() {
  return (
    <PageLayout
      title="Help & Support"
      subtitle="We’re here to help you"
    >
      <div className="space-y-6 max-w-xl">
        <div className="p-6 rounded-2xl bg-indigo-900/30 border border-indigo-800/40">
          📧 support@queryx.ai
        </div>
        <div className="p-6 rounded-2xl bg-indigo-900/30 border border-indigo-800/40">
          📄 Documentation
        </div>
        <div className="p-6 rounded-2xl bg-indigo-900/30 border border-indigo-800/40">
          ❓ FAQs
        </div>
      </div>
    </PageLayout>
  )
}
