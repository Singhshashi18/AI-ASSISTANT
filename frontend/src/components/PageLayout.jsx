export default function PageLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1120] via-[#0f172a] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-8 py-16 animate-fade-in">
        <h1 className="text-4xl font-bold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-indigo-300 text-lg">
            {subtitle}
          </p>
        )}

        <div className="mt-12">
          {children}
        </div>
      </div>
    </div>
  )
}
