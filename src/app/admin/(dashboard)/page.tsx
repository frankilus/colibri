import type { Metadata } from "next";
import Link from "next/link";
import { Users, Clock, ShieldCheck, Flag, Briefcase, MessageSquare } from "lucide-react";
import prisma from "@/lib/prisma";
import { CATEGORIES } from "@/lib/config";
import ProviderDirectory from "./ProviderDirectory";

export const metadata: Metadata = { title: "Dashboard" };

async function getStats() {
  const [total, pending, verified, flagged, services, leads] = await Promise.all([
    prisma.provider.count(),
    prisma.provider.count({ where: { status: "pending" } }),
    prisma.provider.count({ where: { status: "verified" } }),
    prisma.provider.count({ where: { status: "flagged" } }),
    prisma.service.count(),
    prisma.lead.count({ where: { status: "new" } }),
  ]);

  const byCategoryRaw = await prisma.provider.groupBy({
    by: ["primaryCategory"],
    _count: { _all: true },
  });
  const byCategory = Object.fromEntries(
    byCategoryRaw.map((r) => [r.primaryCategory, r._count._all])
  );

  return { total, pending, verified, flagged, services, leads, byCategory };
}

async function getProviders(
  status?: string,
  category?: string,
  q?: string,
  sort?: string
) {
  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (category) where.primaryCategory = category;
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { businessName: { contains: q } },
      { city: { contains: q } },
      { contactEmail: { contains: q } },
    ];
  }

  const orderBy =
    sort === "name"
      ? { fullName: "asc" as const }
      : sort === "category"
      ? { primaryCategory: "asc" as const }
      : { createdAt: "desc" as const };

  return prisma.provider.findMany({
    where,
    orderBy,
    include: { services: { select: { id: true } } },
  });
}

interface Props {
  searchParams: Promise<{
    status?: string;
    category?: string;
    q?: string;
    sort?: string;
  }>;
}

export default async function AdminDashboard({ searchParams }: Props) {
  const params = await searchParams;
  const [stats, providers] = await Promise.all([
    getStats(),
    getProviders(params.status, params.category, params.q, params.sort),
  ]);

  const STAT_CARDS = [
    { label: "Total providers", value: stats.total, icon: Users, color: "text-ink" },
    { label: "Pending review", value: stats.pending, icon: Clock, color: "text-amber-500" },
    { label: "Verified", value: stats.verified, icon: ShieldCheck, color: "text-emerald-brand" },
    { label: "Flagged", value: stats.flagged, icon: Flag, color: "text-red-500" },
    { label: "Total services", value: stats.services, icon: Briefcase, color: "text-violet" },
    { label: "New leads", value: stats.leads, icon: MessageSquare, color: "text-cyan" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div>
        <h1 className="text-2xl font-bold text-ink mb-5">Dashboard</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {STAT_CARDS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <Icon size={18} className={`${s.color} mb-2`} />
                <p className="text-2xl font-bold text-ink">{s.value}</p>
                <p className="text-xs text-ink/50 mt-0.5">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* By category */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h2 className="font-semibold text-ink mb-4 text-sm">Providers by category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.slug} className="flex items-center gap-2 text-sm">
              <span>{cat.icon}</span>
              <span className="text-ink/70 flex-1 truncate">{cat.name}</span>
              <span className="font-semibold text-ink">{stats.byCategory[cat.slug] ?? 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Provider directory */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-ink">Provider directory</h2>
          <div className="flex gap-2">
            <a
              href="/api/admin/export?type=providers"
              className="text-xs border border-gray-300 text-ink/70 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Export CSV
            </a>
          </div>
        </div>
        <ProviderDirectory
          providers={providers.map((p) => ({
            ...p,
            servicesCount: p.services.length,
          }))}
          params={params}
          categories={[...CATEGORIES]}
        />
      </div>
    </div>
  );
}
