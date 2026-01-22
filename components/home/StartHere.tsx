import { siteConfig } from "@/config/site";
import { Card, CardTitle, CardDescription } from "@/components/ui/Card";

export function StartHere() {
  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h2
          className="text-lg font-semibold mb-6"
          style={{ color: "var(--text-secondary)" }}
        >
          Comece por aqui
        </h2>

        <div className="grid gap-4 sm:grid-cols-3">
          {siteConfig.startHere.map((item) => (
            <Card key={item.href} href={item.href}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
