
import { BookOpen, Zap, SlidersHorizontal, Sparkles } from 'lucide-react'

export default function ReadyToSummarize() {
  return (
    <div className="rounded-2xl bg-[#0f172a] border border-orange-500/30 p-8 shadow-xl sticky top-24">

      {/* HEADER */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className="w-14 h-14 flex items-center justify-center 
          rounded-xl bg-gradient-to-br from-orange-500 to-orange-600"
        >
          <BookOpen size={26} className="text-white" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Ready to Summarize
          </h2>
          <p className="text-orange-200/80 text-sm">
            AI-powered document summarization
          </p>
        </div>
      </div>

      {/* FEATURES */}
      <div className="space-y-4">

        <Feature
          icon={<Zap size={18} />}
          title="Understands Context"
          desc="Goes beyond keywords to capture the real meaning."
        />

        <Feature
          icon={<SlidersHorizontal size={18} />}
          title="You’re in Control"
          desc="Customize instructions for tailored summaries."
        />

        <Feature
          icon={<Sparkles size={18} />}
          title="Flexible Formats"
          desc="Paragraphs, bullet points, or overviews."
        />

      </div>

      {/* PRO TIP */}
      <div
        className="mt-8 rounded-xl p-4 
        bg-orange-500/10 border border-orange-500/30"
      >
        <p className="text-sm font-semibold text-orange-400 mb-1">
          Pro Tip
        </p>
        <p className="text-sm text-orange-200">
          Longer documents save more time when summarized.
        </p>
      </div>

    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div
      className="flex gap-4 p-4 rounded-xl 
      bg-black/40 border border-orange-500/30
      hover:bg-black/50 transition-all"
    >
      <div className="text-orange-400 mt-1">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-white">
          {title}
        </h4>
        <p className="text-sm text-orange-200">
          {desc}
        </p>
      </div>
    </div>
  )
}
