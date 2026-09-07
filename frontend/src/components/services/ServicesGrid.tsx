import { BriefcaseBusiness } from "lucide-react";
import { useMemo } from "react";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionHeading from "../SectionHeading";
import ServiceCard from "./ServiceCard";

export default function ServicesGrid() {
  const { portfolio } = usePortfolio();

  const services = useMemo(() => {
    return [...(portfolio?.services ?? [])]
      .filter((service) => service.status === "ACTIVE")
      .sort((a, b) => a.display_order - b.display_order);
  }, [portfolio?.services]);

  return (
    <section className="section relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] bottom-20 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="What We Do"
          title="Services That Turn Ideas Into Products"
          description="From modern websites to scalable software solutions, choose the service that fits your next digital project."
        />

        {services.length === 0 ? (
          <div className="theme-card mt-12 rounded-2xl p-10 text-center">
            <BriefcaseBusiness className="mx-auto mb-4 h-10 w-10 text-theme-brand" />

            <h3 className="text-xl font-semibold text-theme-primary">
              Services Coming Soon
            </h3>

            <p className="mx-auto mt-2 max-w-lg text-theme-muted">
              Services will appear here automatically once they are added and
              activated through Django Admin.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}