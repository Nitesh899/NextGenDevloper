import {
  ArrowRight,
  Mail,
  MessageSquareQuote,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import { usePortfolio } from "../../context/PortfolioContext";

export default function HomeCTA() {
  const { portfolio } = usePortfolio();

  const siteSettings = portfolio?.site_settings;
  const home = portfolio?.home;

  const email = siteSettings?.email;
  const quoteUrl =
    home?.secondary_button_url || "/request-quote";

  return (
    <section className="page-section">
      <PageContainer>
        <div
          className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-theme
            bg-theme-secondary
            p-8
            sm:p-10
            lg:p-14
          "
        >
          {/* Background Effects */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-72
              w-72
              rounded-full
              bg-purple-500/10
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-24
              -left-24
              h-72
              w-72
              rounded-full
              bg-green-500/10
              blur-3xl
            "
          />

          {/* Content */}
          <div
            className="
              relative
              z-10
              mx-auto
              max-w-3xl
              text-center
            "
          >
            {/* Icon */}
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
                bg-theme-tertiary
              "
            >
              <Sparkles
                size={26}
                className="text-theme-brand"
                aria-hidden="true"
              />
            </div>

            {/* Eyebrow */}
            <p
              className="
                mt-6
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-theme-brand
              "
            >
              Let's build something great
            </p>

            {/* Heading */}
            <h2
              className="
                mt-3
                text-3xl
                font-bold
                tracking-tight
                text-theme-primary
                sm:text-4xl
                lg:text-5xl
              "
            >
              Have a project in mind?
            </h2>

            {/* Description */}
            <p
              className="
                mx-auto
                mt-5
                max-w-2xl
                text-sm
                leading-7
                text-theme-muted
                sm:text-base
              "
            >
              Let's turn your idea into a modern,
              reliable and high-quality digital
              experience.
            </p>

            {/* Buttons */}
            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <Link
                to={quoteUrl}
                className="
                  theme-button-primary
                  inline-flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  sm:w-auto
                "
              >
                <MessageSquareQuote
                  size={17}
                  aria-hidden="true"
                />

                Request a Quote

                <ArrowRight
                  size={16}
                  aria-hidden="true"
                />
              </Link>

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="
                    theme-button-outline
                    inline-flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    px-6
                    py-3
                    text-sm
                    font-semibold
                    sm:w-auto
                  "
                >
                  <Mail
                    size={17}
                    aria-hidden="true"
                  />

                  Contact Me
                </a>
              )}
            </div>

            {/* Bottom Info */}
            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                justify-center
                gap-x-6
                gap-y-2
                text-xs
                text-theme-muted
              "
            >
              <span>
                Modern Technology
              </span>

              <span
                aria-hidden="true"
                className="text-theme-brand"
              >
                •
              </span>

              <span>
                Reliable Solutions
              </span>

              <span
                aria-hidden="true"
                className="text-theme-brand"
              >
                •
              </span>

              <span>
                Professional Development
              </span>
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}