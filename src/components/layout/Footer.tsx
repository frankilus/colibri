import Link from "next/link";
import HummingbirdLogo from "@/components/ui/HummingbirdLogo";
import { SITE, CATEGORIES, LEGAL_DISCLAIMER } from "@/lib/config";

const FOOTER_LINKS = {
  Services: CATEGORIES.map((c) => ({
    label: c.name,
    href: `/services/${c.slug}`,
  })),
  Company: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "About & Trust", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Become an Advisor", href: "/become-advisor" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/legal/privacy" },
    { label: "Terms of Service", href: "/legal/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-ink text-white/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <HummingbirdLogo size={36} variant="white" animated={false} />
              <span className="text-white font-bold text-xl">{SITE.displayName}</span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-xs mb-4">
              {SITE.tagline} Colibri connects you with a vetted network of
              trustworthy Colombian providers, end to end.
            </p>
            <div className="flex gap-3">
              <a
                href={SITE.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                Instagram
              </a>
              <a
                href={SITE.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors text-sm"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {group}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-white/40 leading-relaxed max-w-4xl mb-4">
            {LEGAL_DISCLAIMER}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} Colibrí. All rights reserved.
            </p>
            <p className="text-xs text-white/40">
              {SITE.contactEmail} · {SITE.contactPhone}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
