import { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] },
    ],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
