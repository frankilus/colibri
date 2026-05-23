import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const CATEGORIES = [
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
];

const PROVIDERS = [
  // ── Health & Dental ──
  {
    fullName: "Dr. Valentina Ríos Mejía",
    businessName: "Sonrisa Studio Medellín",
    primaryCategory: "health-dental",
    subcategories: [],
    city: "Medellín",
    region: "Antioquia",
    languages: ["Spanish", "English"],
    yearsExperience: 14,
    bio: "Board-certified prosthodontist specialising in full-mouth restorations, All-on-4 implants, and porcelain veneers. Trained at Universidad de Antioquia and completed a fellowship in Miami. Over 2,000 US clients served.",
    credentials: "DDS, Prosthodontics Fellowship (Miami), ACPD Member",
    websiteUrl: "https://sonrisastudio.example.co",
    contactEmail: "valentina@sonrisastudio.example.co",
    contactPhone: "+57 300 123 4501",
    services: [
      {
        title: "All-on-4 Full Arch Implants",
        description: "Full upper or lower arch on four implants. Includes consultation, CT scan, surgery, and provisional teeth in one day.",
        priceRange: "$8,500–$11,000 USD",
        duration: "1 day surgery + 5 days recovery",
      },
      {
        title: "Porcelain Veneers (per arch)",
        description: "6–10 ultra-thin porcelain veneers for a complete smile transformation. Shade matching and custom mock-up included.",
        priceRange: "$2,400–$3,800 USD per arch",
        duration: "2 appointments over 5 days",
      },
      {
        title: "Single Dental Implant",
        description: "Titanium implant + ceramic crown. Includes extraction if needed, post-op care guide, and follow-up video call.",
        priceRange: "$900–$1,400 USD",
        duration: "Same day to 3 months (osseointegration)",
      },
    ],
  },
  {
    fullName: "Dr. Carlos Andrade Patiño",
    businessName: "Bogotá Dental Center",
    primaryCategory: "health-dental",
    subcategories: [],
    city: "Bogotá",
    region: "Cundinamarca",
    languages: ["Spanish", "English", "French"],
    yearsExperience: 18,
    bio: "Oral surgeon and implantologist with 18 years of experience. Pioneered same-day smile clinics for international patients. Fluent in three languages, ensuring clear communication at every step.",
    credentials: "DDS, Oral Surgery Specialist, ICOI Member",
    websiteUrl: null,
    contactEmail: "carlos@bogotadentalcenter.example.co",
    contactPhone: "+57 301 234 5602",
    services: [
      {
        title: "Smile Makeover Package",
        description: "Complete aesthetic overhaul: cleaning, whitening, composite bonding or veneers, and final photography session.",
        priceRange: "$1,800–$4,500 USD",
        duration: "3–5 days",
      },
      {
        title: "Dental Implant + Crown",
        description: "Nobel Biocare implant with zirconia crown. Lifetime warranty on the implant.",
        priceRange: "$1,100–$1,600 USD",
        duration: "Placement + crown in 2 visits",
      },
    ],
  },
  {
    fullName: "Dr. Sofía Hernández Vargas",
    businessName: "ClínicaOral Cartagena",
    primaryCategory: "health-dental",
    subcategories: [],
    city: "Cartagena",
    region: "Bolívar",
    languages: ["Spanish", "English"],
    yearsExperience: 10,
    bio: "General and cosmetic dentist known for her gentle approach and highly personalised treatment plans. Cartagena-based, ideal for clients who want to combine dental work with a coastal stay.",
    credentials: "DDS, Invisalign Certified Provider",
    websiteUrl: null,
    contactEmail: "sofia@clinicaoral-ctg.example.co",
    contactPhone: "+57 302 345 6703",
    services: [
      {
        title: "Invisalign / Clear Aligners",
        description: "Full clear aligner treatment, including digital scan, custom tray fabrication, and monthly video check-ins.",
        priceRange: "$2,200–$3,500 USD",
        duration: "12–18 months",
      },
      {
        title: "Teeth Whitening (professional)",
        description: "In-office laser whitening plus take-home kit. Up to 8 shades brighter.",
        priceRange: "$180–$280 USD",
        duration: "90 minutes",
      },
    ],
  },

  // ── Wellness & Recovery ──
  {
    fullName: "Alejandra Moreno Torres",
    businessName: "Andes Wellness Retreat",
    primaryCategory: "wellness-recovery",
    subcategories: [],
    city: "Salento",
    region: "Quindío",
    languages: ["Spanish", "English"],
    yearsExperience: 8,
    bio: "Certified yoga therapist and retreat director in Colombia's coffee region. Specialises in post-procedure recovery stays and burnout/stress recovery immersions for US professionals.",
    credentials: "E-RYT 500, Yoga Therapy Certification (IAYT)",
    websiteUrl: "https://andeswellness.example.co",
    contactEmail: "alejandra@andeswellness.example.co",
    contactPhone: "+57 310 456 7804",
    services: [
      {
        title: "5-Day Recovery Immersion",
        description: "Post-surgery or post-dental recovery stay. Includes private villa, 3 daily meals, gentle yoga, and therapeutic massage.",
        priceRange: "$1,800–$2,600 USD all-in",
        duration: "5 nights",
      },
      {
        title: "7-Day Burnout Reset Retreat",
        description: "Digital detox, daily yoga and meditation, farm-to-table nutrition, and guided nature walks in the coffee region.",
        priceRange: "$2,200–$3,000 USD",
        duration: "7 nights",
      },
    ],
  },
  {
    fullName: "Juan Felipe Castillo",
    businessName: "Medellín Movement Studio",
    primaryCategory: "wellness-recovery",
    subcategories: [],
    city: "Medellín",
    region: "Antioquia",
    languages: ["Spanish", "English", "Portuguese"],
    yearsExperience: 6,
    bio: "Physical therapist and functional movement coach. Works with post-operative patients and athletes seeking high-quality, affordable rehab in Medellín.",
    credentials: "Licensed Physical Therapist (Universidad CES), NSCA-CSCS",
    websiteUrl: null,
    contactEmail: "juanfe@medellinmovement.example.co",
    contactPhone: "+57 311 567 8905",
    services: [
      {
        title: "Post-Op Physical Therapy (10 sessions)",
        description: "Comprehensive post-operative rehabilitation programme tailored to your procedure. Includes home exercise plan.",
        priceRange: "$600–$900 USD",
        duration: "2–3 weeks",
      },
      {
        title: "Functional Movement Assessment",
        description: "Full-body movement screen, video gait analysis, and personalised corrective programme.",
        priceRange: "$120–$180 USD",
        duration: "90 minutes",
      },
    ],
  },

  // ── Custom Visits & Experiences ──
  {
    fullName: "Isabela Gutiérrez Reyes",
    businessName: "Colombia Curated",
    primaryCategory: "custom-visits",
    subcategories: [],
    city: "Cartagena",
    region: "Bolívar",
    languages: ["Spanish", "English"],
    yearsExperience: 9,
    bio: "Cultural tour designer and former diplomat based in Cartagena. Creates bespoke itineraries for first-timers and seasoned travellers alike — history, gastronomy, art, and off-the-beaten-path Colombia.",
    credentials: "Certified Tour Guide (Colombia), BA International Relations",
    websiteUrl: "https://colombiacurated.example.co",
    contactEmail: "isabela@colombiacurated.example.co",
    contactPhone: "+57 312 678 9006",
    services: [
      {
        title: "Cartagena Old City Private Tour",
        description: "Half-day walking tour of the walled city with a private guide. Includes hidden gems, local tastings, and family-owned craft shops.",
        priceRange: "$150–$220 USD",
        duration: "4 hours",
      },
      {
        title: "10-Day Colombia Highlights",
        description: "Bogotá → Coffee Region → Cartagena → Tayrona. All accommodation, internal transport, and guided experiences. Fully customisable.",
        priceRange: "$3,800–$5,500 USD",
        duration: "10 days",
      },
      {
        title: "Relocation Scouting Trip",
        description: "3-day intensive for anyone considering moving to Colombia. Neighbourhoods, co-working spaces, schools, visa basics, and connections to expat community.",
        priceRange: "$900–$1,400 USD",
        duration: "3 days",
      },
    ],
  },
  {
    fullName: "Santiago Vargas Londoño",
    businessName: "Altitude Coffee & Culture",
    primaryCategory: "custom-visits",
    subcategories: ["curated-products"],
    city: "Manizales",
    region: "Caldas",
    languages: ["Spanish", "English"],
    yearsExperience: 7,
    bio: "Third-generation coffee farmer turned experience guide. Offers immersive farm-to-cup experiences in the Colombian coffee belt, including cupping sessions and direct trade introductions.",
    credentials: "SCA Certified Q Grader, UNESCO Coffee Belt Guide Licence",
    websiteUrl: null,
    contactEmail: "santiago@altitudecoffee.example.co",
    contactPhone: "+57 313 789 1107",
    services: [
      {
        title: "Farm-to-Cup Coffee Immersion",
        description: "Full-day on the family farm: picking, processing, roasting, and cupping. Includes bilingual guide and farm-fresh lunch.",
        priceRange: "$180–$260 USD per person",
        duration: "8 hours",
      },
      {
        title: "2-Day Coffee & Culture Weekend",
        description: "Overnight at a heritage finca, two guided farm visits, evening cupping event, and crafts market.",
        priceRange: "$450–$650 USD per person",
        duration: "2 days / 1 night",
      },
    ],
  },

  // ── Personal Services ──
  {
    fullName: "Ricardo Ospina Gómez",
    businessName: "Medellín Concierge Drivers",
    primaryCategory: "personal-services",
    subcategories: ["transportation"],
    city: "Medellín",
    region: "Antioquia",
    languages: ["Spanish", "English"],
    yearsExperience: 11,
    bio: "Professional bilingual driver and personal assistant for international visitors in Medellín. Expert in medical tourism logistics — airport pickups, clinic transfers, pharmacy runs, and all-day companionship.",
    credentials: "Licensed professional driver, First Aid Certified",
    websiteUrl: null,
    contactEmail: "ricardo@medellin-drivers.example.co",
    contactPhone: "+57 314 890 2208",
    services: [
      {
        title: "Airport Transfer",
        description: "Pickup from José María Córdova Airport to any Medellín hotel or clinic. Flight tracking included.",
        priceRange: "$35–$55 USD",
        duration: "1–1.5 hours",
      },
      {
        title: "Full-Day Driver & Assistant",
        description: "10-hour bilingual driving and personal assistant service. Clinic visits, errands, pharmacy, shopping, and translation support.",
        priceRange: "$180–$250 USD per day",
        duration: "10 hours",
      },
    ],
  },
  {
    fullName: "Camila Torres Ruiz",
    businessName: "Bogotá Bilingual Concierge",
    primaryCategory: "personal-services",
    subcategories: [],
    city: "Bogotá",
    region: "Cundinamarca",
    languages: ["Spanish", "English", "Italian"],
    yearsExperience: 5,
    bio: "Trilingual personal assistant and interpreter based in Bogotá. Specialises in supporting medical tourists, expats, and business travellers. Available for appointment accompaniment, document translation, and lifestyle concierge.",
    credentials: "BA Linguistics, Certified Court Interpreter (Spanish/English)",
    websiteUrl: null,
    contactEmail: "camila@bogota-concierge.example.co",
    contactPhone: "+57 315 901 3309",
    services: [
      {
        title: "Medical Appointment Interpreter",
        description: "Attends medical or dental consultations with you, interpreting in real time and taking notes.",
        priceRange: "$80–$120 USD per visit",
        duration: "2–4 hours",
      },
      {
        title: "Document Translation (certified)",
        description: "Certified translation of medical records, legal documents, or correspondence. Per-page rate.",
        priceRange: "$25–$40 USD per page",
        duration: "24–48 hours turnaround",
      },
    ],
  },

  // ── Stays & Accommodation ──
  {
    fullName: "Laura Jiménez Hoyos",
    businessName: "Casa Laureles Recovery Suites",
    primaryCategory: "stays-accommodation",
    subcategories: [],
    city: "Medellín",
    region: "Antioquia",
    languages: ["Spanish", "English"],
    yearsExperience: 6,
    bio: "Runs a boutique guesthouse in Laureles (Medellín's safest, most pleasant neighbourhood) specifically designed for post-procedure patients. 24/7 nursing care available on request.",
    credentials: "Registered nurse (RN), guesthouse licensed by Cotelco",
    websiteUrl: "https://casalaureles.example.co",
    contactEmail: "laura@casalaureles.example.co",
    contactPhone: "+57 316 012 4410",
    services: [
      {
        title: "Recovery Suite (7 nights)",
        description: "Private ensuite room, daily cleaning, 3 meals, medication reminders, and weekly nurse check-in. 5 min from El Poblado clinics.",
        priceRange: "$900–$1,400 USD",
        duration: "7 nights",
      },
      {
        title: "Short-Stay Apartment (2–4 nights)",
        description: "Fully furnished studio with kitchen and WiFi in Laureles. Ideal for quick dental or wellness visits.",
        priceRange: "$70–$110 USD per night",
        duration: "2–4 nights min.",
      },
    ],
  },
  {
    fullName: "Andrés Felipe Mora",
    businessName: "Cartagena Boutique Stays",
    primaryCategory: "stays-accommodation",
    subcategories: [],
    city: "Cartagena",
    region: "Bolívar",
    languages: ["Spanish", "English"],
    yearsExperience: 8,
    bio: "Manages a portfolio of vetted boutique hotels and private villas in Cartagena's historic centre and Bocagrande. Each property is personally inspected and guaranteed to meet Colibri standards.",
    credentials: "Licensed property manager, member of Cartagena Hotels Association",
    websiteUrl: null,
    contactEmail: "andres@ctg-boutique.example.co",
    contactPhone: "+57 317 123 5511",
    services: [
      {
        title: "Walled City Boutique Hotel",
        description: "3–7 night stay at a curated colonial boutique hotel. Breakfast included, rooftop pool, walking distance to everything.",
        priceRange: "$140–$280 USD per night",
        duration: "3 nights minimum",
      },
    ],
  },

  // ── Transportation ──
  {
    fullName: "Héctor Ramírez Acosta",
    businessName: "Colombia VIP Transfer",
    primaryCategory: "transportation",
    subcategories: [],
    city: "Bogotá",
    region: "Cundinamarca",
    languages: ["Spanish", "English"],
    yearsExperience: 13,
    bio: "Operates a fleet of vetted private vehicles for VIP transfers across Colombia. Bogotá airport specialist with connections in Medellín, Cartagena, and Cali.",
    credentials: "RUNT-certified professional driver, defensive driving certificate",
    websiteUrl: null,
    contactEmail: "hector@colombiavip.example.co",
    contactPhone: "+57 318 234 6612",
    services: [
      {
        title: "Bogotá El Dorado Airport Transfer",
        description: "Luxury SUV or van transfer to/from El Dorado. Meet-and-greet, luggage assist, WiFi on board.",
        priceRange: "$40–$65 USD",
        duration: "1–2 hours",
      },
      {
        title: "Inter-City Private Transfer",
        description: "Bogotá → Medellín or Bogotá → Cartagena overland. Luxury vehicle, bilingual driver, door-to-door.",
        priceRange: "$320–$480 USD",
        duration: "8–10 hours",
      },
    ],
  },

  // ── Curated Products ──
  {
    fullName: "Mariana Salcedo Pinto",
    businessName: "Colombia Gift Co.",
    primaryCategory: "curated-products",
    subcategories: [],
    city: "Bogotá",
    region: "Cundinamarca",
    languages: ["Spanish", "English"],
    yearsExperience: 4,
    bio: "Sources and ships premium Colombian products to the US — single-origin coffee, handwoven Wayuu bags, emerald jewellery, artisan chocolate, and wellness products. All ethically sourced.",
    credentials: "Export registered with DIAN, FDA-compliant food exports",
    websiteUrl: "https://colombiagiftco.example.co",
    contactEmail: "mariana@colombiagiftco.example.co",
    contactPhone: "+57 319 345 7713",
    services: [
      {
        title: "Single-Origin Coffee Subscription",
        description: "Monthly 250g bag of freshly roasted Colombian specialty coffee. Shipped to US address.",
        priceRange: "$28–$42 USD/month",
        duration: "Monthly subscription",
      },
      {
        title: "Artisan Gift Box",
        description: "Curated box: 2 coffees, artisan chocolate, herbal tea blend, and small handwoven piece. Great for post-trip gifts.",
        priceRange: "$85–$140 USD",
        duration: "Ships in 3–5 business days",
      },
    ],
  },
];

