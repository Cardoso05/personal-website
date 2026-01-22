import Link from "next/link";
import { series } from "@/lib/series";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

export function SeriesGrid() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            Séries
          </h2>
          <Link
            href="/series"
            className="text-sm transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Ver todas →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {series.slice(0, 4).map((s) => (
            <Card key={s.slug} href={`/series/${s.slug}`}>
              <CardTitle>{s.name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {s.description}
              </CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
