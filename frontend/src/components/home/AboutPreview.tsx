import {
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function AboutPreview() {
  const { portfolio } = usePortfolio();

  const about = portfolio?.about;
  

  const highlights = [
    "Modern responsive interfaces",
    "Scalable Django backend systems",
    "REST API driven architecture",
    "Business-focused digital solutions",
  ];

  return (
    <section className="page-section">
      <PageContainer>
        <div
          className="
            grid
            gap-10
            lg:grid-cols-[0.85fr_1.15fr]
            lg:items-center
          "
        >
          <div>
            <SectionHeading
              eyebrow="About"
              title={
                about?.title ||
                "Technology with purpose."
              }
              description={
                about?.short_description ||
                about?.description ||
                "A professional approach to building useful, scalable and maintainable digital products."
              }
            />

            <Link
              to="/about"
              className="
                inline-flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-theme-brand
                hover:gap-3
              "
            >
              Learn more

              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div
            className="
              theme-card
              p-6
              sm:p-8
            "
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="
                    flex
                    gap-3
                    rounded-xl
                    border border-theme
                    bg-theme-secondary
                    p-4
                  "
                >
                  <CheckCircle2
                    size={19}
                    className="
                      mt-0.5
                      shrink-0
                      text-theme-brand
                    "
                  />

                  <span className="text-sm leading-6 text-theme-secondary">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}