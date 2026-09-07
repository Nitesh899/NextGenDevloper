import { ArrowDown, CheckCircle2 } from "lucide-react";
import type { ServiceProcess } from "../../types/portfolio";

import SectionHeading from "../SectionHeading";

interface ServiceProcessProps {
  processes: ServiceProcess[];
}

export default function ServiceProcess({
  processes,
}: ServiceProcessProps) {
  const visibleProcesses = processes
    .filter((process) => process.is_active)
    .sort((a, b) => a.step_number - b.step_number);

  return (
    <section className="section relative overflow-hidden">
      {/* =========================
          BACKGROUND GLOWS
      ========================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div
          className="
            absolute
            -left-32
            top-20
            h-80
            w-80
            rounded-full
            bg-cyan-400/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-32
            bottom-20
            h-80
            w-80
            rounded-full
            bg-purple-500/10
            blur-3xl
          "
        />
      </div>

      <div className="container relative">
        <SectionHeading
          align="center"
          eyebrow="How We Work"
          title="Our Development Process"
          description="A clear and structured workflow designed to keep your project focused from the first idea to final delivery."
        />

        {/* =========================
            EMPTY STATE
        ========================== */}
        {visibleProcesses.length === 0 ? (
          <div
            className="
              theme-card
              mx-auto
              mt-12
              max-w-2xl
              rounded-3xl
              border
              border-theme
              p-8
              text-center
            "
          >
            <p className="text-sm text-theme-muted">
              The development process for this service will be added soon.
            </p>
          </div>
        ) : (
          <div className="relative mx-auto mt-16 max-w-5xl">
            {/* =========================
                CENTER ROADMAP LINE
            ========================== */}
            <div
              aria-hidden="true"
              className="
                absolute
                bottom-10
                left-1/2
                top-10
                hidden
                w-px
                -translate-x-1/2
                bg-gradient-to-b
                from-cyan-400/10
                via-cyan-400/50
                to-purple-400/20
                lg:block
              "
            />

            {/* =========================
                PROCESS ITEMS
            ========================== */}
            <div className="space-y-10 lg:space-y-16">
              {visibleProcesses.map((process, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={process.id}
                    className="
                      relative
                      grid
                      items-center
                      lg:grid-cols-[1fr_100px_1fr]
                    "
                  >
                    {/* =========================
                        LEFT SIDE
                    ========================== */}
                    <div
                      className={
                        isLeft
                          ? "lg:pr-8"
                          : "hidden lg:block"
                      }
                    >
                      {isLeft && (
                        <article
                          className="
                            theme-card
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
                           
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
                          {/* Glow */}
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

                          {/* Top */}
                          <div className="relative flex items-center justify-between">
                            <span
                              className="
                                text-xs
                                font-bold
                                tracking-[0.25em]
                                text-theme-brand
                              "
                            >
                              {String(
                                process.step_number,
                              ).padStart(2, "0")}
                            </span>

                            <span
                              className="
                                rounded-full
                                border
                                border-theme
                                bg-theme-secondary
                                px-3
                                py-1
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-theme-muted
                              "
                            >
                              Step {process.step_number}
                            </span>
                          </div>

                          {/* Icon */}
                          <div
                            className="
                              relative
                              mt-6
                              flex
                              h-14
                              w-14
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
                              size={26}
                              strokeWidth={1.7}
                            />
                          </div>

                          {/* Title */}
                          <h3
                            className="
                              relative
                              py-2
                              text-2xl
                              font-bold
                              tracking-tight
                              text-theme-primary
                            "
                          >
                            {process.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="
                              relative
                              py-2
                              text-sm
                              leading-7
                              text-theme-muted
                              sm:text-base
                            "
                          >
                            {process.description}
                          </p>

                          {/* Bottom accent */}
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
                      )}
                    </div>

                    {/* =========================
                        CENTER NODE
                    ========================== */}
                    <div className="relative z-10 hidden justify-center lg:flex">
                      <div
                        className={`
                          relative
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-full
                          border
                          bg-theme-secondary
                          shadow-xl
                          ${
                            isLeft
                              ? "border-cyan-400/40 shadow-cyan-500/10"
                              : "border-purple-400/40 shadow-purple-500/10"
                          }
                        `}
                      >
                        {/* Outer ring */}
                        <div
                          aria-hidden="true"
                          className={`
                            absolute
                            inset-[-8px]
                            rounded-full
                            border
                            ${
                              isLeft
                                ? "border-cyan-400/10"
                                : "border-purple-400/10"
                            }
                          `}
                        />

                        {/* Pulse */}
                        <div
                          aria-hidden="true"
                          className={`
                            absolute
                            inset-2
                            animate-pulse
                            rounded-full
                            ${
                              isLeft
                                ? "bg-cyan-400/10"
                                : "bg-purple-400/10"
                            }
                          `}
                        />

                        <span
                          className={`
                            relative
                            text-xs
                            font-bold
                            ${
                              isLeft
                                ? "text-cyan-300"
                                : "text-purple-300"
                            }
                          `}
                        >
                          {String(
                            process.step_number,
                          ).padStart(2, "0")}
                        </span>
                      </div>
                    </div>

                    {/* =========================
                        RIGHT SIDE
                    ========================== */}
                    <div
                      className={
                        !isLeft
                          ? "lg:pl-8"
                          : "hidden lg:block"
                      }
                    >
                      {!isLeft && (
                        <article
                          className="
                            theme-card
                            group
                            relative
                            overflow-hidden
                            rounded-3xl
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
                          {/* Glow */}
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

                          {/* Top */}
                          <div className="relative flex items-center justify-between">
                            <span
                              className="
                                text-xs
                                font-bold
                                tracking-[0.25em]
                                text-purple-300
                              "
                            >
                              {String(
                                process.step_number,
                              ).padStart(2, "0")}
                            </span>

                            <span
                              className="
                                rounded-full
                                border
                                border-theme
                                bg-theme-secondary
                                px-3
                                py-1
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-wider
                                text-theme-muted
                              "
                            >
                              Step {process.step_number}
                            </span>
                          </div>

                          {/* Icon */}
                          <div
                            className="
                              relative
                              mt-6
                              flex
                              h-14
                              w-14
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
                            <CheckCircle2
                              size={26}
                              strokeWidth={1.7}
                            />
                          </div>

                          {/* Title */}
                          <h3
                            className="
                              relative
                              py-2
                              text-2xl
                              font-bold
                              tracking-tight
                              text-theme-primary
                            "
                          >
                            {process.title}
                          </h3>

                          {/* Description */}
                          <p
                            className="
                              relative
                              py-2
                              text-sm
                              leading-7
                              text-theme-muted
                              sm:text-base
                            "
                          >
                            {process.description}
                          </p>

                          {/* Bottom accent */}
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
                      )}
                    </div>

                    {/* =========================
                        MOBILE CARD
                    ========================== */}
                    <article
                      className="
                        theme-card
                        group
                        relative
                        overflow-hidden
                        rounded-3xl
                        border
                        border-theme
                        p-6
                        lg:hidden
                      "
                    >
                      <div
                        aria-hidden="true"
                        className="
                          pointer-events-none
                          absolute
                          -right-16
                          -top-16
                          h-36
                          w-36
                          rounded-full
                          bg-cyan-400/10
                          blur-3xl
                        "
                      />

                      <div className="relative flex items-start gap-4">
                        <div
                          className="
                            flex
                            h-12
                            w-12
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-theme
                            bg-theme-tertiary
                            text-theme-brand
                          "
                        >
                          <span className="text-xs font-bold">
                            {String(
                              process.step_number,
                            ).padStart(2, "0")}
                          </span>
                        </div>

                        <div className="min-w-0">
                          <span
                            className="
                              text-[10px]
                              font-semibold
                              uppercase
                              tracking-wider
                              text-theme-muted
                            "
                          >
                            Step {process.step_number}
                          </span>

                          <h3
                            className="
                              mt-2
                              text-xl
                              font-bold
                              text-theme-primary
                            "
                          >
                            {process.title}
                          </h3>

                          <p
                            className="
                              mt-3
                              text-sm
                              leading-7
                              text-theme-muted
                            "
                          >
                            {process.description}
                          </p>
                        </div>
                      </div>
                    </article>

                    {/* Mobile connector */}
                    {index < visibleProcesses.length - 1 && (
                      <div
                        aria-hidden="true"
                        className="
                          flex
                          justify-center
                          py-5
                          lg:hidden
                        "
                      >
                        <div
                          className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-theme
                            bg-theme-secondary
                            text-theme-brand
                          "
                        >
                          <ArrowDown size={16} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}