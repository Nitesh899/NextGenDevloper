import {
  ArrowUpRight,
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

interface BlogCardProps {
  post: BlogPost;
  categories: BlogCategory[];
  tags: BlogTag[];
}

export default function BlogCard({
  post,
  categories,
  tags,
}: BlogCardProps) {
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
      month: "short",
      year: "numeric",
    },
  );

  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition duration-300 hover:-translate-y-1 hover:border-purple-400/30 hover:bg-white/[0.05]">
      <Link to={`/blog/${post.slug}`}>
        <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
          {post.cover_image ? (
            <img
              src={post.cover_image}
              alt={post.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-black">
              <span className="text-5xl font-bold text-white/20">
                N
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

          {post.is_featured && (
            <span className="absolute left-4 top-4 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              Featured
            </span>
          )}

          {category && (
            <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-xs text-white backdrop-blur">
              {category.name}
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-theme-muted">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={14} />
            {formattedDate}
          </span>

          <span className="inline-flex items-center gap-1.5">
            <Clock size={14} />
            {post.reading_time} min read
          </span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h2 className="line-clamp-2 text-xl font-semibold leading-7 text-white transition group-hover:text-purple-300">
            {post.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-theme-muted">
          {post.excerpt}
        </p>

        {postTags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {postTags.slice(0, 3).map((item) => (
              <span
                key={item.id}
                className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-xs text-theme-muted"
              >
                <Tag size={11} />
                {item.name}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`/blog/${post.slug}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-purple-300 transition hover:text-purple-200"
        >
          Read article
          <ArrowUpRight
            size={17}
            className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          />
        </Link>
      </div>
    </article>
  );
}