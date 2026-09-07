import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import type {
  CareerDepartment,
  JobOpening,
} from "../../types/portfolio";

interface JobCardProps {
  job: JobOpening;
  departments: CareerDepartment[];
}

export default function JobCard({
  job,
  departments,
}: JobCardProps) {
  const department = departments.find(
    (item) => item.id === job.department,
  );

  const deadline = job.application_deadline
    ? new Date(
        job.application_deadline,
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : null;

  return (
    <article className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-green-400/30 hover:bg-white/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-400/10 text-green-300">
          <BriefcaseBusiness size={22} />
        </div>

        {job.featured && (
          <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
            Featured
          </span>
        )}
      </div>

      <div className="mt-6">
        {department && (
          <span className="text-xs font-medium uppercase tracking-wider text-green-300">
            {department.name}
          </span>
        )}

        <Link to={`/careers/${job.slug}`}>
          <h2 className="mt-2 text-xl font-semibold text-white transition group-hover:text-green-300">
            {job.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-theme-muted">
          {job.short_description}
        </p>
      </div>

      <div className="mt-6 grid gap-3 border-y border-white/10 py-5 text-sm text-theme-muted">
        {job.location && (
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{job.location}</span>
          </div>
        )}

        {job.work_mode && (
          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            <span>{job.work_mode}</span>
          </div>
        )}

        {job.experience && (
          <div className="flex items-center gap-2">
            <BriefcaseBusiness size={16} />
            <span>{job.experience}</span>
          </div>
        )}

        {job.employment_type && (
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />
            <span>{job.employment_type}</span>
          </div>
        )}
      </div>

      {job.salary && (
        <div className="mt-5">
          <p className="text-xs uppercase tracking-wider text-theme-muted">
            Compensation
          </p>

          <p className="mt-1 font-medium text-white">
            {job.salary}
          </p>
        </div>
      )}

      {deadline && (
        <div className="mt-4 flex items-center gap-2 text-xs text-theme-muted">
          <CalendarDays size={14} />
          Apply by {deadline}
        </div>
      )}

      <Link
        to={`/careers/${job.slug}`}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-green-300 transition hover:text-green-200"
      >
        View Position
        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
        />
      </Link>
    </article>
  );
}