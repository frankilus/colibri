"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import HummingbirdLogo from "@/components/ui/HummingbirdLogo";

const NAV = [
  { label: "Providers", href: "/admin" },
  { label: "Services", href: "/admin/services" },
  { label: "Leads", href: "/admin/leads" },
];

export default function AdminNav() {
  const path = usePathname();

  const logout = async () => {
    await fetch("/admin/api/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <header className="bg-emerald-deep text-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-2">
            <HummingbirdLogo size={28} variant="white" animated={false} />
            <span className="font-bold text-sm">Colibrí Admin</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-1">
            {NAV.map((n) => {
              const active = path === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    active ? "bg-white/20 text-white font-medium" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            className="text-white/60 hover:text-white text-xs"
          >
            View site ↗
          </a>
          <button
            onClick={logout}
            className="text-white/60 hover:text-white text-xs border border-white/20 px-3 py-1.5 rounded-lg"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}
