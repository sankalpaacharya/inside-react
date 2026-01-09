import Link from "next/link";
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
    <main className="max-w-3xl mx-auto px-6 py-12">
      {/* Back Link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-all duration-300 mb-8 hover:-translate-x-1 animate-fade-in opacity-0"
        style={{ animationDelay: "0ms", animationFillMode: "forwards" }}
      >
        <span>←</span> All posts
      </Link>

      {/* Post Header */}
      <article>
        <h1
          className="text-4xl lg:text-5xl font-bold mb-4 leading-tight animate-slide-up opacity-0"
          style={{ animationDelay: "100ms", animationFillMode: "forwards" }}
        >
          {post.frontmatter.title}
        </h1>

        <p
          className="text-xl text-muted-foreground mb-8 leading-relaxed animate-slide-up opacity-0"
          style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
        >
          {post.frontmatter.description}
        </p>

        {/* Post Meta */}
        <div
          className="flex flex-wrap gap-6 pb-8 border-b border-border mb-12 animate-slide-up opacity-0"
          style={{ animationDelay: "300ms", animationFillMode: "forwards" }}
        >
          <div>
            <p className="text-muted-foreground text-sm">Published</p>
            <p className="font-medium">{post.frontmatter.date}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Topic</p>
            <p className="font-medium">{post.frontmatter.topic}</p>
          </div>
        </div>

        {/* Featured Image */}
        <div
          className="mb-12 rounded-xl overflow-hidden animate-scale-in opacity-0"
          style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
        >
          <img
            src={post.frontmatter.image || "/placeholder.svg"}
            alt={post.frontmatter.title + " image"}
            className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* MDX Content */}
        <div
          className="prose prose-invert prose-lg max-w-none animate-fade-in opacity-0"
          style={{ animationDelay: "500ms", animationFillMode: "forwards" }}
        >
          {post.content}
        </div>
      </article>

      {/* Footer CTA */}
      <div
        className="border-t border-border pt-12 mt-16 text-center animate-fade-in opacity-0"
        style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
      >
        <p className="text-muted-foreground mb-6">
          Enjoyed this post? Subscribe to get new articles delivered to your
          inbox.
        </p>
        <button className="px-6 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-300 hover:scale-105">
          Subscribe
        </button>
      </div>
    </main>
  );
}
