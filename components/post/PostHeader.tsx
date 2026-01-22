import Link from "next/link";
import { getCategoryName } from "@/lib/categories";
import { getSeriesName } from "@/lib/series";
import { Tag } from "@/components/ui/Tag";

interface PostHeaderProps {
  title: string;
  description: string;
  date: string;
  category: string;
  series?: string;
  readingTime: string;
  author: string;
}

export function PostHeader({
  title,
  description,
  date,
  category,
  series,
  readingTime,
  author,
}: PostHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <header
      className="mb-8 pb-8 border-b"
      style={{ borderColor: "var(--border-primary)" }}
    >
      {/* Meta superior */}
      <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
        <Link href={`/conteudos?category=${category}`}>
          <Tag variant="category">{getCategoryName(category)}</Tag>
        </Link>
        {series && (
          <Link href={`/series/${series}`}>
            <Tag variant="series">{getSeriesName(series)}</Tag>
          </Link>
        )}
      </div>

      {/* Título */}
      <h1
        className="text-2xl md:text-3xl font-bold mb-4 leading-tight"
        style={{ color: "var(--text-primary)" }}
      >
        {title}
      </h1>

      {/* Descrição */}
      <p className="text-lg mb-6" style={{ color: "var(--text-secondary)" }}>
        {description}
      </p>

      {/* Meta inferior */}
      <div
        className="flex items-center gap-4 text-sm"
        style={{ color: "var(--text-muted)" }}
      >
        <span>{author}</span>
        <span>·</span>
        <time dateTime={date}>{formattedDate}</time>
        <span>·</span>
        <span>{readingTime}</span>
      </div>
    </header>
  );
}