const SAMPLE_LEADS = [
  {
    name: "Patricia Walsh",
    email: "patricia.walsh@example.com",
    phone: "+1 305 555 0101",
    categorySlug: "health-dental",
    message: "I'm interested in All-on-4 implants for my upper arch. I have two broken front teeth and several missing. Budget around $12,000 all-in including accommodation and transport. Looking to go in October.",
    budget: "$12,000 all-in",
    status: "new",
  },
  {
    name: "Marcus Thompson",
    email: "marcus.t@example.com",
    phone: "+1 212 555 0202",
    categorySlug: "wellness-recovery",
    message: "Looking for a 7–10 day wellness retreat, ideally in the mountains or coffee region. Post-burnout, want something that combines yoga, good food, and nature. Flexible on dates.",
    budget: "$3,000–$4,000",
    status: "contacted",
  },
  {
    name: "Jennifer Kim",
    email: "jkim@example.com",
    phone: null,
    categorySlug: "custom-visits",
    message: "My partner and I are planning to visit Cartagena and the coffee region in March. We'd like a fully planned itinerary — 10 days, boutique hotels, private guide, mix of culture and food. Not sure where to start.",
    budget: "$6,000–$8,000 for both",
    status: "new",
  },
  {
    name: "David Okonkwo",
    email: "david.o@example.com",
    phone: "+1 404 555 0303",
    categorySlug: "health-dental",
    message: "Looking for a smile makeover — veneers on 6 upper teeth. I've had quotes in Miami at $18k. Heard Colombia is much more affordable. Can you tell me more about the process and what to expect?",
    budget: "$4,000–$7,000",
    status: "closed",
  },
  {
    name: "Sarah Mitchell",
    email: "sarah.m@example.com",
    phone: "+1 617 555 0404",
    categorySlug: null,
    message: "Not sure which category this falls in — I want to explore moving to Medellín long-term and would love to have someone show me the ropes: neighbourhoods, visa info, co-working, cost of living. Any help appreciated.",
    budget: "Flexible",
    status: "new",
  },
];

