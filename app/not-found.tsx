import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center flex-col text-center px-6">
      <p className="text-8xl font-mono font-bold text-[#00E87A] select-none">
        404
      </p>
      <h1 className="text-2xl font-bold text-[#F0F0F0] mt-4">
        Page not found
      </h1>
      <p className="text-[#888888] mt-3 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-[#00E87A] text-[#0A0A0A] px-6 py-3 rounded-lg font-semibold hover:bg-[#00E87A]/90 transition-colors duration-200"
      >
        ← Go home
      </Link>
    </main>
  )
}
