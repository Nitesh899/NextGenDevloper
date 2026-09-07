import {
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Clock3,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function BlogPreview() {
  const { portfolio } = usePortfolio();

  const posts = [...(portfolio?.blog_posts ?? [])]
    .filter(
      (post) =>
        post.status === "PUBLISHED" &&
        post.is_active,
    )
    .sort((a, b) => {
      const dateA = a.published_at
        ? new Date(a.published_at).getTime()
        : new Date(a.created_at).getTime();

      const dateB = b.published_at
        ? new Date(b.published_at).getTime()
        : new Date(b.created_at).getTime();

      return dateB - dateA;
    })
    .slice(0, 3);

  const categories = portfolio?.blog_categories ?? [];

  const getCategoryName = (
    categoryId: number | null,
  ) => {
    if (!categoryId) return "Technology";

    return (
      categories.find(
        (category) =>
          category.id === categoryId,
      )?.name || "Technology"
    );
  };

  const formatDate = (date: string | null) => {
    if (!date) return "Latest";

    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      },
    );
  };

  return (
    <section className="page-section">
      <PageContainer>
        <SectionHeading
          eyebrow="Insights"
          title="Latest from the blog."
          description="Development insights, technology notes and practical digital knowledge."
        />

        {posts.length > 0 ? (
          <>
            <div className="responsive-grid-3 mt-10">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="
                    theme-card
                    group
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  {/* Blog Image */}
                  <div
                    className="
                      relative
                      aspect-[16/9]
                      overflow-hidden
                      bg-theme-tertiary
                    "
                  >
                    {post.cover_image ? (
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          ease-out
                          group-hover:scale-105
                        "
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          bg-theme-tertiary
                        "
                      >
                        <BookOpen
                          size={42}
                          className="
                            text-theme-brand
                            opacity-70
                          "
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {/* Image Overlay */}
                    <div
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-black/10
                        to-transparent
                      "
                    />

                    {/* Category */}
                    <div
                      className="
                        absolute
                        left-4
                        top-4
                      "
                    >
                      <span
                        className="
                          rounded-full
                          border
                          border-white/20
                          bg-black/50
                          px-3
                          py-1.5
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          text-white
                          backdrop-blur-md
                        "
                      >
                        {getCategoryName(
                          post.category,
                        )}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {post.is_featured && (
                      <div
                        className="
                          absolute
                          right-4
                          top-4
                        "
                      >
                        <span
                          className="
                            rounded-full
                            bg-theme-brand
                            px-3
                            py-1.5
                            text-[10px]
                            font-bold
                            uppercase
                            tracking-wider
                            text-black
                          "
                        >
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Image Bottom Info */}
                    <div
                      className="
                        absolute
                        bottom-4
                        left-4
                        right-4
                        flex
                        items-center
                        justify-between
                        gap-3
                        text-xs
                        text-white
                      "
                    >
                      <div className="flex items-center gap-1.5">
                        <CalendarDays
                          size={14}
                          aria-hidden="true"
                        />

                        <span>
                          {formatDate(
                            post.published_at,
                          )}
                        </span>
                      </div>

                      {post.reading_time > 0 && (
                        <div className="flex items-center gap-1.5">
                          <Clock3
                            size={14}
                            aria-hidden="true"
                          />

                          <span>
                            {post.reading_time} min read
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="
                      flex
                      flex-1
                      flex-col
                      p-6
                    "
                  >
                    <h3
                      className="
                        line-clamp-2
                        text-xl
                        font-semibold
                        leading-snug
                        text-theme-primary
                        transition-colors
                        duration-300
                        group-hover:text-theme-brand
                      "
                    >
                      {post.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        line-clamp-3
                        text-sm
                        leading-7
                        text-theme-muted
                      "
                    >
                      {post.excerpt}
                    </p>

                    {/* Read Article */}
                    <Link
                      to="/blog"
                      className="
                        mt-6
                        inline-flex
                        w-fit
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-theme-brand
                      "
                    >
                      Read article

                      <ArrowUpRight
                        size={16}
                        className="
                          transition-transform
                          duration-300
                          group-hover:translate-x-0.5
                          group-hover:-translate-y-0.5
                        "
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Blog CTA */}
            <div className="mt-10 text-center">
              <Link
                to="/blog"
                className="
                  theme-button-outline
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                "
              >
                Visit the blog

                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>
            </div>
          </>
        ) : (
          /* Empty State */
          <div
            className="
              theme-card
              mx-auto
              mt-10
              max-w-2xl
              rounded-2xl
              p-8
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-theme
                bg-theme-tertiary
              "
            >
              <BookOpen
                size={26}
                className="text-theme-brand"
                aria-hidden="true"
              />
            </div>

            <h3
              className="
                mt-4
                text-lg
                font-semibold
                text-theme-primary
              "
            >
              Latest Articles
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-theme-muted
              "
            >
              Blog posts will appear here once
              published through Django Admin.
            </p>

            <Link
              to="/blog"
              className="
                theme-button-outline
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-xl
                px-5
                py-3
                text-sm
                font-semibold
              "
            >
              Visit the blog

              <ArrowUpRight
                size={16}
                aria-hidden="true"
              />
            </Link>
          </div>
        )}
      </PageContainer>
    </section>
  );
}