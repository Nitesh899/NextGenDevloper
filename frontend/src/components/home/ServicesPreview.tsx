import {
  ArrowRight,
  Code2,
  Database,
  Globe,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

const serviceIcons = [
  Globe,
  Code2,
  Smartphone,
  Sparkles,
  Database,
  Workflow,
];

export default function ServicesPreview() {
  const { portfolio } = usePortfolio();

  const services = [...(portfolio?.services ?? [])]
    .filter((service) => service.status === "ACTIVE")
    .sort(
      (a, b) =>
        a.display_order - b.display_order,
    )
    .slice(0, 6);

  return (
    <section className="page-section-sm">
      <PageContainer>
        <SectionHeading
          eyebrow="Services"
          title="What I Can Build For You"
          description="Practical digital solutions designed to help businesses build, launch and grow online."
        />

        {services.length > 0 ? (
          <>
            <div
              className="
                mt-10
                grid
                gap-5
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >
              {services.map((service, index) => {
                const Icon =
                  serviceIcons[
                    index % serviceIcons.length
                  ];

                return (
                  <article
                    key={service.id}
                    className="
                      theme-card
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      p-6
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
                        -right-12
                        -top-12
                        h-32
                        w-32
                        rounded-full
                        bg-purple-500/10
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
                        size={24}
                        className="
                          text-theme-brand
                          transition
                          duration-300
                          group-hover:text-purple-300
                        "
                        aria-hidden="true"
                      />
                    </div>

                    {/* Category */}
                    {service.category && (
                      <span
                        className="
                          relative
                          mt-5
                          inline-block
                          rounded-full
                          border
                          border-theme
                          px-3
                          py-1
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wider
                          text-theme-muted
                        "
                      >
                        {service.category}
                      </span>
                    )}

                    {/* Title */}
                    <h3
                      className="
                        relative
                        mt-4
                        text-xl
                        font-bold
                        text-theme-primary
                      "
                    >
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p
                      className="
                        relative
                        mt-3
                        text-sm
                        leading-6
                        text-theme-muted
                      "
                    >
                      {service.short_description}
                    </p>

                    {/* Link */}
                    <div
                      className="
                        relative
                        mt-6
                        flex
                        items-center
                        gap-2
                        text-sm
                        font-semibold
                        text-theme-brand
                      "
                    >
                      <span>Learn More</span>

                      <ArrowRight
                        size={16}
                        className="
                          transition
                          duration-300
                          group-hover:translate-x-1
                        "
                        aria-hidden="true"
                      />
                    </div>
                  </article>
                );
              })}
            </div>

            {/* View All */}
            <div className="mt-10 flex justify-center">
              <a
                href="/services"
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
                View All Services
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
              mt-10
              rounded-2xl
              p-8
              text-center
            "
          >
            <p className="text-sm text-theme-muted">
              Services will appear here once they
              are added through Django Admin.
            </p>
          </div>
        )}
      </PageContainer>
    </section>
  );
}