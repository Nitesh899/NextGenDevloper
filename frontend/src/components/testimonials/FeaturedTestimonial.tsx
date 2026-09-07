import {
  Building2,
  ExternalLink,
  Quote,
} from "lucide-react";
import type { Testimonial } from "../../types/portfolio";
import TestimonialRating from "./TestimonialRating";

interface FeaturedTestimonialProps {
  testimonial: Testimonial;
}

export default function FeaturedTestimonial({
  testimonial,
}: FeaturedTestimonialProps) {
  return (
    <section className="mb-12 overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.08] via-white/[0.03] to-purple-500/[0.06]">
      <div className="grid lg:grid-cols-[0.8fr_1.8fr]">
        <div className="flex min-h-[280px] items-center justify-center border-b border-white/10 bg-black/20 p-8 lg:border-b-0 lg:border-r">
          <div className="text-center">
            <div className="mx-auto h-24 w-24 overflow-hidden rounded-full border-2 border-yellow-400/30 bg-white/5">
              {testimonial.client_photo ? (
                <img
                  src={testimonial.client_photo}
                  alt={testimonial.client_name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-3xl font-bold text-white">
                  {testimonial.client_name
                    ?.charAt(0)
                    .toUpperCase() || "N"}
                </div>
              )}
            </div>

            <h3 className="mt-5 text-xl font-semibold text-white">
              {testimonial.client_name}
            </h3>

            <p className="mt-1 text-sm text-theme-muted">
              {testimonial.client_designation}
            </p>

            {testimonial.company_name && (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-yellow-300">
                <Building2 size={15} />
                {testimonial.company_name}
              </p>
            )}
          </div>
        </div>

        <div className="p-8 md:p-10 lg:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
              Featured Client Review
            </span>

            <TestimonialRating
              rating={testimonial.rating}
              size={19}
            />
          </div>

          <Quote
            size={42}
            className="mt-8 text-yellow-400/30"
          />

          <blockquote className="mt-4 text-xl font-medium leading-9 text-white md:text-2xl">
            “{testimonial.testimonial}”
          </blockquote>

          {testimonial.project_name && (
            <p className="mt-6 text-sm text-theme-muted">
              Project:{" "}
              <span className="font-medium text-white">
                {testimonial.project_name}
              </span>
            </p>
          )}

          {testimonial.company_website && (
            <a
              href={testimonial.company_website}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-yellow-300 transition hover:text-yellow-200"
            >
              Visit Company
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}