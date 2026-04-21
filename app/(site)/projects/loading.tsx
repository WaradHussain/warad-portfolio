export default function ProjectsLoading() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      {/* Header skeleton */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-3 bg-bg-elevated rounded animate-pulse" />
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
        <div className="h-9 w-36 bg-bg-elevated rounded animate-pulse" />
        <div className="h-4 w-80 bg-bg-elevated rounded animate-pulse mt-3" />
      </div>

      {/* Filter skeleton */}
      <div className="flex gap-2 mb-8">
        {[72, 56, 80, 64].map((w, i) => (
          <div
            key={i}
            className="h-8 rounded-full bg-bg-elevated animate-pulse"
            style={{ width: `${w}px` }}
          />
        ))}
      </div>

      {/* Cards grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-bg-elevated animate-pulse">
            {/* Image placeholder */}
            <div className="h-40 w-full bg-bg-glass" />
            {/* Body */}
            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-5 w-16 bg-bg-glass rounded" />
                <div className="flex gap-2">
                  <div className="h-4 w-4 bg-bg-glass rounded" />
                  <div className="h-4 w-4 bg-bg-glass rounded" />
                </div>
              </div>
              <div className="h-5 w-3/4 bg-bg-glass rounded" />
              <div className="h-4 w-full bg-bg-glass rounded" />
              <div className="h-4 w-2/3 bg-bg-glass rounded" />
              <div className="flex gap-1.5 mt-1">
                <div className="h-5 w-14 bg-bg-glass rounded" />
                <div className="h-5 w-16 bg-bg-glass rounded" />
                <div className="h-5 w-12 bg-bg-glass rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
