"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TrendingDown, DollarSign, Plane, Stethoscope, Info } from "lucide-react";

const PROCEDURES = [
  {
    id: "dental-implant",
    label: "Single Dental Implant",
    colombiaLow: 900,
    colombiaHigh: 1600,
    usLow: 3000,
    usHigh: 5000,
  },
  {
    id: "all-on-4",
    label: "All-on-4 Full Arch",
    colombiaLow: 8000,
    colombiaHigh: 12000,
    usLow: 25000,
    usHigh: 40000,
  },
  {
    id: "smile-makeover",
    label: "Smile Makeover (≈20 Veneers)",
    colombiaLow: 4000,
    colombiaHigh: 8000,
    usLow: 20000,
    usHigh: 30000,
  },
  {
    id: "porcelain-crown",
    label: "Porcelain Crown",
    colombiaLow: 300,
    colombiaHigh: 600,
    usLow: 1200,
    usHigh: 2000,
  },
  {
    id: "other",
    label: "Other / Not sure yet",
    colombiaLow: 500,
    colombiaHigh: 3000,
    usLow: 2000,
    usHigh: 8000,
  },
];

const TIERS = [
  {
    id: "connect",
    label: "Connect",
    range: "$300–$500",
    feeLow: 300,
    feeHigh: 500,
    description: "Provider matching + intro call",
  },
  {
    id: "concierge",
    label: "Concierge",
    range: "$1,200–$2,000",
    feeLow: 1200,
    feeHigh: 2000,
    description: "Full coordination & bilingual support",
    popular: true,
  },
  {
    id: "white-glove",
    label: "White-Glove",
    range: "$3,000–$5,000+",
    feeLow: 3000,
    feeHigh: 5000,
    description: "All-inclusive concierge experience",
  },
];

const LOGISTICS_LOW_PER_WEEK = 700;
const LOGISTICS_HIGH_PER_WEEK = 1900;

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function fmtRange(lo: number, hi: number) {
  return `${fmt(lo)}–${fmt(hi)}`;
}

