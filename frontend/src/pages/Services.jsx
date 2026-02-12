

import {
  FileSearch,
  Layers,
  Bot,
  Sparkles
} from 'lucide-react'

export default function Services() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-10">

        {/* HEADER CARD */}
        <div className="mb-8 rounded-2xl bg-[#0f172a] border border-orange-500/30 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-orange-400">
              Services
            </h2>
            <p className="text-orange-200/80 text-sm mt-1">
              What QueryX offers
            </p>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            AI PLATFORM
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8">

          {/* LEFT SIDEBAR */}
          <div className="col-span-12 md:col-span-3">
            <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 overflow-hidden">
              <button className="w-full text-left px-5 py-4 font-semibold text-orange-400 bg-orange-500/10 border-l-4 border-orange-500">
                Core Services
              </button>
              <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
                Integrations
              </button>
              <button className="w-full text-left px-5 py-4 text-orange-200/80 hover:bg-orange-500/10 transition">
                Enterprise Solutions
              </button>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-12 md:col-span-9">
            <div className="relative rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 overflow-hidden">

              {/* DECOR */}
              <div className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-orange-500/15" />
              <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-orange-500/15" />

              <h3 className="text-2xl font-bold">
                Core AI Services
              </h3>
              <p className="text-orange-200/80 mt-1">
                Powerful features designed for production use
              </p>

              <div className="mt-8 grid md:grid-cols-2 gap-6 relative z-10">

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30 hover:bg-black/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 text-orange-300">
                    <FileSearch />
                    <h4 className="text-lg font-semibold text-white">
                      AI Document Search
                    </h4>
                  </div>
                  <p className="text-orange-200/80 mt-2">
                    Search across documents using semantic understanding.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30 hover:bg-black/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Layers />
                    <h4 className="text-lg font-semibold text-white">
                      Semantic Embeddings
                    </h4>
                  </div>
                  <p className="text-orange-200/80 mt-2">
                    High-quality vector embeddings for accurate retrieval.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30 hover:bg-black/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Bot />
                    <h4 className="text-lg font-semibold text-white">
                      Knowledge Assistant
                    </h4>
                  </div>
                  <p className="text-orange-200/80 mt-2">
                    Chat with your data using AI-powered assistants.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-black/40 border border-orange-500/30 hover:bg-black/50 transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-3 text-orange-300">
                    <Sparkles />
                    <h4 className="text-lg font-semibold text-white">
                      Custom AI Solutions
                    </h4>
                  </div>
                  <p className="text-orange-200/80 mt-2">
                    Tailored AI workflows built for your business needs.
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
