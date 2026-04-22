export default function CertificatesLoading() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-[#1A1A1A] animate-pulse aspect-[4/3]"
          aria-hidden="true"
        />
      ))}
    </div>
  )
}
