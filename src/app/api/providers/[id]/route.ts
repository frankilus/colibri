import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: { services: true },
  });
  if (!provider) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(provider);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const { status, internalNotes } = body;

  const allowed = ["pending", "verified", "flagged"];
  if (status && !allowed.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const updated = await prisma.provider.update({
    where: { id },
    data: {
      ...(status ? { status } : {}),
      ...(internalNotes !== undefined ? { internalNotes } : {}),
    },
  });

  return NextResponse.json(updated);
}
