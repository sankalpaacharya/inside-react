import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/mdx";

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.frontmatter.title} | Sanku's Blog`,
    description: post.frontmatter.description,
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      {/* MDX Content - full width, no header */}
      <article
        className="prose prose-invert max-w-none
          prose-headings:font-medium prose-headings:tracking-tight
          prose-p:text-muted-foreground prose-p:leading-relaxed
          prose-strong:text-foreground prose-strong:font-medium
          prose-code:text-sm prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
      >
        {post.content}
      </article>
    </main>
  );
}
