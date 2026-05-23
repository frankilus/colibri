import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Mail, Phone, Globe, Clock } from "lucide-react";
import prisma from "@/lib/prisma";
import ProviderStatusPanel from "./ProviderStatusPanel";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = { title: "Provider Detail" };

export default async function ProviderDetailPage({ params }: Props) {
  const { id } = await params;
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: { services: true },
  });
  if (!provider) notFound();

  const langs: string[] = JSON.parse(provider.languages || "[]");
  const subcats: string[] = JSON.parse(provider.subcategories || "[]");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin" className="text-ink/50 hover:text-ink flex items-center gap-1 text-sm">
          <ArrowLeft size={14} />
          Back to directory
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-5">
          {/* Header */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-bold text-ink">{provider.fullName}</h1>
                {provider.businessName && (
                  <p className="text-ink/60">{provider.businessName}</p>
                )}
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-ink/60">
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {provider.city}
                    {provider.region ? `, ${provider.region}` : ""}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={13} />
                    {provider.contactEmail}
                  </span>
                  {provider.contactPhone && (
                    <span className="flex items-center gap-1">
                      <Phone size={13} />
                      {provider.contactPhone}
                    </span>
                  )}
                  {provider.websiteUrl && (
                    <a
                      href={provider.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-emerald-brand hover:underline"
                    >
                      <Globe size={13} />
                      Website
                    </a>
                  )}
                  {provider.yearsExperience > 0 && (
                    <span className="flex items-center gap-1">
                      <Clock size={13} />
                      {provider.yearsExperience}+ yrs experience
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right text-xs text-ink/40">
                <p>Submitted</p>
                <p className="font-medium text-ink/60">{new Date(provider.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-ink mb-3 text-sm uppercase tracking-wider text-ink/50">
              Bio
            </h2>
            <p className="text-ink/80 text-sm leading-relaxed">{provider.bio}</p>
          </div>

          {/* Credentials */}
          {provider.credentials && (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-ink/50 mb-3">
                Credentials
              </h2>
              <p className="text-ink/80 text-sm leading-relaxed">{provider.credentials}</p>
            </div>
          )}

          {/* Services */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-ink/50 mb-4">
              Services ({provider.services.length})
            </h2>
            {provider.services.length === 0 ? (
              <p className="text-sm text-ink/40">No services listed.</p>
            ) : (
              <div className="space-y-3">
                {provider.services.map((s) => (
                  <div key={s.id} className="border border-gray-100 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium text-ink">{s.title}</p>
                        <p className="text-xs text-ink/50 mb-1">{s.categorySlug}</p>
                        <p className="text-sm text-ink/70">{s.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-semibold text-emerald-deep">{s.priceRange}</p>
                        {s.duration && <p className="text-xs text-ink/40">{s.duration}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar — status panel */}
        <div className="space-y-5">
          {/* Categories */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-ink/50 mb-3">
              Categories
            </h2>
            <p className="text-sm font-medium text-ink mb-2">Primary: {provider.primaryCategory}</p>
            {subcats.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {subcats.map((s) => (
                  <span key={s} className="text-xs bg-gray-100 text-ink/60 px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            )}
            {langs.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-ink/50 mb-1">Languages</p>
                <p className="text-sm text-ink">{langs.join(" · ")}</p>
              </div>
            )}
          </div>

          {/* Status & notes (interactive) */}
          <ProviderStatusPanel
            providerId={provider.id}
            currentStatus={provider.status}
            currentNotes={provider.internalNotes ?? ""}
          />
        </div>
      </div>
    </div>
  );
}
