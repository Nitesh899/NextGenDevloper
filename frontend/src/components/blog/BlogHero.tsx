import { BookOpen, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";

export default function BlogHero() {
  const { portfolio } = usePortfolio();

  const siteName =
    portfolio?.site_settings?.site_name || "NextGenDevloper";

  const posts = portfolio?.blog_posts || [];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-theme-primary">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[10%] top-20 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute right-[10%] top-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative py-20 md:py-28">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-400/10 px-4 py-2 text-sm text-purple-300">
            <Sparkles size={16} />
            Developer Insights
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            The {siteName}{" "}
            <span className="gradient-text">Blog</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-theme-muted md:text-lg">
            Explore practical insights about React, Django, AI,
            full-stack development, modern web technologies and
            software engineering.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/blog"
              className="theme-button-primary inline-flex items-center gap-2"
            >
              <BookOpen size={18} />
              Explore Articles
            </Link>

            <span className="inline-flex items-center rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-theme-muted">
              {posts.length} {posts.length === 1 ? "Article" : "Articles"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}