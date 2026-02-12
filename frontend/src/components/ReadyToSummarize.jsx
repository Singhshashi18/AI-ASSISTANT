import { BookOpen, Zap, SlidersHorizontal, Sparkles } from "lucide-react"

export default function ReadyToSummarize() {
  return (
    <div className="backdrop-blur-xl bg-white/5 border border-indigo-800/40 
    rounded-3xl p-8 shadow-2xl h-fit sticky top-24">

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center 
        rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 
        shadow-lg animate-pulse">
          <BookOpen size={28} className="text-white" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-center mb-2">
        Ready to Summarize?
      </h2>

      <p className="text-gray-400 text-sm text-center mb-8">
        Transform your lengthy documents into concise,
        powerful summaries with AI technology.
      </p>

      {/* Features */}
      <div className="space-y-4">

        <Feature
          icon={<Zap size={18} />}
          title="Understands Context"
          desc="Goes beyond keywords to grasp the core message."
        />

        <Feature
          icon={<SlidersHorizontal size={18} />}
          title="You're in Control"
          desc="Use custom instructions for tailored results."
        />

        <Feature
          icon={<Sparkles size={18} />}
          title="Flexible Formats"
          desc="Paragraphs, overview, or bullet summaries."
        />

      </div>

      {/* Pro Tip */}
      <div className="mt-8 p-4 rounded-xl 
      bg-indigo-600/10 border border-indigo-500/30 text-sm">

        <p className="font-semibold text-indigo-300 mb-1">
          ✨ Pro Tip
        </p>

        <p className="text-gray-400">
          The longer the content you summarize, the more time you'll save.
        </p>
      </div>

    </div>
  )
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl 
    bg-white/5 border border-white/10 
    hover:bg-indigo-600/10 transition-all duration-300">

      <div className="text-indigo-400 mt-1">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-white">
          {title}
        </h4>
        <p className="text-sm text-gray-400">
          {desc}
        </p>
      </div>
    </div>
  )
}
