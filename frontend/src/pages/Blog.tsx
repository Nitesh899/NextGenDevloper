import { useMemo, useState } from "react";
import { FileText } from "lucide-react";
import BlogCard from "../components/blog/BlogCard";
import BlogFilters from "../components/blog/BlogFilters";
import BlogHero from "../components/blog/BlogHero";
import { usePortfolio } from "../context/PortfolioContext";

export default function Blog() {
  const { portfolio, isLoading } = usePortfolio();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");
  const [tag, setTag] = useState("ALL");

  const posts = portfolio?.blog_posts || [];
  const categories = portfolio?.blog_categories || [];
  const tags = portfolio?.blog_tags || [];

  const filteredPosts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return posts
      .filter((post) => post.is_active)
      .filter((post) => post.status === "PUBLISHED")
      .filter((post) => {
        if (category === "ALL") {
          return true;
        }

        return post.category === Number(category);
      })
      .filter((post) => {
        if (tag === "ALL") {
          return true;
        }

        return post.tags.includes(Number(tag));
      })
      .filter((post) => {
        if (!normalizedSearch) {
          return true;
        }

        return (
          post.title.toLowerCase().includes(normalizedSearch) ||
          post.excerpt.toLowerCase().includes(normalizedSearch) ||
          post.content.toLowerCase().includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        if (a.is_featured !== b.is_featured) {
          return a.is_featured ? -1 : 1;
        }

        return (
          new Date(
            b.published_at || b.created_at,
          ).getTime() -
          new Date(
            a.published_at || a.created_at,
          ).getTime()
        );
      });
  }, [posts, search, category, tag]);

  if (isLoading) {
    return (
      <>
        <BlogHero />

        <section className="section">
          <div className="container">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[420px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <BlogHero />

      <section className="section">
        <div className="container">
          <BlogFilters
            search={search}
            category={category}
            tag={tag}
            categories={categories}
            tags={tags}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
            onTagChange={setTag}
            onReset={() => {
              setSearch("");
              setCategory("ALL");
              setTag("ALL");
            }}
          />

          {filteredPosts.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-theme-muted">
                    Showing {filteredPosts.length}{" "}
                    {filteredPosts.length === 1
                      ? "article"
                      : "articles"}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => (
                  <BlogCard
                    key={post.id}
                    post={post}
                    categories={categories}
                    tags={tags}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300">
                <FileText size={26} />
              </div>

              <h2 className="text-xl font-semibold text-white">
                No articles found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-theme-muted">
                Try another search term or reset the category and
                tag filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}