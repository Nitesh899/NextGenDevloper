import {
  BriefcaseBusiness,
  Rocket,
  Users,
} from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function CareersHero() {
  const { portfolio } = usePortfolio();

  const siteName =
    portfolio?.site_settings?.site_name || "NextGenDevloper";

  const jobs = portfolio?.job_openings || [];

  const departments = portfolio?.career_departments || [];

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-theme-primary">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-20 h-72 w-72 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-[8%] top-10 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative py-20 md:py-28">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm text-green-300">
            <Rocket size={16} />
            Build the Future With Us
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Join{" "}
            <span className="gradient-text">{siteName}</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-theme-muted md:text-lg">
            We're looking for talented developers, designers,
            engineers and technology enthusiasts who want to build
            meaningful digital products.
          </p>

          <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <BriefcaseBusiness
                size={22}
                className="text-green-300"
              />

              <p className="mt-3 text-2xl font-bold text-white">
                {jobs.length}
              </p>

              <p className="mt-1 text-sm text-theme-muted">
                Open Positions
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Users
                size={22}
                className="text-blue-300"
              />

              <p className="mt-3 text-2xl font-bold text-white">
                {departments.length}
              </p>

              <p className="mt-1 text-sm text-theme-muted">
                Departments
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <Rocket
                size={22}
                className="text-purple-300"
              />

              <p className="mt-3 text-2xl font-bold text-white">
                Remote
              </p>

              <p className="mt-1 text-sm text-theme-muted">
                Flexible Opportunities
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}