import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-2 text-sm min-h-[36px]",
    md: "px-5 py-3 text-base min-h-[44px]",
    lg: "px-6 py-4 text-lg min-h-[52px]",
  };

  const classes = `${baseStyles} ${sizes[size]} ${className}`;

  // Estilos inline baseados no tema
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: "var(--btn-bg)",
          color: "var(--btn-text)",
        };
      case "secondary":
        return {
          backgroundColor: "transparent",
          color: "var(--text-secondary)",
          border: "1px solid var(--border-primary)",
        };
      case "ghost":
        return {
          backgroundColor: "transparent",
          color: "var(--text-muted)",
        };
      default:
        return {};
    }
  };

  const hoverClass =
    variant === "primary"
      ? "hover:opacity-90"
      : variant === "secondary"
      ? "hover:bg-[var(--bg-hover)]"
      : "hover:bg-[var(--bg-hover)]";

  if (href) {
    return (
      <Link
        href={href}
        className={`${classes} ${hoverClass}`}
        style={getVariantStyles()}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${hoverClass}`}
      style={getVariantStyles()}
    >
      {children}
    </button>
  );
}
