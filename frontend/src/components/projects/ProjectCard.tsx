import {
  ArrowUpRight,
  CalendarDays,
  ExternalLink,
  Image as ImageIcon,
  UserRound,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Link } from "react-router-dom";
import type { Project } from "../../types/portfolio";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {

  console.log("TECHNOLOGIES:", project.technologies);
  const technologies = Array.isArray(project.technologies)
  ? project.technologies
  : typeof project.technologies === "string"
    ? project.technologies
        .split(",")
        .map((tech: string) => tech.trim())
        .filter(Boolean)
    : [];

  return (
    <article
      className="
        theme-card
        group
        relative
        overflow-hidden
        rounded-2xl
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-400/30
        hover:shadow-[0_20px_60px_rgba(34,211,238,0.10)]
      "
    >
      {/* =====================================================
          TOP GLOW LINE
      ====================================================== */}
      <div
        className="
          absolute
          left-0
          top-0
          z-30
          h-px
          w-0
          bg-gradient-to-r
          from-green-400
          via-cyan-400
          to-purple-400
          transition-all
          duration-700
          group-hover:w-full
        "
      />

      {/* =====================================================
          PROJECT IMAGE
      ====================================================== */}
      <div className="relative aspect-video overflow-hidden bg-white/5">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-110
            "
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-12 w-12 text-theme-muted" />
          </div>
        )}

        {/* Image Overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/90
            via-black/20
            to-transparent
          "
        />

        {/* Category */}
        <div
          className="
            absolute
            bottom-4
            left-4
            rounded-full
            border
            border-cyan-400/20
            bg-black/50
            px-3
            py-1
            text-xs
            font-medium
            text-cyan-300
            backdrop-blur-md
          "
        >
          {project.category}
        </div>

        {/* Status */}
        <div
          className="
            absolute
            right-4
            top-4
            rounded-full
            border
            border-green-400/20
            bg-green-400/10
            px-3
            py-1
            text-xs
            font-semibold
            capitalize
            text-green-300
            backdrop-blur-md
          "
        >
          {project.status}
        </div>
      </div>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <div className="relative p-6">
        {/* Glow */}
        <div
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-40
            w-40
            rounded-full
            bg-cyan-400/10
            blur-3xl
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        <div className="relative z-10">
          {/* =================================================
              TITLE
          ================================================== */}
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3
                className="
                  text-xl
                  font-bold
                  text-theme-primary
                  transition-colors
                  duration-300
                  group-hover:text-cyan-300
                "
              >
                {project.title}
              </h3>
            </div>

            {/* Project ID */}
            <span
              className="
                shrink-0
                text-xs
                font-bold
                tracking-widest
                text-theme-muted
              "
            >
              #{String(project.id).padStart(2, "0")}
            </span>
          </div>

          {/* =================================================
              CLIENT INFORMATION
          ================================================== */}
          {(project.client_name || project.client_company) && (
            <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.03] p-4">
              <div className="flex items-start gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-cyan-400/10
                    ring-1
                    ring-cyan-400/20
                  "
                >
                  <UserRound className="h-4 w-4 text-cyan-400" />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-theme-muted">
                    Client
                  </p>

                  {project.client_name && (
                    <p className="mt-1 text-sm font-semibold text-theme-primary">
                      {project.client_name}
                    </p>
                  )}

                  {project.client_company && (
                    <p className="mt-0.5 text-xs text-theme-muted">
                      {project.client_company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}


          {/* =================================================
              DATES
          ================================================== */}
          {(project.start_date || project.end_date) && (
            <div className="mt-5 grid grid-cols-2 gap-3">
              {/* Start Date */}
              {project.start_date && (
                <div
                  className="
                    rounded-xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-cyan-400" />

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted">
                      Started
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-medium text-theme-primary">
                    {formatDate(project.start_date)}
                  </p>
                </div>
              )}

              {/* End Date */}
              {project.end_date && (
                <div
                  className="
                    rounded-xl
                    border
                    border-white/5
                    bg-white/[0.03]
                    p-3
                  "
                >
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5 text-purple-400" />

                    <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-muted">
                      Completed
                    </span>
                  </div>

                  <p className="mt-2 text-xs font-medium text-theme-primary">
                    {formatDate(project.end_date)}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* =================================================
              TECHNOLOGIES
          ================================================== */}
          {technologies.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-px w-5 bg-cyan-400/40" />

                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-theme-muted">
                  Technologies
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {technologies.map((technology: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined, index: any) => (
                  <span
                    key={`${technology}-${index}`}
                    className="
                      rounded-md
                      border
                      border-cyan-400/10
                      bg-cyan-400/5
                      px-2.5
                      py-1
                      text-xs
                      text-theme-muted
                      transition-all
                      duration-300
                      group-hover:border-cyan-400/20
                      group-hover:text-theme-primary
                    "
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* =================================================
              ROADMAP CONNECTOR
          ================================================== */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />

            <div
              className="
                h-2
                w-2
                rounded-full
                bg-cyan-400
                shadow-[0_0_12px_rgba(34,211,238,0.8)]
              "
            />

            <div className="h-px flex-1 bg-gradient-to-l from-purple-400/30 to-transparent" />
          </div>

          {/* =================================================
              ACTIONS
          ================================================== */}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            {/* View Project */}
            <Link
              to={`/projects/${project.slug}`}
              className="
                theme-button-primary
                inline-flex
                items-center
                gap-2
                rounded-lg
                px-4
                py-2.5
                text-sm
                font-semibold
              "
            >
              View Project
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            {/* Live Website */}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-theme-primary
                  transition-all
                  duration-300
                  hover:border-cyan-400/20
                  hover:bg-cyan-400/5
                "
              >
                <ExternalLink className="h-4 w-4" />
                Live
              </a>
            )}

            {/* GitHub */}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  border
                  border-white/10
                  bg-white/5
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-theme-primary
                  transition-all
                  duration-300
                  hover:border-purple-400/20
                  hover:bg-purple-400/5
                "
              >
                <FaGithub className="h-4 w-4" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   DATE FORMATTER
========================================================= */

function formatDate(date: string) {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}