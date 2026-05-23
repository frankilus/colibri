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

const CITIES = ["Bogotá", "Medellín", "Cartagena", "Cali", "Santa Marta"];

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

      {/* Colombia silhouette watermark */}
      <div
        className="absolute right-4 lg:right-[8%] top-1/2 -translate-y-1/2 pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 200 230"
          className="w-64 lg:w-80 h-auto opacity-[0.055]"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Simplified Colombia outline, clockwise from Guajira NE tip */}
          <path d="
            M 132 6
            L 148 13
            L 158 26
            L 164 46
            L 167 68
            L 164 92
            L 158 112
            L 148 128
            L 134 142
            L 115 150
            L 92 153
            L 70 148
            L 52 136
            L 36 118
            L 20 96
            L 12 72
            L 14 52
            L 22 40
            L 28 35
            L 24 25
            L 34 18
            L 55 12
            L 82 9
            L 110 9
            L 125 10
            L 132 6
            Z
          " />
        </svg>
      </div>

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
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #1FA37A 0%, #36C5C0 35%, #7C3AED 70%, #B5388A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
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
              className="flex flex-wrap gap-x-4 gap-y-2 mb-4"
            >
              {TRUST_STRIP.map((item) => (
                <span key={item} className="flex items-center gap-1.5 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-brand inline-block" />
                  {item}
                </span>
              ))}
            </motion.div>

            {/* City strip */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.65 }}
              className="text-xs text-white/30 tracking-widest uppercase"
            >
              {CITIES.join(" · ")}
            </motion.p>
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
            <p className="mt-2 text-white/20 text-xs tracking-widest uppercase">
              Colombia, curated.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Colombian flag — vertical accent stripe on the left edge */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[6px] flex flex-col pointer-events-none"
        aria-hidden="true"
      >
        <div className="w-full opacity-60" style={{ backgroundColor: "#FCD116", flex: 2 }} />
        <div className="w-full opacity-55" style={{ backgroundColor: "#003893", flex: 1 }} />
        <div className="w-full opacity-55" style={{ backgroundColor: "#CE1126", flex: 1 }} />
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
