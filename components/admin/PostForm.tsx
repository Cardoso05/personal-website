"use client";

import { useState } from "react";
import { categories } from "@/lib/categories";
import { series } from "@/lib/series";
import { MarkdownEditor } from "./MarkdownEditor";

interface PostFormProps {
  onSuccess: () => void;
}

export function PostForm({ onSuccess }: PostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    series: "",
    tags: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          series: formData.series || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao criar post");
      }

      setSuccess(`✓ Post criado: ${data.slug}.mdx`);
      setFormData({
        title: "",
        description: "",
        category: "",
        series: "",
        tags: "",
        content: "",
      });
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Gerar slug preview
  const slugPreview = formData.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const inputStyles = {
    backgroundColor: "var(--bg-secondary)",
    borderColor: "var(--border-primary)",
    color: "var(--text-primary)",
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Mensagens */}
      {error && (
        <div className="p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-900/30 border border-green-800 rounded-lg text-green-200 text-sm">
          {success}
        </div>
      )}

      {/* Título */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Título *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Ex: Como validar uma ideia de produto"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          style={inputStyles}
        />
        {formData.title && (
          <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
            Slug:{" "}
            <code style={{ color: "var(--accent)" }}>{slugPreview}</code>
          </p>
        )}
      </div>

      {/* Descrição */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Descrição (SEO) *
        </label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          maxLength={160}
          placeholder="Descrição curta para SEO (máx 160 caracteres)"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          style={inputStyles}
        />
        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
          {formData.description.length}/160 caracteres
        </p>
      </div>

      {/* Categoria e Série */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Categoria *
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            style={inputStyles}
          >
            <option value="">Selecione...</option>
            {categories.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            style={{ color: "var(--text-secondary)" }}
          >
            Série (opcional)
          </label>
          <select
            name="series"
            value={formData.series}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none"
            style={inputStyles}
          >
            <option value="">Nenhuma</option>
            {series.map((s) => (
              <option key={s.slug} value={s.slug}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label
          className="block text-sm font-medium mb-2"
          style={{ color: "var(--text-secondary)" }}
        >
          Tags (separadas por vírgula)
        </label>
        <input
          type="text"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Ex: validação, produto, mvp"
          className="w-full px-4 py-3 border rounded-lg focus:outline-none"
          style={inputStyles}
        />
      </div>

      {/* Conteúdo */}
      <MarkdownEditor
        value={formData.content}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, content: value }))
        }
        placeholder={`Escreva o conteúdo em Markdown...

## Exemplo de seção

- Item 1
- Item 2

**Texto em negrito** e *itálico*.

> Citação

\`\`\`
código
\`\`\``}
      />

      {/* Botão */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 font-medium rounded-lg focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          style={{
            backgroundColor: "var(--btn-bg)",
            color: "var(--btn-text)",
          }}
        >
          {isSubmitting ? "Criando..." : "Criar Post"}
        </button>
      </div>
    </form>
  );
}
