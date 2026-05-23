import Link from "next/link";
import { Check } from "lucide-react";
import { PRICING_TIERS } from "@/lib/config";

interface Props {
  compact?: boolean;
}

export default function PricingCards({ compact = false }: Props) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${compact ? "" : "max-w-5xl mx-auto"}`}>
      {PRICING_TIERS.map((tier) => (
        <div
          key={tier.name}
          className={`relative flex flex-col rounded-2xl border-2 p-7 transition-shadow ${
            tier.highlighted
              ? "border-emerald-brand bg-emerald-deep text-white shadow-2xl shadow-emerald-deep/30 scale-105"
              : "border-sand bg-white text-ink shadow-sm hover:shadow-md"
          }`}
        >
          {tier.highlighted && "badge" in tier && (
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gold text-ink text-xs font-bold px-3 py-1 rounded-full">
              {tier.badge}
            </span>
          )}

          <div className="mb-6">
            <h3
              className={`text-xl font-bold mb-1 ${
                tier.highlighted ? "text-white" : "text-ink"
              }`}
            >
              {tier.name}
            </h3>
            <p
              className={`text-3xl font-bold mb-2 ${
                tier.highlighted ? "text-gold" : "text-emerald-deep"
              }`}
            >
              {tier.price}
            </p>
            <p className={`text-sm leading-relaxed ${tier.highlighted ? "text-white/70" : "text-ink/60"}`}>
              {tier.description}
            </p>
          </div>

          <ul className="space-y-2.5 flex-1 mb-6">
            {tier.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2.5">
                <Check
                  size={16}
                  className={`mt-0.5 shrink-0 ${
                    tier.highlighted ? "text-gold" : "text-emerald-brand"
                  }`}
                />
                <span className={`text-sm ${tier.highlighted ? "text-white/80" : "text-ink/70"}`}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/contact"
            className={`w-full text-center py-3 rounded-xl font-semibold text-sm transition-all hover:scale-105 ${
              tier.highlighted
                ? "bg-gold text-ink hover:bg-gold/90 shadow-lg shadow-gold/20"
                : "border-2 border-emerald-deep text-emerald-deep hover:bg-emerald-deep hover:text-white"
            }`}
          >
            {tier.cta}
          </Link>
        </div>
      ))}
    </div>
  );
}
