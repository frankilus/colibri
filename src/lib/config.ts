export const SITE = {
  name: "Colibri",
  displayName: "Colibrí",
  domain: "colibri.co",
  tagline: "Your bridge to trusted Colombia.",
  taglineAlt: "Trusted hands across Colombia.",
  contactEmail: "hello@colibri.co",
  contactPhone: "+1 (800) 555-0123",
  description:
    "Colibri connects you with a vetted network of trustworthy Colombian providers — dentists, wellness retreats, experiences, personal services, and more — and coordinates everything end to end.",
  socialLinks: {
    instagram: "https://instagram.com/colibrico",
    linkedin: "https://linkedin.com/company/colibrico",
  },
} as const;

export const CATEGORIES = [
  {
    slug: "health-dental",
    name: "Health & Dental",
    description:
      "Dentists, medical specialists, cosmetic procedures, and preventive care with licensed Colombian providers.",
    icon: "🦷",
    sortOrder: 1,
  },
  {
    slug: "wellness-recovery",
    name: "Wellness & Recovery",
    description:
      "Retreats, spa, therapy, fitness, nutrition, and recovery stays in Colombia's best wellness destinations.",
    icon: "🌿",
    sortOrder: 2,
  },
  {
    slug: "custom-visits",
    name: "Custom Visits & Experiences",
    description:
      "Curated trips, cultural tours, relocation scouting, and bespoke experiences across Colombia.",
    icon: "🗺️",
    sortOrder: 3,
  },
  {
    slug: "personal-services",
    name: "Personal Services",
    description:
      "On-demand drivers, interpreters, personal assistants, errands, handymen, and event help.",
    icon: "🤝",
    sortOrder: 4,
  },
  {
    slug: "stays-accommodation",
    name: "Stays & Accommodation",
    description:
      "Vetted lodging, recovery housing, and curated short-term rentals in Colombia.",
    icon: "🏡",
    sortOrder: 5,
  },
  {
    slug: "transportation",
    name: "Transportation",
    description:
      "Private drivers, airport transfers, intercity travel, and local transport coordination.",
    icon: "🚗",
    sortOrder: 6,
  },
  {
    slug: "curated-products",
    name: "Curated Products",
    description:
      "Quality Colombian products — coffee, textiles, crafts, and wellness goods — delivered to the US.",
    icon: "☕",
    sortOrder: 7,
  },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]["slug"];

export const PRICING_TIERS = [
  {
    name: "Connect",
    price: "$300–$500",
    description: "Find the right provider and get there prepared.",
    features: [
      "Vetted provider match",
      "Identity & credential verification",
      "Appointment booking",
      "Pre-engagement video consult",
      "Personalised prep guide",
    ],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Concierge",
    price: "$1,200–$2,000",
    description: "Full coordination so you can focus on your visit.",
    features: [
      "Everything in Connect",
      "Airport pickup & drop-off",
      "Vetted accommodation",
      "Private local transport",
      "Bilingual ground coordinator",
      "Full itinerary management",
    ],
    cta: "Book Concierge",
    highlighted: true,
    badge: "Most Popular",
  },
  {
    name: "White-Glove",
    price: "$3,000–$5,000+",
    description: "A dedicated coordinator with you every step of the way.",
    features: [
      "Everything in Concierge",
      "Coordinator attends all appointments",
      "Recovery lodging & companion handling",
      "Curated extended stay",
      "Aftercare & back-home coordination",
      "Priority support 24/7",
    ],
    cta: "Contact us",
    highlighted: false,
  },
] as const;

export const LEGAL_DISCLAIMER =
  'Colibri is an independent connection, vetting, and concierge service. We are not a provider of medical, dental, or other professional services and do not deliver those services or guarantee outcomes. All services are performed by independent providers whom you contract with and pay directly. "Verified" reflects Colibri\'s screening process, not a guarantee. Prices shown are illustrative and vary by case. Providers are independent contractors, not employees or agents of Colibri.';

export const HOW_IT_WORKS = [
  {
    step: 1,
    title: "Tell us what you need",
    description:
      "Book a free consultation. We listen — no jargon, no pressure. Tell us your goals, timeline, and budget.",
    icon: "💬",
  },
  {
    step: 2,
    title: "We vet & match",
    description:
      "We match you with a pre-screened, Verified provider whose credentials and reviews we've personally checked.",
    icon: "🔍",
  },
  {
    step: 3,
    title: "We coordinate everything",
    description:
      "Bookings, logistics, accommodation, transport — we handle the complexity so you don't have to.",
    icon: "📋",
  },
  {
    step: 4,
    title: "We're with you throughout",
    description:
      "Bilingual support before, during, and after your visit. One accountable contact who has your back.",
    icon: "🤝",
  },
] as const;

export const TRUST_POINTS = [
  {
    title: "Vetted providers only",
    description:
      "Every provider in our network has been personally screened — credentials checked, references collected, and quality verified.",
  },
  {
    title: "One accountable contact",
    description:
      "You get a single bilingual point of contact who coordinates everything and is reachable before, during, and after.",
  },
  {
    title: "Transparent pricing",
    description:
      "You see exactly what Colibri charges for coordination. You contract directly with providers at their quoted rates.",
  },
  {
    title: "You pay providers directly",
    description:
      "Colibri's fee covers coordination and concierge. Your service fees go straight to the provider — no hidden markups.",
  },
  {
    title: "Support before, during & after",
    description:
      "We don't disappear after the booking. We're with you through your visit and check in once you're home.",
  },
] as const;
