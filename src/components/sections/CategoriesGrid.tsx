import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/lib/config";

export default function CategoriesGrid() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-emerald-brand text-sm font-semibold uppercase tracking-wider">
            What we cover
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-ink">
            Services across Colombia
          </h2>
          <p className="mt-4 text-ink/60 max-w-xl mx-auto">
            From dental care to curated experiences — every category connects you to a
            vetted, trusted Colombian provider.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.slug}
              href={`/services/${cat.slug}`}
              className="group relative bg-white rounded-2xl p-6 shadow-sm border border-sand hover:border-emerald-brand/30 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="text-3xl mb-3" aria-hidden="true">
                {cat.icon}
              </div>
              <h3 className="font-semibold text-ink mb-2 group-hover:text-emerald-deep">
                {cat.name}
              </h3>
              <p className="text-sm text-ink/60 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-emerald-brand text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Explore
                <ArrowRight size={14} />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border border-emerald-brand text-emerald-brand px-6 py-3 rounded-xl font-medium hover:bg-emerald-brand hover:text-white transition-colors"
          >
            View all services
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
