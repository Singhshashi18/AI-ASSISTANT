

import { Check, Zap, Building2 } from 'lucide-react'

export default function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER CARD */}
        <div className="mb-10 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-400">Pricing</h2>
            <p className="text-orange-200/80 text-sm mt-1">
              Choose a plan that fits your workflow
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            FLEXIBLE PLANS
          </span>
        </div>

        {/* PRICING GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* FREE */}
          <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 hover:-translate-y-2 transition-all">
            <h3 className="text-lg font-semibold">Free</h3>
            <p className="text-4xl font-extrabold mt-4">₹0</p>
            <p className="text-orange-200/80 mt-2">Basic usage</p>

            <ul className="mt-6 space-y-3 text-sm text-orange-200/80">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-orange-400" />
                Limited documents
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-orange-400" />
                Community support
              </li>
            </ul>

            <button
              className="mt-8 w-full py-3 rounded-xl border border-orange-500/40
              hover:bg-orange-500/10 transition font-semibold"
            >
              Current Plan
            </button>
          </div>

          {/* PRO (HIGHLIGHT) */}
          <div className="relative rounded-2xl bg-orange-500/20 border border-orange-500 p-8 scale-105 shadow-xl shadow-orange-900/30">
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2
              text-xs px-3 py-1 rounded-full bg-orange-500 text-white"
            >
              MOST POPULAR
            </div>

            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap size={18} className="text-orange-400" /> Pro
            </h3>
            <p className="text-4xl font-extrabold mt-4">₹499</p>
            <p className="text-orange-100 mt-2">For professionals</p>

            <ul className="mt-6 space-y-3 text-sm text-orange-100">
              <li className="flex items-center gap-2">
                <Check size={16} />
                Unlimited documents
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} />
                Faster embeddings
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} />
                Priority support
              </li>
            </ul>

            <button
              className="mt-8 w-full py-3 rounded-xl font-semibold
              bg-gradient-to-r from-orange-500 to-orange-600
              hover:from-orange-400 hover:to-orange-500 transition"
            >
              Upgrade to Pro
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 hover:-translate-y-2 transition-all">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Building2 size={18} className="text-orange-400" /> Enterprise
            </h3>
            <p className="text-4xl font-extrabold mt-4">Custom</p>
            <p className="text-orange-200/80 mt-2">For teams & orgs</p>

            <ul className="mt-6 space-y-3 text-sm text-orange-200/80">
              <li className="flex items-center gap-2">
                <Check size={16} className="text-orange-400" />
                Dedicated infrastructure
              </li>
              <li className="flex items-center gap-2">
                <Check size={16} className="text-orange-400" />
                SLA & onboarding
              </li>
            </ul>

            <button
              className="mt-8 w-full py-3 rounded-xl border border-orange-500/40
              hover:bg-orange-500/10 transition font-semibold"
            >
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
