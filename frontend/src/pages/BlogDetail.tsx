import { ArrowLeft, FileQuestion } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import BlogArticleContent from "../components/blog/BlogArticleContent";
import BlogArticleHero from "../components/blog/BlogArticleHero";
import { usePortfolio } from "../context/PortfolioContext";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { portfolio, isLoading } = usePortfolio();

  const posts = portfolio?.blog_posts || [];
  const categories = portfolio?.blog_categories || [];
  const tags = portfolio?.blog_tags || [];

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <div className="mx-auto h-96 max-w-4xl animate-pulse rounded-2xl bg-white/5" />
        </div>
      </section>
    );
  }

  const post = posts.find(
    (item) =>
      item.slug === slug &&
      item.is_active &&
      item.status === "PUBLISHED",
  );

  if (!post) {
    return (
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-400/10 text-red-300">
              <FileQuestion size={26} />
            </div>

            <h1 className="text-2xl font-semibold text-white">
              Article not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-theme-muted">
              The article you're looking for does not exist or is
              no longer published.
            </p>

            <Link
              to="/blog"
              className="theme-button-primary mt-7 inline-flex items-center gap-2"
            >
              <ArrowLeft size={17} />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <BlogArticleHero
        post={post}
        categories={categories}
        tags={tags}
      />

      <BlogArticleContent post={post} />
    </>
  );
}