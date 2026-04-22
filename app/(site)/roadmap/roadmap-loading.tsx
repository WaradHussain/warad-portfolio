export default function RoadmapLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, col) => (
        <div key={col} className="flex flex-col gap-3">
          {/* Column header skeleton */}
          <div className="h-8 w-32 rounded-lg bg-[#1A1A1A] animate-pulse" aria-hidden="true" />
          {/* Card skeletons */}
          {Array.from({ length: 4 }).map((_, card) => (
            <div
              key={card}
              className="h-24 w-full rounded-xl bg-[#1A1A1A] animate-pulse"
              aria-hidden="true"
            />
          ))}
        </div>
      ))}
    </div>
  )
}
