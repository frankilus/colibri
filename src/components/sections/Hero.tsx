"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import HummingbirdLogo from "@/components/ui/HummingbirdLogo";
import { SITE } from "@/lib/config";

const TRUST_STRIP = [
  "Vetted providers",
  "Bilingual support",
  "One accountable contact",
  "Transparent pricing",
  "You pay providers directly",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden gradient-hero">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 50%, #1FA37A 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7C3AED 0%, transparent 40%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gold/20 text-gold border border-gold/30">
                Trusted · Vetted · Bilingual
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Your bridge to{" "}
              <span className="gradient-iridescent bg-clip-text text-transparent">
                trusted Colombia
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-lg text-white/75 mb-8 max-w-lg leading-relaxed"
            >
              Colibri connects you with a vetted network of Colombian dentists,
              wellness providers, experience guides, and personal services —
              coordinating everything so you can focus on results, not logistics.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 mb-10"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center bg-gold text-ink font-semibold px-6 py-3.5 rounded-xl hover:bg-gold/90 transition-all hover:scale-105 shadow-lg shadow-gold/20"
              >
                Find a trusted provider
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center border border-white/30 text-white font-medium px-6 py-3.5 rounded-xl hover:bg-white/10 transition-colors"
              >
                How it works
              </Link>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-x-4 gap-y-2"
            >
              {TRUST_STRIP.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right — hummingbird mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden lg:flex flex-col items-center justify-center"
          >
            <HummingbirdLogo size={280} variant="color" animated />
            <p className="mt-6 text-white/40 text-sm font-medium tracking-widest uppercase">
              {SITE.displayName}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 md:h-20"
        >
          <path
            d="M0 80 L0 40 Q360 0 720 40 Q1080 80 1440 40 L1440 80 Z"
            fill="#FBF7EF"
          />
        </svg>
      </div>
    </section>
  );
}
