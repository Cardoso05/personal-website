"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/series", label: "Séries" },
  { href: "/projetos", label: "Projetos" },
  { href: "/sobre", label: "Sobre" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header 
      className="sticky top-0 z-40 backdrop-blur-md border-b"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg-primary) 80%, transparent)",
        borderColor: "var(--border-secondary)",
      }}
    >
      <nav className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo / Nome */}
        <Link
          href="/"
          className="text-lg font-semibold transition-colors"
          style={{ color: "var(--text-primary)" }}
        >
          {siteConfig.name.split(" ")[0]}
        </Link>

        {/* Nav desktop - escondido no mobile */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm rounded-lg transition-colors"
                style={{
                  color: isActive ? "var(--text-primary)" : "var(--text-muted)",
                  backgroundColor: isActive ? "var(--bg-hover)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Ações */}
        <div className="flex items-center gap-2">
          {/* Toggle de tema */}
          <ThemeToggle />
          
          {/* Contato - sempre visível */}
          <Link
            href="/contato"
            className="text-sm transition-colors hidden sm:block"
            style={{ color: "var(--text-muted)" }}
          >
            Contato
          </Link>
        </div>
      </nav>
    </header>
  );
}
