"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

interface Category {
  slug: string;
  name: string;
}

interface Props {
  categories: Category[];
}

export default function ContactForm({ categories }: Props) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    categorySlug: "",
    message: "",
    budget: "",
    consent: false,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handle = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const value = target.type === "checkbox" ? (target as HTMLInputElement).checked : target.value;
    setForm((prev) => ({ ...prev, [target.name]: value }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-sand">
        <CheckCircle size={48} className="text-emerald-brand mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-ink mb-2">We&apos;ll be in touch!</h2>
        <p className="text-ink/60 max-w-md mx-auto">
          Thank you for reaching out. A member of the Colibri team will respond within one
          business day with vetted options tailored to your needs.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-2xl p-8 shadow-sm border border-sand space-y-5"
      noValidate
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink mb-1.5">
            Full name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handle}
            placeholder="Your name"
            className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handle}
            placeholder="you@email.com"
            className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-ink mb-1.5">
            Phone <span className="text-ink/40 font-normal">(optional)</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handle}
            placeholder="+1 (555) 000-0000"
            className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream"
          />
        </div>
        <div>
          <label htmlFor="categorySlug" className="block text-sm font-medium text-ink mb-1.5">
            I&apos;m interested in
          </label>
          <select
            id="categorySlug"
            name="categorySlug"
            value={form.categorySlug}
            onChange={handle}
            className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream"
          >
            <option value="">Not sure yet</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-ink mb-1.5">
          Tell us what you need <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handle}
          placeholder="Describe your goals, timeline, and any specific needs..."
          className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream resize-none"
        />
      </div>

      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-ink mb-1.5">
          Approximate budget <span className="text-ink/40 font-normal">(optional)</span>
        </label>
        <input
          id="budget"
          name="budget"
          type="text"
          value={form.budget}
          onChange={handle}
          placeholder="e.g. $3,000–$5,000 all-in"
          className="w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream"
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          checked={form.consent}
          onChange={handle}
          className="mt-0.5 h-4 w-4 accent-emerald-brand"
          required
        />
        <label htmlFor="consent" className="text-xs text-ink/60 leading-relaxed">
          I agree to Colibrí&apos;s{" "}
          <a href="/legal/privacy" className="link-brand" target="_blank">
            Privacy Policy
          </a>{" "}
          and understand this is an inquiry, not a binding agreement. Colibrí is an
          independent concierge service, not a medical or professional service provider.
        </label>
      </div>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-deep text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-deep/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Sending…" : "Send my request"}
      </button>
    </form>
  );
}
