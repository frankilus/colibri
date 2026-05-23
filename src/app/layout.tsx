import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SITE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.displayName} — ${SITE.tagline}`,
    template: `%s | ${SITE.displayName}`,
  },
  description: SITE.description,
  metadataBase: new URL(`https://${SITE.domain}`),
  openGraph: {
    type: "website",
    siteName: SITE.displayName,
    title: `${SITE.displayName} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.displayName} — ${SITE.tagline}`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: SITE.displayName,
              description: SITE.description,
              url: `https://${SITE.domain}`,
              email: SITE.contactEmail,
              telephone: SITE.contactPhone,
              address: {
                "@type": "PostalAddress",
                addressCountry: "US",
              },
              areaServed: "CO",
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-cream text-ink antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
