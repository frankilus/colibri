import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Users, Globe, Handshake } from "lucide-react";
import { SITE } from "@/lib/config";

export const metadata: Metadata = {
  title: "About & Trust",
  description: `Learn about ${SITE.displayName}'s vetting standards, bilingual team, and commitment to trust.`,
};

const VETTING_STEPS = [
  "Application review — credentials, licences, years of experience",
  "Reference checks — we contact past clients or professional peers",
  "Review audit — we examine online feedback and flag any concerns",
  "Verification call — a bilingual Colibri team member interviews the provider",
  "In-person or video verification for medical/dental providers",
  "Ongoing monitoring — providers are re-reviewed on a rolling basis",
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Vetted, not just listed",
    body: "We personally screen every provider. The 'Verified' badge is earned through our process — it is not a self-declaration or an automated check.",
  },
  {
    icon: Users,
    title: "One accountable human",
    body: "You always have a single bilingual point of contact who owns your experience. No ticket queues, no handoffs to strangers.",
  },
  {
    icon: Globe,
    title: "Bilingual & bicultural",
    body: "Our team bridges US and Colombian culture fluently. We understand what matters to you as a US client and what to look for in a Colombian provider.",
  },
  {
    icon: Handshake,
    title: "Your contract, your relationship",
    body: "You contract directly with and pay providers. Colibri is your coordinator, not a middleman. We have no financial interest in directing you to any specific provider.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      {/* Hero */}
      <section className="gradient-hero text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            A trustworthy bridge to Colombia
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            {SITE.displayName} was built on a simple belief: quality Colombian providers
            exist, but the process of finding and trusting one shouldn&apos;t require
            taking a leap of faith.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-4">Our mission</h2>
          <p className="text-ink/70 leading-relaxed mb-4">
            Colombia has world-class dentists, gifted therapists, exceptional guides, and
            skilled tradespeople — often at a fraction of US prices. But for someone
            unfamiliar with the country, finding a provider you can genuinely trust is
            hard. Language barriers, unfamiliar licensing systems, unreliable online
            reviews, and the sheer distance from home all create friction and fear.
          </p>
          <p className="text-ink/70 leading-relaxed">
            Colibrí removes that friction. We do the vetting, handle the logistics, and
            stay accountable throughout. Our mission is to make accessing Colombian services
            as trustworthy and straightforward as using a service you&apos;ve relied on
            for years at home.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-ink mb-8 text-center">
            What we stand for
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="bg-white rounded-2xl p-6 border border-sand">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-deep/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-emerald-deep" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-ink mb-1">{v.title}</h3>
                      <p className="text-sm text-ink/60 leading-relaxed">{v.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vetting standard */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 mb-8">
            <ShieldCheck size={32} className="text-emerald-brand mt-1 shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-ink mb-1">
                What &quot;Verified by Colibrí&quot; means
              </h2>
              <p className="text-ink/60">
                The Verified badge reflects a specific process, not a rubber stamp.
              </p>
            </div>
          </div>
          <ul className="space-y-3">
            {VETTING_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-ink/70 text-sm leading-relaxed">{step}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs text-ink/40 leading-relaxed">
            Verification reflects Colibrí&apos;s screening process at the time of listing.
            It is not a guarantee of outcomes. Providers are independent contractors.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-emerald-deep text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to experience trusted Colombia?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex bg-gold text-ink font-semibold px-8 py-4 rounded-xl hover:bg-gold/90 transition-colors"
          >
            Book a free consult
          </Link>
          <Link
            href="/become-advisor"
            className="inline-flex border border-white/40 text-white font-medium px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
          >
            Become an advisor
          </Link>
        </div>
      </section>
    </div>
  );
}
