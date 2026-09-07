import { Search, X } from "lucide-react";

interface CareerFiltersProps {
  search: string;
  department: string;
  employmentType: string;
  workMode: string;
  departments: { id: number; name: string }[];
  employmentTypes: string[];
  workModes: string[];
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onEmploymentTypeChange: (value: string) => void;
  onWorkModeChange: (value: string) => void;
  onReset: () => void;
}

export default function CareerFilters({
  search,
  department,
  employmentType,
  workMode,
  departments,
  employmentTypes,
  workModes,
  onSearchChange,
  onDepartmentChange,
  onEmploymentTypeChange,
  onWorkModeChange,
  onReset,
}: CareerFiltersProps) {
  const hasFilters =
    search ||
    department !== "ALL" ||
    employmentType !== "ALL" ||
    workMode !== "ALL";

  return (
    <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">
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
            placeholder="Search jobs..."
            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm text-white outline-none transition focus:border-green-400/50"
          />
        </div>

        <select
          value={department}
          onChange={(event) =>
            onDepartmentChange(event.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Departments</option>

          {departments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={employmentType}
          onChange={(event) =>
            onEmploymentTypeChange(event.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Employment Types</option>

          {employmentTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={workMode}
          onChange={(event) =>
            onWorkModeChange(event.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >
          <option value="ALL">All Work Modes</option>

          {workModes.map((item) => (
            <option key={item} value={item}>
              {item}
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