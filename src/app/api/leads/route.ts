import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, categorySlug, message, budget, consent } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }
    if (!consent) {
      return NextResponse.json(
        { error: "You must agree to the privacy policy." },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        categorySlug: categorySlug || null,
        message: message.trim(),
        budget: budget?.trim() || null,
        status: "new",
      },
    });

    return NextResponse.json({ success: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("Lead creation error:", err);
    return NextResponse.json({ error: "Failed to submit request." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const where = status ? { status } : {};
  const leads = await prisma.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { category: { select: { name: true } } },
  });
  return NextResponse.json(leads);
}
