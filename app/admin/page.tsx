"use client";

import { useState } from "react";
import { PostForm } from "@/components/admin/PostForm";
import { PostList } from "@/components/admin/PostList";
import { AuthGuard } from "@/components/admin/AuthGuard";
import { AdminHeader } from "@/components/admin/AdminHeader";

export default function AdminPage() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [activeTab, setActiveTab] = useState<"create" | "list">("create");

  const handlePostCreated = () => {
    setRefreshKey((k) => k + 1);
  };

  return (
    <AuthGuard>
      <div
        className="min-h-screen"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <AdminHeader />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="animate-fadeIn">
            {/* Aviso */}
            <div
              className="mb-6 p-4 rounded-lg text-sm border"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border-primary)",
                color: "var(--text-muted)",
              }}
            >
              💡 <strong>Dica:</strong> Esta página funciona apenas em
              desenvolvimento local. Após criar posts, faça commit e push para
              publicar.
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setActiveTab("create")}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor:
                    activeTab === "create"
                      ? "var(--btn-bg)"
                      : "var(--bg-secondary)",
                  color:
                    activeTab === "create"
                      ? "var(--btn-text)"
                      : "var(--text-muted)",
                }}
              >
                ✏️ Criar Post
              </button>
              <button
                onClick={() => setActiveTab("list")}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{
                  backgroundColor:
                    activeTab === "list"
                      ? "var(--btn-bg)"
                      : "var(--bg-secondary)",
                  color:
                    activeTab === "list"
                      ? "var(--btn-text)"
                      : "var(--text-muted)",
                }}
              >
                📋 Posts Existentes
              </button>
            </div>

            {/* Conteúdo */}
            <div
              className="rounded-xl p-6 border"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border-primary)",
              }}
            >
              {activeTab === "create" ? (
                <>
                  <h2
                    className="text-xl font-semibold mb-6"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Criar Novo Post
                  </h2>
                  <PostForm onSuccess={handlePostCreated} />
                </>
              ) : (
                <>
                  <h2
                    className="text-xl font-semibold mb-6"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Posts Existentes {refreshKey > 0 ? "(atualizado)" : ""}
                  </h2>
                  <PostList refreshKey={refreshKey} />
                </>
              )}
            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
