import { siteConfig } from "@/config/site";

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