async function main() {
  console.log("🌱 Seeding Colibri database…");

  // Upsert categories
  for (const cat of CATEGORIES) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log(`✓ ${CATEGORIES.length} categories seeded`);

  // Clear existing seed providers (those with sample emails)
  await prisma.provider.deleteMany({
    where: { contactEmail: { contains: ".example.co" } },
  });

  // Create providers + services
  let providerCount = 0;
  let serviceCount = 0;

  for (const p of PROVIDERS) {
    const { services, ...providerData } = p;
    const provider = await prisma.provider.create({
      data: {
        ...providerData,
        subcategories: JSON.stringify(providerData.subcategories),
        languages: JSON.stringify(providerData.languages),
        status: "verified",
      },
    });

    for (const s of services) {
      await prisma.service.create({
        data: {
          providerId: provider.id,
          categorySlug: providerData.primaryCategory,
          ...s,
        },
      });
      serviceCount++;
    }
    providerCount++;
  }
  console.log(`✓ ${providerCount} providers seeded with ${serviceCount} services`);

  // Seed leads (idempotent — skip if already present)
  for (const lead of SAMPLE_LEADS) {
    const existing = await prisma.lead.findFirst({ where: { email: lead.email } });
    if (!existing) {
      await prisma.lead.create({ data: lead });
    }
  }
  console.log(`✓ ${SAMPLE_LEADS.length} sample leads seeded`);

  console.log("\n✅ Seed complete. Visit /admin to browse providers and leads.");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
