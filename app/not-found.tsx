import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center">
        <h1
          className="text-6xl font-bold mb-4"
          style={{ color: "var(--accent)" }}
        >
          404
        </h1>
        <h2
          className="text-xl font-semibold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Página não encontrada
        </h2>
        <p className="mb-8" style={{ color: "var(--text-muted)" }}>
          A página que você está procurando não existe ou foi movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button href="/" variant="primary">
            Voltar para Home
          </Button>
          <Button href="/conteudos" variant="secondary">
            Ver conteúdos
          </Button>
        </div>
      </div>
    </div>
  );
}
