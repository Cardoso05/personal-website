import { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Now",
  description: `O que ${siteConfig.name} está construindo e focando agora`,
};

export default function NowPage() {
  // Data da última atualização (atualize manualmente)
  const lastUpdated = "Janeiro 2026";

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--text-primary)" }}
      >
        Now
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--text-muted)" }}>
        Atualizado em {lastUpdated} •{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="underline transition-colors"
          style={{ color: "var(--accent)" }}
        >
          O que é uma página /now?
        </a>
      </p>

      <div className="prose max-w-none">
        {/* Foco atual */}
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            🎯 Foco atual
          </h2>
          <p className="mb-4" style={{ color: "var(--text-secondary)" }}>
            Neste momento estou focado em três frentes principais:
          </p>
          <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>Produto:</strong>{" "}
              Desenvolvendo um micro-SaaS de automação
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>
                Conteúdo:
              </strong>{" "}
              Publicando semanalmente sobre SaaS, automação e growth
            </li>
            <li>
              <strong style={{ color: "var(--text-primary)" }}>
                Aprendizado:
              </strong>{" "}
              Estudando mais sobre distribuição e growth
            </li>
          </ul>
        </section>

        {/* Projetos em andamento */}
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            🔨 Construindo agora
          </h2>
          <div className="space-y-4">
            {siteConfig.projects
              .filter((p) => p.status === "em desenvolvimento")
              .map((project) => (
                <div
                  key={project.name}
                  className="p-4 rounded-lg border"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border-primary)",
                  }}
                >
                  <h3
                    className="font-medium"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                    {project.description}
                  </p>
                </div>
              ))}
          </div>
        </section>

        {/* Lendo/Consumindo */}
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            📚 Lendo/Estudando
          </h2>
          <ul className="space-y-2" style={{ color: "var(--text-secondary)" }}>
            <li>• The Mom Test - Rob Fitzpatrick</li>
            <li>• Artigos sobre SEO e distribuição orgânica</li>
            <li>• Documentação de ferramentas no-code/low-code</li>
          </ul>
        </section>

        {/* Localização */}
        <section className="mb-10">
          <h2
            className="text-xl font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            📍 Onde estou
          </h2>
          <p style={{ color: "var(--text-secondary)" }}>
            Trabalhando remotamente do Brasil.
          </p>
        </section>
      </div>

      {/* CTA */}
      <div
        className="mt-12 p-6 rounded-xl border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-primary)",
        }}
      >
        <p
          className="text-center mb-4"
          style={{ color: "var(--text-secondary)" }}
        >
          Quer acompanhar o que estou construindo?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/series/build-log"
            className="underline underline-offset-2 transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Ver Build Log →
          </Link>
          <Link
            href="/contato"
            className="underline underline-offset-2 transition-colors"
            style={{ color: "var(--accent)" }}
          >
            Entrar em contato →
          </Link>
        </div>
      </div>
    </div>
  );
}
