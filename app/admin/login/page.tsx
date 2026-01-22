"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      // Redirecionar para o admin
      router.push("/admin");
      router.refresh();
    } catch (err) {
      setError("Erro ao conectar com o servidor");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full max-w-sm p-8 rounded-xl border"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border-primary)",
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-muted)",
            }}
          >
            🔐
          </div>
          <h1
            className="text-xl font-semibold"
            style={{ color: "var(--text-primary)" }}
          >
            Admin Login
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
            Acesso restrito
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Usuário
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              placeholder="Digite seu usuário"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-secondary)" }}
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-primary)",
              }}
              placeholder="Digite sua senha"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-medium transition-opacity disabled:opacity-50"
            style={{
              backgroundColor: "var(--btn-bg)",
              color: "var(--btn-text)",
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        {/* Link para voltar */}
        <div className="mt-6 text-center">
          <a
            href="/"
            className="text-sm transition-colors"
            style={{ color: "var(--text-muted)" }}
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
