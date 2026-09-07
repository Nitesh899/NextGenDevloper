import { Search, X } from "lucide-react";

interface BlogFiltersProps {
  search: string;
  category: string;
  tag: string;
  categories: { id: number; name: string }[];
  tags: { id: number; name: string }[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onTagChange: (value: string) => void;
  onReset: () => void;
}

export default function BlogFilters({
  search,
  category,
  tag,
  categories,
  tags,
  onSearchChange,
  onCategoryChange,
  onTagChange,
  onReset,
}: BlogFiltersProps) {
  const hasFilters = search || category !== "ALL" || tag !== "ALL";

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
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-purple-400/50"
          />
        </div>

        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Categories</option>

          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={tag}
          onChange={(event) => onTagChange(event.target.value)}
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Tags</option>

          {tags.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

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