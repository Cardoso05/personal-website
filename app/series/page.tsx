import { Metadata } from "next";
import { series } from "@/lib/series";
import { getPostsBySeries } from "@/lib/posts";
import {
  Card,
  CardTitle,
  CardDescription,
  CardMeta,
} from "@/components/ui/Card";
import { getCategoryName } from "@/lib/categories";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Séries",
  description:
    "Séries de conteúdos organizados por tema para aprendizado progressivo",
};

export default function SeriesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <h1
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Séries
      </h1>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Conteúdos organizados em sequência para você aprender de forma
        progressiva.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {series.map((s) => {
          const posts = getPostsBySeries(s.slug);
          return (
            <Card key={s.slug} href={`/series/${s.slug}`} className="p-6">
              <CardTitle className="text-xl mb-2">{s.name}</CardTitle>
              <CardDescription className="mb-4">
                {s.description}
              </CardDescription>
              <CardMeta>
                <Tag variant="category">{getCategoryName(s.category)}</Tag>
                <span>{posts.length} posts</span>
              </CardMeta>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
