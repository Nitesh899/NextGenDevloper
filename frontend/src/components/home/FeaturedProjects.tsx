import {
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import { FaGithub }from "react-icons/fa";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function FeaturedProjects() {
  const { portfolio } = usePortfolio();

  const projects =
    portfolio?.projects ?? [];

  const featuredProjects =
    projects.filter(
      (project) => project.featured,
    );

  const visibleProjects =
    featuredProjects.length > 0
      ? featuredProjects.slice(0, 3)
      : projects.slice(0, 3);

  return (
    <section className="page-section">
      <PageContainer>
        <SectionHeading
          eyebrow="Selected Work"
          title="Projects that bring ideas to life."
          description="A selection of digital products, websites and software solutions."
        />

        {visibleProjects.length > 0 ? (
          <div className="responsive-grid-3">
            {visibleProjects.map(
              (project) => (
                <article
                  key={project.id}
                  className="
                    theme-card
                    group
                    overflow-hidden
                  "
                >
                  {/* Image */}
                  <div
                    className="
                      aspect-[16/10]
                      overflow-hidden
                      bg-theme-secondary
                    "
                  >
                    {project.thumbnail ? (
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="
                          h-full
                          w-full
                          object-cover
                          transition-transform
                          duration-500
                          group-hover:scale-105
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex
                          h-full
                          items-center
                          justify-center
                          text-theme-muted
                        "
                      >
                        No preview image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className="
                          rounded-full
                          border border-theme
                          bg-theme-secondary
                          px-3 py-1
                          text-xs
                          font-medium
                          text-theme-brand
                        "
                      >
                        {project.category}
                      </span>

                      {project.featured && (
                        <span
                          className="
                            text-xs
                            font-semibold
                            text-theme-brand
                          "
                        >
                          Featured
                        </span>
                      )}
                    </div>

                    <h3
                      className="
                        mt-5
                        text-xl
                        font-semibold
                        text-theme-primary
                      "
                    >
                      {project.title}
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
                      {project.short_description ||
                        project.description ||
                        "Professional digital project."}
                    </p>

                    {/* Actions */}
                    <div
                      className="
                        mt-6
                        flex
                        flex-wrap
                        gap-2
                      "
                    >
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            theme-button-primary
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                          "
                        >
                          Live Demo
                          <ExternalLink
                            size={14}
                          />
                        </a>
                      )}

                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            theme-button-outline
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                          "
                        >
                          <FaGithub size={14} />
                          GitHub
                        </a>
                      )}

                      {!project.live_url &&
                        !project.github_url && (
                          <Link
                            to="/projects"
                            className="
                              inline-flex
                              items-center
                              gap-2
                              text-sm
                              font-semibold
                              text-theme-brand
                            "
                          >
                            View project

                            <ArrowUpRight
                              size={15}
                            />
                          </Link>
                        )}
                    </div>
                  </div>
                </article>
              ),
            )}
          </div>
        ) : (
          <div className="theme-card p-10 text-center">
            <p className="text-sm text-theme-muted">
              Projects will appear here once
              they are added through Django Admin.
            </p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to="/projects"
            className="
              theme-button-outline
              inline-flex
              items-center
              gap-2
            "
          >
            View all projects

            <ArrowRightIcon />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}

function ArrowRightIcon() {
  return <ArrowUpRight size={16} />;
}