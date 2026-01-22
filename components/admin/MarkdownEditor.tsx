"use client";

import { useState } from "react";

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder,
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  // Parser simples de Markdown para preview
  const parseMarkdown = (text: string): string => {
    if (!text) return "";

    let html = text
      // Escapar HTML
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      // Headers
      .replace(
        /^### (.*$)/gim,
        '<h3 style="color: var(--text-primary); font-weight: 600; font-size: 1.125rem; margin-top: 1.5rem; margin-bottom: 0.5rem;">$1</h3>'
      )
      .replace(
        /^## (.*$)/gim,
        '<h2 style="color: var(--text-primary); font-weight: 600; font-size: 1.25rem; margin-top: 2rem; margin-bottom: 0.75rem;">$1</h2>'
      )
      .replace(
        /^# (.*$)/gim,
        '<h1 style="color: var(--text-primary); font-weight: 700; font-size: 1.5rem; margin-top: 2rem; margin-bottom: 1rem;">$1</h1>'
      )
      // Bold e Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, "<strong><em>$1</em></strong>")
      .replace(
        /\*\*(.*?)\*\*/gim,
        '<strong style="color: var(--text-primary);">$1</strong>'
      )
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")
      // Code blocks
      .replace(
        /```([\s\S]*?)```/gim,
        '<pre style="background: var(--bg-secondary); border: 1px solid var(--border-primary); border-radius: 0.5rem; padding: 1rem; overflow-x: auto; margin: 1rem 0; font-size: 0.875rem;"><code>$1</code></pre>'
      )
      // Inline code
      .replace(
        /`(.*?)`/gim,
        '<code style="background: var(--bg-secondary); padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem;">$1</code>'
      )
      // Blockquotes
      .replace(
        /^\> (.*$)/gim,
        '<blockquote style="border-left: 4px solid var(--accent); padding-left: 1rem; font-style: italic; color: var(--text-muted); margin: 1rem 0;">$1</blockquote>'
      )
      // Unordered lists
      .replace(/^\- (.*$)/gim, '<li style="margin-left: 1rem; list-style: disc;">$1</li>')
      // Ordered lists
      .replace(
        /^\d+\. (.*$)/gim,
        '<li style="margin-left: 1rem; list-style: decimal;">$1</li>'
      )
      // Links
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        '<a href="$2" style="color: var(--accent); text-decoration: underline;">$1</a>'
      )
      // Line breaks
      .replace(/\n\n/gim, '</p><p style="margin-bottom: 1rem;">')
      .replace(/\n/gim, "<br>");

    // Wrap em parágrafo
    html = '<p style="margin-bottom: 1rem;">' + html + "</p>";

    // Limpar parágrafos vazios
    html = html.replace(/<p style="margin-bottom: 1rem;"><\/p>/g, "");
    html = html.replace(/<p style="margin-bottom: 1rem;"><br><\/p>/g, "");

    return html;
  };

  return (
    <div className="space-y-2">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <label
          className="block text-sm font-medium"
          style={{ color: "var(--text-secondary)" }}
        >
          Conteúdo (Markdown) *
        </label>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="text-xs transition-colors"
          style={{ color: "var(--accent)" }}
        >
          {showPreview ? "✏️ Editar" : "👁️ Preview"}
        </button>
      </div>

      {/* Editor ou Preview */}
      {showPreview ? (
        <div
          className="w-full min-h-[400px] px-4 py-3 rounded-lg border overflow-auto"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-primary)",
            color: "var(--text-secondary)",
          }}
          dangerouslySetInnerHTML={{ __html: parseMarkdown(value) }}
        />
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={15}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-lg border focus:outline-none font-mono text-sm resize-y min-h-[400px]"
          style={{
            backgroundColor: "var(--bg-secondary)",
            borderColor: "var(--border-primary)",
            color: "var(--text-primary)",
          }}
        />
      )}

      {/* Dica de formatação */}
      {!showPreview && (
        <div className="text-xs space-x-4" style={{ color: "var(--text-muted)" }}>
          <span>**negrito**</span>
          <span>*itálico*</span>
          <span>`código`</span>
          <span>## Título</span>
          <span>- Lista</span>
          <span>[link](url)</span>
        </div>
      )}
    </div>
  );
}
