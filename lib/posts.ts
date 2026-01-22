import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  series?: string;
  tags: string[];
  author: string;
  content: string;
  readingTime: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  series?: string;
  tags: string[];
  author: string;
  readingTime: string;
}

function getPostFiles(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".mdx"));
}

export function getPostBySlug(slug: string): Post | null {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);
  
  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "",
    series: data.series || undefined,
    tags: data.tags || [],
    author: data.author || "Matheus",
    content,
    readingTime: stats.text.replace("read", "de leitura").replace("min", "min"),
  };
}

export function getAllPosts(): PostMeta[] {
  const files = getPostFiles();
  
  const posts = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const post = getPostBySlug(slug);
      if (!post) return null;
      
      const { content, ...meta } = post;
      return meta;
    })
    .filter((post): post is PostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return posts;
}

export function getPostsByCategory(category: string): PostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsBySeries(seriesSlug: string): PostMeta[] {
  return getAllPosts().filter((post) => post.series === seriesSlug);
}

export function getRelatedPosts(currentSlug: string, limit = 3): PostMeta[] {
  const current = getPostBySlug(currentSlug);
  if (!current) return [];
  
  const allPosts = getAllPosts();
  
  // Prioriza posts da mesma série, depois da mesma categoria
  const related = allPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      const aScore =
        (a.series === current.series ? 2 : 0) +
        (a.category === current.category ? 1 : 0);
      const bScore =
        (b.series === current.series ? 2 : 0) +
        (b.category === current.category ? 1 : 0);
      return bScore - aScore;
    })
    .slice(0, limit);
  
  return related;
}

export function getLatestPosts(limit = 6): PostMeta[] {
  return getAllPosts().slice(0, limit);
}

export function searchPosts(query: string): PostMeta[] {
  const q = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getAllSlugs(): string[] {
  return getPostFiles().map((file) => file.replace(/\.mdx$/, ""));
}
