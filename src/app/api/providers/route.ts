import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      businessName,
      primaryCategory,
      subcategories,
      city,
      region,
      languages,
      yearsExperience,
      bio,
      credentials,
      websiteUrl,
      socialLinks,
      contactEmail,
      contactPhone,
      services,
      consent,
    } = body;

    if (!fullName || !primaryCategory || !city || !contactEmail || !bio) {
      return NextResponse.json(
        { error: "Required fields missing." },
        { status: 400 }
      );
    }
    if (!consent) {
      return NextResponse.json(
        { error: "You must agree to the terms." },
        { status: 400 }
      );
    }

    const provider = await prisma.provider.create({
      data: {
        fullName: fullName.trim(),
        businessName: businessName?.trim() || null,
        primaryCategory,
        subcategories: JSON.stringify(subcategories ?? []),
        city: city.trim(),
        region: region?.trim() ?? "",
        languages: JSON.stringify(languages ?? ["Spanish"]),
        yearsExperience: Number(yearsExperience) || 0,
        bio: bio.trim(),
        credentials: credentials?.trim() || null,
        websiteUrl: websiteUrl?.trim() || null,
        socialLinks: socialLinks ? JSON.stringify(socialLinks) : null,
        contactEmail: contactEmail.trim().toLowerCase(),
        contactPhone: contactPhone?.trim() || null,
        status: "pending",
      },
    });

    // Create services if provided
    if (Array.isArray(services) && services.length > 0) {
      await prisma.service.createMany({
        data: services
          .filter((s: Record<string, unknown>) => s.title && s.description)
          .map((s: Record<string, unknown>) => ({
            providerId: provider.id,
            title: String(s.title).trim(),
            categorySlug: String(s.categorySlug || primaryCategory),
            description: String(s.description).trim(),
            priceRange: String(s.priceRange || "Contact for pricing"),
            duration: s.duration ? String(s.duration) : null,
          })),
      });
    }

    return NextResponse.json({ success: true, id: provider.id }, { status: 201 });
  } catch (err) {
    console.error("Provider creation error:", err);
    return NextResponse.json({ error: "Failed to submit application." }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const status = searchParams.get("status");
  const city = searchParams.get("city");
  const q = searchParams.get("q");

  const where: Record<string, unknown> = {};
  if (category) where.primaryCategory = category;
  if (status) where.status = status;
  if (city) where.city = { contains: city };
  if (q) {
    where.OR = [
      { fullName: { contains: q } },
      { businessName: { contains: q } },
      { bio: { contains: q } },
    ];
  }

  const providers = await prisma.provider.findMany({
    where,
    orderBy: { createdAt: "desc" },
    include: { services: true },
  });

  return NextResponse.json(providers);
}
