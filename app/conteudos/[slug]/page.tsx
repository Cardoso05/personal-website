import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllSlugs, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/config/site";
import { ReadingProgress } from "@/components/ui/ReadingProgress";
import { PostHeader } from "@/components/post/PostHeader";
import { PostContent } from "@/components/post/PostContent";
import { PostCTA } from "@/components/post/PostCTA";
import { RelatedPosts } from "@/components/post/RelatedPosts";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      url: `${siteConfig.url}/conteudos/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);

  // Schema.org Article
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.date,
    publisher: {
      "@type": "Person",
      name: siteConfig.name,
    },
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article className="max-w-3xl mx-auto px-4 py-8 animate-fadeIn">
        <PostHeader
          title={post.title}
          description={post.description}
          date={post.date}
          category={post.category}
          series={post.series}
          readingTime={post.readingTime}
          author={post.author}
        />
        <PostContent content={post.content} />
        <PostCTA />
        <RelatedPosts posts={relatedPosts} currentSlug={slug} />
      </article>
    </>
  );
}
