import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/config";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Services",
  description: `Browse all service categories available through ${SITE.displayName}. Health, wellness, experiences, personal services, and more.`,
};

async function getCategoryCounts() {
  const counts: Record<string, number> = {};
  const results = await prisma.provider.groupBy({
    by: ["primaryCategory"],
    where: { status: "verified" },
    _count: { _all: true },
  });
  for (const r of results) {
    counts[r.primaryCategory] = r._count._all;
  }
  return counts;
}

export default async function ServicesPage() {
  const counts = await getCategoryCounts();

  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">All services</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Every category connects you with verified Colombian providers. One Colibri
            contact coordinates the whole experience.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => {
              const count = counts[cat.slug] ?? 0;
              return (
                <Link
                  key={cat.slug}
                  href={`/services/${cat.slug}`}
                  className="group bg-white rounded-2xl p-7 border border-sand shadow-sm hover:border-emerald-brand/30 hover:shadow-md transition-all hover:-translate-y-1"
                >
                  <div className="text-4xl mb-4">{cat.icon}</div>
                  <h2 className="text-xl font-bold text-ink mb-2 group-hover:text-emerald-deep">
                    {cat.name}
                  </h2>
                  <p className="text-sm text-ink/60 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                  <div className="flex items-center justify-between">
                    {count > 0 ? (
                      <span className="text-xs text-emerald-brand font-medium">
                        {count} verified provider{count !== 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-xs text-ink/40">Providers being added</span>
                    )}
                    <ArrowRight
                      size={16}
                      className="text-emerald-brand opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-emerald-deep text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Not sure which category fits?</h2>
        <p className="text-white/70 mb-8">
          Tell us what you need and we&apos;ll guide you to the right provider.
        </p>
        <Link
          href="/contact"
          className="inline-flex bg-gold text-ink font-semibold px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
        >
          Book a free consult
        </Link>
      </section>
    </div>
  );
}
