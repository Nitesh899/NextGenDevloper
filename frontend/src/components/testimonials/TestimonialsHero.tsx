import {
  MessageCircleHeart,
  Sparkles,
  Star,
  Users,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function TestimonialsHero() {
  const { portfolio } = usePortfolio();

  const testimonials = (
    portfolio?.testimonials || []
  ).filter(
    (testimonial) =>
      testimonial.is_active &&
      testimonial.status === "APPROVED",
  );

  const featuredCount = testimonials.filter(
    (testimonial) => testimonial.is_featured,
  ).length;

  const averageRating =
    testimonials.length > 0
      ? (
          testimonials.reduce(
            (total, testimonial) =>
              total + testimonial.rating,
            0,
          ) / testimonials.length
        ).toFixed(1)
      : "0.0";

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-theme-primary">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl" />
        <div className="absolute right-[8%] top-10 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative py-20 md:py-28">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/20 bg-yellow-400/10 px-4 py-2 text-sm text-yellow-300">
            <Sparkles size={16} />
            Client Experiences
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            What People{" "}
            <span className="gradient-text">
              Say About Us
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-theme-muted md:text-lg">
            Real feedback from clients and collaborators who
            have experienced our work, development process and
            commitment to building quality digital products.
          </p>

          <div className="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Users
                size={22}
                className="text-blue-300"
              />

              <p className="mt-3 text-2xl font-bold text-white">
                {testimonials.length}
              </p>

              <p className="mt-1 text-sm text-theme-muted">
                Client Reviews
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Star
                size={22}
                className="fill-yellow-400 text-yellow-400"
              />

              <p className="mt-3 text-2xl font-bold text-white">
                {averageRating}
              </p>

              <p className="mt-1 text-sm text-theme-muted">
                Average Rating
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <MessageCircleHeart
                size={22}
                className="text-purple-300"
              />

              <p className="mt-3 text-2xl font-bold text-white">
                {featuredCount}
              </p>

              <p className="mt-1 text-sm text-theme-muted">
                Featured Reviews
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}