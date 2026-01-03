import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  topic: string;
  image: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
}

export interface PostWithContent extends Post {
  content: React.ReactElement;
}

export async function getAllPosts(): Promise<Post[]> {
  const files = fs.readdirSync(CONTENT_DIR);
  
  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const filePath = path.join(CONTENT_DIR, file);
        const source = fs.readFileSync(filePath, "utf-8");
        
        const { frontmatter } = await compileMDX<PostFrontmatter>({
          source,
          options: { parseFrontmatter: true },
        });
        
        return {
          slug,
          frontmatter,
        };
      })
  );
  
  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
}

export async function getPostBySlug(slug: string): Promise<PostWithContent | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const source = fs.readFileSync(filePath, "utf-8");
  
  const { content, frontmatter } = await compileMDX<PostFrontmatter>({
    source,
    options: { parseFrontmatter: true },
  });
  
  return {
    slug,
    frontmatter,
    content,
  };
}

export function getAllPostSlugs(): string[] {
  const files = fs.readdirSync(CONTENT_DIR);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}
