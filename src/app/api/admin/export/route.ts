import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

function toCSV(headers: string[], rows: string[][]): string {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [
    headers.map(escape).join(","),
    ...rows.map((row) => row.map(escape).join(",")),
  ].join("\n");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type") ?? "providers";

  if (type === "leads") {
    const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
    const csv = toCSV(
      ["ID", "Name", "Email", "Phone", "Category", "Message", "Budget", "Status", "Created"],
      leads.map((l) => [
        l.id,
        l.name,
        l.email,
        l.phone ?? "",
        l.categorySlug ?? "",
        l.message,
        l.budget ?? "",
        l.status,
        l.createdAt.toISOString(),
      ])
    );
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="colibri-leads.csv"',
      },
    });
  }

  // providers
  const providers = await prisma.provider.findMany({
    orderBy: { createdAt: "desc" },
    include: { services: true },
  });
  const csv = toCSV(
    [
      "ID",
      "Full Name",
      "Business",
      "Category",
      "City",
      "Region",
      "Languages",
      "Email",
      "Phone",
      "Status",
      "Services Count",
      "Created",
    ],
    providers.map((p) => [
      p.id,
      p.fullName,
      p.businessName ?? "",
      p.primaryCategory,
      p.city,
      p.region,
      p.languages,
      p.contactEmail,
      p.contactPhone ?? "",
      p.status,
      String(p.services.length),
      p.createdAt.toISOString(),
    ])
  );
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": 'attachment; filename="colibri-providers.csv"',
    },
  });
}
