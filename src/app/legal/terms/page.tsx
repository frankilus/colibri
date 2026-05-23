import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="pt-20 bg-cream min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-ink mb-2">Terms of Service</h1>
        <p className="text-ink/50 text-sm mb-8">Last updated: {new Date().getFullYear()}</p>
        <div className="prose prose-sm max-w-none text-ink/70 space-y-6">
          <p>
            By using the Colibrí platform, you agree to the following terms. Please read
            them carefully.
          </p>
          <h2 className="text-lg font-bold text-ink">Nature of service</h2>
          <p>
            Colibrí is an independent connection, vetting, and concierge service. We are
            not a provider of medical, dental, legal, financial, or other professional
            services and do not deliver or guarantee those services. All professional
            services are performed by independent providers.
          </p>
          <h2 className="text-lg font-bold text-ink">Provider relationships</h2>
          <p>
            Providers listed on Colibrí are independent contractors, not employees or
            agents of Colibrí. Colibrí is not a party to any contract between a client
            and a provider. You contract with and pay providers directly.
          </p>
          <h2 className="text-lg font-bold text-ink">Verification</h2>
          <p>
            The &quot;Verified by Colibrí&quot; badge reflects our screening process at
            the time of listing. It is not a guarantee of outcomes, safety, or
            professional standards. Independent professional advice should always be sought
            for medical, dental, legal, or financial decisions.
          </p>
          <h2 className="text-lg font-bold text-ink">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, Colibrí is not liable for any
            outcomes, losses, or damages arising from your use of a provider&apos;s
            services.
          </p>
          <p className="text-xs text-ink/40 border-t border-sand pt-4">
            This is a placeholder Terms of Service. A qualified legal professional should
            review and finalise this document before any public deployment.
          </p>
        </div>
      </div>
    </div>
  );
}
