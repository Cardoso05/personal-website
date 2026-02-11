import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { siteConfig } from "@/config/site";

const projectsDirectory = path.join(process.cwd(), "content/projects");

export type Project = (typeof siteConfig.projects)[number];

export function getAllProjects(): Project[] {
  return [...siteConfig.projects];
}

export function getProjectBySlug(slug: string): Project | null {
  return siteConfig.projects.find((p) => p.slug === slug) ?? null;
}

export function getAllProjectSlugs(): string[] {
  return siteConfig.projects.map((p) => p.slug);
}

export function getProjectContent(slug: string): { content: string } | null {
  const fullPath = path.join(projectsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content } = matter(fileContents);
  return { content };
}
