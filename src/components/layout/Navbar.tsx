"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import HummingbirdLogo from "@/components/ui/HummingbirdLogo";
import { SITE, CATEGORIES } from "@/lib/config";

const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome ? "bg-emerald-deep/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Colibri home">
          <HummingbirdLogo size={36} variant="white" animated={false} />
          <span className="text-white font-bold text-xl tracking-tight">
            {SITE.displayName}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {NAV_LINKS.map((link) =>
            link.hasDropdown ? (
              <li key={link.href} className="relative group">
                <button
                  className="flex items-center gap-1 text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                  onClick={() => setServicesOpen((v) => !v)}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                >
                  {link.label}
                  <ChevronDown size={14} />
                </button>
                {/* Dropdown */}
                <div
                  className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-sand py-2 transition-all duration-200 ${
                    servicesOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <Link
                    href="/services"
                    className="block px-4 py-2 text-sm font-semibold text-ink hover:bg-cream"
                    onClick={() => setServicesOpen(false)}
                  >
                    All Services
                  </Link>
                  <hr className="my-1 border-sand" />
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/services/${cat.slug}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-ink hover:bg-cream"
                      onClick={() => setServicesOpen(false)}
                    >
                      <span>{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-white/90 hover:text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
        </ul>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/become-advisor"
            className="text-white/80 hover:text-white text-sm font-medium transition-colors"
          >
            Become an Advisor
          </Link>
          <Link
            href="/contact"
            className="bg-gold text-ink px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gold/90 transition-colors"
          >
            Book free consult
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-emerald-deep/98 backdrop-blur-md transition-all duration-300 overflow-hidden ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-white/90 hover:text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-white/10"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/services/${cat.slug}`}
              className="flex items-center gap-2 text-white/70 hover:text-white px-3 py-2 rounded-lg text-sm"
              onClick={() => setOpen(false)}
            >
              <span>{cat.icon}</span>
              {cat.name}
            </Link>
          ))}
          <hr className="border-white/10 my-2" />
          <Link
            href="/become-advisor"
            className="block text-white/80 hover:text-white px-3 py-2.5 text-sm font-medium"
            onClick={() => setOpen(false)}
          >
            Become an Advisor
          </Link>
          <Link
            href="/contact"
            className="block bg-gold text-ink px-4 py-2.5 rounded-lg text-sm font-semibold text-center mt-2"
            onClick={() => setOpen(false)}
          >
            Book free consult
          </Link>
        </div>
      </div>
    </header>
  );
}
