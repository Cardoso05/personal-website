import Link from "next/link";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  href?: string;
  className?: string;
  hover?: boolean;
}

export function Card({
  children,
  href,
  className = "",
  hover = true,
}: CardProps) {
  const baseStyles = {
    backgroundColor: "var(--bg-card)",
    borderColor: "var(--border-primary)",
  };

  const hoverStyles = hover
    ? "hover:border-[var(--accent)] hover:bg-[var(--bg-hover)]"
    : "";

  const classes = `border rounded-xl p-5 transition-all duration-200 ${hoverStyles} ${className}`;

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`} style={baseStyles}>
        {children}
      </Link>
    );
  }

  return (
    <div className={classes} style={baseStyles}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

export function CardTitle({ children, className = "" }: CardTitleProps) {
  return (
    <h3
      className={`text-lg font-semibold mb-2 ${className}`}
      style={{ color: "var(--text-primary)" }}
    >
      {children}
    </h3>
  );
}

interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = "",
}: CardDescriptionProps) {
  return (
    <p
      className={`text-sm leading-relaxed ${className}`}
      style={{ color: "var(--text-muted)" }}
    >
      {children}
    </p>
  );
}

interface CardMetaProps {
  children: ReactNode;
  className?: string;
}

export function CardMeta({ children, className = "" }: CardMetaProps) {
  return (
    <div
      className={`flex items-center gap-3 text-xs mt-3 ${className}`}
      style={{ color: "var(--text-subtle)" }}
    >
      {children}
    </div>
  );
}
