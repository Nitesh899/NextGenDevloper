import { SlidersHorizontal } from "lucide-react";

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function ProjectFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: ProjectFiltersProps) {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-theme-brand" />

        <span className="text-sm font-semibold text-theme-primary">
          Filter Projects
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const active = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              onClick={() => onCategoryChange(category)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                active
                  ? "border-green-400/30 bg-green-400/10 text-green-300"
                  : "border-white/10 bg-white/5 text-theme-muted hover:border-white/20 hover:text-theme-primary"
              }`}
            >
              {category === "ALL" ? "All Projects" : category}
            </button>
          );
        })}
      </div>
    </div>
  );
}