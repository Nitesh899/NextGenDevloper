import { useMemo } from "react";
import {
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  MapPin,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../SectionHeading";

function formatDate(date: string | null) {
  if (!date) return "";

  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function ExperienceTimeline() {
  const { portfolio } = usePortfolio();

  const experiences = useMemo(() => {
    return [...(portfolio?.experience ?? [])]
      .filter((experience) => experience.is_active)
      .sort((a, b) => a.display_order - b.display_order);
  }, [portfolio?.experience]);

  return (
    <section className="section relative overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-10 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="Professional Journey"
          title="Experience"
          description="A look at my professional journey, responsibilities, and experience building modern digital solutions."
        />

        {experiences.length === 0 ? (
          <div className="theme-card mt-12 rounded-2xl p-10 text-center">
            <BriefcaseBusiness className="mx-auto mb-4 h-10 w-10 text-theme-brand" />

            <h3 className="text-xl font-semibold text-theme-primary">
              Experience Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-theme-muted">
              Professional experience will appear here once it is added
              through Django Admin.
            </p>
          </div>
        ) : (
          <div className="relative mt-14">
            {/* Desktop timeline line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-green-500/0 via-green-500/60 to-purple-500/0 md:block" />

            {/* Mobile timeline line */}
            <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-green-500/0 via-green-500/50 to-purple-500/0 md:hidden" />

            <div className="space-y-10 md:space-y-14">
              {experiences.map((experience, index) => {
                const isLeft = index % 2 === 0;

                const startDate = formatDate(experience.start_date);
                const endDate = experience.is_current
                  ? "Present"
                  : formatDate(experience.end_date);

                return (
                  <article
                    key={experience.id}
                    className="relative md:grid md:grid-cols-2 md:gap-12"
                  >
                    {/* Timeline node */}
                    <div className="absolute left-4 top-8 z-10 flex h-4 w-4 -translate-x-1/2 items-center justify-center rounded-full border-2 border-theme-primary bg-theme-brand shadow-[0_0_18px_rgba(34,197,94,0.45)] md:left-1/2">
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>

                    {/* Card */}
                    <div
                      className={
                        isLeft
                          ? "md:col-start-1 md:pr-2"
                          : "md:col-start-2 md:pl-2"
                      }
                    >
                      <div className="theme-card ml-10 rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 md:ml-0">
                        {/* Header */}
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                          <div className="flex min-w-0 gap-4">
                            {/* Company logo */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
                              {experience.company_logo ? (
                                <img
                                  src={experience.company_logo}
                                  alt={`${experience.company_name} logo`}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <BriefcaseBusiness className="h-6 w-6 text-theme-brand" />
                              )}
                            </div>

                            <div className="min-w-0">
                              <h3 className="text-lg font-bold text-theme-primary">
                                {experience.job_title}
                              </h3>

                              <p className="mt-1 font-medium text-theme-brand">
                                {experience.company_name}
                              </p>
                            </div>
                          </div>

                          {/* Current badge */}
                          {experience.is_current && (
                            <span className="inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs font-semibold text-green-300">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              Current
                            </span>
                          )}
                        </div>

                        {/* Meta */}
                        <div className="mt-5 flex flex-wrap gap-3 text-sm text-theme-muted">
                          {(startDate || endDate) && (
                            <span className="inline-flex items-center gap-1.5">
                              <CalendarDays className="h-4 w-4" />

                              {startDate}
                              {startDate && endDate ? " — " : ""}
                              {endDate}
                            </span>
                          )}

                          {experience.location && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-4 w-4" />
                              {experience.location}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {experience.description && (
                          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-theme-muted">
                            {experience.description}
                          </p>
                        )}

                        {/* Bottom accent */}
                        <div className="mt-6 h-px w-full bg-gradient-to-r from-green-500/40 via-blue-500/20 to-transparent" />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}