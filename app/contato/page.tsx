import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

export const metadata: Metadata = {
  title: "Contato",
  description: `Entre em contato com ${siteConfig.name}`,
};

export default function ContatoPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8 animate-fadeIn">
      <h1
        className="text-2xl font-bold mb-4"
        style={{ color: "var(--text-primary)" }}
      >
        Contato
      </h1>
      <p className="mb-8" style={{ color: "var(--text-secondary)" }}>
        Quer trocar uma ideia, fazer uma parceria ou só mandar um oi? Escolha o
        canal que preferir.
      </p>

      {/* Opções de contato */}
      <div className="space-y-6 mb-12">
        {/* Email */}
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-primary)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Email
          </h2>
          <p className="text-sm mb-3" style={{ color: "var(--text-muted)" }}>
            Para assuntos mais detalhados ou parcerias
          </p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="underline underline-offset-2 break-all transition-colors"
            style={{ color: "var(--accent)" }}
          >
            {siteConfig.email}
          </a>
        </div>

        {/* Redes Sociais */}
        <div
          className="p-6 rounded-xl border"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border-primary)",
          }}
        >
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Redes Sociais
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-muted)" }}>
            Me siga e mande DM em qualquer uma
          </p>
          <SocialLinks iconSize="lg" />
        </div>
      </div>

      {/* Formulário simples */}
      <div
        className="p-6 rounded-xl border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-primary)",
        }}
      >
        <h2
          className="text-lg font-semibold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Mande uma mensagem
        </h2>
        <form className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              placeholder="Seu nome"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              placeholder="seu@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Mensagem
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-colors resize-none"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              placeholder="Sua mensagem..."
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 font-medium rounded-lg transition-colors min-h-[48px]"
            style={{
              backgroundColor: "var(--btn-bg)",
              color: "var(--btn-text)",
            }}
          >
            Enviar mensagem
          </button>
          <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
            * Formulário demonstrativo. Configure um serviço de email para
            funcionar.
          </p>
        </form>
      </div>
    </div>
  );
}
