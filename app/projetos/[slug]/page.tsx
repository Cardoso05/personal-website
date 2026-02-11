import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs, getProjectContent } from "@/lib/projects";
import { Tag } from "@/components/ui/Tag";
import { PostContent } from "@/components/post/PostContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: project.name,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
    },
    twitter: {
      card: "summary",
      title: project.name,
      description: project.description,
    },
  };
}

function hasValidUrl(url: string): boolean {
  return !!url && url !== "#";
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  const projectContent = getProjectContent(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <Link
        href="/projetos"
        className="inline-flex items-center gap-1 text-sm mb-6 transition-colors"
        style={{ color: "var(--text-muted)" }}
      >
        ← Ver todos os projetos
      </Link>

      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {project.name}
          </h1>
          <Tag
            variant={project.status === "ativo" ? "series" : "default"}
            className="shrink-0"
          >
            {project.status}
          </Tag>
        </div>

        {!projectContent && (
          <p
            className="text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            {project.description}
          </p>
        )}

        {projectContent && (
          <div className="pt-2">
            <PostContent content={projectContent.content} />
          </div>
        )}

        {hasValidUrl(project.url) ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 px-6 py-4 text-lg min-h-[52px] hover:opacity-90"
            style={{
              backgroundColor: "var(--btn-bg)",
              color: "var(--btn-text)",
            }}
          >
            Acessar o projeto →
          </a>
        ) : (
          <p
            className="text-sm"
            style={{ color: "var(--text-muted)" }}
          >
            Em breve você poderá acessar este projeto.
          </p>
        )}
      </div>
    </div>
  );
}
