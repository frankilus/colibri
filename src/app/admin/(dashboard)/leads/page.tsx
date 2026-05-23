import type { Metadata } from "next";
import prisma from "@/lib/prisma";
import LeadsTable from "./LeadsTable";

export const metadata: Metadata = { title: "Leads" };

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Client leads</h1>
        <a
          href="/api/admin/export?type=leads"
          className="text-xs border border-gray-300 text-ink/70 px-3 py-1.5 rounded-lg hover:bg-gray-50"
        >
          Export CSV
        </a>
      </div>
      <LeadsTable leads={leads} />
    </div>
  );
}
