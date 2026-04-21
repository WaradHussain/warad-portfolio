"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// ── Typewriter ───────────────────────────────────────────
const WORDS = ["Python Engineer", "AI Engineer", "Backend Developer"];
const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE_MS = 1400;

function useTypewriter() {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed === current) {
      timeout = setTimeout(() => setDeleting(true), PAUSE_MS);
    } else if (deleting && displayed === "") {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % WORDS.length);
    } else {
      timeout = setTimeout(() => {
        setDisplayed(deleting ? current.slice(0, displayed.length - 1) : current.slice(0, displayed.length + 1));
      }, deleting ? DELETE_SPEED : TYPE_SPEED);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, wordIndex]);

  return displayed;
}

// ── Badge colors ─────────────────────────────────────────
const STACK_COLORS: Record<string, string> = {
  Python: "#3b82f6",
  FastAPI: "#10b981",
  Django: "#16a34a",
  LangChain: "#f59e0b",
  PostgreSQL: "#6366f1",
  Docker: "#0ea5e9",
  "AI/ML": "#8b5cf6",
  RAG: "#ec4899",
  "Next.js": "#a0a0a0",
  Supabase: "#06b6d4",
};

// ── Data ─────────────────────────────────────────────────
const PROJECTS = [
  {
    title: "AI RAG Pipeline",
    category: "AI/ML",
    desc: "Production RAG system with pgvector and semantic search",
    stack: ["Python", "LangChain", "RAG"],
  },
  {
    title: "FastAPI Auth Service",
    category: "Python",
    desc: "JWT + OAuth2 microservice with RBAC and refresh tokens",
    stack: ["Python", "FastAPI", "PostgreSQL"],
  },
  {
    title: "Django Multi-Tenant SaaS",
    category: "Python",
    desc: "Schema-per-tenant isolation for multi-client applications",
    stack: ["Django", "PostgreSQL", "Docker"],
  },
];

const TECH_STACK = [
  "Python", "FastAPI", "Django", "LangChain",
  "Next.js", "Supabase", "PostgreSQL", "Docker",
];

// ── Sub-components ────────────────────────────────────────

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <span className="text-accent-green font-mono text-sm">{number}</span>
      <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
      <div className="flex-1 h-px bg-border-subtle ml-4" />
    </div>
  );
}

function TechBadge({ name }: { name: string }) {
  const color = STACK_COLORS[name] ?? "#888888";
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded border text-text-primary"
      style={{
        backgroundColor: `${color}1a`,
        borderColor: `${color}4d`,
        color,
      }}
    >
      {name}
    </span>
  );
}

function CategoryBadge({ name }: { name: string }) {
  const color = STACK_COLORS[name] ?? "#888888";
  return (
    <span
      className="font-mono text-xs px-2 py-0.5 rounded border"
      style={{
        backgroundColor: `${color}1a`,
        borderColor: `${color}4d`,
        color,
      }}
    >
      {name}
    </span>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function HomePage() {
  const typewriter = useTypewriter();

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="min-h-[85vh] flex items-center py-20">
        <div className="w-full">

          {/* Status badge */}
          <div className="inline-flex items-center gap-2 bg-accent-dim border border-accent-green/20 rounded-full px-3 py-1 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            <span className="text-accent-green text-sm font-mono">Open to opportunities</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-text-primary">
            Warad Hussain
          </h1>

          {/* Typewriter */}
          <div className="mt-3 h-10 flex items-center">
            <span className="text-accent-green font-mono text-2xl">
              {typewriter}
              <span className="animate-pulse border-r-2 border-accent-green ml-0.5 inline-block h-6 align-middle" />
            </span>
          </div>

          {/* Bio */}
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl mt-4">
            I build production-grade Python backends and AI systems. Specialized
            in RAG pipelines, FastAPI microservices, and LangChain agents.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 mt-8 flex-wrap">
            <Link
              href="/projects"
              className="bg-accent-green text-bg-primary px-6 py-3 rounded-lg font-semibold hover:bg-accent-green/90 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="border border-border-glass text-text-primary px-6 py-3 rounded-lg hover:border-accent-green/40 transition-colors"
            >
              Read Blog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Projects ─────────────────────────────── */}
      <section className="py-20">
        <SectionHeader number="01." title="Projects" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="group bg-bg-glass border border-border-glass backdrop-blur-md rounded-xl p-6 hover:border-accent-green/20 hover:bg-white/[0.06] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <CategoryBadge name={project.category} />
                <span className="text-accent-green text-lg">↗</span>
              </div>
              <h3 className="font-semibold text-text-primary mt-3">
                {project.title}
              </h3>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                {project.desc}
              </p>
              <div className="flex gap-1.5 flex-wrap mt-4">
                {project.stack.map((tech) => (
                  <TechBadge key={tech} name={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Currently Building ────────────────────────────── */}
      <section className="py-10">
        <div className="inline-flex items-center gap-3 bg-bg-glass border border-border-glass rounded-full px-4 py-2">
          <span className="text-accent-green font-mono text-sm">▸ currently building</span>
          <span className="text-text-secondary text-sm">waradhussain.com — engineering portfolio</span>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────── */}
      <section className="py-20">
        <SectionHeader number="02." title="Stack" />
        <div className="flex flex-wrap gap-3">
          {TECH_STACK.map((tech) => {
            const color = STACK_COLORS[tech] ?? "#888888";
            return (
              <div
                key={tech}
                className="bg-bg-glass border border-border-glass rounded-lg px-4 py-2 flex items-center gap-2"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm font-mono text-text-primary">{tech}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Latest Post ───────────────────────────────────── */}
      <section className="py-20">
        <SectionHeader number="03." title="Latest Post" />
        <Link
          href="/"
          className="group bg-bg-glass border border-border-glass backdrop-blur-md rounded-xl p-6 flex justify-between items-center hover:border-accent-green/20 hover:bg-white/[0.06] transition-all duration-300"
        >
          <div className="flex-1 min-w-0 pr-6">
            <span className="font-mono text-xs text-accent-green bg-accent-dim border border-accent-green/20 px-2 py-0.5 rounded">
              AI
            </span>
            <p className="text-base font-semibold text-text-primary mt-2">
              RAG Chunking Strategies That Actually Work
            </p>
            <p className="text-sm text-text-secondary mt-1 truncate">
              How chunk size, overlap, and embedding model choice affects retrieval quality in production RAG systems.
            </p>
          </div>
          <span className="text-accent-green text-xl flex-shrink-0">→</span>
        </Link>
      </section>

      {/* ── Contact Strip ─────────────────────────────────── */}
      <section className="py-20 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="font-semibold text-text-primary">Get in touch</p>
            <p className="text-text-muted text-sm font-mono mt-1">
              contactwithwarad@gmail.com
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="https://github.com/WaradHussain"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-subtle text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-green hover:text-accent-green transition-all"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/waradhussain"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-border-subtle text-text-secondary px-4 py-2 rounded-lg text-sm hover:border-accent-green hover:text-accent-green transition-all"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
