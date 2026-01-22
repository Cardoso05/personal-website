import { type PostMeta } from "@/lib/posts";
import { Card, CardTitle, CardDescription, CardMeta } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { getCategoryName } from "@/lib/categories";

interface RelatedPostsProps {
  posts: PostMeta[];
  currentSlug: string;
}

export function RelatedPosts({ posts, currentSlug }: RelatedPostsProps) {
  const filtered = posts.filter((p) => p.slug !== currentSlug).slice(0, 3);

  if (filtered.length === 0) {
    return null;
  }

  return (
    <section
      className="mt-12 pt-8 border-t"
      style={{ borderColor: "var(--border-primary)" }}
    >
      <h2
        className="text-lg font-semibold mb-6"
        style={{ color: "var(--text-primary)" }}
      >
        Posts relacionados
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <Card key={post.slug} href={`/conteudos/${post.slug}`}>
            <CardTitle className="text-base line-clamp-2">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-2 text-xs">
              {post.description}
            </CardDescription>
            <CardMeta>
              <Tag variant="category">{getCategoryName(post.category)}</Tag>
            </CardMeta>
          </Card>
        ))}
      </div>
    </section>
  );
}
