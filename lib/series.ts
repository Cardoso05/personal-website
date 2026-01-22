export const series = [
  {
    slug: "do-zero-ao-mvp",
    name: "Do Zero ao MVP",
    description: "Guia completo para tirar sua ideia do papel e lançar um produto mínimo viável",
    category: "saas-produto",
  },
  {
    slug: "rpa-na-pratica",
    name: "RPA na prática",
    description: "Aprenda automação de processos com exemplos reais e aplicáveis",
    category: "automacao-rpa",
  },
  {
    slug: "noticias-do-digital",
    name: "Notícias do Digital",
    description: "As principais novidades do mundo tech, explicadas de forma simples",
    category: "marketing-growth",
  },
  {
    slug: "build-log",
    name: "Build Log",
    description: "Bastidores e aprendizados da construção dos meus projetos",
    category: "bastidores",
  },
] as const;

export type SeriesSlug = typeof series[number]["slug"];

export function getSeriesBySlug(slug: string) {
  return series.find((s) => s.slug === slug);
}

export function getSeriesName(slug: string) {
  return getSeriesBySlug(slug)?.name ?? slug;
}
