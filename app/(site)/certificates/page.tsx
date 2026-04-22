import type { Metadata } from 'next'
import { sanityClient, allCertificatesQuery } from '@/lib/sanity'
import type { SanityCertificate } from '@/types/sanity'
import CertificatesClient from '@/components/certificates/CertificatesClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Certificates',
  description: 'Professional certifications in AI/ML, backend engineering, and cloud.',
}

export default async function CertificatesPage() {
  const certs = await sanityClient.fetch<SanityCertificate[]>(allCertificatesQuery)

  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-accent-green font-mono text-sm">03.</span>
          <div className="flex-1 h-px bg-border-subtle" />
        </div>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight font-mono">
          Certificates
        </h1>
        <p className="text-text-secondary mt-2 text-base">
          Professional certifications in AI/ML, backend engineering, and cloud.
        </p>
      </div>

      <CertificatesClient certs={certs} />
    </main>
  )
}