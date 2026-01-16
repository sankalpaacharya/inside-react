import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import { remarkCodeHike, recmaCodeHike, type CodeHikeConfig } from "codehike/mdx";
import { MockTweet } from "@/components/ui/mock-tweet";
import { TweetGroup } from "@/components/ui/tweet-group";
import { CodeSandbox } from "@/components/ui/codesandbox";
import { Code } from "@/components/ui/code";
import { Scrollycoding } from "@/components/ui/scrollycoding";

// Code Hike configuration
const chConfig: CodeHikeConfig = {
  components: { code: "Code" },
  syntaxHighlighting: {
    theme: "github-dark",
  },
};

const mdxComponents = {
  MockTweet,
  TweetGroup,
  CodeSandbox,
  Code,
  Scrollycoding,
};

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
          options: {
            parseFrontmatter: true,
            mdxOptions: {
              remarkPlugins: [[remarkCodeHike, chConfig]],
              recmaPlugins: [[recmaCodeHike, chConfig]],
            },
          },
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
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkCodeHike, chConfig]],
        recmaPlugins: [[recmaCodeHike, chConfig]],
      },
    },
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
