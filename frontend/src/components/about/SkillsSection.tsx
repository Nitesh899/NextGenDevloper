import { useMemo } from "react";
import { Code2, Database, Layers3, Sparkles } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../SectionHeading";

const categoryIcons: Record<string, typeof Code2> = {
  frontend: Code2,
  backend: Database,
  database: Database,
  fullstack: Layers3,
  default: Sparkles,
};

function getCategoryIcon(category: string) {
  const key = category.toLowerCase();

  if (key.includes("front")) return categoryIcons.frontend;
  if (key.includes("back")) return categoryIcons.backend;
  if (key.includes("database")) return categoryIcons.database;
  if (key.includes("full")) return categoryIcons.fullstack;

  return categoryIcons.default;
}

export default function SkillsSection() {
  const { portfolio } = usePortfolio();

  const skills = useMemo(() => {
    return [...(portfolio?.skills ?? [])]
      .filter((skill) => skill.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }, [portfolio?.skills]);

  const groupedSkills = useMemo(() => {
    return skills.reduce<Record<string, typeof skills>>((groups, skill) => {
      const category = skill.category?.trim() || "Other";

      if (!groups[category]) {
        groups[category] = [];
      }

      groups[category].push(skill);

      return groups;
    }, {});
  }, [skills]);

  return (
    <section className="section relative overflow-hidden">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-10 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="Technical Expertise"
          title="Skills & Technologies"
          description="A practical combination of frontend, backend, database, and modern development skills used to build reliable digital products."
        />

        {skills.length === 0 ? (
          <div className="theme-card mt-12 rounded-2xl p-10 text-center">
            <Sparkles className="mx-auto mb-4 h-10 w-10 text-theme-brand" />

            <h3 className="text-xl font-semibold text-theme-primary">
              Skills Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-theme-muted">
              Skills and technical expertise will appear here once they are
              added through Django Admin.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-10">
            {Object.entries(groupedSkills).map(
              ([category, categorySkills]) => {
                const CategoryIcon = getCategoryIcon(category);

                return (
                  <div key={category}>
                    {/* Category heading */}
                    <div className="mb-5 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <CategoryIcon className="h-5 w-5 text-theme-brand" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold capitalize text-theme-primary">
                          {category}
                        </h3>

                        <p className="text-sm text-theme-muted">
                          {categorySkills.length}{" "}
                          {categorySkills.length === 1 ? "skill" : "skills"}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {categorySkills.map((skill) => {
                        const proficiency = Math.min(
                          100,
                          Math.max(0, Number(skill.proficiency) || 0),
                        );

                        return (
                          <article
                            key={skill.id}
                            className="group theme-card rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="min-w-0">
                                <h4 className="truncate font-semibold text-theme-primary">
                                  {skill.name}
                                </h4>

                                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-theme-muted">
                                  {category}
                                </p>
                              </div>

                              <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-semibold text-theme-brand">
                                {proficiency}%
                              </span>
                            </div>

                            {/* Progress */}
                            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-700"
                                style={{
                                  width: `${proficiency}%`,
                                }}
                              />
                            </div>

                            <div className="mt-3 flex items-center justify-between text-xs text-theme-muted">
                              <span>Proficiency</span>
                              <span>{proficiency}/100</span>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </section>
  );
}