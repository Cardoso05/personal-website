# Campos sugeridos para páginas de projetos

Use este documento como referência ao adicionar informações nas páginas de cada projeto. Abaixo: **nome do campo**, **formato**, **onde definir** e **exemplo**.

---

## Opção A: Tudo no `config/site.ts` (simples)

Campos opcionais que você pode adicionar em cada objeto de `projects` em **config/site.ts**. A página `/projetos/[slug]` precisará ser alterada para exibir cada um.

| Campo | Tipo | Obrigatório | Exemplo | Uso na página |
|-------|------|-------------|---------|----------------|
| `name` | string | sim | `"Wipr"` | Título (já existe) |
| `slug` | string | sim | `"wipr"` | URL (já existe) |
| `description` | string | sim | `"Minha empresa de..."` | Resumo (já existe) |
| `url` | string | sim | `"https://wipr.com.br"` | Botão "Acessar" (já existe) |
| `status` | string | sim | `"ativo"` ou `"em desenvolvimento"` | Tag (já existe) |
| **`longDescription`** | string | não | Texto em uma ou mais frases, pode quebrar linha com `\n` ou usar template literal | Parágrafo abaixo da description |
| **`launchYear`** | number | não | `2024` | Ex.: "No ar desde 2024" |
| **`techStack`** | string[] | não | `["Next.js", "Postgres", "Stripe"]` | Lista de tags ou chips |
| **`role`** | string | não | `"Fundador e dev"` | Ex.: "Meu papel: Fundador e dev" |
| **`problem`** | string | não | `"Empresas perdem tempo com planilhas manual"` | Seção "Problema que resolve" |
| **`highlight`** | string | não | `"+50 clientes em 6 meses"` | Destaque em negrito ou badge |
| **`links`** | objeto | não | `{ demo: "https://...", repo: "https://github.com/..." }` | Links secundários (Demo, Repo, Blog) |

### Exemplo de objeto completo no `config/site.ts`

```ts
{
  name: "Wipr",
  slug: "wipr",
  description: "Minha Empresa de Desenvolvimento de Ferramentas de Automação",
  url: "https://wipr.com.br",
  status: "ativo",
  longDescription: "A Wipr nasceu da necessidade de entregar automações que realmente rodam em produção. Trabalhamos com RPA, integrações e ferramentas sob medida para operações e growth.",
  launchYear: 2024,
  techStack: ["Next.js", "Node", "Postgres", "n8n", "Make"],
  role: "Fundador e desenvolvimento",
  problem: "Empresas dependem de planilhas e processos manuais que não escalam.",
  highlight: "Dezenas de automações em produção",
  links: {
    demo: "https://demo.wipr.com.br",
    case: "https://cardosomatheus.com.br/conteudos/caso-wipr",
  },
}
```

### Formato de `longDescription`

- **Uma linha:** use string normal: `"Texto aqui."`
- **Vários parágrafos:** use template literal (crase) com `\n\n` entre parágrafos:

```ts
longDescription: `Primeiro parágrafo explicando o contexto e o que é o produto.

Segundo parágrafo com métricas, diferenciais ou próximos passos.`,
```

---

## Opção B: Conteúdo rico em MDX (um arquivo por projeto)

Se quiser texto longo, listas, imagens e até componentes React na página do projeto, dá para usar **um arquivo MDX por projeto** (como os posts).

### Onde criar

- **Pasta:** `content/projects/`
- **Nome do arquivo:** `{slug}.mdx` (ex.: `wipr.mdx`, `bealiveapp.mdx`)

### Frontmatter sugerido (YAML no topo do .mdx)

```yaml
---
# Esses campos podem espelhar ou complementar o config/site.ts
title: "Wipr"
slug: "wipr"
description: "Minha Empresa de Desenvolvimento de Ferramentas de Automação"
status: "ativo"
url: "https://wipr.com.br"
launchYear: 2024
techStack: ["Next.js", "Node", "Postgres"]
role: "Fundador e desenvolvimento"
---
```

### Corpo do arquivo (Markdown/MDX)

Todo o texto abaixo do frontmatter vira o “conteúdo explicativo” da página (como no blog). Você pode usar:

- **Títulos:** `## O problema`, `## Como funciona`
- **Parágrafos e listas**
- **Negrito e links**
- **Imagens:** `![Alt](/projetos/wipr-screenshot.png)` (colocar imagens em `public/` ou usar componente de Image do Next)
- **Componentes:** se o seu MDX estiver configurado com componentes, pode usar `<Tag>Next.js</Tag>` etc.

Exemplo de `content/projects/wipr.mdx`:

```mdx
---
title: "Wipr"
slug: "wipr"
description: "Minha Empresa de Desenvolvimento de Ferramentas de Automação"
status: "ativo"
url: "https://wipr.com.br"
launchYear: 2024
techStack: ["Next.js", "Node", "Postgres", "n8n"]
role: "Fundador e desenvolvimento"
---

## O que é a Wipr

A Wipr nasceu da necessidade de entregar automações que realmente rodam em produção.

Trabalhamos com RPA, integrações e ferramentas sob medida para operações e growth.

## Stack principal

- Next.js e Node no core
- Postgres para dados
- n8n e Make para orquestração de fluxos

## Destaques

Mais de 50 automações em produção para clientes de diferentes setores.
```

Para usar MDX você precisará:

1. Criar `content/projects/*.mdx` com o frontmatter acima.
2. Criar um helper (ex.: `lib/projects.ts`) que leia esses arquivos com `gray-matter` (como em `lib/posts.ts`).
3. Na página `app/projetos/[slug]/page.tsx`, buscar o projeto pelo slug: primeiro no config (para url, status, etc.), depois o conteúdo MDX (se existir) e renderizar com o mesmo componente de conteúdo que você usa nos posts (ex.: `<PostContent />` ou um `<ProjectContent />`).

---

## Resumo rápido

| Se você quer... | Formato | Onde |
|-----------------|--------|------|
| Mais 2–3 campos (ano, stack, papel) | Objeto no `config/site.ts` | [config/site.ts](config/site.ts) |
| Texto explicativo longo (1–3 parágrafos) | Campo `longDescription` (string ou template literal) | `config/site.ts` |
| Texto rico (títulos, listas, imagens) | MDX com frontmatter + corpo | `content/projects/{slug}.mdx` |
| Links extras (demo, repo, caso) | Campo `links: { demo?, repo?, case? }` | `config/site.ts` |

Recomendação para começar: adicionar no **config** os campos `longDescription`, `techStack` e `launchYear` (todos opcionais) e exibir na página. Se depois quiser páginas tão ricas quanto os posts, migrar para **MDX** em `content/projects/`.
