import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock3,
  Map,
} from "lucide-react";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function RoadmapPreview() {
  const { portfolio } = usePortfolio();

  const roadmap = [...(portfolio?.roadmap ?? [])]
    .filter((item) => item.is_active)
    .sort(
      (a, b) =>
        a.display_order - b.display_order,
    )
    .slice(0, 6);

  return (
    <section className="page-section-sm">
      <PageContainer>
        <SectionHeading
          align="center"
          eyebrow="Roadmap"
          title="Where We're Heading"
          description="A clear view of the ideas, improvements and milestones planned for the future."
        />

        {roadmap.length > 0 ? (
          <>
            <div
              className="
                relative
                mx-auto
                mt-12
                max-w-4xl
              "
            >
              {/* Timeline Line */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-5
                  top-2
                  bottom-2
                  w-px
                  bg-white/10
                  sm:left-1/2
                  sm:-translate-x-1/2
                "
              />

              <div className="space-y-8">
                {roadmap.map((item, index) => {
                  const status =
                    item.status?.toUpperCase() ?? "";

                  const isCompleted =
                    status === "COMPLETED" ||
                    item.is_completed === true;

                  const isPlanned =
                    status === "PLANNED";

                  return (
                    <div
                      key={item.id}
                      className="
                        relative
                        grid
                        sm:grid-cols-2
                        sm:gap-12
                      "
                    >
                      {/* Timeline Point */}
                      <div
                        className="
                          absolute
                          left-5
                          top-6
                          z-10
                          flex
                          h-3
                          w-3
                          -translate-x-1/2
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-theme
                          bg-theme-primary
                          sm:left-1/2
                        "
                      >
                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${
                              isCompleted
                                ? "bg-emerald-400"
                                : "bg-theme-brand"
                            }
                          `}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className={`
                          pl-12
                          sm:pl-0
                          ${
                            index % 2 === 0
                              ? "sm:pr-12"
                              : "sm:col-start-2 sm:pl-12"
                          }
                        `}
                      >
                        <div
                          className="
                            theme-card
                            group
                            rounded-2xl
                            p-5
                            transition-all
                            duration-300
                            hover:-translate-y-1
                          "
                        >
                          {/* Header */}
                          <div
                            className="
                              flex
                              flex-wrap
                              items-center
                              justify-between
                              gap-3
                            "
                          >
                            <div
                              className="
                                flex
                                items-center
                                gap-2
                              "
                            >
                              {isCompleted ? (
                                <CheckCircle2
                                  size={17}
                                  className="text-emerald-400"
                                  aria-hidden="true"
                                />
                              ) : isPlanned ? (
                                <Clock3
                                  size={17}
                                  className="text-amber-400"
                                  aria-hidden="true"
                                />
                              ) : (
                                <Circle
                                  size={17}
                                  className="text-theme-brand"
                                  aria-hidden="true"
                                />
                              )}

                              <span
                                className="
                                  text-[10px]
                                  font-semibold
                                  uppercase
                                  tracking-wider
                                  text-theme-muted
                                "
                              >
                                {item.status}
                              </span>
                            </div>

                            <span
                              className="
                                rounded-full
                                border
                                border-theme
                                px-2.5
                                py-1
                                text-[9px]
                                font-medium
                                text-theme-muted
                              "
                            >
                              {String(
                                index + 1,
                              ).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Title */}
                          <h3
                            className="
                              mt-4
                              text-lg
                              font-bold
                              text-theme-primary
                            "
                          >
                            {item.title}
                          </h3>

                          {/* Description */}
                          {item.description && (
                            <p
                              className="
                                mt-2
                                text-sm
                                leading-6
                                text-theme-muted
                              "
                            >
                              {item.description}
                            </p>
                          )}

                          {/* Target Date */}
                          {item.target_date && (
                            <div
                              className="
                                mt-4
                                flex
                                items-center
                                gap-2
                                text-xs
                                text-theme-muted
                              "
                            >
                              <Map
                                size={14}
                                className="text-theme-brand"
                                aria-hidden="true"
                              />

                              <span>
                                Target:{" "}
                                {new Date(
                                  item.target_date,
                                ).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                    year: "numeric",
                                  },
                                )}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* View Full Roadmap */}
            <div className="mt-10 flex justify-center">
              <a
                href="/about"
                className="
                  theme-button-outline
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                "
              >
                Explore Roadmap
                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </a>
            </div>
          </>
        ) : (
          <div
            className="
              theme-card
              mx-auto
              mt-10
              max-w-2xl
              rounded-2xl
              p-8
              text-center
            "
          >
            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-theme
                bg-theme-secondary
              "
            >
              <Map
                size={26}
                className="text-theme-brand"
                aria-hidden="true"
              />
            </div>

            <h3
              className="
                mt-4
                text-lg
                font-semibold
                text-theme-primary
              "
            >
              Roadmap Coming Soon
            </h3>

            <p
              className="
                mx-auto
                mt-2
                max-w-md
                text-sm
                leading-6
                text-theme-muted
              "
            >
              Future milestones and upcoming plans
              will appear here once they are added
              through Django Admin.
            </p>
          </div>
        )}
      </PageContainer>
    </section>
  );
}