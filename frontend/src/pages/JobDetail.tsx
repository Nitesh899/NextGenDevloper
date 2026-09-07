import { ArrowLeft, BriefcaseBusiness } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import JobDetailHero from "../components/careers/JobDetailHero";
import JobDetailSections from "../components/careers/JobDetailSections";
import { usePortfolio } from "../context/PortfolioContext";

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();

  const { portfolio, isLoading } = usePortfolio();

  const jobs = portfolio?.job_openings || [];
  const departments = portfolio?.career_departments || [];

  if (isLoading) {
    return (
      <section className="section">
        <div className="container">
          <div className="mx-auto h-96 max-w-5xl animate-pulse rounded-2xl bg-white/5" />
        </div>
      </section>
    );
  }

  const job = jobs.find(
    (item) =>
      item.slug === slug &&
      item.status === "OPEN",
  );

  if (!job) {
    return (
      <section className="section">
        <div className="container">
          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 text-green-300">
              <BriefcaseBusiness size={26} />
            </div>

            <h1 className="text-2xl font-semibold text-white">
              Position not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-theme-muted">
              This position may have been closed or is no longer
              available.
            </p>

            <Link
              to="/careers"
              className="theme-button-primary mt-7 inline-flex items-center gap-2"
            >
              <ArrowLeft size={17} />
              Back to Careers
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <JobDetailHero
        job={job}
        departments={departments}
      />

      <JobDetailSections job={job} />
    </>
  );
}