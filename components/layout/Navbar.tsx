"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  // { href: "/projects", label: "Projects" },
  // { href: "/blog", label: "Blog" },
  // { href: "/certificates", label: "Certificates" },
  // { href: "/roadmap", label: "Roadmap" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 min-h-[56px] flex items-center transition-all duration-300",
          scrolled
            ? "bg-bg-secondary/90 backdrop-blur-md border-b border-border-glass"
            : "bg-transparent",
        ].join(" ")}
      >
        <nav className="w-full max-w-6xl mx-auto px-4 md:px-8 flex items-center justify-between h-14">
          {/* Logo */}
          <Link
            href="/"
            className="font-mono font-bold text-xl text-accent-green tracking-tight hover:opacity-80 transition-opacity"
            aria-label="Warad Hussain — Home"
          >
            WH
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={[
                    "relative px-3 py-1.5 text-sm font-sans transition-colors duration-200",
                    isActive(href)
                      ? "text-accent-green"
                      : "text-text-secondary hover:text-text-primary",
                  ].join(" ")}
                >
                  {label}
                  {isActive(href) && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-accent-green rounded-full" />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <div
        className={[
          "fixed inset-0 z-40 bg-bg-primary flex flex-col items-center justify-center transition-all duration-300 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!menuOpen}
      >
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={[
                  "text-3xl font-sans font-semibold tracking-tight transition-colors duration-200",
                  isActive(href)
                    ? "text-accent-green"
                    : "text-text-primary hover:text-accent-green",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
