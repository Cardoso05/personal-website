import Link from "next/link";
import { getLatestPosts } from "@/lib/posts";
import { getCategoryName } from "@/lib/categories";
import { Card, CardTitle, CardDescription, CardMeta } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function LatestPosts() {
  const posts = getLatestPosts(6);

  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--text-secondary)" }}
          >
            Últimos conteúdos
          </h2>
          <Link
            href="/conteudos"
            className="text-sm transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {posts.map((post) => (
            <Card key={post.slug} href={`/conteudos/${post.slug}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </div>
              </div>
              <CardMeta>
                <Tag variant="category">{getCategoryName(post.category)}</Tag>
                <span>{post.readingTime}</span>
              </CardMeta>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
