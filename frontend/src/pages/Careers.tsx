import { useMemo, useState } from "react";
import { BriefcaseBusiness } from "lucide-react";
import CareerFilters from "../components/careers/CareerFilters";
import CareersHero from "../components/careers/CareersHero";
import JobCard from "../components/careers/JobCard";
import { usePortfolio } from "../context/PortfolioContext";

export default function Careers() {
  const { portfolio, isLoading } = usePortfolio();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("ALL");
  const [employmentType, setEmploymentType] =
    useState("ALL");
  const [workMode, setWorkMode] = useState("ALL");

  const jobs = portfolio?.job_openings || [];
  const departments = portfolio?.career_departments || [];

  const employmentTypes = useMemo(
    () =>
      Array.from(
        new Set(
          jobs
            .map((job) => job.employment_type)
            .filter(Boolean),
        ),
      ),
    [jobs],
  );

  const workModes = useMemo(
    () =>
      Array.from(
        new Set(
          jobs
            .map((job) => job.work_mode)
            .filter(Boolean),
        ),
      ),
    [jobs],
  );

  const filteredJobs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return jobs
      .filter((job) => job.status === "OPEN")
      .filter((job) => {
        if (department === "ALL") {
          return true;
        }

        return job.department === Number(department);
      })
      .filter((job) => {
        if (employmentType === "ALL") {
          return true;
        }

        return job.employment_type === employmentType;
      })
      .filter((job) => {
        if (workMode === "ALL") {
          return true;
        }

        return job.work_mode === workMode;
      })
      .filter((job) => {
        if (!normalizedSearch) {
          return true;
        }

        return (
          job.title
            .toLowerCase()
            .includes(normalizedSearch) ||
          job.short_description
            .toLowerCase()
            .includes(normalizedSearch) ||
          job.description
            .toLowerCase()
            .includes(normalizedSearch) ||
          job.required_skills
            .toLowerCase()
            .includes(normalizedSearch) ||
          job.location
            .toLowerCase()
            .includes(normalizedSearch)
        );
      })
      .sort((a, b) => {
        if (a.featured !== b.featured) {
          return a.featured ? -1 : 1;
        }

        return a.display_order - b.display_order;
      });
  }, [
    jobs,
    search,
    department,
    employmentType,
    workMode,
  ]);

  return (
    <>
      <CareersHero />

      <section className="section">
        <div className="container">
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-[430px] animate-pulse rounded-2xl border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : (
            <>
              <CareerFilters
                search={search}
                department={department}
                employmentType={employmentType}
                workMode={workMode}
                departments={departments}
                employmentTypes={employmentTypes}
                workModes={workModes}
                onSearchChange={setSearch}
                onDepartmentChange={setDepartment}
                onEmploymentTypeChange={
                  setEmploymentType
                }
                onWorkModeChange={setWorkMode}
                onReset={() => {
                  setSearch("");
                  setDepartment("ALL");
                  setEmploymentType("ALL");
                  setWorkMode("ALL");
                }}
              />

              {filteredJobs.length > 0 ? (
                <>
                  <div className="mb-6">
                    <p className="text-sm text-theme-muted">
                      Showing {filteredJobs.length}{" "}
                      {filteredJobs.length === 1
                        ? "open position"
                        : "open positions"}
                    </p>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredJobs.map((job) => (
                      <JobCard
                        key={job.id}
                        job={job}
                        departments={departments}
                      />
                    ))}
                  </div>
                </>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-400/10 text-green-300">
                    <BriefcaseBusiness size={26} />
                  </div>

                  <h2 className="text-xl font-semibold text-white">
                    No open positions found
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-theme-muted">
                    Try changing your search or filters. New
                    opportunities may appear here as we grow.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}