import {
  ExternalLink,
  Quote,
} from "lucide-react";
import type { Testimonial } from "../../types/portfolio";
import TestimonialRating from "./TestimonialRating";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({
  testimonial,
}: TestimonialCardProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/30 hover:bg-white/[0.05]">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yellow-400/60 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <TestimonialRating
          rating={testimonial.rating}
        />

        {testimonial.is_featured && (
          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            Featured
          </span>
        )}
      </div>

      <div className="mt-6">
        <Quote
          size={26}
          className="text-yellow-400/30"
        />

        <p className="mt-3 text-sm leading-7 text-gray-300">
          “{testimonial.testimonial}”
        </p>
      </div>

      {testimonial.project_name && (
        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 px-4 py-3">
          <p className="text-[11px] uppercase tracking-wider text-theme-muted">
            Project
          </p>

          <p className="mt-1 text-sm font-medium text-white">
            {testimonial.project_name}
          </p>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-purple-500/20 to-blue-500/20">
          {testimonial.client_photo ? (
            <img
              src={testimonial.client_photo}
              alt={testimonial.client_name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-white">
              {testimonial.client_name
                ?.charAt(0)
                .toUpperCase() || "N"}
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-semibold text-white">
            {testimonial.client_name}
          </h3>

          <p className="truncate text-xs text-theme-muted">
            {testimonial.client_designation}
          </p>

          {testimonial.company_name && (
            <p className="mt-0.5 truncate text-xs text-yellow-300/80">
              {testimonial.company_name}
            </p>
          )}
        </div>

        {testimonial.company_website && (
          <a
            href={testimonial.company_website}
            target="_blank"
            rel="noreferrer"
            aria-label={`Visit ${testimonial.company_name || "company"} website`}
            className="ml-auto rounded-lg p-2 text-theme-muted transition hover:bg-white/5 hover:text-white"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>
    </article>
  );
}