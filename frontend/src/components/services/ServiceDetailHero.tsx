import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import type { Service } from "../../types/portfolio";

interface ServiceDetailHeroProps {
  service: Service;
}

export default function ServiceDetailHero({
  service,
}: ServiceDetailHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="py-16 sm:py-20 lg:py-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm text-theme-muted transition-colors hover:text-theme-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>

          <h1 className="py-5 text-2xl font-black tracking-tight text-theme-primary sm:text-2xl lg:text-3xl">
              {service.name}
          </h1>

          <div className="mt-2 max-w-4xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-green-300">
              <BriefcaseBusiness className="h-4 w-4" />
              {service.category || "Digital Service"}
            </span>

            <p className="py-3 max-w-3xl text-base leading-8 text-theme-muted sm:text-lg">
              {service.short_description || service.description}
            </p>

            {service.description &&
              service.description !== service.short_description && (
                <p className="mt-5 max-w-3xl whitespace-pre-line text-sm leading-8 text-theme-muted">
                  {service.description}
                </p>
              )}

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-theme-muted">
                <CheckCircle2 className="h-4 w-4 text-green-400" />
                Professional Development
              </span>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-theme-muted">
                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                Scalable Solution
              </span>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/request-quote"
                className="theme-button-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold"
              >
                Request a Quote
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="theme-button-outline inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}