import { ShieldCheck, Users, DollarSign, PhoneCall, Star } from "lucide-react";
import { TRUST_POINTS } from "@/lib/config";

const ICONS = [ShieldCheck, Users, DollarSign, DollarSign, PhoneCall];

export default function TrustSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left — headline */}
          <div>
            <span className="text-emerald-brand text-sm font-semibold uppercase tracking-wider">
              Why Colibri
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink leading-tight">
              We sell the removal of risk —{" "}
              <span className="text-emerald-deep">not a list of contacts.</span>
            </h2>
            <p className="mt-5 text-ink/60 leading-relaxed">
              Finding a provider in Colombia online is easy. Finding one you can{" "}
              <em>trust</em> — who has been verified, who speaks your language, and who
              won&apos;t leave you stranded if something goes wrong — that&apos;s what
              Colibri is for.
            </p>
            <div className="mt-8 p-5 bg-cream rounded-2xl border border-sand">
              <div className="flex items-start gap-3">
                <Star className="text-gold mt-0.5 shrink-0" size={20} fill="currentColor" />
                <div>
                  <p className="font-semibold text-ink text-sm">
                    &ldquo;I saved over $14,000 on dental work and had a dedicated contact
                    every step of the way. I&apos;d never have done it alone.&rdquo;
                  </p>
                  <p className="text-ink/50 text-xs mt-1">— Sample client, Miami FL</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — trust points */}
          <div className="space-y-5">
            {TRUST_POINTS.map((point, i) => {
              const Icon = ICONS[i] ?? ShieldCheck;
              return (
                <div key={point.title} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-deep/10 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-emerald-deep" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{point.title}</h3>
                    <p className="text-ink/60 text-sm mt-1 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
