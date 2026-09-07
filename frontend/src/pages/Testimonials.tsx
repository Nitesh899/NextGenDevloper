import { useMemo, useState } from "react";
import { MessageCircleHeart } from "lucide-react";
import FeaturedTestimonial from "../components/testimonials/FeaturedTestimonial";
import TestimonialCard from "../components/testimonials/TestimonialCard";
import TestimonialFilters from "../components/testimonials/TestimonialFilters";
import TestimonialsHero from "../components/testimonials/TestimonialsHero";
import { usePortfolio } from "../context/PortfolioContext";

export default function Testimonials() {
  const { portfolio, isLoading } = usePortfolio();

  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("ALL");
  const [featuredOnly, setFeaturedOnly] =
    useState(false);

  const testimonials = portfolio?.testimonials || [];

  const approvedTestimonials = useMemo(
    () =>
      testimonials.filter(
        (testimonial) =>
          testimonial.is_active &&
          testimonial.status === "APPROVED",
      ),
    [testimonials],
  );

  const featuredTestimonial =
    approvedTestimonials.find(
      (testimonial) => testimonial.is_featured,
    ) || null;

  const filteredTestimonials = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return approvedTestimonials
      .filter((testimonial) => {
        if (rating === "ALL") {
          return true;
        }

        return testimonial.rating === Number(rating);
      })
      .filter((testimonial) => {
        if (!featuredOnly) {
          return true;
        }

        return testimonial.is_featured;
      })
      .filter((testimonial) => {
        if (!normalizedSearch) {
          return true;
        }

        return (
          testimonial.client_name
            .toLowerCase()
            .includes(normalizedSearch) ||
          testimonial.client_designation
            .toLowerCase()
            .includes(normalizedSearch) ||
          testimonial.company_name
            .toLowerCase()
            .includes(normalizedSearch) ||
          testimonial.project_name
            .toLowerCase()
            .includes(normalizedSearch) ||
          testimonial.testimonial
            .toLowerCase()
            .includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        if (a.is_featured !== b.is_featured) {
          return a.is_featured ? -1 : 1;
        }

        if (a.rating !== b.rating) {
          return b.rating - a.rating;
        }

        return (
          a.display_order - b.display_order
        );
      });
  }, [
    approvedTestimonials,
    search,
    rating,
    featuredOnly,
  ]);

  const showFeatured =
  Boolean(featuredTestimonial) &&
  !search.trim() &&
  rating === "ALL";

const gridTestimonials =
  showFeatured && featuredTestimonial
    ? filteredTestimonials.filter(
        (testimonial) =>
          testimonial.id !== featuredTestimonial.id,
      )
    : filteredTestimonials;

  return (
    <>
      <TestimonialsHero />

      <section className="section">
        <div className="container">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[400px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : (
            <>
              {showFeatured && featuredTestimonial && (
                <FeaturedTestimonial
                  testimonial={featuredTestimonial}
                />
              )}

              <TestimonialFilters
                search={search}
                rating={rating}
                featuredOnly={featuredOnly}
                onSearchChange={setSearch}
                onRatingChange={setRating}
                onFeaturedChange={setFeaturedOnly}
                onReset={() => {
                  setSearch("");
                  setRating("ALL");
                  setFeaturedOnly(false);
                }}
              />

              {filteredTestimonials.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-theme-muted">
                      Showing{" "}
                      {filteredTestimonials.length}{" "}
                      {filteredTestimonials.length === 1
                        ? "testimonial"
                        : "testimonials"}
                    </p>
                  </div>

                  {gridTestimonials.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {gridTestimonials.map(
                        (testimonial) => (
                          <TestimonialCard
                            key={testimonial.id}
                            testimonial={testimonial}
                          />
                        ),
                      )}
                    </div>
                  ) : (
                    featuredTestimonial &&
                    !search &&
                    rating === "ALL" &&
                    !featuredOnly && (
                      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-12 text-center text-sm text-theme-muted">
                        The featured testimonial is
                        currently the only published review.
                      </div>
                    )
                  )}
                </>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400/10 text-yellow-300">
                    <MessageCircleHeart size={26} />
                  </div>

                  <h2 className="text-xl font-semibold text-white">
                    No testimonials found
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-theme-muted">
                    Try another search term or reset the
                    testimonial filters.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}