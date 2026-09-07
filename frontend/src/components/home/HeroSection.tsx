import {
  ArrowRight,
  Code2,
  Database,
  Layers3,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import { usePortfolio } from "../../context/PortfolioContext";
import HeroVisual from "./three/HeroVisual";

export default function HeroSection() {
  const { portfolio } = usePortfolio();

  const siteSettings = portfolio?.site_settings;
  const home = portfolio?.home;
  const technologies = portfolio?.technologies ?? [];

  const siteName =
    siteSettings?.site_name ||
    "NextGenDevloper";

  const title =
    home?.title ||
    "Building modern digital experiences";

  const description =
    home?.description ||
    "Professional web, software and digital solutions powered by modern technologies.";

  const featuredTechnologies =
    technologies.slice(0, 4);

  const fallbackTechnologies = [
    {
      name: "React",
      icon: Code2,
    },
    {
      name: "Django",
      icon: Database,
    },
    {
      name: "REST API",
      icon: Layers3,
    },
    {
      name: "Modern UI",
      icon: Sparkles,
    },
  ];

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b border-theme
      "
    >
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-theme-brand
          opacity-[0.045]
          blur-3xl
        "
      />

      <PageContainer>
        <div
          className="
            relative
            grid
            min-h-[calc(100vh-72px)]
            items-center
            gap-12
            py-20
            lg:grid-cols-[1.15fr_0.85fr]
            lg:gap-16
            lg:py-24
          "
        >
          {/* ==================================================
              LEFT
          =================================================== */}

          <div>
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-theme
                bg-theme-secondary
                px-4 py-2
                text-xs
                font-semibold
                uppercase
                tracking-[0.16em]
                text-theme-brand
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-theme-brand
                "
              />

              {siteName}
            </div>

            <h1
              className="
                mt-7
                max-w-4xl
                text-4xl
                font-bold
                leading-[1.02]
                tracking-[-0.045em]
                text-theme-primary
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              {title}
            </h1>

            <p
              className="
                mt-6
                max-w-2xl
                text-base
                leading-7
                text-theme-muted
                sm:text-lg
                sm:leading-8
              "
            >
              {description}
            </p>

            {/* CTA */}
            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <Link
                to="/projects"
                className="
                  theme-button-primary
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                "
              >
                Explore Projects

                <ArrowRight size={17} />
              </Link>

              <Link
                to="/quote"
                className="
                  theme-button-outline
                  inline-flex
                  items-center
                  justify-center
                "
              >
                Start a Project
              </Link>
            </div>

            {/* Technology pills */}
            <div className="mt-10">
              <p
                className="
                  mb-3
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.15em]
                  text-theme-muted
                "
              >
                Built with
              </p>

              <div className="flex flex-wrap mt-4 gap-2">
                {featuredTechnologies.length > 0
                  ? featuredTechnologies.map(
                      (technology) => (
                        <span
                          key={technology.id}
                          className="
                            rounded-full
                            border border-theme
                            bg-theme-secondary
                            px-3 py-1.5
                            text-xs
                            font-medium
                            text-theme-secondary
                          "
                        >
                          {technology.name}
                        </span>
                      ),
                    )
                  : fallbackTechnologies.map(
                      (technology) => {
                        const Icon =
                          technology.icon;

                        return (
                          <span
                            key={technology.name}
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-full
                              border border-theme
                              bg-theme-secondary
                              px-3 py-1.5
                              text-xs
                              font-medium
                              text-theme-secondary
                            "
                          >
                            <Icon size={13} />

                            {technology.name}
                          </span>
                        );
                      },
                    )}
              </div>
            </div>
          </div>

          {/* ==================================================
              RIGHT — 3D READY VISUAL
          =================================================== */}

          <div className="relative">
            <div
              className="
                relative
                mx-auto
                aspect-square
                w-full
                max-w-[480px]
              "
            >
              {/* Outer frame */}
              <div
                className="
                  absolute
                  inset-4
                  rounded-[2rem]
                  border border-theme
                  bg-theme-secondary
                "
              />
              

              {/* Inner visual */}
              <div
                className="
                  absolute
                  inset-10
                  flex
                  items-center
                  justify-center
                  rounded-[2.5rem]
                  border border-theme
                  bg-theme-primary
                "
              >
                
                <div
                  className="
                    relative
                    mx-auto
                    aspect-square
                    w-full
                    max-w-[520px]
                    overflow-hidden
                    rounded-[2rem]
                    border border-theme
                    bg-theme-secondary
                  "
                >
                  <HeroVisual />
                </div>
              </div>

              {/* Floating cards */}
              <div
                className="
                  absolute
                  left-0
                  top-1/4
                  rounded-xl
                  border border-theme
                  bg-theme-secondary
                  px-4 py-3
                  shadow-xl
                "
              >
                <p className="text-xs text-theme-muted">
                  Frontend
                </p>

                <p className="mt-1 text-sm font-semibold text-theme-primary">
                  React + TypeScript
                </p>
              </div>

              <div
                className="
                  absolute
                  bottom-1/4
                  right-0
                  rounded-xl
                  border border-theme
                  bg-theme-secondary
                  px-4 py-3
                  shadow-xl
                "
              >
                <p className="text-xs text-theme-muted">
                  Backend
                </p>

                <p className="mt-1 text-sm font-semibold text-theme-primary">
                  Django + REST API
                </p>
              </div>
            </div>
          </div>
        </div>
      </PageContainer>
       
    </section>
  );
}