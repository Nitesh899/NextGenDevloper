import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {FaGithub} from "react-icons/fa";
import { Link } from "react-router-dom";
import type { Project } from "../../types/portfolio";

interface ProjectDetailHeroProps {
  project: Project;
}

function formatDate(date: string | null) {
  if (!date) return null;

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ProjectDetailHero({
  project,
}: ProjectDetailHeroProps) {
  const startDate = formatDate(project.start_date);
  const endDate = formatDate(project.end_date);

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[-10rem] left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="py-14 sm:py-20">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-theme-muted transition-colors hover:text-theme-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Content */}
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  {project.category}
                </span>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-theme-muted">
                  {project.status}
                </span>

                {project.featured && (
                  <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1.5 text-xs font-semibold text-yellow-300">
                    Featured
                  </span>
                )}
              </div>

              <h1 className="mt-6 text-4xl font-black tracking-tight text-theme-primary sm:text-5xl lg:text-6xl">
                {project.title}
              </h1>

              <p className="mt-6 max-w-3xl text-base leading-8 text-theme-muted sm:text-lg">
                {project.short_description || project.description}
              </p>

              {project.client_name && (
                <div className="mt-6 text-sm text-theme-muted">
                  Client:{" "}
                  <span className="font-semibold text-theme-primary">
                    {project.client_name}
                  </span>

                  {project.client_company && (
                    <>
                      {" "}
                      ·{" "}
                      <span className="text-theme-brand">
                        {project.client_company}
                      </span>
                    </>
                  )}
                </div>
              )}

              {/* Dates */}
              {(startDate || endDate) && (
                <div className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-theme-muted">
                  <CalendarDays className="h-4 w-4 text-theme-brand" />

                  {startDate || "Start"}
                  {startDate && endDate ? " — " : ""}
                  {endDate || "Present"}
                </div>
              )}

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                  >
                    Live Demo
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}

                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                  >
                    GitHub
                    <FaGithub className="h-4 w-4" />
                  </a>
                )}

                {project.demo_url && (
                  <a
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                  >
                    Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                )}

                {project.documentation_url && (
                  <a
                    href={project.documentation_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="theme-button-outline inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
                  >
                    Documentation
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Thumbnail */}
            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="aspect-video h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center">
                    <span className="text-sm text-theme-muted">
                      Project preview unavailable
                    </span>
                  </div>
                )}
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-green-400/20 bg-theme-primary/90 px-5 py-4 backdrop-blur sm:block">
                <div className="flex items-center gap-2 text-sm font-semibold text-theme-primary">
                  <CheckCircle2 className="h-5 w-5 text-green-400" />
                  Project Showcase
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}