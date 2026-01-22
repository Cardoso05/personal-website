import { MDXRemote } from "next-mdx-remote/rsc";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <article className="prose max-w-none">
      <MDXRemote source={content} />
    </article>
  );
}
