import type { Metadata } from "next";
import Link from "next/link";
import { HOW_IT_WORKS, SITE } from "@/lib/config";
import { ShieldCheck, Globe, Clock, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "How It Works",
  description: `Learn how ${SITE.displayName} connects you with vetted Colombian providers and handles every step of the process.`,
};

const FEARS = [
  {
    q: "Is this provider actually legitimate?",
    a: 'Every provider in our network has been personally vetted — we check credentials, licences, references, and reviews before they get the "Verified by Colibrí" badge. We\'ve visited clinics and met with providers in person.',
    icon: ShieldCheck,
  },
  {
    q: "I don't speak Spanish. How will I communicate?",
    a: "Your dedicated Colibri coordinator is fully bilingual and handles all communication with your provider. On Concierge and White-Glove plans, a bilingual ground coordinator is with you throughout your visit.",
    icon: Globe,
  },
  {
    q: "What if something goes wrong while I'm there?",
    a: "Your coordinator stays reachable 24/7 during your trip. We help you navigate any issue — rescheduling, finding alternative providers, navigating the local health system, or getting you home safely.",
    icon: PhoneCall,
  },
  {
    q: "How long does the whole process take?",
    a: "Provider matching takes 48–72 hours. Full trip coordination is best planned 2–4 weeks ahead. We've handled urgent requests on shorter notice — just ask.",
    icon: Clock,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            How Colibrí works
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            From your first message to back home — we handle every step so you can
            focus on results, not logistics.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.step}
                className={`flex flex-col md:flex-row gap-8 items-start ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-2xl bg-emerald-deep/10 border border-emerald-deep/20 flex flex-col items-center justify-center">
                    <span className="text-4xl" aria-hidden="true">
                      {step.icon}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-gold text-ink text-sm font-bold flex items-center justify-center shrink-0">
                      {step.step}
                    </span>
                    <h2 className="text-2xl font-bold text-ink">{step.title}</h2>
                  </div>
                  <p className="text-ink/70 leading-relaxed text-lg">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Addressing fears */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-ink">We hear your concerns</h2>
            <p className="mt-3 text-ink/60">
              These are the real questions we get. Here&apos;s our honest answer.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {FEARS.map((fear) => {
              const Icon = fear.icon;
              return (
                <div
                  key={fear.q}
                  className="bg-white rounded-2xl p-6 border border-sand shadow-sm"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <Icon size={20} className="text-emerald-brand mt-0.5 shrink-0" />
                    <h3 className="font-semibold text-ink">{fear.q}</h3>
                  </div>
                  <p className="text-sm text-ink/60 leading-relaxed pl-8">{fear.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-emerald-deep text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-white/70 mb-8">
            Book a free consultation — no commitment, no pressure.
          </p>
          <Link
            href="/contact"
            className="inline-flex bg-gold text-ink font-semibold px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors text-lg"
          >
            Book my free consult
          </Link>
        </div>
      </section>
    </div>
  );
}
