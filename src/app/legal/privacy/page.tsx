import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-ink mb-2">Privacy Policy</h1>
        <p className="text-ink/50 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>
        <div className="prose prose-sm max-w-none text-ink/70 space-y-6">
          <p>
            <strong>Colibrí</strong> (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates as an
            independent connection, vetting, and concierge service. This Privacy Policy
            explains how we collect, use, and protect your information.
          </p>
          <h2 className="text-lg font-bold text-ink">Information we collect</h2>
          <p>
            We collect information you provide when submitting a service request (name,
            email, phone, service interests) or when applying as a provider (name, business
            details, credentials, contact info). We also collect standard web analytics.
          </p>
          <h2 className="text-lg font-bold text-ink">How we use your information</h2>
          <p>
            We use your information solely to facilitate matching, coordination, and
            communication related to Colibri services. We do not sell your personal
            information to third parties.
          </p>
          <h2 className="text-lg font-bold text-ink">Data security</h2>
          <p>
            We implement reasonable security measures to protect your information. However,
            no transmission over the internet is completely secure.
          </p>
          <h2 className="text-lg font-bold text-ink">Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of your personal
            information by contacting us at hello@colibri.co.
          </p>
          <p className="text-xs text-ink/40 border-t border-sand pt-4">
            This is a placeholder Privacy Policy. A qualified legal professional should
            review and finalise this document before any public deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
