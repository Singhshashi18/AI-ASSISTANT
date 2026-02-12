import PageLayout from '@/components/PageLayout'

export default function Pricing() {
  return (
    <PageLayout
      title="Pricing"
      subtitle="Choose a plan that fits your workflow"
    >
      <div className="grid md:grid-cols-3 gap-8">

        {[
          { name: 'Free', price: '₹0', desc: 'Basic usage' },
          { name: 'Pro', price: '₹499', desc: 'For professionals', highlight: true },
          { name: 'Enterprise', price: 'Custom', desc: 'For teams' }
        ].map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-2xl border 
            ${plan.highlight
              ? 'bg-indigo-600/20 border-indigo-500 scale-105'
              : 'bg-indigo-900/20 border-indigo-800/40'}
            transition-all duration-300 hover:-translate-y-2`}
          >
            <h3 className="text-xl font-bold">{plan.name}</h3>
            <p className="text-3xl font-extrabold mt-4">{plan.price}</p>
            <p className="text-indigo-300 mt-2">{plan.desc}</p>

            <button
              className="mt-6 w-full py-3 rounded-xl
              bg-gradient-to-r from-indigo-500 to-purple-600
              font-semibold hover:scale-105 transition"
            >
              Get Started
            </button>
          </div>
        ))}

      </div>
    </PageLayout>
  )
}
