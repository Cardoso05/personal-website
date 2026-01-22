# Site Pessoal - cardosomatheus.com.br

Hub de conteúdo pessoal sobre SaaS, automação, RPA, marketing e growth.

## 🚀 Como rodar localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Abrir no navegador
open http://localhost:3000
```

## 📝 Como publicar novo conteúdo

### Criar um novo post

1. Crie um arquivo `.mdx` em `content/posts/`:

```bash
touch content/posts/meu-novo-post.mdx
```

2. Adicione o frontmatter no início do arquivo:

```yaml
---
title: "Título do Post"
slug: "meu-novo-post"
description: "Descrição curta para SEO (máx 160 caracteres)"
date: "2026-01-20"
category: "saas-produto"
series: "do-zero-ao-mvp"  # opcional
tags: ["tag1", "tag2", "tag3"]
author: "Matheus"
---
```

3. Escreva o conteúdo em Markdown abaixo do frontmatter

4. Commit e push para deploy automático

### Categorias disponíveis

- `saas-produto` - SaaS & Produto
- `automacao-rpa` - Automação & RPA
- `marketing-growth` - Marketing & Growth
- `operacao-processos` - Operação & Processos
- `bastidores` - Bastidores (Build log)

### Séries disponíveis

- `do-zero-ao-mvp` - Do Zero ao MVP
- `rpa-na-pratica` - RPA na prática
- `noticias-do-digital` - Notícias do Digital
- `build-log` - Build Log

## 🎨 Customização

### Dados pessoais e links

Edite o arquivo `config/site.ts`:

- Nome e bio
- Links de redes sociais
- Projetos em destaque
- Cards "Comece por aqui"

### Cores e design

Edite `tailwind.config.ts` para ajustar a paleta navy:

```typescript
colors: {
  navy: {
    50: '#f0f4f8',
    // ... outras cores
    950: '#0a1929',
  }
}
```

## 📁 Estrutura do projeto

```
├── app/                    # Páginas (App Router)
│   ├── conteudos/         # Lista e posts
│   ├── series/            # Séries
│   ├── projetos/          # Projetos
│   ├── sobre/             # Sobre
│   ├── contato/           # Contato
│   └── now/               # Now page
├── components/            # Componentes React
│   ├── layout/            # Header, Footer, BottomNav
│   ├── ui/                # Botões, Cards, etc
│   ├── home/              # Seções da home
│   └── post/              # Componentes de post
├── content/
│   └── posts/             # Arquivos MDX dos posts
├── lib/                   # Funções utilitárias
├── config/                # Configurações do site
└── public/                # Arquivos estáticos
```

## 🚢 Deploy

O site está configurado para deploy automático na Vercel:

1. Conecte o repositório na Vercel
2. As variáveis de ambiente são opcionais para o funcionamento básico
3. Cada push na main dispara um novo deploy

## ✅ Checklist de SEO/Performance

- [x] Metadados em todas as páginas
- [x] Open Graph tags configuradas
- [x] sitemap.xml automático
- [x] robots.txt configurado
- [x] Schema.org Article nos posts
- [x] Canonical URLs
- [x] Mobile-first design
- [x] Carregamento rápido (SSG)
- [x] Imagens otimizadas (placeholder)

## 📚 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Estilo**: Tailwind CSS
- **Conteúdo**: MDX
- **Deploy**: Vercel
- **Linguagem**: TypeScript

---

Feito com 💙 por Matheus Cardoso
