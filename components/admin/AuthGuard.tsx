"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth");
        
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/admin/login");
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        router.push("/admin/login");
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center">
          <div
            className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-4"
            style={{
              borderColor: "var(--border-primary)",
              borderTopColor: "var(--accent)",
            }}
          />
          <p style={{ color: "var(--text-muted)" }}>Verificando acesso...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
