import { Search, Star, X } from "lucide-react";

interface TestimonialFiltersProps {
  search: string;
  rating: string;
  featuredOnly: boolean;
  onSearchChange: (value: string) => void;
  onRatingChange: (value: string) => void;
  onFeaturedChange: (value: boolean) => void;
  onReset: () => void;
}

export default function TestimonialFilters({
  search,
  rating,
  featuredOnly,
  onSearchChange,
  onRatingChange,
  onFeaturedChange,
  onReset,
}: TestimonialFiltersProps) {
  const hasFilters =
    search ||
    rating !== "ALL" ||
    featuredOnly;

  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr_1fr_auto]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-theme-muted"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              onSearchChange(event.target.value)
            }
            placeholder="Search testimonials..."
            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-yellow-400/50"
          />
        </div>

        <select
          value={rating}
          onChange={(event) =>
            onRatingChange(event.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Ratings</option>
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <button
          type="button"
          onClick={() =>
            onFeaturedChange(!featuredOnly)
          }
          className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition ${
            featuredOnly
              ? "border-yellow-400/40 bg-yellow-400/10 text-yellow-300"
              : "border-white/10 bg-black/20 text-theme-muted hover:bg-white/5 hover:text-white"
          }`}
        >
          <Star
            size={16}
            className={
              featuredOnly
                ? "fill-yellow-400"
                : ""
            }
          />
          Featured Only
        </button>

        {hasFilters ? (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-theme-muted transition hover:bg-white/5 hover:text-white"
          >
            <X size={17} />
            Reset
          </button>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}