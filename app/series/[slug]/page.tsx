import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { series, getSeriesBySlug } from "@/lib/series";
import { getPostsBySeries } from "@/lib/posts";
import { getCategoryName } from "@/lib/categories";
import { siteConfig } from "@/config/site";
import {
  Card,
  CardTitle,
  CardDescription,
  CardMeta,
} from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const seriesData = getSeriesBySlug(slug);

  if (!seriesData) {
    return {};
  }

  return {
    title: seriesData.name,
    description: seriesData.description,
    openGraph: {
      title: `${seriesData.name} | ${siteConfig.name}`,
      description: seriesData.description,
      type: "website",
    },
  };
}

export default async function SeriesDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const seriesData = getSeriesBySlug(slug);

  if (!seriesData) {
    notFound();
  }

  const posts = getPostsBySeries(slug);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/series"
          className="text-sm mb-4 inline-block transition-colors"
          style={{ color: "var(--accent)" }}
        >
          ← Todas as séries
        </Link>
        <h1
          className="text-2xl md:text-3xl font-bold mb-3"
          style={{ color: "var(--text-primary)" }}
        >
          {seriesData.name}
        </h1>
        <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
          {seriesData.description}
        </p>
        <div className="flex items-center gap-3">
          <Tag variant="category">{getCategoryName(seriesData.category)}</Tag>
          <span className="text-sm" style={{ color: "var(--text-muted)" }}>
            {posts.length} posts
          </span>
        </div>
      </div>

      {/* Lista de posts */}
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <Card
              key={post.slug}
              href={`/conteudos/${post.slug}`}
              className="flex gap-4"
            >
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              >
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base line-clamp-1">
                  {post.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm">
                  {post.description}
                </CardDescription>
                <CardMeta className="mt-2">
                  <span>{post.readingTime}</span>
                </CardMeta>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div
          className="text-center py-12 rounded-xl border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-primary)",
          }}
        >
          <p className="mb-4" style={{ color: "var(--text-muted)" }}>
            Esta série ainda não tem posts publicados.
          </p>
          <Button href="/conteudos" variant="secondary">
            Ver todos os conteúdos
          </Button>
        </div>
      )}
    </div>
  );
}
