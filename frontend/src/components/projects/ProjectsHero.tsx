import { ArrowRight, FolderKanban, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";

export default function ProjectsHero() {
  const { portfolio } = usePortfolio();

  const projectCount = portfolio?.projects?.length ?? 0;

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-10 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="flex min-h-[500px] items-center py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-sm font-medium text-blue-300">
              <Sparkles className="h-4 w-4" />
              Selected Work
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-theme-primary sm:text-5xl lg:text-7xl">
              Projects That
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Turn Ideas Into Reality
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-theme-muted sm:text-lg">
              Explore websites, applications, AI solutions, software
              platforms, and other digital products built with modern
              technologies.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <FolderKanban className="h-5 w-5 text-theme-brand" />

                <span className="text-sm text-theme-muted">
                  <strong className="text-theme-primary">
                    {projectCount}
                  </strong>{" "}
                  {projectCount === 1 ? "Project" : "Projects"}
                </span>
              </div>

              <Link
                to="/quote"
                className="theme-button-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}