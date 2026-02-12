

import { CreditCard, Calendar, Wallet } from 'lucide-react'

export default function Billing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER CARD */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-400">
              Billing & Subscription
            </h2>
            <p className="text-orange-200/80 text-sm mt-1">
              Manage your plan, payments and invoices
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            FREE PLAN
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 overflow-hidden">
              <button className="w-full text-left px-5 py-4 font-semibold text-orange-400 bg-orange-500/10 border-l-4 border-orange-500">
                Subscription
              </button>
              <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
                Payment Method
              </button>
              <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
                Invoices
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-9">
            <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/15" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/15" />

              {/* CURRENT PLAN */}
              <h3 className="text-2xl font-bold">
                Current Plan
              </h3>
              <p className="text-orange-200/80 mt-1">
                You are currently on the Free plan
              </p>

              <div className="mt-6 grid md:grid-cols-3 gap-6 relative z-10">

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Wallet size={18} />
                    <span>Plan</span>
                  </div>
                  <p className="mt-2 text-xl font-bold">Free</p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Calendar size={18} />
                    <span>Billing Cycle</span>
                  </div>
                  <p className="mt-2 text-xl font-bold">Monthly</p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30">
                  <div className="flex items-center gap-3 text-orange-300">
                    <CreditCard size={18} />
                    <span>Next Billing</span>
                  </div>
                  <p className="mt-2 text-xl font-bold">—</p>
                </div>

              </div>

              {/* ACTION */}
              <div className="mt-10 flex justify-end relative z-10">
                <button
                  className="px-8 py-3 rounded-xl font-semibold
                  bg-gradient-to-r from-orange-500 to-orange-600
                  hover:from-orange-400 hover:to-orange-500 transition"
                >
                  Upgrade Plan
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
