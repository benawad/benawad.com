import Link from "next/link"
import Bio from "@/components/Bio"
import { getAllPosts } from "@/lib/posts"

export default async function Home() {
  const posts = await getAllPosts()

  // Posts to hide from the main list
  const hiddenPosts = [
    "Best GraphQL Stack for Node.js",
    "How to Manage State in React.js?",
    "FAQ",
  ]

  // Filter out hidden posts
  const blogPosts = posts.filter((post) => !hiddenPosts.includes(post.title))

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <main className="max-w-2xl mx-auto px-6 py-16 sm:py-20 w-full">
        <Bio />
        {/* {blogPosts.length > 0 ? (
          <div className="mt-24 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-sm font-medium mb-6 text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Archive
            </h2>
            <ul className="space-y-2">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="group-hover:underline">
                        {post.title}
                      </span>
                      {post.date ? (
                        <span className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null} */}
      </main>
    </div>
  )
}
