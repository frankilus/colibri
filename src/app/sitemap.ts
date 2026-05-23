import { MetadataRoute } from "next";
import { CATEGORIES, SITE } from "@/lib/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = `https://${SITE.domain}`;
  const now = new Date();

  const staticPages = [
    { url: base, lastModified: now, priority: 1.0, changeFrequency: "weekly" as const },
    { url: `${base}/how-it-works`, lastModified: now, priority: 0.9, changeFrequency: "monthly" as const },
    { url: `${base}/services`, lastModified: now, priority: 0.9, changeFrequency: "weekly" as const },
    { url: `${base}/pricing`, lastModified: now, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/about`, lastModified: now, priority: 0.7, changeFrequency: "monthly" as const },
    { url: `${base}/contact`, lastModified: now, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/become-advisor`, lastModified: now, priority: 0.8, changeFrequency: "monthly" as const },
    { url: `${base}/legal/privacy`, lastModified: now, priority: 0.3, changeFrequency: "yearly" as const },
    { url: `${base}/legal/terms`, lastModified: now, priority: 0.3, changeFrequency: "yearly" as const },
  ];

  const categoryPages = CATEGORIES.map((cat) => ({
    url: `${base}/services/${cat.slug}`,
    lastModified: now,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));

  return [...staticPages, ...categoryPages];
}
