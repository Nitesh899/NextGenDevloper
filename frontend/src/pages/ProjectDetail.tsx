import { ArrowLeft, SearchX } from "lucide-react";
import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import ProjectDetailHero from "../components/projects/ProjectDetailHero";
import ProjectGallery from "../components/projects/ProjectGallery";
import ProjectOverview from "../components/projects/ProjectOverview";
import { usePortfolio } from "../context/PortfolioContext";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { portfolio } = usePortfolio();

  const project = useMemo(() => {
    return portfolio?.projects?.find(
      (item) => item.slug === slug && item.is_active,
    );
  }, [portfolio?.projects, slug]);

  if (!portfolio) {
    return (
      <section className="section">
        <div className="container">
          <div className="theme-card rounded-2xl p-10 text-center">
            <p className="text-theme-muted">
              Loading project details...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!project) {
    return (
      <section className="section">
        <div className="container">
          <div className="theme-card mx-auto max-w-xl rounded-2xl p-10 text-center">
            <SearchX className="mx-auto h-12 w-12 text-theme-brand" />

            <h1 className="mt-5 text-2xl font-bold text-theme-primary">
              Project Not Found
            </h1>

            <p className="mt-3 text-theme-muted">
              This project does not exist or is currently unavailable.
            </p>

            <Link
              to="/projects"
              className="theme-button-primary mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <ProjectDetailHero project={project} />

      <ProjectOverview project={project} />

      <ProjectGallery project={project} />

      {/* CTA */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-theme-brand">
                Have a Similar Idea?
              </p>

              <h2 className="mt-4 text-3xl font-black text-theme-primary sm:text-4xl">
                Let's build your next project.
              </h2>

              <p className="mt-4 leading-7 text-theme-muted">
                Share your requirements and let's create a professional
                solution tailored to your goals.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/request-quote"
                  className="theme-button-primary rounded-xl px-6 py-3.5 text-center font-semibold"
                >
                  Request a Quote
                </Link>

                <Link
                  to="/contact"
                  className="theme-button-outline rounded-xl px-6 py-3.5 text-center font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}