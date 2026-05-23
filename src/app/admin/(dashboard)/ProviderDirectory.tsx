"use client";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Filter } from "lucide-react";
import { useCallback } from "react";

interface Provider {
  id: string;
  fullName: string;
  businessName: string | null;
  primaryCategory: string;
  city: string;
  region: string;
  languages: string;
  contactEmail: string;
  status: string;
  servicesCount: number;
  createdAt: Date;
}

interface Category {
  slug: string;
  name: string;
}

interface Props {
  providers: Provider[];
  params: { status?: string; category?: string; q?: string; sort?: string };
  categories: Category[];
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  verified: "bg-emerald-100 text-emerald-700",
  flagged: "bg-red-100 text-red-600",
};

export default function ProviderDirectory({ providers, params, categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const updateParam = useCallback(
    (key: string, value: string) => {
      const sp = new URLSearchParams();
      if (params.q) sp.set("q", params.q);
      if (params.status) sp.set("status", params.status);
      if (params.category) sp.set("category", params.category);
      if (params.sort) sp.set("sort", params.sort);
      if (value) sp.set(key, value);
      else sp.delete(key);
      router.push(`${pathname}?${sp.toString()}`);
    },
    [router, pathname, params]
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Filters */}
      <div className="p-4 border-b border-gray-100 flex flex-wrap gap-3 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
          <input
            type="text"
            defaultValue={params.q}
            placeholder="Search name, email, city…"
            className="w-full pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-emerald-brand bg-gray-50"
            onKeyDown={(e) => {
              if (e.key === "Enter") updateParam("q", (e.target as HTMLInputElement).value);
            }}
            onBlur={(e) => updateParam("q", e.target.value)}
          />
        </div>

        {/* Status filter */}
        <select
          value={params.status ?? ""}
          onChange={(e) => updateParam("status", e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-emerald-brand"
        >
          <option value="">All statuses</option>
          <option value="pending">Pending</option>
          <option value="verified">Verified</option>
          <option value="flagged">Flagged</option>
        </select>

        {/* Category filter */}
        <select
          value={params.category ?? ""}
          onChange={(e) => updateParam("category", e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-emerald-brand"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={params.sort ?? ""}
          onChange={(e) => updateParam("sort", e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 focus:outline-none focus:border-emerald-brand"
        >
          <option value="">Newest first</option>
          <option value="name">Name A–Z</option>
          <option value="category">Category</option>
        </select>

        <span className="text-xs text-ink/40 ml-auto whitespace-nowrap">
          {providers.length} result{providers.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Location</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Services</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">Joined</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {providers.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-12 text-center text-ink/40 text-sm">
                  No providers found. Adjust your filters or{" "}
                  <Link href="/become-advisor" className="text-emerald-brand hover:underline">
                    add one
                  </Link>
                  .
                </td>
              </tr>
            ) : (
              providers.map((p) => {
                const langs: string[] = JSON.parse(p.languages || "[]");
                return (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-ink">{p.fullName}</p>
                      {p.businessName && (
                        <p className="text-xs text-ink/50">{p.businessName}</p>
                      )}
                      <p className="text-xs text-ink/40">{p.contactEmail}</p>
                    </td>
                    <td className="px-4 py-3 text-ink/70">{p.primaryCategory}</td>
                    <td className="px-4 py-3 text-ink/70">
                      {p.city}
                      {p.region ? `, ${p.region}` : ""}
                      {langs.length > 0 && (
                        <p className="text-xs text-ink/40">{langs.join(" · ")}</p>
                      )}
                    </td>
                    <td className="px-4 py-3 text-ink/70 text-center">{p.servicesCount}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                          STATUS_COLORS[p.status] ?? "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-ink/40 text-xs whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <Link
                        href={`/admin/providers/${p.id}`}
                        className="text-xs text-emerald-brand hover:underline whitespace-nowrap"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
