import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function PostCTA() {
  return (
    <div
      className="mt-12 pt-8 border-t"
      style={{ borderColor: "var(--border-primary)" }}
    >
      <div
        className="rounded-xl p-6 text-center border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-primary)",
        }}
      >
        <h3
          className="text-lg font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Gostou do conteúdo?
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Me siga nas redes para mais conteúdos sobre{" "}
          {siteConfig.subheadline.toLowerCase()}
        </p>

        <SocialLinks className="justify-center mb-6" iconSize="lg" />

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/conteudos" variant="secondary" size="md">
            Ver mais conteúdos
          </Button>
          <Button href="/contato" variant="ghost" size="md">
            Entrar em contato
          </Button>
        </div>
      </div>
    </div>
  );
}
