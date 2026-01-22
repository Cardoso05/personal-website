"use client";

import { useEffect, useState } from "react";
import { getCategoryName } from "@/lib/categories";

interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  series: string | null;
  tags: string[];
}

interface PostListProps {
  refreshKey: number;
}

export function PostList({ refreshKey }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      try {
        const response = await fetch("/api/posts");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Erro ao carregar posts");
        }

        setPosts(data.posts);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [refreshKey]);

  if (loading) {
    return (
      <div
        className="text-center py-8"
        style={{ color: "var(--text-muted)" }}
      >
        Carregando posts...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
        {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        className="text-center py-8"
        style={{ color: "var(--text-muted)" }}
      >
        Nenhum post encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {posts.map((post) => (
        <div
          key={post.slug}
          className="p-4 rounded-lg border transition-colors"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-primary)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3
                className="font-medium truncate"
                style={{ color: "var(--text-primary)" }}
              >
                {post.title}
              </h3>
              <p
                className="text-sm truncate mt-1"
                style={{ color: "var(--text-muted)" }}
              >
                {post.description}
              </p>
              <div
                className="flex flex-wrap items-center gap-2 mt-2 text-xs"
                style={{ color: "var(--text-subtle)" }}
              >
                <span
                  className="px-2 py-0.5 rounded"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  {getCategoryName(post.category)}
                </span>
                <span>{post.date}</span>
                {post.series && (
                  <span
                    className="px-2 py-0.5 rounded"
                    style={{ backgroundColor: "var(--bg-hover)" }}
                  >
                    {post.series}
                  </span>
                )}
              </div>
            </div>
            <a
              href={`/conteudos/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs whitespace-nowrap transition-colors"
              style={{ color: "var(--accent)" }}
            >
              Ver →
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
