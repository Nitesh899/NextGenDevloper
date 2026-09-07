import {
  ArrowRight,
  Quote,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "../PageContainer";
import SectionHeading from "../SectionHeading";
import { usePortfolio } from "../../context/PortfolioContext";

export default function TestimonialsPreview() {
  const { portfolio } = usePortfolio();

  const testimonials = portfolio?.testimonials ?? [];

  const visibleTestimonials = testimonials
    .filter(
      (testimonial) =>
        testimonial.is_active &&
        (testimonial.is_featured ||
          testimonial.status === "APPROVED"),
    )
    .sort(
      (a, b) =>
        a.display_order - b.display_order,
    )
    .slice(0, 3);

  return (
    <section className="page-section">
      <PageContainer>
        <SectionHeading
          align="center"
          eyebrow="Testimonials"
          title="What clients say."
          description="Feedback from people and businesses we've worked with."
        />

        {visibleTestimonials.length > 0 ? (
          <div className="responsive-grid-3 mt-10">
            {visibleTestimonials.map((testimonial) => {
              const clientInitial =
                testimonial.client_name
                  ?.charAt(0)
                  .toUpperCase() || "C";

              return (
                <article
                  key={testimonial.id}
                  className="
                    theme-card
                    group
                    relative
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                    rounded-2xl
                    p-6
                    transition-all
                    duration-300
                    hover:-translate-y-1
                  "
                >
                  {/* Top Gradient */}
                  <div
                    className="
                      absolute
                      left-0
                      top-0
                      h-1
                      w-full
                      bg-gradient-to-r
                      from-green-500
                      via-blue-500
                      to-purple-500
                    "
                  />

                  {/* Quote + Rating */}
                  <div className="flex items-start justify-between gap-4">
                    <div
                      className="
                        flex
                        h-11
                        w-11
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-theme
                        bg-theme-tertiary
                      "
                    >
                      <Quote
                        size={22}
                        className="text-theme-brand"
                      />
                    </div>

                    {/* Rating */}
                    {testimonial.rating > 0 && (
                      <div
                        className="
                          flex
                          items-center
                          gap-1
                          rounded-full
                          border
                          border-theme
                          bg-theme-tertiary
                          px-3
                          py-1.5
                        "
                      >
                        {Array.from({
                          length: 5,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={13}
                            fill={
                              index <
                              testimonial.rating
                                ? "currentColor"
                                : "none"
                            }
                            className={
                              index <
                              testimonial.rating
                                ? "text-yellow-400"
                                : "text-theme-muted"
                            }
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote
                    className="
                      mt-6
                      flex-1
                      text-sm
                      leading-7
                      text-theme-secondary
                    "
                  >
                    “{testimonial.testimonial}”
                  </blockquote>

                  {/* Client Profile */}
                  <div
                    className="
                      mt-7
                      flex
                      items-center
                      gap-4
                      border-t
                      border-theme
                      pt-5
                    "
                  >
                    {/* Client Photo */}
                    <div className="relative shrink-0">
                      {testimonial.client_photo ? (
                        <img
                          src={testimonial.client_photo}
                          alt={testimonial.client_name}
                          className="
                            h-14
                            w-14
                            rounded-full
                            border-2
                            border-theme
                            object-cover
                            shadow-lg
                            transition-transform
                            duration-300
                            group-hover:scale-105
                          "
                          loading="lazy"
                        />
                      ) : (
                        <div
                          className="
                            flex
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-full
                            border-2
                            border-theme
                            bg-theme-tertiary
                            text-lg
                            font-bold
                            text-theme-brand
                          "
                        >
                          {clientInitial}
                        </div>
                      )}

                      {/* Status Indicator */}
                      <span
                        className="
                          absolute
                          bottom-0
                          right-0
                          h-3
                          w-3
                          rounded-full
                          border-2
                          border-black
                          bg-green-500
                        "
                      />
                    </div>

                    {/* Client Details */}
                    <div className="min-w-0">
                      <p
                        className="
                          truncate
                          text-sm
                          font-semibold
                          text-theme-primary
                        "
                      >
                        {testimonial.client_name}
                      </p>

                      {testimonial.client_designation && (
                        <p
                          className="
                            mt-0.5
                            truncate
                            text-xs
                            text-theme-muted
                          "
                        >
                          {testimonial.client_designation}
                        </p>
                      )}

                      {testimonial.company_name && (
                        <p
                          className="
                            mt-0.5
                            truncate
                            text-xs
                            font-medium
                            text-theme-brand
                          "
                        >
                          {testimonial.company_name}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project */}
                  {testimonial.project_name && (
                    <div className="mt-4">
                      <span
                        className="
                          inline-flex
                          max-w-full
                          truncate
                          rounded-full
                          border
                          border-theme
                          bg-theme-tertiary
                          px-3
                          py-1
                          text-[10px]
                          font-medium
                          uppercase
                          tracking-wider
                          text-theme-muted
                        "
                      >
                        Project: {testimonial.project_name}
                      </span>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
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
                bg-theme-tertiary
              "
            >
              <Quote
                size={26}
                className="text-theme-brand"
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
              Client Testimonials
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
              Testimonials will appear here after
              approval in Django Admin.
            </p>
          </div>
        )}

        {/* View All */}
        <div className="mt-10 text-center">
          <Link
            to="/testimonials"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-theme
              px-5
              py-3
              text-sm
              font-semibold
              text-theme-brand
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:bg-theme-tertiary
            "
          >
            View testimonials
            <ArrowRight size={16} />
          </Link>
        </div>
      </PageContainer>
    </section>
  );
}