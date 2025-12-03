import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getPostSlugs } from "@/lib/posts";

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  let post;
  try {
    post = await getPostBySlug(params.slug);
  } catch (error) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-3xl mx-auto px-6 py-16 sm:py-20">
        <Link
          href="/"
          className="text-blue-600 dark:text-blue-400 hover:underline mb-10 inline-block transition-colors"
        >
          ← home
        </Link>
        <article className="markdown-body">
          <header className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
              {post.title}
            </h1>
            {post.date ? (
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            ) : null}
          </header>
          <section
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            className="prose prose-lg dark:prose-invert max-w-none"
          />
        </article>
      </main>
    </div>
  );
}

