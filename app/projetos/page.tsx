import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import {
  Card,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Meus projetos e produtos em desenvolvimento",
};

export default function ProjetosPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fadeIn">
      <h1
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Projetos
      </h1>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Produtos e ferramentas que estou construindo. Alguns em produção, outros
        em desenvolvimento.
      </p>

      <div className="grid gap-6 sm:grid-cols-2">
        {siteConfig.projects.map((project) => (
          <Card key={project.name} href={project.url} className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-xl mb-2">{project.name}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </div>
              <Tag
                variant={project.status === "ativo" ? "series" : "default"}
                className="flex-shrink-0"
              >
                {project.status}
              </Tag>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA */}
      <div
        className="mt-12 p-6 rounded-xl border text-center"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-primary)",
        }}
      >
        <p className="mb-2" style={{ color: "var(--text-secondary)" }}>
          Quer acompanhar o desenvolvimento dos projetos?
        </p>
        <a
          href="/now"
          className="underline underline-offset-2 transition-colors"
          style={{ color: "var(--accent)" }}
        >
          Veja o que estou construindo agora →
        </a>
      </div>
    </div>
  );
}
