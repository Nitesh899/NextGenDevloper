import { useState } from "react";
import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";
import { getTechnologyIcon } from "../../utils/technologyIcons";

interface TiltState {
  x: number;
  y: number;
}

export default function TechnologySection() {
  const { portfolio } = usePortfolio();

  const technologies = portfolio?.technologies ?? [];

  const [tilt, setTilt] = useState<Record<number, TiltState>>({});

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    technologyId: number,
  ) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt((previous) => ({
      ...previous,
      [technologyId]: {
        x: rotateX,
        y: rotateY,
      },
    }));
  };

  const handleMouseLeave = (technologyId: number) => {
    setTilt((previous) => ({
      ...previous,
      [technologyId]: {
        x: 0,
        y: 0,
      },
    }));
  };

  return (
    <section className="page-section-sm">
      <PageContainer>
        <SectionHeading
          align="center"
          eyebrow="Technologies"
          title="Technologies I Work With"
          description="Modern tools and technologies I use to build reliable, scalable and high-quality digital products."
        />

        {technologies.length > 0 ? (
          <div
            className="
              mt-10
              grid
              grid-cols-2
              gap-4
              sm:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-6
            "
            style={{
              perspective: "1200px",
            }}
          >
            {technologies.map((technology) => {
              const TechnologyIcon = getTechnologyIcon(
                technology.icon_name,
              );

              const currentTilt = tilt[technology.id] ?? {
                x: 0,
                y: 0,
              };

              return (
                <div
                  key={technology.id}
                  className="group relative"
                  style={{
                    perspective: "1000px",
                  }}
                  onMouseMove={(event) =>
                    handleMouseMove(
                      event,
                      technology.id,
                    )
                  }
                  onMouseLeave={() =>
                    handleMouseLeave(
                      technology.id,
                    )
                  }
                >
                  {/* Glow */}
                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-2
                      rounded-2xl
                      bg-cyan-400/10
                      opacity-0
                      blur-xl
                      transition
                      duration-300
                      group-hover:opacity-100
                    "
                  />

                  {/* 3D Card */}
                  <div
                    className="
                      theme-card
                      relative
                      flex
                      min-h-[150px]
                      flex-col
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-theme
                      p-5
                      text-center
                      transition-transform
                      duration-150
                      ease-out
                      will-change-transform
                      group-hover:border-cyan-400/30
                    "
                    style={{
                      transform: `
                        perspective(1000px)
                        rotateX(${currentTilt.x}deg)
                        rotateY(${currentTilt.y}deg)
                        translateZ(0)
                      `,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {/* Shine */}
                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        bg-gradient-to-br
                        from-white/[0.08]
                        via-transparent
                        to-transparent
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
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-theme
                        bg-theme-secondary
                        transition
                        duration-300
                        group-hover:scale-110
                      "
                      style={{
                        transform:
                          "translateZ(30px)",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {TechnologyIcon ? (
                        <TechnologyIcon
                          size={30}
                          className="
                            text-theme-brand
                            transition
                            duration-300
                            group-hover:text-cyan-300
                          "
                          aria-hidden="true"
                        />
                      ) : (
                        <span
                          className="
                            text-xl
                            font-bold
                            text-theme-brand
                          "
                        >
                          ?
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3
                      className="
                        relative
                        mt-4
                        text-sm
                        font-semibold
                        text-theme-primary
                      "
                      style={{
                        transform:
                          "translateZ(20px)",
                      }}
                    >
                      {technology.name}
                    </h3>

                    {/* Category */}
                    {technology.category && (
                      <span
                        className="
                          relative
                          mt-2
                          rounded-full
                          border
                          border-theme
                          px-3
                          py-1
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wide
                          text-theme-muted
                        "
                        style={{
                          transform:
                            "translateZ(15px)",
                        }}
                      >
                        {technology.category}
                      </span>
                    )}
                  </div>
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
              Technologies will appear here once they
              are added through Django Admin.
            </p>
          </div>
        )}
      </PageContainer>
    </section>
  );
}