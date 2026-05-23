import Link from "next/link";

export default function DualCTA() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Client CTA */}
          <div className="bg-emerald-deep rounded-2xl p-8 text-white">
            <span className="text-gold text-xs font-bold uppercase tracking-widest">
              For clients
            </span>
            <h2 className="mt-2 text-2xl font-bold leading-snug">
              Need something done in Colombia?
            </h2>
            <p className="mt-3 text-white/70 text-sm leading-relaxed">
              Dental work, a wellness retreat, a curated experience — tell us what you need
              and we&apos;ll match you with a vetted provider and handle everything.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex bg-gold text-ink font-semibold px-5 py-3 rounded-xl hover:bg-gold/90 transition-colors text-sm"
            >
              Book a free consult
            </Link>
          </div>

          {/* Provider CTA */}
          <div className="bg-white border-2 border-sand rounded-2xl p-8 text-ink">
            <span className="text-emerald-brand text-xs font-bold uppercase tracking-widest">
              For providers
            </span>
            <h2 className="mt-2 text-2xl font-bold text-ink leading-snug">
              Offer your services to US clients
            </h2>
            <p className="mt-3 text-ink/60 text-sm leading-relaxed">
              Join the Colibri network. Reach vetted US clients who are actively looking
              for quality Colombian providers. Keep your independence — we handle the
              logistics and introductions.
            </p>
            <Link
              href="/become-advisor"
              className="mt-6 inline-flex border-2 border-emerald-deep text-emerald-deep font-semibold px-5 py-3 rounded-xl hover:bg-emerald-deep hover:text-white transition-colors text-sm"
            >
              Become an advisor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
