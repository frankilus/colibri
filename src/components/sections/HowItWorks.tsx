"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS } from "@/lib/config";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-emerald-deep text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">
            The Colibri process
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold">How it works</h2>
          <p className="mt-4 text-white/60 max-w-lg mx-auto">
            From your first message to back home — we handle every step.
          </p>
        </div>

        {/* Steps with flight-path connector */}
        <div className="relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-gold/30 via-gold/60 to-gold/30"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                className="relative text-center"
              >
                {/* Step number bubble */}
                <div className="relative inline-block mb-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 border border-gold/30 flex flex-col items-center justify-center mx-auto">
                    <span className="text-2xl" aria-hidden="true">
                      {step.icon}
                    </span>
                  </div>
                  <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gold text-ink text-xs font-bold flex items-center justify-center shadow">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
