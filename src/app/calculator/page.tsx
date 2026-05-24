import type { Metadata } from "next";
import { SITE } from "@/lib/config";
import SavingsCalculator from "./SavingsCalculator";

export const metadata: Metadata = {
  title: "Savings Calculator",
  description: `See how much you could save on dental care and wellness in Colombia vs. staying home. ${SITE.displayName} handles everything.`,
};

export default function CalculatorPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Header */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
            Savings Calculator
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            See your real numbers.
          </h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Select your procedure, choose a tier, and see an estimated all-in cost
            including Colombia clinical fees, Colibrí&apos;s service fee, and typical
            logistics. All figures are estimates — book a free consult for an exact quote.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-10">
        <SavingsCalculator />
      </section>
    </div>
  );
}
