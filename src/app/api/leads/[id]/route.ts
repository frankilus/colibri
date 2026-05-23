import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { status } = await req.json();
  const allowed = ["new", "contacted", "closed"];
  if (!allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }
  const updated = await prisma.lead.update({ where: { id }, data: { status } });
  return NextResponse.json(updated);
}
