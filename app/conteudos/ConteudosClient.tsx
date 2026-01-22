"use client";

import { useState, useMemo } from "react";
import { type PostMeta } from "@/lib/posts";
import { categories, getCategoryName } from "@/lib/categories";
import { series, getSeriesName } from "@/lib/series";
import { SearchInput } from "@/components/ui/SearchInput";
import {
  Card,
  CardTitle,
  CardDescription,
  CardMeta,
} from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

interface ConteudosClientProps {
  initialPosts: PostMeta[];
}

export function ConteudosClient({ initialPosts }: ConteudosClientProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [seriesFilter, setSeriesFilter] = useState("");
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  const filteredPosts = useMemo(() => {
    let filtered = [...initialPosts];

    // Filtro de busca
    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(q) ||
          post.description.toLowerCase().includes(q)
      );
    }

    // Filtro de categoria
    if (categoryFilter) {
      filtered = filtered.filter((post) => post.category === categoryFilter);
    }

    // Filtro de série
    if (seriesFilter) {
      filtered = filtered.filter((post) => post.series === seriesFilter);
    }

    // Ordenação (por enquanto só recentes funciona de verdade)
    if (sortBy === "recent") {
      filtered.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }

    return filtered;
  }, [initialPosts, search, categoryFilter, seriesFilter, sortBy]);

  const selectStyles = {
    backgroundColor: "var(--bg-secondary)",
    borderColor: "var(--border-primary)",
    color: "var(--text-primary)",
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <h1
        className="text-2xl font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Conteúdos
      </h1>

      {/* Filtros */}
      <div className="space-y-4 mb-8">
        <SearchInput
          placeholder="Buscar por título ou descrição..."
          value={search}
          onChange={setSearch}
        />

        <div className="flex flex-wrap gap-3">
          {/* Categoria */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none"
            style={selectStyles}
          >
            <option value="">Todas as categorias</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* Série */}
          <select
            value={seriesFilter}
            onChange={(e) => setSeriesFilter(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none"
            style={selectStyles}
          >
            <option value="">Todas as séries</option>
            {series.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Ordenação */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "recent" | "popular")}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none"
            style={selectStyles}
          >
            <option value="recent">Mais recentes</option>
            <option value="popular">Mais populares</option>
          </select>
        </div>
      </div>

      {/* Lista de posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p style={{ color: "var(--text-muted)" }}>
            Nenhum conteúdo encontrado.
          </p>
          <button
            onClick={() => {
              setSearch("");
              setCategoryFilter("");
              setSeriesFilter("");
            }}
            className="mt-4 underline transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}

function PostCard({ post }: { post: PostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card href={`/conteudos/${post.slug}`}>
      <CardTitle className="line-clamp-2">{post.title}</CardTitle>
      <CardDescription className="line-clamp-2">
        {post.description}
      </CardDescription>
      <CardMeta>
        <Tag variant="category">{getCategoryName(post.category)}</Tag>
        <span>{post.readingTime}</span>
        <span className="hidden sm:inline">{formattedDate}</span>
      </CardMeta>
      {post.series && (
        <div className="mt-2">
          <Tag variant="series">{getSeriesName(post.series)}</Tag>
        </div>
      )}
    </Card>
  );
}
