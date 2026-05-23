import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { CATEGORIES, SITE } from "@/lib/config";
import prisma from "@/lib/prisma";
import VerifiedBadge from "@/components/ui/VerifiedBadge";

interface Props {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: `${cat.description} — verified providers through ${SITE.displayName}.`,
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const providers = await prisma.provider.findMany({
    where: { primaryCategory: category, status: "verified" },
    include: { services: { where: { categorySlug: category }, take: 3 } },
    orderBy: { createdAt: "asc" },
  });

  // Special content for health-dental
  const isDental = category === "health-dental";

  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl" aria-hidden="true">
              {cat.icon}
            </span>
            <span className="text-white/60 text-sm">Services</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{cat.name}</h1>
          <p className="text-white/70 max-w-xl text-lg">{cat.description}</p>
        </div>
      </section>

      {/* Dental-specific callout */}
      {isDental && (
        <section className="bg-gold/10 border-b border-gold/30 py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap gap-6 text-sm text-ink/70">
              <div>
                <span className="font-semibold text-ink">Dental implants</span> — from
                ~$900 per implant vs $3,000–5,000 in the US
              </div>
              <div>
                <span className="font-semibold text-ink">All-on-4</span> — from ~$8,000
                vs $25,000+ in the US
              </div>
              <div>
                <span className="font-semibold text-ink">Smile makeovers</span> — veneers,
                whitening, full arches
              </div>
              <div>
                <span className="font-semibold text-ink">General care</span> — preventive,
                restorative, orthodontics
              </div>
            </div>
            <p className="text-xs text-ink/40 mt-3">
              All clinics are independent licensed providers. Prices are illustrative and
              vary by case.
            </p>
          </div>
        </section>
      )}

      {/* Providers */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {providers.length > 0 ? (
            <>
              <h2 className="text-2xl font-bold text-ink mb-8">
                Verified providers · {cat.name}
              </h2>
              <div className="space-y-6">
                {providers.map((p) => {
                  const langs: string[] = JSON.parse(p.languages || "[]");
                  return (
                    <div
                      key={p.id}
                      className="bg-white rounded-2xl p-6 border border-sand shadow-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <h3 className="font-bold text-lg text-ink">
                              {p.businessName || p.fullName}
                            </h3>
                            <VerifiedBadge />
                          </div>
                          <div className="flex items-center gap-3 text-sm text-ink/60 flex-wrap">
                            <span className="flex items-center gap-1">
                              <MapPin size={13} />
                              {p.city}, {p.region}
                            </span>
                            {p.yearsExperience > 0 && (
                              <span className="flex items-center gap-1">
                                <Clock size={13} />
                                {p.yearsExperience}+ years
                              </span>
                            )}
                            {langs.length > 0 && (
                              <span>🌐 {langs.join(" · ")}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-sm text-ink/70 leading-relaxed mb-4 line-clamp-3">
                        {p.bio}
                      </p>

                      {p.services.length > 0 && (
                        <div className="border-t border-sand/70 pt-4">
                          <h4 className="text-xs font-semibold text-ink/50 uppercase tracking-wider mb-3">
                            Sample services
                          </h4>
                          <div className="grid sm:grid-cols-3 gap-3">
                            {p.services.map((s) => (
                              <div
                                key={s.id}
                                className="bg-cream rounded-xl p-3 text-sm"
                              >
                                <p className="font-medium text-ink mb-1">{s.title}</p>
                                <p className="text-ink/50 text-xs mb-1 line-clamp-2">
                                  {s.description}
                                </p>
                                <span className="flex items-center gap-0.5 text-emerald-brand text-xs font-medium">
                                  <DollarSign size={11} />
                                  {s.priceRange}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-4xl mb-4">{cat.icon}</p>
              <h2 className="text-2xl font-bold text-ink mb-3">
                Providers coming soon
              </h2>
              <p className="text-ink/60 max-w-md mx-auto mb-8">
                We&apos;re actively vetting providers for this category. Tell us what you
                need and we&apos;ll personally find a match for you.
              </p>
              <Link
                href="/contact"
                className="inline-flex bg-emerald-deep text-white font-semibold px-6 py-3 rounded-xl hover:bg-emerald-deep/90 transition-colors"
              >
                Request this service
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Request CTA */}
      {providers.length > 0 && (
        <section className="py-14 bg-emerald-deep text-white text-center">
          <h2 className="text-2xl font-bold mb-3">
            Ready to connect with a {cat.name.toLowerCase()} provider?
          </h2>
          <p className="text-white/70 mb-7 text-sm max-w-xl mx-auto">
            Book a free consultation and we&apos;ll match you with the right vetted
            provider for your specific needs.
          </p>
          <Link
            href={`/contact?category=${cat.slug}`}
            className="inline-flex bg-gold text-ink font-semibold px-7 py-3.5 rounded-xl hover:bg-gold/90 transition-colors"
          >
            Request {cat.name}
          </Link>
        </section>
      )}
    </div>
  );
}
