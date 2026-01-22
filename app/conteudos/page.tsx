import { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import { ConteudosClient } from "./ConteudosClient";

export const metadata: Metadata = {
  title: "Conteúdos",
  description: "Todos os conteúdos sobre SaaS, automação, RPA, marketing e growth",
};

export default function ConteudosPage() {
  const posts = getAllPosts();
  
  return <ConteudosClient initialPosts={posts} />;
}
