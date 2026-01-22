interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "category" | "series";
  className?: string;
}

export function Tag({
  children,
  variant = "default",
  className = "",
}: TagProps) {
  const getStyles = () => {
    switch (variant) {
      case "category":
        return {
          backgroundColor: "var(--bg-secondary)",
          color: "var(--text-secondary)",
          border: "1px solid var(--border-primary)",
        };
      case "series":
        return {
          backgroundColor: "transparent",
          color: "var(--accent)",
          border: "1px solid var(--accent)",
        };
      default:
        return {
          backgroundColor: "var(--bg-hover)",
          color: "var(--text-muted)",
        };
    }
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs rounded-md ${className}`}
      style={getStyles()}
    >
      {children}
    </span>
  );
}
