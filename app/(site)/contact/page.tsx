import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — Warad Hussain",
  description:
    "Get in touch with Warad Hussain for backend engineering and AI projects.",
};

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export default function ContactPage() {
  return (
    <div className="max-w-lg mx-auto px-6 pt-20 pb-12 text-center">

      {/* Icon circle */}
      <div className="w-14 h-14 rounded-full bg-accent-dim border border-accent-green/20 flex items-center justify-center mx-auto mb-6">
        <Mail size={24} className="text-accent-green" />
      </div>

      {/* Heading */}
      <h1 className="text-3xl font-bold text-text-primary">Get in Touch</h1>

      {/* Subtext */}
      <p className="text-text-secondary leading-relaxed mt-3 mb-10">
        Open to backend engineering and AI projects. Whether it&apos;s a job,
        freelance, or just a technical conversation — reach out.
      </p>

      {/* Buttons */}
      <div className="flex flex-col gap-3">

        {/* Email */}
        <Link
          href="mailto:contactwithwarad@gmail.com"
          className="bg-accent-green text-bg-primary font-semibold rounded-xl py-3.5 px-6 flex items-center justify-center gap-3 w-full text-sm hover:bg-accent-green/90 transition-colors"
          aria-label="Send email to Warad"
        >
          <Mail size={18} />
          contactwithwarad@gmail.com
        </Link>

        {/* GitHub */}
        <Link
          href="https://github.com/WaradHussain"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border border-border-subtle text-text-primary rounded-xl py-3.5 px-6 flex items-center justify-center gap-3 w-full text-sm hover:border-accent-green hover:text-accent-green transition-all"
          aria-label="Visit Warad's GitHub"
        >
          <GitHubIcon />
          GitHub
        </Link>

        {/* LinkedIn */}
        <Link
          href="https://linkedin.com/in/waradhussain"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-transparent border border-border-subtle text-text-primary rounded-xl py-3.5 px-6 flex items-center justify-center gap-3 w-full text-sm hover:border-accent-green hover:text-accent-green transition-all"
          aria-label="Visit Warad's LinkedIn"
        >
          <LinkedInIcon />
          LinkedIn
        </Link>

      </div>

      {/* Response note */}
      <p className="text-text-muted font-mono text-xs mt-8">
        Usually respond within 24 hours.
      </p>

    </div>
  );
}
