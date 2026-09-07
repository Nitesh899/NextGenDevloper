import {
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  Users,
} from "lucide-react";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function ExperienceStats() {
  const { portfolio } = usePortfolio();

  const about = portfolio?.about;

  const stats = [
    {
      id: "experience",
      value: about?.years_of_experience ?? 0,
      suffix: "+",
      label: "Years Experience",
      description: "Building modern digital solutions",
      icon: BriefcaseBusiness,
    },
    {
      id: "projects",
      value: about?.projects_completed ?? 0,
      suffix: "+",
      label: "Projects Completed",
      description: "Websites, apps and software solutions",
      icon: CheckCircle2,
    },
    {
      id: "clients",
      value: about?.clients_served ?? 0,
      suffix: "+",
      label: "Clients Served",
      description: "Helping businesses grow digitally",
      icon: Users,
    },
    {
      id: "technologies",
      value: about?.technologies_count ?? 0,
      suffix: "+",
      label: "Technologies",
      description: "Modern tools and development technologies",
      icon: Code2,
    },
  ];

  return (
    <section className="page-section-sm">
      <PageContainer>
        <SectionHeading
          align="center"
          eyebrow="Experience"
          title="Numbers That Reflect The Work"
          description="A quick look at the experience, projects and technologies behind NextGenDevloper."
        />

        {about ? (
          <div
            className="
              mt-10
              grid
              gap-4
              sm:grid-cols-2
              lg:grid-cols-4
            "
          >
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.id}
                  className="
                    theme-card
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    p-6
                    text-center
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  {/* Background Glow */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-10
                      -top-10
                      h-28
                      w-28
                      rounded-full
                      bg-cyan-400/10
                      blur-3xl
                      opacity-0
                      transition
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* Icon */}
                  <div
                    className="
                      relative
                      mx-auto
                      flex
                      h-12
                      w-12
                      items-center
                      justify-center
                      rounded-xl
                      border
                      border-theme
                      bg-theme-secondary
                      transition
                      duration-300
                      group-hover:scale-105
                    "
                  >
                    <Icon
                      size={23}
                      className="
                        text-theme-brand
                        transition
                        duration-300
                        group-hover:text-cyan-300
                      "
                      aria-hidden="true"
                    />
                  </div>

                  {/* Number */}
                  <div
                    className="
                      relative
                      mt-5
                      text-3xl
                      font-bold
                      tracking-tight
                      text-theme-primary
                    "
                  >
                    {stat.value}
                    <span className="text-theme-brand">
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3
                    className="
                      relative
                      mt-2
                      text-sm
                      font-semibold
                      text-theme-primary
                    "
                  >
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p
                    className="
                      relative
                      mt-2
                      text-xs
                      leading-5
                      text-theme-muted
                    "
                  >
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            className="
              theme-card
              mt-10
              rounded-2xl
              p-8
              text-center
            "
          >
            <p className="text-sm text-theme-muted">
              Experience statistics will appear here
              once About information is added through
              Django Admin.
            </p>
          </div>
        )}
      </PageContainer>
    </section>
  );
}