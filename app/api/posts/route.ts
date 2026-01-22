import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/posts");

// Só permite operações em desenvolvimento
function isDev() {
  return process.env.NODE_ENV === "development";
}

// Gerar slug a partir do título
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9]+/g, "-") // Substitui caracteres especiais por -
    .replace(/^-|-$/g, ""); // Remove - do início e fim
}

// GET - Listar todos os posts
export async function GET() {
  if (!isDev()) {
    return NextResponse.json(
      { error: "Disponível apenas em desenvolvimento" },
      { status: 403 }
    );
  }

  try {
    if (!fs.existsSync(postsDirectory)) {
      return NextResponse.json({ posts: [] });
    }

    const files = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".mdx"));
    
    const posts = files.map((file) => {
      const filePath = path.join(postsDirectory, file);
      const content = fs.readFileSync(filePath, "utf8");
      const { data } = matter(content);
      
      return {
        slug: file.replace(".mdx", ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        category: data.category || "",
        series: data.series || null,
        tags: data.tags || [],
      };
    });

    // Ordenar por data (mais recente primeiro)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Erro ao listar posts:", error);
    return NextResponse.json(
      { error: "Erro ao listar posts" },
      { status: 500 }
    );
  }
}

// POST - Criar novo post
export async function POST(request: NextRequest) {
  if (!isDev()) {
    return NextResponse.json(
      { error: "Disponível apenas em desenvolvimento" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { title, description, category, series, tags, content } = body;

    // Validação básica
    if (!title || !description || !category || !content) {
      return NextResponse.json(
        { error: "Campos obrigatórios: title, description, category, content" },
        { status: 400 }
      );
    }

    // Gerar slug e data
    const slug = generateSlug(title);
    const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    // Verificar se já existe
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: `Já existe um post com o slug "${slug}"` },
        { status: 409 }
      );
    }

    // Criar diretório se não existir
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    // Montar frontmatter
    const frontmatter: Record<string, unknown> = {
      title,
      slug,
      description,
      date,
      category,
      tags: tags || [],
      author: "Matheus",
    };

    if (series) {
      frontmatter.series = series;
    }

    // Criar conteúdo do arquivo
    const fileContent = matter.stringify(content, frontmatter);

    // Salvar arquivo
    fs.writeFileSync(filePath, fileContent, "utf8");

    return NextResponse.json({
      success: true,
      slug,
      message: `Post criado: ${slug}.mdx`,
    });
  } catch (error) {
    console.error("Erro ao criar post:", error);
    return NextResponse.json(
      { error: "Erro ao criar post" },
      { status: 500 }
    );
  }
}
