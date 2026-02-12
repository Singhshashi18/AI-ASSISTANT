import PageLayout from '@/components/PageLayout'

export default function Services() {
  return (
    <PageLayout
      title="Services"
      subtitle="What QueryX offers"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {[
          'AI Document Search',
          'Semantic Embeddings',
          'Knowledge Assistant',
          'Custom AI Solutions'
        ].map((service) => (
          <div
            key={service}
            className="p-6 rounded-2xl bg-indigo-900/30 border border-indigo-800/40
            hover:bg-indigo-900/40 transition-all hover:-translate-y-1"
          >
            <h3 className="text-lg font-semibold">{service}</h3>
            <p className="text-indigo-300 mt-2">
              Scalable, fast and production-ready.
            </p>
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
