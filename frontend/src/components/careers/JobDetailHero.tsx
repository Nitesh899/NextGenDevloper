import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import type {
  CareerDepartment,
  JobOpening,
} from "../../types/portfolio";

interface JobDetailHeroProps {
  job: JobOpening;
  departments: CareerDepartment[];
}

export default function JobDetailHero({
  job,
  departments,
}: JobDetailHeroProps) {
  const department = departments.find(
    (item) => item.id === job.department,
  );

  const deadline = job.application_deadline
    ? new Date(
        job.application_deadline,
      ).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const applicationHref =
    job.application_url ||
    (job.application_email
      ? `mailto:${job.application_email}`
      : null);

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/10" />

      <div className="container relative py-12 md:py-20">
        <Link
          to="/careers"
          className="mb-10 inline-flex items-center gap-2 text-sm text-theme-muted transition hover:text-white"
        >
          <ArrowLeft size={17} />
          Back to Careers
        </Link>

        <div className="max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            {job.featured && (
              <span className="rounded-full border border-yellow-400/20 bg-yellow-400/10 px-3 py-1 text-xs font-semibold text-yellow-300">
                Featured Position
              </span>
            )}

            <span className="rounded-full border border-green-400/20 bg-green-400/10 px-3 py-1 text-xs text-green-300">
              {job.status}
            </span>

            {department && (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-theme-muted">
                {department.name}
              </span>
            )}
          </div>

          <h1 className="mt-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {job.title}
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-theme-muted md:text-lg">
            {job.short_description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {job.location && (
              <div className="flex items-center gap-3 text-sm text-theme-muted">
                <MapPin
                  size={18}
                  className="text-green-300"
                />
                {job.location}
              </div>
            )}

            {job.work_mode && (
              <div className="flex items-center gap-3 text-sm text-theme-muted">
                <Clock3
                  size={18}
                  className="text-blue-300"
                />
                {job.work_mode}
              </div>
            )}

            {job.employment_type && (
              <div className="flex items-center gap-3 text-sm text-theme-muted">
                <BriefcaseBusiness
                  size={18}
                  className="text-purple-300"
                />
                {job.employment_type}
              </div>
            )}

            {job.experience && (
              <div className="flex items-center gap-3 text-sm text-theme-muted">
                <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-orange-300/50 text-[9px] text-orange-300">
                  E
                </span>
                {job.experience}
              </div>
            )}
          </div>

          {job.salary && (
            <p className="mt-6 text-sm text-theme-muted">
              Compensation:{" "}
              <span className="font-medium text-white">
                {job.salary}
              </span>
            </p>
          )}

          {deadline && (
            <div className="mt-4 inline-flex items-center gap-2 text-sm text-theme-muted">
              <CalendarDays size={17} />
              Application deadline: {deadline}
            </div>
          )}

          {applicationHref && (
            <div className="mt-8">
              <a
                href={applicationHref}
                target={
                  job.application_url ? "_blank" : undefined
                }
                rel={
                  job.application_url
                    ? "noreferrer"
                    : undefined
                }
                className="theme-button-primary inline-flex items-center gap-2"
              >
                Apply for this Position
                <ExternalLink size={17} />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}