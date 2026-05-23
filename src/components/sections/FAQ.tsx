"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "How do I know the provider is legitimate?",
    a: "Every provider in the Colibri network is personally screened before they're listed. We check credentials and licences, collect references, review patient/client feedback, and conduct a verification call. The 'Verified by Colibrí' badge means we've done that work — it's not a self-declaration.",
  },
  {
    q: "I don't speak Spanish. Is that a problem?",
    a: "Not at all. Your Colibri coordinator is fully bilingual (Spanish/English) and handles all communication with your provider on your behalf. On Concierge and White-Glove plans, you'll have a bilingual ground coordinator reachable throughout your visit.",
  },
  {
    q: "What if something goes wrong during my visit?",
    a: "Your coordinator remains reachable before, during, and after your visit. We help you navigate any issue — rescheduling, alternative arrangements, communication with the provider — and stay involved until it's resolved.",
  },
  {
    q: "Do I pay Colibri or the provider?",
    a: "Both, separately. You pay Colibri a coordination/concierge fee (the tier price). You contract directly with and pay the provider at their quoted rate. Colibri is never a middleman for the service fee — there are no hidden markups on the provider's charges.",
  },
  {
    q: "Is this only for medical and dental?",
    a: "No. Health & Dental is our original launch category, but Colibri covers Wellness & Recovery, Custom Visits, Personal Services (drivers, interpreters, errands), Stays, Transport, and Curated Products. Any service category can be added over time — the platform is designed to grow.",
  },
  {
    q: "What cities in Colombia do you cover?",
    a: "Our network spans Medellín, Bogotá, Cartagena, Cali, Barranquilla, and surrounding areas. We're continuously adding providers in other cities. If you have a specific location in mind, ask — we'll tell you what's available.",
  },
  {
    q: "How long does the process take?",
    a: "A simple consultation and provider match typically happens within 48–72 hours. Full trip coordination (Concierge or White-Glove) is best planned 2–4 weeks in advance, though we've handled urgent requests on shorter timelines.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-brand text-sm font-semibold uppercase tracking-wider">
            Common questions
          </span>
          <h2 className="mt-2 text-3xl font-bold text-ink">FAQ</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="border border-sand rounded-xl overflow-hidden">
              <button
                className="w-full flex items-start justify-between gap-4 px-6 py-4 text-left hover:bg-cream transition-colors"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="font-medium text-ink text-sm sm:text-base">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-ink/40 transition-transform mt-0.5 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-48" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm text-ink/70 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
