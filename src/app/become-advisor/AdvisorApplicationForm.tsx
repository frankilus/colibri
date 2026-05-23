"use client";

import { useState } from "react";
import { CheckCircle, Plus, Trash2 } from "lucide-react";

interface Category {
  slug: string;
  name: string;
}

interface ServiceField {
  title: string;
  categorySlug: string;
  description: string;
  priceRange: string;
  duration: string;
}

interface Props {
  categories: Category[];
}

const STEPS = ["Your Info", "Services", "Review & Submit"];

const LANGUAGES = ["Spanish", "English", "French", "Portuguese", "Italian", "German"];

export default function AdvisorApplicationForm({ categories }: Props) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    fullName: "",
    businessName: "",
    primaryCategory: "",
    subcategories: [] as string[],
    city: "",
    region: "",
    languages: ["Spanish", "English"] as string[],
    yearsExperience: "",
    bio: "",
    credentials: "",
    websiteUrl: "",
    contactEmail: "",
    contactPhone: "",
    consent: false,
  });

  const [services, setServices] = useState<ServiceField[]>([
    { title: "", categorySlug: "", description: "", priceRange: "", duration: "" },
  ]);

  const set = (field: string, value: unknown) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleLang = (lang: string) => {
    set(
      "languages",
      form.languages.includes(lang)
        ? form.languages.filter((l) => l !== lang)
        : [...form.languages, lang]
    );
  };

  const toggleSubcat = (slug: string) => {
    set(
      "subcategories",
      form.subcategories.includes(slug)
        ? form.subcategories.filter((s) => s !== slug)
        : [...form.subcategories, slug]
    );
  };

  const updateService = (i: number, field: string, value: string) => {
    setServices((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
  };

  const addService = () =>
    setServices((prev) => [
      ...prev,
      { title: "", categorySlug: form.primaryCategory, description: "", priceRange: "", duration: "" },
    ]);

  const removeService = (i: number) =>
    setServices((prev) => prev.filter((_, idx) => idx !== i));

  const submit = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/providers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, services }),
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

  const inputClass =
    "w-full px-4 py-2.5 rounded-xl border border-sand focus:outline-none focus:border-emerald-brand focus:ring-1 focus:ring-emerald-brand text-sm bg-cream";
  const labelClass = "block text-sm font-medium text-ink mb-1.5";

  if (success) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-sand">
        <CheckCircle size={52} className="text-emerald-brand mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-ink mb-2">Application submitted!</h2>
        <p className="text-ink/60 max-w-md mx-auto">
          Thank you for applying to join Colibrí. Our team will review your application
          and reach out within 3–5 business days.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-sand overflow-hidden">
      {/* Step indicator */}
      <div className="flex border-b border-sand">
        {STEPS.map((s, i) => (
          <button
            key={s}
            className={`flex-1 py-4 text-sm font-medium transition-colors ${
              i === step
                ? "text-emerald-deep border-b-2 border-emerald-deep bg-cream"
                : i < step
                ? "text-emerald-brand cursor-pointer"
                : "text-ink/40 cursor-not-allowed"
            }`}
            onClick={() => i < step && setStep(i)}
            disabled={i > step}
          >
            <span className="hidden sm:inline">{i + 1}. </span>
            {s}
          </button>
        ))}
      </div>

      <div className="p-8">
        {/* Step 0 — Your Info */}
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  Full name <span className="text-red-500">*</span>
                </label>
                <input
                  className={inputClass}
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                  placeholder="Dr. María García"
                />
              </div>
              <div>
                <label className={labelClass}>Business / clinic name</label>
                <input
                  className={inputClass}
                  value={form.businessName}
                  onChange={(e) => set("businessName", e.target.value)}
                  placeholder="García Dental Studio"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Primary category <span className="text-red-500">*</span>
              </label>
              <select
                className={inputClass}
                value={form.primaryCategory}
                onChange={(e) => set("primaryCategory", e.target.value)}
              >
                <option value="">Select a category…</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {form.primaryCategory && (
              <div>
                <label className={labelClass}>Additional categories (optional)</label>
                <div className="flex flex-wrap gap-2">
                  {categories
                    .filter((c) => c.slug !== form.primaryCategory)
                    .map((c) => (
                      <button
                        key={c.slug}
                        type="button"
                        onClick={() => toggleSubcat(c.slug)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                          form.subcategories.includes(c.slug)
                            ? "bg-emerald-brand text-white border-emerald-brand"
                            : "border-sand text-ink/60 hover:border-emerald-brand/50"
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                </div>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  className={inputClass}
                  value={form.city}
                  onChange={(e) => set("city", e.target.value)}
                  placeholder="Medellín"
                />
              </div>
              <div>
                <label className={labelClass}>Department / Region</label>
                <input
                  className={inputClass}
                  value={form.region}
                  onChange={(e) => set("region", e.target.value)}
                  placeholder="Antioquia"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Languages spoken</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLang(lang)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      form.languages.includes(lang)
                        ? "bg-emerald-brand text-white border-emerald-brand"
                        : "border-sand text-ink/60 hover:border-emerald-brand/50"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className={labelClass}>Years of experience</label>
                <input
                  type="number"
                  min={0}
                  className={inputClass}
                  value={form.yearsExperience}
                  onChange={(e) => set("yearsExperience", e.target.value)}
                  placeholder="10"
                />
              </div>
              <div>
                <label className={labelClass}>
                  Contact email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  className={inputClass}
                  value={form.contactEmail}
                  onChange={(e) => set("contactEmail", e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Phone</label>
              <input
                type="tel"
                className={inputClass}
                value={form.contactPhone}
                onChange={(e) => set("contactPhone", e.target.value)}
                placeholder="+57 300 123 4567"
              />
            </div>

            <div>
              <label className={labelClass}>
                Short bio <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                className={`${inputClass} resize-none`}
                value={form.bio}
                onChange={(e) => set("bio", e.target.value)}
                placeholder="Tell us about your background, experience, and the clients you serve best…"
              />
            </div>

            <div>
              <label className={labelClass}>Credentials & certifications</label>
              <textarea
                rows={2}
                className={`${inputClass} resize-none`}
                value={form.credentials}
                onChange={(e) => set("credentials", e.target.value)}
                placeholder="Degree, licences, certifications, professional memberships…"
              />
            </div>

            <div>
              <label className={labelClass}>Website URL</label>
              <input
                type="url"
                className={inputClass}
                value={form.websiteUrl}
                onChange={(e) => set("websiteUrl", e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <button
              type="button"
              onClick={() => {
                if (!form.fullName || !form.primaryCategory || !form.city || !form.contactEmail || !form.bio) {
                  setError("Please fill in all required fields.");
                  return;
                }
                setError("");
                setStep(1);
              }}
              className="w-full bg-emerald-deep text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-deep/90 transition-colors"
            >
              Next: Your Services →
            </button>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          </div>
        )}

        {/* Step 1 — Services */}
        {step === 1 && (
          <div className="space-y-6">
            <p className="text-sm text-ink/60">
              Add the services you offer. These help clients understand what to expect.
            </p>

            {services.map((s, i) => (
              <div key={i} className="border border-sand rounded-xl p-5 relative">
                {services.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeService(i)}
                    className="absolute top-3 right-3 text-ink/30 hover:text-red-400 transition-colors"
                    aria-label="Remove service"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
                <h4 className="font-semibold text-ink mb-4 text-sm">
                  Service {i + 1}
                </h4>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Service title</label>
                      <input
                        className={inputClass}
                        value={s.title}
                        onChange={(e) => updateService(i, "title", e.target.value)}
                        placeholder="Dental implant consultation"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Category</label>
                      <select
                        className={inputClass}
                        value={s.categorySlug || form.primaryCategory}
                        onChange={(e) => updateService(i, "categorySlug", e.target.value)}
                      >
                        {categories.map((c) => (
                          <option key={c.slug} value={c.slug}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={2}
                      className={`${inputClass} resize-none`}
                      value={s.description}
                      onChange={(e) => updateService(i, "description", e.target.value)}
                      placeholder="Brief description of this service…"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Price range</label>
                      <input
                        className={inputClass}
                        value={s.priceRange}
                        onChange={(e) => updateService(i, "priceRange", e.target.value)}
                        placeholder="$800–$1,200 USD"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Duration</label>
                      <input
                        className={inputClass}
                        value={s.duration}
                        onChange={(e) => updateService(i, "duration", e.target.value)}
                        placeholder="2–3 hours / 1 day"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addService}
              className="flex items-center gap-2 text-emerald-brand border border-dashed border-emerald-brand/40 w-full justify-center py-3 rounded-xl text-sm hover:bg-emerald-brand/5 transition-colors"
            >
              <Plus size={16} />
              Add another service
            </button>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="flex-1 border border-sand text-ink/70 py-3 rounded-xl text-sm hover:bg-cream transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 bg-emerald-deep text-white font-semibold py-3 rounded-xl hover:bg-emerald-deep/90 transition-colors text-sm"
              >
                Review application →
              </button>
            </div>
          </div>
        )}

        {/* Step 2 — Review */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="bg-cream rounded-xl p-5 text-sm space-y-2">
              <p>
                <span className="font-semibold">Name:</span> {form.fullName}
              </p>
              {form.businessName && (
                <p>
                  <span className="font-semibold">Business:</span> {form.businessName}
                </p>
              )}
              <p>
                <span className="font-semibold">Category:</span> {form.primaryCategory}
              </p>
              <p>
                <span className="font-semibold">Location:</span> {form.city}
                {form.region ? `, ${form.region}` : ""}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {form.contactEmail}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{" "}
                {form.languages.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Services listed:</span>{" "}
                {services.filter((s) => s.title).length}
              </p>
            </div>

            <div className="flex items-start gap-3">
              <input
                id="advisor-consent"
                type="checkbox"
                checked={form.consent}
                onChange={(e) => set("consent", e.target.checked)}
                className="mt-0.5 h-4 w-4 accent-emerald-brand"
              />
              <label htmlFor="advisor-consent" className="text-xs text-ink/60 leading-relaxed">
                I confirm that the information I&apos;ve provided is accurate. I agree to
                Colibrí&apos;s{" "}
                <a href="/legal/terms" className="link-brand" target="_blank">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/legal/privacy" className="link-brand" target="_blank">
                  Privacy Policy
                </a>
                . I understand I am an independent contractor, not an employee or agent of
                Colibrí, and that listing requires verification before any leads are sent.
              </label>
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 px-4 py-2.5 rounded-lg">
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 border border-sand text-ink/70 py-3.5 rounded-xl text-sm hover:bg-cream transition-colors"
              >
                ← Back
              </button>
              <button
                type="button"
                disabled={loading || !form.consent}
                onClick={submit}
                className="flex-1 bg-emerald-deep text-white font-semibold py-3.5 rounded-xl hover:bg-emerald-deep/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting…" : "Submit application"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
