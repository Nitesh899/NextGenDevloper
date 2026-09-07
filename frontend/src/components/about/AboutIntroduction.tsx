import {
  CheckCircle2,
  Code2,
  Layers3,
  ArrowRight,
} from "lucide-react";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AboutIntroduction() {
  const { portfolio } = usePortfolio();

  const about = portfolio?.about;

  const description =
    about?.description ||
    about?.short_description ||
    "We build modern websites, applications and reliable digital solutions.";

  const projects =
    about?.projects_completed ?? 0;

  const clients =
    about?.clients_served ?? 0;

  return (
    <section className="page-section">
      <PageContainer>
        <div className="relative">
          {/* Background glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-20
              top-20
              h-56
              w-56
              rounded-full
              bg-cyan-400/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-20
              bottom-10
              h-56
              w-56
              rounded-full
              bg-purple-400/10
              blur-3xl
            "
          />

          <div
            className="
              relative
              grid
              items-center
              gap-12
              lg:grid-cols-[1fr_80px_1fr]
              lg:gap-8
            "
          >
            {/* =========================
                LEFT — INTRODUCTION
            ========================== */}
            <div>
              <SectionHeading
                eyebrow="Who We Are"
                title="Building digital solutions with purpose."
                description="A practical approach to modern web development, clean architecture and meaningful user experiences."
              />

              <div
                className="
                  relative
                  mt-8
                  overflow-hidden
                  rounded-3xl
                  border
                  border-theme
                  bg-theme-secondary
                  p-7
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-cyan-400/30
                  hover:shadow-xl
                  hover:shadow-cyan-500/10
                  sm:p-8
                "
              >
                {/* Card glow */}
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
                    group-hover:opacity-100
                  "
                />

                <div className="relative">
                  {/* Step indicator */}
                  <div className="flex items-center justify-between">
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
                      hover:scale-110
                      hover:-rotate-3
                      hover:bg-cyan-400/10
                    "
                  >
                    <Code2
                      size={29}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <h3
                    className="
                      mt-6
                      text-2xl
                      font-bold
                      tracking-tight
                      text-theme-primary
                    "
                  >
                    Modern Development
                  </h3>

                  <p
                    className="
                      mt-4
                      text-sm
                      leading-8
                      text-theme-muted
                      sm:text-base
                    "
                  >
                    {description}
                  </p>

                  {about?.short_description &&
                    about.short_description !== description && (
                      <p
                        className="
                          mt-4
                          text-sm
                          leading-8
                          text-theme-muted
                          sm:text-base
                        "
                      >
                        {about.short_description}
                      </p>
                    )}

                  {/* Bottom accent */}
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      bottom-0
                      left-0
                      h-[2px]
                      w-1/3
                      bg-gradient-to-r
                      from-cyan-400
                      to-transparent
                    "
                  />
                </div>
              </div>

              {/* =========================
                  HIGHLIGHTS
              ========================== */}
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-theme
                    bg-theme-secondary
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-cyan-400/30
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-theme
                        bg-theme-tertiary
                        text-theme-brand
                        transition-all
                        duration-300
                        group-hover:scale-110
                      "
                    >
                      <Code2 size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-theme-primary">
                        Modern Development
                      </p>

                      <p className="mt-1 text-xs text-theme-muted">
                        Scalable & maintainable solutions
                      </p>
                    </div>
                  </div>
                </div>

                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-theme
                    bg-theme-secondary
                    p-5
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-purple-400/30
                  "
                >
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-theme
                        bg-theme-tertiary
                        text-theme-brand
                        transition-all
                        duration-300
                        group-hover:scale-110
                      "
                    >
                      <Layers3 size={20} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-theme-primary">
                        Full-Stack Approach
                      </p>

                      <p className="mt-1 text-xs text-theme-muted">
                        Frontend + backend integration
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* =========================
                CENTER ROADMAP
            ========================== */}
            <div className="relative hidden h-full min-h-[560px] lg:flex lg:items-center lg:justify-center">
              {/* Vertical line */}
              <div
                aria-hidden="true"
                className="
                  absolute
                  bottom-10
                  top-10
                  left-1/2
                  w-px
                  -translate-x-1/2
                  bg-gradient-to-b
                  from-transparent
                  via-cyan-400/50
                  to-purple-400/50
                "
              />

              {/* Center node */}
              <div
                className="
                  relative
                  z-10
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-cyan-400/40
                  bg-theme-secondary
                  shadow-xl
                  shadow-cyan-500/10
                "
              >
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

                <ArrowRight
                  size={21}
                  className="relative text-cyan-300"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* =========================
                RIGHT — STATS ROADMAP
            ========================== */}
            <div className="relative">
              {/* Mobile connector */}
              <div
                aria-hidden="true"
                className="
                  mb-6
                  flex
                  justify-center
                  lg:hidden
                "
              >
                <div
                  className="
                    h-10
                    w-px
                    bg-gradient-to-b
                    from-cyan-400/60
                    to-purple-400/60
                  "
                />
              </div>

              <div
                className="
                  space-y-5
                "
              >
                {/* Projects */}
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
                    sm:p-8
                  "
                >
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

                  <div className="relative flex items-center justify-between">
                    <span
                      className="
                        text-xs
                        font-bold
                        tracking-[0.25em]
                        text-theme-brand
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
                      Delivered
                    </span>
                  </div>

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
                    <CheckCircle2
                      size={29}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className="
                      relative
                      mt-6
                      text-4xl
                      font-bold
                      tracking-tight
                      text-theme-primary
                    "
                  >
                    {projects}
                    <span className="text-theme-brand">+</span>
                  </p>

                  <h3
                    className="
                      relative
                      mt-2
                      text-lg
                      font-semibold
                      text-theme-primary
                    "
                  >
                    Projects Completed
                  </h3>

                  <p
                    className="
                      relative
                      mt-2
                      text-sm
                      leading-6
                      text-theme-muted
                    "
                  >
                    Digital products and development projects.
                  </p>

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

                {/* Clients */}
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
                    sm:p-8
                  "
                >
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

                  <div className="relative flex items-center justify-between">
                    <span
                      className="
                        text-xs
                        font-bold
                        tracking-[0.25em]
                        text-purple-300
                      "
                    >
                      03
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
                      Impact
                    </span>
                  </div>

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
                    <Layers3
                      size={29}
                      strokeWidth={1.7}
                      aria-hidden="true"
                    />
                  </div>

                  <p
                    className="
                      relative
                      mt-6
                      text-4xl
                      font-bold
                      tracking-tight
                      text-theme-primary
                    "
                  >
                    {clients}
                    <span className="text-purple-300">+</span>
                  </p>

                  <h3
                    className="
                      relative
                      mt-2
                      text-lg
                      font-semibold
                      text-theme-primary
                    "
                  >
                    Clients Served
                  </h3>

                  <p
                    className="
                      relative
                      mt-2
                      text-sm
                      leading-6
                      text-theme-muted
                    "
                  >
                    Helping ideas become useful digital solutions.
                  </p>

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
          </div>
        </div>
      </PageContainer>
    </section>
  );
}