import type { Metadata } from "next";
import Link from "next/link";
import { Check, X } from "lucide-react";
import PricingCards from "@/components/sections/PricingCards";
import { LEGAL_DISCLAIMER, SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Transparent coordination pricing for ${SITE.displayName}. Choose the level of support that matches your trip.`,
};

const COMPARISON = [
  { feature: "Vetted provider match", connect: true, concierge: true, wg: true },
  { feature: "Credential & review verification", connect: true, concierge: true, wg: true },
  { feature: "Appointment booking", connect: true, concierge: true, wg: true },
  { feature: "Pre-trip video consult", connect: true, concierge: true, wg: true },
  { feature: "Personalised prep guide", connect: true, concierge: true, wg: true },
  { feature: "Airport pickup & drop-off", connect: false, concierge: true, wg: true },
  { feature: "Vetted accommodation", connect: false, concierge: true, wg: true },
  { feature: "Private local transport", connect: false, concierge: true, wg: true },
  { feature: "Bilingual ground coordinator", connect: false, concierge: true, wg: true },
  { feature: "Full itinerary management", connect: false, concierge: true, wg: true },
  { feature: "Coordinator attends appointments", connect: false, concierge: false, wg: true },
  { feature: "Recovery lodging & companion", connect: false, concierge: false, wg: true },
  { feature: "Curated extended stay", connect: false, concierge: false, wg: true },
  { feature: "Aftercare & back-home coordination", connect: false, concierge: false, wg: true },
  { feature: "Priority 24/7 support", connect: false, concierge: false, wg: true },
];

function Tick({ val }: { val: boolean }) {
  return val ? (
    <Check size={18} className="text-emerald-brand mx-auto" />
  ) : (
    <X size={16} className="text-ink/20 mx-auto" />
  );
}

export default function PricingPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Transparent pricing</h1>
          <p className="text-white/70 max-w-xl mx-auto">
            Colibri&apos;s fee covers coordination and concierge. You contract and pay
            providers directly — no hidden markups.
          </p>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <PricingCards />

          <p className="text-center text-xs text-ink/40 mt-6 max-w-xl mx-auto">
            Prices shown are for Colibrí coordination only and are illustrative — final
            quotes depend on scope. Provider fees are separate and paid directly.
          </p>
        </div>
      </section>

      {/* On-demand note */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-ink mb-3">Personal Services (on-demand)</h2>
          <p className="text-ink/60 text-sm leading-relaxed">
            Drivers, interpreters, personal assistants, errands, handymen, and event
            helpers are billed à la carte on a per-task or hourly basis — no tier required.
            Contact us to discuss rates for your specific needs.
          </p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink text-center mb-8">
            Full feature comparison
          </h2>
          <div className="bg-white rounded-2xl border border-sand shadow-sm overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand">
                  <th className="text-left px-6 py-4 text-ink/70 font-medium w-1/2">Feature</th>
                  <th className="px-4 py-4 text-ink font-semibold text-center">Connect</th>
                  <th className="px-4 py-4 text-emerald-deep font-bold text-center bg-emerald-deep/5">
                    Concierge
                  </th>
                  <th className="px-4 py-4 text-ink font-semibold text-center">White-Glove</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={`border-b border-sand/50 ${i % 2 === 0 ? "bg-white" : "bg-cream/40"}`}
                  >
                    <td className="px-6 py-3 text-ink/80">{row.feature}</td>
                    <td className="px-4 py-3 text-center">
                      <Tick val={row.connect} />
                    </td>
                    <td className="px-4 py-3 text-center bg-emerald-deep/5">
                      <Tick val={row.concierge} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Tick val={row.wg} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-ink/40 leading-relaxed text-center">{LEGAL_DISCLAIMER}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-emerald-deep text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Have questions about pricing?</h2>
        <p className="text-white/70 mb-8">
          We&apos;re happy to walk through a custom quote for your specific situation.
        </p>
        <Link
          href="/contact"
          className="inline-flex bg-gold text-ink font-semibold px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
        >
          Talk to us
        </Link>
      </section>
    </div>
  );
}
