import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Card, CardTitle, CardDescription, CardMeta } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export function FeaturedProjects() {
  if (siteConfig.projects.length === 0) {
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
            Projetos em destaque
          </h2>
          <Link
            href="/projetos"
            className="text-sm transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Ver todos →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.projects.slice(0, 3).map((project) => (
            <Card key={project.name} href={`/projetos/${project.slug}`} hover>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
              <CardMeta>
                <Tag
                  variant={project.status === "ativo" ? "series" : "default"}
                >
                  {project.status}
                </Tag>
              </CardMeta>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
