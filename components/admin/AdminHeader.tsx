"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminHeader() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    
    try {
      await fetch("/api/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header
      className="border-b"
      style={{
        backgroundColor: "var(--bg-secondary)",
        borderColor: "var(--border-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <h1
          className="text-lg font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          📝 Admin - Posts
        </h1>
        
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            ← Voltar ao site
          </a>
          
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="text-sm px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: "var(--bg-hover)",
              color: "var(--text-muted)",
            }}
          >
            {loggingOut ? "Saindo..." : "Sair"}
          </button>
        </div>
      </div>
    </header>
  );
}
