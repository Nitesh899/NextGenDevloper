import { Star } from "lucide-react";

interface TestimonialRatingProps {
  rating: number;
  size?: number;
}

export default function TestimonialRating({
  rating,
  size = 17,
}: TestimonialRatingProps) {
  const safeRating = Math.min(
    5,
    Math.max(0, Math.round(rating)),
  );

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`${safeRating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          size={size}
          className={
            index < safeRating
              ? "fill-yellow-400 text-yellow-400"
              : "text-white/20"
          }
        />
      ))}
    </div>
  );
}