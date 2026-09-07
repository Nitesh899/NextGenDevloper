import { useMemo, useState } from "react";
import { FolderOpen } from "lucide-react";

import { usePortfolio } from "../context/PortfolioContext";
import ProjectCard from "../components/projects/ProjectCard";
import ProjectFilters from "../components/projects/ProjectFilters";
import ProjectsHero from "../components/projects/ProjectsHero";
import SectionHeading from "../components/SectionHeading";

export default function Projects() {
  const { portfolio } = usePortfolio();

  const [activeCategory, setActiveCategory] = useState("ALL");

  console.log("PROJECT PAGE PORTFOLIO:", portfolio);
  console.log("PROJECTS:", portfolio?.projects);

  const projects = useMemo(() => {
    const data = portfolio?.projects ?? [];

    console.log("PROJECT DATA:", data);

    return [...data]
      .filter((project) => project.is_active)
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return Number(b.featured) - Number(a.featured);
        }

        return a.display_order - b.display_order;
      });
  }, [portfolio?.projects]);

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(
        projects
          .map((project) => project.category)
          .filter(Boolean),
      ),
    );

    return ["ALL", ...uniqueCategories];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") {
      return projects;
    }

    return projects.filter(
      (project) => project.category === activeCategory,
    );
  }, [projects, activeCategory]);

  return (
    <>
      <ProjectsHero />

      <section className="section relative overflow-hidden">
        <div className="container">
          <SectionHeading
            eyebrow="Portfolio"
            title="Featured & Recent Projects"
            description="Browse the projects and digital solutions created using modern technologies and development practices."
          />

          <div className="mt-12">
            <ProjectFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />

            {filteredProjects.length === 0 ? (
              <div className="theme-card rounded-2xl p-10 text-center">
                <FolderOpen className="mx-auto h-12 w-12 text-theme-brand" />

                <h3 className="mt-5 text-xl font-bold text-theme-primary">
                  No Projects Found
                </h3>

                <p className="mt-2 text-theme-muted">
                  Projects matching this category will appear here once
                  they are added through Django Admin.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}