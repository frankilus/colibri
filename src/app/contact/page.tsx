import type { Metadata } from "next";
import ContactForm from "./ContactForm";
import { SITE, CATEGORIES } from "@/lib/config";

export const metadata: Metadata = {
  title: "Request a Service",
  description: `Book a free consultation with ${SITE.displayName}. Tell us what you need in Colombia and we'll match you with a vetted provider.`,
};

export default function ContactPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <span className="text-emerald-brand text-sm font-semibold uppercase tracking-wider">
            Free consultation
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Tell us what you need
          </h1>
          <p className="mt-4 text-ink/60 max-w-xl mx-auto">
            No pressure, no commitment. Tell us about your goals and we&apos;ll respond
            within one business day with matched, vetted options.
          </p>
        </div>
        <ContactForm categories={[...CATEGORIES]} />
      </div>
    </div>
  );
}
