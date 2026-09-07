import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Tag,
} from "lucide-react";
import { Link } from "react-router-dom";
import type {
  BlogCategory,
  BlogPost,
  BlogTag,
} from "../../types/portfolio";

interface BlogArticleHeroProps {
  post: BlogPost;
  categories: BlogCategory[];
  tags: BlogTag[];
}

export default function BlogArticleHero({
  post,
  categories,
  tags,
}: BlogArticleHeroProps) {
  const category = categories.find(
    (item) => item.id === post.category,
  );

  const postTags = tags.filter((item) =>
    post.tags.includes(item.id),
  );

  const dateValue = post.published_at || post.created_at;

  const formattedDate = new Date(dateValue).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  );

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-blue-500/10" />

      <div className="container relative py-12 md:py-20">
        <Link
          to="/blog"
          className="mb-10 inline-flex items-center gap-2 text-sm text-theme-muted transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Blog
        </Link>

        <div className="mx-auto max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            {post.is_featured && (
              <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                Featured
              </span>
            )}

            {category && (
              <span className="rounded-full border border-purple-400/20 bg-purple-400/10 px-3 py-1 text-xs text-purple-300">
                {category.name}
              </span>
            )}
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-theme-muted md:text-lg">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-theme-muted">
            <span className="inline-flex items-center gap-2">
              <CalendarDays size={17} />
              {formattedDate}
            </span>

            <span className="inline-flex items-center gap-2">
              <Clock size={17} />
              {post.reading_time} min read
            </span>
          </div>

          {postTags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {postTags.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs text-theme-muted"
                >
                  <Tag size={12} />
                  {item.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}