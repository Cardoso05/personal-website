import { Metadata } from "next";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Sobre",
  description: `Conheça ${siteConfig.name} - ${siteConfig.description}`,
};

export default function SobrePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
      <h1
        className="text-2xl font-bold mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Sobre
      </h1>

      {/* Avatar + Info */}
      <div className="flex flex-col sm:flex-row items-start gap-6 mb-12">
        <div
          className="w-24 h-24 rounded-full border-2 overflow-hidden flex-shrink-0"
          style={{ borderColor: "var(--border-primary)" }}
        >
          <Image
            src="/avatar.jpeg"
            alt={siteConfig.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2
            className="text-xl font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {siteConfig.name}
          </h2>
          <p
            className="leading-relaxed whitespace-pre-line"
            style={{ color: "var(--text-secondary)" }}
          >
            {siteConfig.bio}
          </p>
        </div>
      </div>

      {/* Seções */}
      <div className="space-y-12">
        {/* O que você encontra aqui */}
        <section>
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            O que você encontra aqui
          </h3>
          <ul className="space-y-3" style={{ color: "var(--text-secondary)" }}>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }} className="mt-1">
                →
              </span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>
                  SaaS & Produto:
                </strong>{" "}
                validação de ideias, construção de MVPs, estratégias de produto
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }} className="mt-1">
                →
              </span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>
                  Automação & RPA:
                </strong>{" "}
                como automatizar tarefas, ferramentas, cases práticos
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }} className="mt-1">
                →
              </span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>
                  Marketing & Growth:
                </strong>{" "}
                aquisição de usuários, growth hacking, métricas
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }} className="mt-1">
                →
              </span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>
                  Operação & Processos:
                </strong>{" "}
                produtividade, organização, sistemas pessoais
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span style={{ color: "var(--accent)" }} className="mt-1">
                →
              </span>
              <span>
                <strong style={{ color: "var(--text-primary)" }}>
                  Bastidores:
                </strong>{" "}
                o que estou construindo, erros, aprendizados
              </span>
            </li>
          </ul>
        </section>

        {/* Stack */}
        <section>
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Stack que uso
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Python",
              "n8n",
              "Make",
              "Supabase",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-lg text-sm border"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  borderColor: "var(--border-primary)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Contato */}
        <section>
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Vamos conversar?
          </h3>
          <p className="mb-6" style={{ color: "var(--text-secondary)" }}>
            Me encontre nas redes ou mande uma mensagem direta.
          </p>
          <SocialLinks iconSize="lg" className="mb-6" />
          <div className="flex flex-wrap gap-3">
            <Button href="/contato" variant="primary">
              Entrar em contato
            </Button>
            <Button href="/conteudos" variant="secondary">
              Ver conteúdos
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
