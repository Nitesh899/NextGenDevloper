import {
  CheckCircle2,
  Code2,
  UserRound,
} from "lucide-react";
import type { Project } from "../../types/portfolio";
import SectionHeading from "../SectionHeading";

interface ProjectOverviewProps {
  project: Project;
}

export default function ProjectOverview({
  project,
}: ProjectOverviewProps) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies
    : project.technologies
        .split(",")
        .map((technology) => technology.trim())
        .filter(Boolean);

  
  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute right-[-10rem] bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="Project Details"
          title="Inside the Project"
          description="Explore the technology, features, and implementation details behind this project."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Description */}
          <article className="theme-card rounded-2xl p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Code2 className="h-5 w-5 text-theme-brand" />
              </div>

              <h3 className="text-xl font-bold text-theme-primary">
                About This Project
              </h3>
            </div>

            <div className="mt-6 whitespace-pre-line text-sm leading-8 text-theme-muted">
              {project.description || project.short_description}
            </div>
          </article>

          {/* Client */}
          <article className="theme-card rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <UserRound className="h-5 w-5 text-theme-brand" />
              </div>

              <h3 className="text-xl font-bold text-theme-primary">
                Client
              </h3>
            </div>

            <div className="mt-6 space-y-4 text-sm">
              <div>
                <p className="text-theme-muted">Name</p>
                <p className="mt-1 font-semibold text-theme-primary">
                  {project.client_name || "Private Client"}
                </p>
              </div>

              <div>
                <p className="text-theme-muted">Company</p>
                <p className="mt-1 font-semibold text-theme-primary">
                  {project.client_company || "Independent Project"}
                </p>
              </div>

              <div>
                <p className="text-theme-muted">Status</p>
                <p className="mt-1 font-semibold text-theme-brand">
                  {project.status}
                </p>
              </div>
            </div>
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {/* Features */}
          <article className="theme-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-theme-primary">
              Key Features
            </h3>

            {project.features?.length > 0 ? (
              <ul className="mt-6 space-y-3">
                {project.features.map((feature, index) => (
                  <li
                    key={`${feature}-${index}`}
                    className="flex items-start gap-3 text-sm leading-6 text-theme-muted"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-400" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-theme-muted">
                Project features will be added soon.
              </p>
            )}
          </article>

          {/* Technologies */}
          <article className="theme-card rounded-2xl p-6">
            <h3 className="text-xl font-bold text-theme-primary">
                Technologies Used
            </h3>

            {technologies.length > 0 ? (
                <div className="mt-6 flex flex-wrap gap-3">
                {technologies.map((technology, index) => (
                    <span
                    key={`${technology}-${index}`}
                    className="
                        rounded-xl
                        border
                        border-white/10
                        bg-white/5
                        px-4
                        py-2
                        text-sm
                        font-medium
                        text-theme-primary
                        transition-all
                        duration-300
                        hover:border-cyan-400/30
                        hover:bg-cyan-400/10
                        hover:text-cyan-300
                    "
                    >
                    {technology}
                    </span>
                ))}
                </div>
            ) : (
                <p className="mt-6 text-sm text-theme-muted">
                Technologies will be added soon.
                </p>
            )}
            </article>
        </div>
      </div>
    </section>
  );
}