export default function SavingsCalculator() {
  const [procedureId, setProcedureId] = useState("dental-implant");
  const [usQuote, setUsQuote] = useState("");
  const [tierId, setTierId] = useState("concierge");
  const [weeks, setWeeks] = useState(2);

  const procedure = PROCEDURES.find((p) => p.id === procedureId)!;
  const tier = TIERS.find((t) => t.id === tierId)!;

  const results = useMemo(() => {
    const clinicalLow = procedure.colombiaLow;
    const clinicalHigh = procedure.colombiaHigh;
    const feeLow = tier.feeLow;
    const feeHigh = tier.feeHigh;
    const logisticsLow = LOGISTICS_LOW_PER_WEEK * weeks;
    const logisticsHigh = LOGISTICS_HIGH_PER_WEEK * weeks;
    const totalLow = clinicalLow + feeLow + logisticsLow;
    const totalHigh = clinicalHigh + feeHigh + logisticsHigh;

    const usQuoteNum = parseFloat(usQuote.replace(/[^0-9.]/g, ""));
    const usLow = !isNaN(usQuoteNum) && usQuoteNum > 0 ? usQuoteNum : procedure.usLow;
    const usHigh = !isNaN(usQuoteNum) && usQuoteNum > 0 ? usQuoteNum : procedure.usHigh;

    const savingsLow = Math.max(0, usLow - totalHigh);
    const savingsHigh = Math.max(0, usHigh - totalLow);

    return {
      clinicalLow,
      clinicalHigh,
      feeLow,
      feeHigh,
      logisticsLow,
      logisticsHigh,
      totalLow,
      totalHigh,
      usLow,
      usHigh,
      savingsLow,
      savingsHigh,
      hasCustomQuote: !isNaN(usQuoteNum) && usQuoteNum > 0,
    };
  }, [procedure, tier, weeks, usQuote]);

  const savingsPct =
    results.savingsHigh > 0 && results.usHigh > 0
      ? Math.round((results.savingsHigh / results.usHigh) * 100)
      : 0;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* ── Inputs ── */}
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-semibold text-ink/50 uppercase tracking-widest mb-5">
              Your situation
            </h2>

            {/* Procedure */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-ink mb-2">
                Procedure
              </label>
              <select
                value={procedureId}
                onChange={(e) => setProcedureId(e.target.value)}
                className="w-full border border-sand rounded-xl px-4 py-3 text-sm text-ink bg-white focus:outline-none focus:border-emerald-brand"
              >
                {PROCEDURES.map((p) => (
                  <option key={p.id} value={p.id}>{p.label}</option>
                ))}
              </select>
            </div>

            {/* US Quote */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-ink mb-1">
                Your US quote{" "}
                <span className="text-ink/40 font-normal">(optional)</span>
              </label>
              <p className="text-xs text-ink/50 mb-2">Enter for a personalised estimate</p>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/40 text-sm">$</span>
                <input
                  type="number"
                  value={usQuote}
                  onChange={(e) => setUsQuote(e.target.value)}
                  placeholder="e.g. 5000"
                  className="w-full border border-sand rounded-xl pl-8 pr-4 py-3 text-sm text-ink bg-white focus:outline-none focus:border-emerald-brand"
                />
              </div>
            </div>

            {/* Tier */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-ink mb-3">
                Colibrí tier
              </label>
              <div className="space-y-3">
                {TIERS.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      tierId === t.id
                        ? "border-emerald-brand bg-emerald-brand/5"
                        : "border-sand bg-white hover:border-emerald-brand/40"
                    }`}
                  >
                    <input
                      type="radio"
                      name="tier"
                      value={t.id}
                      checked={tierId === t.id}
                      onChange={() => setTierId(t.id)}
                      className="accent-emerald-brand"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-ink">{t.label}</span>
                        {t.popular && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-gold/20 text-gold border border-gold/30">
                            Most popular
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink/50 mt-0.5">{t.description}</p>
                    </div>
                    <span className="text-sm font-semibold text-emerald-brand whitespace-nowrap">
                      {t.range}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Trip length */}
            <div>
              <label className="block text-sm font-semibold text-ink mb-1">
                Trip length:{" "}
                <span className="text-emerald-brand">
                  {weeks} week{weeks !== 1 ? "s" : ""}
                </span>
              </label>
              <p className="text-xs text-ink/50 mb-3">Used to estimate flights & accommodation</p>
              <div className="flex items-center gap-3">
                <span className="text-xs text-ink/40">1 wk</span>
                <input
                  type="range"
                  min={1}
                  max={4}
                  step={1}
                  value={weeks}
                  onChange={(e) => setWeeks(Number(e.target.value))}
                  className="flex-1 accent-emerald-brand"
                />
                <span className="text-xs text-ink/40">4 wks</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Results ── */}
        <div className="space-y-5">

          {/* Savings hero */}
          <div className="bg-emerald-deep rounded-2xl p-8 text-white text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingDown size={18} className="text-gold" />
              <p className="text-sm font-medium text-white/70 uppercase tracking-widest">
                Estimated savings
              </p>
            </div>
            <p className="text-4xl sm:text-5xl font-bold mb-1">
              {results.savingsLow <= 0 && results.savingsHigh <= 0
                ? "Varies"
                : fmtRange(results.savingsLow, results.savingsHigh)}
            </p>
            {savingsPct > 0 && (
              <p className="text-white/60 text-sm">
                up to {savingsPct}% less than staying home
              </p>
            )}
            <p className="text-white/30 text-xs mt-3">
              Illustrative estimate — varies by case
            </p>
          </div>

          {/* Breakdown */}
          <div className="bg-white rounded-2xl border border-sand p-6 space-y-4">
            <h3 className="font-semibold text-ink text-sm uppercase tracking-widest">
              All-in cost breakdown
            </h3>

            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-ink/70">
                  <Stethoscope size={14} className="text-emerald-brand shrink-0" />
                  Colombia clinical fee
                </div>
                <span className="text-sm font-semibold text-ink whitespace-nowrap">
                  {fmtRange(results.clinicalLow, results.clinicalHigh)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-ink/70">
                  <DollarSign size={14} className="text-emerald-brand shrink-0" />
                  Colibrí {tier.label} fee
                </div>
                <span className="text-sm font-semibold text-ink whitespace-nowrap">
                  {fmtRange(results.feeLow, results.feeHigh)}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 text-sm text-ink/70">
                  <Plane size={14} className="text-emerald-brand shrink-0" />
                  Flights + accommodation ({weeks}wk)
                </div>
                <span className="text-sm font-semibold text-ink whitespace-nowrap">
                  {fmtRange(results.logisticsLow, results.logisticsHigh)}
                </span>
              </div>

              <div className="border-t border-sand pt-3 flex items-center justify-between">
                <span className="font-bold text-ink">Total all-in</span>
                <span className="font-bold text-ink text-lg">
                  {fmtRange(results.totalLow, results.totalHigh)}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-ink/50">
                <span>
                  vs. {results.hasCustomQuote ? "your US quote" : "typical US cost"}
                </span>
                <span className="font-medium text-ink/60">
                  {results.hasCustomQuote
                    ? fmt(results.usLow)
                    : fmtRange(results.usLow, results.usHigh)}
                </span>
              </div>
            </div>
          </div>

          {/* Disclaimer + CTA */}
          <div className="flex items-start gap-2 text-xs text-ink/40 leading-relaxed">
            <Info size={12} className="shrink-0 mt-0.5" />
            All figures are illustrative estimates based on typical market ranges.
            Book a free consult for a personalised quote.
          </div>

          <Link
            href="/contact"
            className="block w-full text-center bg-gold text-ink font-semibold px-6 py-4 rounded-xl hover:bg-gold/90 transition-colors shadow-lg shadow-gold/20"
          >
            Book a free consult for my exact quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
