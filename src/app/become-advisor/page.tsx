import type { Metadata } from "next";
import { Users, Star, Calendar, Shield } from "lucide-react";
import AdvisorApplicationForm from "./AdvisorApplicationForm";
import { CATEGORIES, SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Become an Advisor",
  description: `Join the ${SITE.displayName} network. Reach US clients and get coordinated bookings while keeping your independence.`,
};

const BENEFITS = [
  {
    icon: Users,
    title: "Access vetted US clients",
    body: "Colibri connects you with pre-qualified US clients who are actively looking for quality Colombian providers.",
  },
  {
    icon: Calendar,
    title: "Coordinated bookings",
    body: "We handle the logistics, language, and client prep — you show up for the appointment. No cold leads.",
  },
  {
    icon: Star,
    title: "Build your reputation",
    body: "Earn the 'Verified by Colibrí' badge and stand out in a growing marketplace of US-facing Colombian providers.",
  },
  {
    icon: Shield,
    title: "Keep your independence",
    body: "You remain an independent provider. You set your prices, you keep your clients. Colibri coordinates, not controls.",
  },
];

export default function BecomeAdvisorPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Join the Colibrí network
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Reach US clients who are ready to pay for quality Colombian services — and let
            us handle the coordination while you focus on what you do best.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink text-center mb-10">
            Why join Colibrí?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((b) => {
              const Icon = b.icon;
              return (
                <div key={b.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-deep/10 flex items-center justify-center mx-auto mb-4">
                    <Icon size={24} className="text-emerald-deep" />
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{b.title}</h3>
                  <p className="text-sm text-ink/60 leading-relaxed">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-16 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink">Apply to join</h2>
            <p className="mt-3 text-ink/60">
              Applications are reviewed by our team. We&apos;ll be in touch within 3–5 business days.
            </p>
          </div>
          <AdvisorApplicationForm categories={[...CATEGORIES]} />
        </div>
      </section>
    </div>
  );
}
