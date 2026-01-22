export const categories = [
  {
    slug: "saas-produto",
    name: "SaaS & Produto",
    description: "Construção de produtos digitais, validação e estratégia",
  },
  {
    slug: "automacao-rpa",
    name: "Automação & RPA",
    description: "Automatização de processos e ferramentas de RPA",
  },
  {
    slug: "marketing-growth",
    name: "Marketing & Growth",
    description: "Estratégias de crescimento e aquisição de usuários",
  },
  {
    slug: "operacao-processos",
    name: "Operação & Processos",
    description: "Organização, produtividade e gestão de processos",
  },
  {
    slug: "bastidores",
    name: "Bastidores",
    description: "Build log e diário de bordo dos projetos",
  },
] as const;

export type CategorySlug = typeof categories[number]["slug"];

export function getCategoryBySlug(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string) {
  return getCategoryBySlug(slug)?.name ?? slug;
}
