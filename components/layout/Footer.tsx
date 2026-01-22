import Link from "next/link";
import { siteConfig } from "@/config/site";
import { SocialLinks } from "@/components/ui/SocialLinks";

const footerLinks = [
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/series", label: "Séries" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/now", label: "Now" },
  { href: "/contato", label: "Contato" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="border-t mt-16 pb-24 md:pb-8"
      style={{ borderColor: "var(--border-secondary)" }}
    >
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-lg font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {siteConfig.name}
            </Link>
            <p className="text-sm max-w-xs" style={{ color: "var(--text-subtle)" }}>
              {siteConfig.subheadline}
            </p>
            <SocialLinks iconSize="md" />
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm transition-colors hover:opacity-80"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-8 border-t"
          style={{ borderColor: "var(--border-secondary)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-subtle)" }}>
            © {currentYear} {siteConfig.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
