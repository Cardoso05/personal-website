import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";

export function Hero() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Avatar */}
          <div
            className="w-24 h-24 md:w-28 md:h-28 rounded-full border-2 overflow-hidden"
            style={{ borderColor: "var(--border-primary)" }}
          >
            <Image
              src="/avatar.jpeg"
              alt={siteConfig.name}
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {siteConfig.headline}
            </h1>
            <p
              className="text-base md:text-lg max-w-md"
              style={{ color: "var(--text-muted)" }}
            >
              {siteConfig.subheadline}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <Button href="/conteudos" variant="primary" size="lg">
              Ver conteúdos
            </Button>
            <Button href="/projetos" variant="secondary" size="lg">
              Ver projetos
            </Button>
          </div>

          {/* Social */}
          <SocialLinks iconSize="lg" className="pt-2" />
        </div>
      </div>
    </section>
  );
}
