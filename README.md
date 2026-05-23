# Colibrí — Trusted Services Marketplace

> Your bridge to trusted Colombia.

A full-stack Next.js marketplace platform connecting US clients with vetted Colombian service providers. Features a public marketing site, provider/advisor application flow, client lead capture, and a private admin dashboard.

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment
cp .env.example .env
# Edit .env — set ADMIN_PASSWORD (see Security warning below)

# 3. Run database migrations
npm run db:migrate

# 4. Seed sample data (13 providers, 27 services, 5 leads)
npm run db:seed

# 5. Start dev server
npm run dev
```

Visit **http://localhost:3000** for the site and **http://localhost:3000/admin** for the dashboard.

Admin login: go to `/admin/login`, password is `ADMIN_PASSWORD` from your `.env`.

---

## ⚠️ Security warning — Admin auth

The `/admin` route is protected by a **placeholder password gate** stored in an environment variable. This is **not** suitable for production. Before deploying publicly:

1. Install a real auth provider: [Auth.js](https://authjs.dev), [Clerk](https://clerk.com), or [NextAuth](https://next-auth.js.org)
2. Replace the cookie-based check in `src/app/admin/(dashboard)/layout.tsx`
3. Remove or reconfigure the `/admin/api/login` and `/admin/api/logout` routes
4. Ensure `/admin` remains `noindex` in `robots.txt` (already set)

---

## Database

- **Local dev**: SQLite via `better-sqlite3` + `@prisma/adapter-better-sqlite3`
- **Production**: swap to PostgreSQL by updating `prisma.config.ts` and `src/lib/prisma.ts`

### Commands

```bash
npm run db:migrate    # Apply pending migrations
npm run db:seed       # Seed categories + sample providers/leads
npm run db:reset      # Reset DB and re-seed (destructive)
npx prisma studio     # Visual DB browser
```

### Switching to PostgreSQL (production)

1. Update `DATABASE_URL` in your environment:
   ```
   DATABASE_URL="postgresql://user:password@host:5432/colibri"
   ```
2. Update `prisma.config.ts` datasource `url`
3. Update `src/lib/prisma.ts` — replace `PrismaBetterSqlite3` with `@prisma/adapter-pg`
4. Run `npm run db:migrate` against your Postgres DB

---

## Editing content

All brand strings, pricing tiers, category definitions, and trust copy live in one file:

```
src/lib/config.ts
```

Changes there propagate everywhere automatically. To add a new service category:

1. Add it to `CATEGORIES` in `src/lib/config.ts`
2. Add the DB row: the seed script uses upserts so `npm run db:seed` is safe to re-run

---

## Site structure

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, categories, how it works, trust, pricing, FAQ |
| `/how-it-works` | Expanded process + fear-busting Q&A |
| `/services` | All categories index |
| `/services/[category]` | Dynamic category page with verified providers |
| `/pricing` | Tier cards + full feature comparison table |
| `/about` | Mission, values, vetting standard |
| `/contact` | Client lead form → saved to DB |
| `/become-advisor` | Multi-step advisor application → saved to DB |
| `/legal/privacy` | Privacy Policy placeholder |
| `/legal/terms` | Terms of Service placeholder |
| `/admin` | **Private** — provider directory, stats, CSV export |
| `/admin/providers/[id]` | Provider detail + status/notes editor |
| `/admin/services` | All services across all providers |
| `/admin/leads` | Client requests with inline status management |

---

## API routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/leads` | Submit a client service request |
| `GET` | `/api/leads` | List leads |
| `PATCH` | `/api/leads/[id]` | Update lead status |
| `POST` | `/api/providers` | Submit an advisor application |
| `GET` | `/api/providers` | List providers with filters |
| `PATCH` | `/api/providers/[id]` | Update provider status/notes |
| `GET` | `/api/admin/export?type=providers` | CSV export — providers |
| `GET` | `/api/admin/export?type=leads` | CSV export — leads |

---

## Wiring up email / CRM

The API routes write to the database only. To send email notifications:

1. **Lead submitted** → add send in `src/app/api/leads/route.ts` after `prisma.lead.create()`
2. **Advisor applied** → add send in `src/app/api/providers/route.ts` after `prisma.provider.create()`

Recommended: [Resend](https://resend.com) or [SendGrid](https://sendgrid.com).

---

## Deploying to Vercel

```bash
# 1. Push to GitHub
# 2. Import repo in Vercel dashboard
# 3. Set environment variables:
#    DATABASE_URL=<postgres-connection-string>
#    ADMIN_PASSWORD=<strong-random-password>
# 4. Deploy
```

For hosted Postgres: [Supabase](https://supabase.com), [Neon](https://neon.tech), or [Vercel Postgres](https://vercel.com/storage/postgres).

Run migrations against production before first deploy:
```bash
DATABASE_URL=<prod-url> npx prisma migrate deploy
```

---

## What to customise first

| Priority | File | What to change |
|----------|------|----------------|
| 1 | `src/lib/config.ts` | Domain, email, phone, social links, pricing |
| 2 | `src/app/legal/` | Get privacy policy and terms reviewed by a lawyer |
| 3 | `src/app/admin/(dashboard)/layout.tsx` | Replace placeholder auth with Auth.js / Clerk |
| 4 | `src/app/api/leads/route.ts` | Wire email notification on new leads |
| 5 | `prisma/seed.ts` | Replace sample providers with your real network |
| 6 | `public/` | Add real photography for hero and provider cards |
| 7 | `src/app/layout.tsx` | Add Vercel Analytics or Plausible |

---

## Tech stack

- **Next.js 16** (App Router, TypeScript)
- **Tailwind CSS v4** — custom brand tokens in `src/app/globals.css`
- **Prisma 7** + SQLite (dev) / PostgreSQL (prod)
- **Framer Motion** — hero and section animations
- **Lucide React** — icons
- **`better-sqlite3`** — local SQLite adapter

---

*Colibrí — Trusted hands across Colombia.*
