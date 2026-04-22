'use client'

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center gap-4 text-center px-6">
      <p className="text-[#888888]">
        Something went wrong loading projects.
      </p>
      <button
        onClick={reset}
        className="bg-[#00E87A] text-[#0A0A0A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#00E87A]/90 transition-colors duration-200"
      >
        Try again
      </button>
    </div>
  )
}
