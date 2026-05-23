import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata: Metadata = { title: "Services" };

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      provider: {
        select: { id: true, fullName: true, businessName: true, city: true, status: true },
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">All services</h1>
        <span className="text-sm text-ink/50">{services.length} total</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Service
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Category
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Provider
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Price
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-ink/50 uppercase tracking-wider">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-medium text-ink">{s.title}</p>
                    <p className="text-xs text-ink/50 max-w-xs truncate">{s.description}</p>
                  </td>
                  <td className="px-4 py-3 text-ink/60 text-xs">{s.categorySlug}</td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/providers/${s.provider.id}`}
                      className="text-emerald-brand hover:underline"
                    >
                      {s.provider.businessName || s.provider.fullName}
                    </Link>
                    <p className="text-xs text-ink/40">{s.provider.city}</p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-0.5 text-emerald-deep font-medium text-xs">
                      <DollarSign size={11} />
                      {s.priceRange}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-ink/50 text-xs">{s.duration ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
