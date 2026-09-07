import {
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import { usePortfolio } from "../../context/PortfolioContext";

export default function ContactInfo() {
  const { portfolio } = usePortfolio();

  const siteSettings = portfolio?.site_settings;

  siteSettings?.email
  siteSettings?.phone
  siteSettings?.address

  const email = siteSettings?.email || "hello@nextgendevloper.com";
  const phone = siteSettings?.phone || "";
  const address = siteSettings?.address || "Available Worldwide";

  return (
    <section className="bg-theme-secondary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="theme-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
              <Mail className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Email
            </h3>

            <a
              href={`mailto:${email}`}
              className="mt-2 block break-all text-sm text-gray-400 transition hover:text-green-400"
            >
              {email}
            </a>
          </div>

          <div className="theme-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <Phone className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Phone
            </h3>

            {phone ? (
              <a
                href={`tel:${phone}`}
                className="mt-2 block text-sm text-gray-400 transition hover:text-blue-400"
              >
                {phone}
              </a>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                Available on request
              </p>
            )}
          </div>

          <div className="theme-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <MapPin className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Location
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              {address}
            </p>
          </div>

          <div className="theme-card p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
              <Clock3 className="h-6 w-6" />
            </div>

            <h3 className="text-lg font-semibold text-white">
              Response Time
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              We&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}