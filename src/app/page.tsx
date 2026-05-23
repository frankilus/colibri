import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import CategoriesGrid from "@/components/sections/CategoriesGrid";
import HowItWorks from "@/components/sections/HowItWorks";
import TrustSection from "@/components/sections/TrustSection";
import PricingCards from "@/components/sections/PricingCards";
import DualCTA from "@/components/sections/DualCTA";
import FAQ from "@/components/sections/FAQ";
import Link from "next/link";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: `${SITE.displayName} — ${SITE.tagline}`,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesGrid />
      <HowItWorks />
      <TrustSection />

      {/* Pricing preview */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-emerald-brand text-sm font-semibold uppercase tracking-wider">
              Service levels
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
              Choose your level of support
            </h2>
            <p className="mt-4 text-ink/60 max-w-xl mx-auto text-sm">
              On-demand Personal Services are billed à la carte. Coordinated visits use one
              of these tiers. All prices are for Colibri coordination only — provider fees
              are paid directly.
            </p>
          </div>
          <PricingCards />
          <div className="text-center mt-8">
            <Link
              href="/pricing"
              className="text-emerald-brand text-sm font-medium hover:underline"
            >
              See full pricing details →
            </Link>
          </div>
        </div>
      </section>

      <DualCTA />
      <FAQ />
    </>
  );
}
