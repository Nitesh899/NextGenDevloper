import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { usePortfolio } from "../../context/PortfolioContext";

export default function ServicesHero() {
  const { portfolio } = usePortfolio();

  const siteName =
    portfolio?.site_settings?.site_name || "NextGenDevloper";

  const tagline =
    portfolio?.site_settings?.tagline || "Build. Create. Innovate.";

  const description =
    portfolio?.site_settings?.description ||
    "Professional digital solutions designed to help businesses grow.";

  return (
    <section className="relative overflow-hidden border-b border-white/5">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10rem] top-10 h-80 w-80 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-[-8rem] top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-[-12rem] left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <div className="flex min-h-[520px] items-center py-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-400/20 bg-green-400/10 px-4 py-2 text-sm font-medium text-green-300">
              <Sparkles className="h-4 w-4" />
              Professional Services
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-black tracking-tight text-theme-primary sm:text-5xl lg:text-7xl">
              Digital Solutions
              <span className="block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Built for Growth
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-theme-muted sm:text-lg">
              {description}
            </p>

            <p className="mt-3 text-sm font-medium text-theme-brand">
              {siteName} — {tagline}
            </p>

            {/* Buttons */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/quote"
                className="theme-button-primary inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="theme-button-outline inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 font-semibold"
              >
                <BriefcaseBusiness className="h-4 w-4" />
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}