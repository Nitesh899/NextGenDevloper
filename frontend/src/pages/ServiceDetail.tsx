import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";
import ServiceDetailHero from "../components/services/ServiceDetailHero";
import ServiceFeatures from "../components/services/ServiceFeatures";
import ServiceProcess from "../components/services/ServiceProcess";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { portfolio } = usePortfolio();

  const service = useMemo(() => {
    return portfolio?.services?.find(
      (item) => item.slug === slug && item.status === "ACTIVE",
    );
  }, [portfolio?.services, slug]);

  const features = useMemo(() => {
    if (!service) return [];

    return (portfolio?.service_features ?? []).filter(
      (feature) => feature.service === service.id,
    );
  }, [portfolio?.service_features, service]);

  const processes = useMemo(() => {
    if (!service) return [];

    return (portfolio?.service_processes ?? []).filter(
      (process) => process.service === service.id,
    );
  }, [portfolio?.service_processes, service]);

  if (!portfolio) {
    return (
      <section className="section">
        <div className="container">
          <div className="theme-card rounded-2xl p-10 text-center">
            <p className="text-theme-muted">
              Loading service details...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!service) {
    return (
      <section className="section">
        <div className="container">
          <div className="theme-card mx-auto max-w-xl rounded-2xl p-10 text-center">
            <SearchX className="mx-auto h-12 w-12 text-theme-brand" />

            <h1 className="mt-5 text-2xl font-bold text-theme-primary">
              Service Not Found
            </h1>

            <p className="mt-3 text-theme-muted">
              The service you are looking for does not exist or is currently
              unavailable.
            </p>

            <Link
              to="/services"
              className="theme-button-primary mt-7 inline-flex items-center gap-2 rounded-xl px-5 py-3 font-semibold"
            >
              <ArrowLeft className="h-4 w-4" />
              View All Services
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <ServiceDetailHero service={service} />
      <ServiceFeatures features={features} />
      <ServiceProcess processes={processes} />

      {/* Final CTA */}
      <section className="section">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />

            <div className="relative max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-theme-brand">
                Ready to Build?
              </p>

              <h2 className="mt-4 text-3xl font-black text-theme-primary sm:text-4xl">
                Let's turn your idea into a real product.
              </h2>

              <p className="mt-4 leading-7 text-theme-muted">
                Tell us what you need and we'll help you plan the right
                solution for your project.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/request-quote"
                  className="theme-button-primary rounded-xl px-6 py-3.5 text-center font-semibold"
                >
                  Request a Quote
                </Link>

                <Link
                  to="/contact"
                  className="theme-button-outline rounded-xl px-6 py-3.5 text-center font-semibold"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}