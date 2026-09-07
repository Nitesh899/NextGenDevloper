
import {
  Eye,
  Target,
  ArrowDown,
} from "lucide-react";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function MissionVision() {
  const { portfolio } = usePortfolio();

  const about = portfolio?.about;

  const mission =
    about?.mission ||
    "To build reliable, modern and user-focused digital solutions that solve real problems.";

  const vision =
    about?.vision ||
    "To create innovative digital experiences using modern technologies and thoughtful engineering.";

  return (
    <section className="page-section bg-theme-secondary">
      <PageContainer>
        <SectionHeading
          align="center"
          eyebrow="Our Direction"
          title="Mission & Vision"
          description="The principles that guide how we approach products, technology and long-term digital solutions."
        />

        {/* =====================================================
            ROADMAP
        ===================================================== */}

        <div className="relative mt-14">
          {/* =================================================
              CENTER ROADMAP LINE
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              bottom-8
              left-1/2
              top-8
              hidden
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-cyan-400/10
              via-cyan-400/60
              to-purple-400/10
              lg:block
            "
          />

          {/* =================================================
              MISSION
          ================================================= */}

          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_80px_1fr]">
            {/* Left Content */}

            <article
              className="
                theme-card
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-theme
                p-7
                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-cyan-400/30
                hover:shadow-xl
                hover:shadow-cyan-500/10

                lg:p-8
              "
            >
              {/* Background Glow */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-cyan-400/10
                  blur-3xl

                  opacity-0
                  transition-all
                  duration-500

                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              {/* Top Meta */}

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-xs
                    font-bold
                    tracking-[0.25em]
                    text-theme-brand
                  "
                >
                  01
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-theme
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-theme-muted
                  "
                >
                  Foundation
                </span>
              </div>

              {/* Icon */}

              <div
                className="
                  relative
                  mt-7
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-theme
                  bg-theme-tertiary
                  text-theme-brand

                  transition-all
                  duration-500

                  group-hover:scale-110
                  group-hover:-rotate-3
                  group-hover:bg-cyan-400/10
                "
              >
                <Target
                  size={29}
                  strokeWidth={1.7}
                  className="
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                  aria-hidden="true"
                />
              </div>

              {/* Heading */}

              <h3
                className="
                  relative
                  mt-6
                  text-2xl
                  font-bold
                  tracking-tight
                  text-theme-primary
                "
              >
                Our Mission
              </h3>

              {/* Description */}

              <p
                className="
                  relative
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-theme-muted
                  sm:text-base
                "
              >
                {mission}
              </p>

              {/* Bottom Line */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[2px]
                  w-0
                  bg-gradient-to-r
                  from-cyan-400
                  to-transparent
                  transition-all
                  duration-500

                  group-hover:w-2/3
                "
              />
            </article>

            {/* =================================================
                CENTER NODE
            ================================================= */}

            <div className="relative z-10 hidden justify-center lg:flex">
              <div
                className="
                  relative
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-400/40
                  bg-theme-secondary
                  shadow-lg
                  shadow-cyan-500/10
                "
              >
                {/* Outer Glow */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-[-8px]
                    rounded-full
                    border
                    border-cyan-400/10
                  "
                />

                {/* Pulse */}

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-2
                    animate-pulse
                    rounded-full
                    bg-cyan-400/10
                  "
                />

                <Target
                  size={21}
                  className="
                    relative
                    text-cyan-300
                  "
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Right Empty Space */}

            <div className="hidden lg:block" />
          </div>

          {/* =================================================
              MOBILE CONNECTOR
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              flex
              justify-center
              py-6
              lg:hidden
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-theme
                bg-theme-tertiary
                text-theme-brand
              "
            >
              <ArrowDown size={18} />
            </div>
          </div>

          {/* =================================================
              VISION
          ================================================= */}

          <div className="relative mt-0 grid items-center gap-8 lg:mt-12 lg:grid-cols-[1fr_80px_1fr]">
            {/* Left Empty Space */}

            <div className="hidden lg:block" />

            {/* Center Node */}

            <div className="relative z-10 hidden justify-center lg:flex">
              <div
                className="
                  relative
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-purple-400/40
                  bg-theme-secondary
                  shadow-lg
                  shadow-purple-500/10
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-[-8px]
                    rounded-full
                    border
                    border-purple-400/10
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute
                    inset-2
                    animate-pulse
                    rounded-full
                    bg-purple-400/10
                  "
                />

                <Eye
                  size={21}
                  className="
                    relative
                    text-purple-300
                  "
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Vision Content */}

            <article
              className="
                theme-card
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-theme
                p-7
                transition-all
                duration-500

                hover:-translate-y-2
                hover:border-purple-400/30
                hover:shadow-xl
                hover:shadow-purple-500/10

                lg:p-8
              "
            >
              {/* Background Glow */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-16
                  -right-16
                  h-40
                  w-40
                  rounded-full
                  bg-purple-400/10
                  blur-3xl

                  opacity-0
                  transition-all
                  duration-500

                  group-hover:scale-150
                  group-hover:opacity-100
                "
              />

              {/* Top Meta */}

              <div
                className="
                  relative
                  flex
                  items-center
                  justify-between
                "
              >
                <span
                  className="
                    text-xs
                    font-bold
                    tracking-[0.25em]
                    text-purple-300
                  "
                >
                  02
                </span>

                <span
                  className="
                    rounded-full
                    border
                    border-theme
                    px-3
                    py-1
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-wider
                    text-theme-muted
                  "
                >
                  Future
                </span>
              </div>

              {/* Icon */}

              <div
                className="
                  relative
                  mt-7
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-theme
                  bg-theme-tertiary
                  text-purple-300

                  transition-all
                  duration-500

                  group-hover:scale-110
                  group-hover:rotate-3
                  group-hover:bg-purple-400/10
                "
              >
                <Eye
                  size={29}
                  strokeWidth={1.7}
                  className="
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                  aria-hidden="true"
                />
              </div>

              {/* Heading */}

              <h3
                className="
                  relative
                  mt-6
                  text-2xl
                  font-bold
                  tracking-tight
                  text-theme-primary
                "
              >
                Our Vision
              </h3>

              {/* Description */}

              <p
                className="
                  relative
                  mt-4
                  max-w-xl
                  text-sm
                  leading-7
                  text-theme-muted
                  sm:text-base
                "
              >
                {vision}
              </p>

              {/* Bottom Line */}

              <div
                aria-hidden="true"
                className="
                  absolute
                  bottom-0
                  right-0
                  h-[2px]
                  w-0
                  bg-gradient-to-l
                  from-purple-400
                  to-transparent
                  transition-all
                  duration-500

                  group-hover:w-2/3
                "
              />
            </article>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
