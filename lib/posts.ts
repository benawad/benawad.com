import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface PostData {
  slug: string;
  title: string;
  description?: string;
  date?: string;
  contentHtml: string;
}

export function getPostSlugs(): string[] {
  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export async function getPostBySlug(slug: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, slug, "index.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .use(remarkGfm)
    .process(content);
  let contentHtml = processedContent.toString();

  // Rewrite relative image paths to point to public directory
  // Handle ./filename.ext pattern
  contentHtml = contentHtml.replace(
    /src="\.\/([^"]+)"/g,
    `src="/content/blog/${slug}/$1"`
  );
  // Handle filename.ext pattern (relative paths without ./)
  contentHtml = contentHtml.replace(
    /src="([^/][^"]+\.(png|jpg|jpeg|gif|mp4|webp|svg))"/g,
    (match, filename) => {
      // Only replace if it's not already an absolute path
      if (!filename.startsWith("http") && !filename.startsWith("/")) {
        return `src="/content/blog/${slug}/${filename}"`;
      }
      return match;
    }
  );

  return {
    slug,
    title: data.title || slug,
    description: data.description,
    date: data.date,
    contentHtml,
  };
}

export async function getAllPosts(): Promise<PostData[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug))
  );
  return posts.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });
}

