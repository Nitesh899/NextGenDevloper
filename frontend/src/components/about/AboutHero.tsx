import {
  ArrowRight,
  BriefcaseBusiness,
  Code2,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AboutHero() {
  const { portfolio } = usePortfolio();

  const about = portfolio?.about;
  const siteSettings = portfolio?.site_settings;

  const title =
    about?.title || "About NextGenDevloper";

  const subtitle =
    about?.subtitle ||
    siteSettings?.tagline ||
    "Building modern digital experiences";

  const description =
    about?.short_description ||
    about?.description ||
    siteSettings?.description ||
    "We build modern websites, applications and digital solutions.";

  const profileImage = about?.profile_image;

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-theme
        bg-theme-primary
      "
    >
      {/* Background Glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-10
          h-72
          w-72
          rounded-full
          bg-green-500/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          h-80
          w-80
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />

      <PageContainer>
        <div
          className="
            relative
            grid
            min-h-[520px]
            items-center
            gap-12
            py-16
            md:py-20
            lg:grid-cols-[1.1fr_0.9fr]
            lg:py-24
          "
        >
          {/* Content */}
          <div className="relative z-10">
            {/* Eyebrow */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-theme
                bg-theme-secondary
                px-4
                py-2
              "
            >
              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-green-400
                "
              />

              <span
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-theme-brand
                "
              >
                About Me
              </span>
            </div>

            {/* Heading */}
            <h1
              className="
                mt-6
                max-w-3xl
                text-4xl
                font-bold
                leading-tight
                tracking-tight
                text-theme-primary
                sm:text-5xl
                lg:text-6xl
              "
            >
              {title}
            </h1>

            {/* Subtitle */}
            <p
              className="
                mt-5
                text-xl
                font-medium
                text-theme-brand
                sm:text-2xl
              "
            >
              {subtitle}
            </p>

            {/* Description */}
            <p
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-theme-muted
                sm:text-base
              "
            >
              {description}
            </p>

            {/* Buttons */}
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
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                "
              >
                Explore Projects

                <ArrowRight
                  size={17}
                  aria-hidden="true"
                />
              </Link>

              <Link
                to="/contact"
                className="
                  theme-button-outline
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-5
                  py-3
                  text-sm
                  font-semibold
                "
              >
                Contact Me
              </Link>
            </div>

            {/* Quick Stats */}
            <div
              className="
                mt-10
                grid
                max-w-xl
                grid-cols-2
                gap-3
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-theme
                  bg-theme-secondary
                  p-4
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-theme-tertiary
                    text-theme-brand
                  "
                >
                  <Code2
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs text-theme-muted">
                    Technologies
                  </p>

                  <p className="mt-1 text-sm font-semibold text-theme-primary">
                    {about?.technologies_count ?? 0}+
                  </p>
                </div>
              </div>

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border
                  border-theme
                  bg-theme-secondary
                  p-4
                "
              >
                <div
                  className="
                    flex
                    h-10
                    w-10
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-theme-tertiary
                    text-theme-brand
                  "
                >
                  <BriefcaseBusiness
                    size={20}
                    aria-hidden="true"
                  />
                </div>

                <div>
                  <p className="text-xs text-theme-muted">
                    Experience
                  </p>

                  <p className="mt-1 text-sm font-semibold text-theme-primary">
                    {about?.years_of_experience ?? 0}+
                    {" "}
                    Years
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative mx-auto w-full max-w-md">
            {/* Glow */}
            <div
              aria-hidden="true"
              className="
                absolute
                inset-8
                rounded-full
                bg-green-500/10
                blur-3xl
              "
            />

            {/* Image Container */}
            <div
              className="
                relative
                mx-auto
                aspect-square
                max-w-[380px]
                overflow-hidden
                rounded-[2rem]
                border
                border-theme
                bg-theme-secondary
                shadow-2xl
              "
            >
              {profileImage ? (
                <img
                  src={profileImage}
                  alt={title}
                  className="
                    h-full
                    w-full
                    object-cover
                  "
                />
              ) : (
                <div
                  className="
                    flex
                    h-full
                    w-full
                    items-center
                    justify-center
                    bg-theme-tertiary
                  "
                >
                  <div className="text-center">
                    <div
                      className="
                        mx-auto
                        flex
                        h-24
                        w-24
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-theme
                        bg-theme-secondary
                        text-4xl
                        font-bold
                        text-theme-brand
                      "
                    >
                      {siteSettings?.site_name
                        ?.charAt(0)
                        .toUpperCase() || "N"}
                    </div>

                    <p
                      className="
                        mt-4
                        text-sm
                        text-theme-muted
                      "
                    >
                      Profile image
                    </p>
                  </div>
                </div>
              )}

              {/* Image Overlay */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/30
                  via-transparent
                  to-transparent
                "
              />
            </div>

            {/* Floating Label */}
            <div
              className="
                absolute
                -bottom-4
                left-4
                rounded-2xl
                border
                border-theme
                bg-theme-secondary
                px-4
                py-3
                shadow-xl
                sm:left-0
              "
            >
              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-wider
                  text-theme-muted
                "
              >
                Mission
              </p>

              <p
                className="
                  mt-1
                  text-xs
                  font-medium
                  text-theme-primary
                "
              >
                Build. Create. Innovate.
              </p>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}