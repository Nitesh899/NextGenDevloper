import {
  ArrowUpRight,
  ChevronRight,
  Mail,
  MapPin,
  MessageSquareQuote,
  Phone,
} from "lucide-react";

import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { usePortfolio } from "../context/PortfolioContext";

type SocialIconProps = {
  href: string;
  label: string;
  children: React.ReactNode;
};

function SocialIcon({
  href,
  label,
  children,
}: SocialIconProps) {
  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-xl
        border border-theme
        bg-theme-secondary
        text-theme-muted
        transition-all duration-300
        hover:-translate-y-1
        hover:border-theme-brand
        hover:bg-theme-tertiary
        hover:text-theme-brand
      "
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { portfolio, isLoading } = usePortfolio();

  const siteSettings = portfolio?.site_settings;

  /*
   * SiteSettings fields can evolve as the Django model grows.
   * Using this helper keeps Footer flexible without changing
   * the Portfolio TypeScript model every time a social field
   * is added on the backend.
   */
  const getSiteValue = (
    key: string,
  ): string => {
    const settings =
      siteSettings as
        | Record<string, unknown>
        | undefined;

    const value = settings?.[key];

    return typeof value === "string"
      ? value
      : "";
  };

  const siteName =
    getSiteValue("site_name") ||
    "NextGenDevloper";

  const siteDescription =
    getSiteValue("description") ||
    getSiteValue("site_description") ||
    "Building modern digital experiences with reliable technology, thoughtful design and scalable solutions.";

  const email =
    getSiteValue("email") ||
    getSiteValue("contact_email");

  const phone =
    getSiteValue("phone") ||
    getSiteValue("phone_number") ||
    getSiteValue("contact_phone");

  const address =
    getSiteValue("address") ||
    getSiteValue("location");

  const githubUrl =
    getSiteValue("github_url");

  const linkedinUrl =
    getSiteValue("linkedin_url");

  const instagramUrl =
    getSiteValue("instagram_url");

  const facebookUrl =
    getSiteValue("facebook_url");

  const youtubeUrl =
    getSiteValue("youtube_url");

  const twitterUrl =
    getSiteValue("twitter_url") ||
    getSiteValue("x_url");

  const currentYear =
    new Date().getFullYear();

  const services = portfolio?.services ?? [];

  console.log("Footer services:", services);

  const navigation = [
    {
      title: "Explore",
      links: [
        {
          label: "Home",
          to: "/",
        },
        {
          label: "About",
          to: "/about",
        },
        {
          label: "Services",
          to: "/services",
        },
        {
          label: "Projects",
          to: "/projects",
        },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          label: "Blog",
          to: "/blog",
        },
        {
          label: "Careers",
          to: "/careers",
        },
        {
          label: "Testimonials",
          to: "/testimonials",
        },
        {
          label: "Contact",
          to: "/contact",
        },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-theme bg-theme-primary">

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0
          overflow-hidden
        "
      >
        <div
          className="
            absolute -left-32 top-20
            h-72 w-72
            rounded-full
            bg-theme-brand
            opacity-[0.035]
            blur-3xl
          "
        />

        <div
          className="
            absolute -right-32 bottom-10
            h-80 w-80
            rounded-full
            bg-theme-blue
            opacity-[0.04]
            blur-3xl
          "
        />
      </div>

      <div className="relative">

        {/* =====================================================
            NEWSLETTER / CTA SECTION
        ====================================================== */}

        <section className="border-b border-theme">
          <div className="container py-16 sm:py-20">

            <div
              className="
                relative overflow-hidden
                rounded-3xl
                border border-theme
                bg-theme-secondary
                p-6
                sm:p-8
                lg:p-10
              "
            >

              {/* Glow */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute -right-20 -top-20
                  h-56 w-56
                  rounded-full
                  bg-theme-brand
                  opacity-[0.08]
                  blur-3xl
                "
              />

              <div
                className="
                  relative
                  grid gap-8
                  lg:grid-cols-[1.3fr_1fr]
                  lg:items-center
                "
              >

                {/* CTA content */}
                <div>
                  <div
                    className="
                      mb-4 inline-flex
                      items-center gap-2
                      rounded-full
                      border border-theme
                      bg-theme-tertiary
                      px-3 py-1.5
                      text-xs font-semibold
                      uppercase tracking-[0.18em]
                      text-theme-brand
                    "
                  >
                    <span
                      className="
                        h-1.5 w-1.5
                        rounded-full
                        bg-theme-brand
                      "
                    />

                    Let&apos;s build something
                  </div>

                  <h2
                    className="
                      max-w-2xl
                      text-3xl font-bold
                      tracking-tight
                      text-theme-primary
                      sm:text-4xl
                      lg:text-5xl
                    "
                  >
                    Have an idea?
                    <span className="gradient-text">
                      {" "}Let&apos;s turn it into reality.
                    </span>
                  </h2>

                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-sm leading-7
                      text-theme-muted
                      sm:text-base
                    "
                  >
                    Tell us what you are building,
                    what problem you want to solve,
                    and where you want to go next.
                  </p>

                  <div className="mt-7">
                    <Link
                      to="/quote"
                      className="
                        theme-button-primary
                        inline-flex
                        items-center gap-2
                      "
                    >
                      <MessageSquareQuote
                        size={18}
                      />

                      Request a Quote

                      <ArrowUpRight
                        size={17}
                      />
                    </Link>
                  </div>
                </div>

                {/* Newsletter-style card */}
                <div
                  className="
                    rounded-2xl
                    border border-theme
                    bg-theme-primary
                    p-5
                    sm:p-6
                  "
                >
                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      bg-theme-tertiary
                      text-theme-brand
                    "
                  >
                    <Mail size={20} />
                  </div>

                  <h3
                    className="
                      mt-5
                      text-xl font-semibold
                      text-theme-primary
                    "
                  >
                    Stay connected
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm leading-6
                      text-theme-muted
                    "
                  >
                    Follow the latest projects,
                    technology updates and digital
                    development insights.
                  </p>

                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="
                        mt-5
                        flex items-center
                        gap-2
                        rounded-xl
                        border border-theme
                        bg-theme-secondary
                        px-4 py-3
                        text-sm
                        text-theme-secondary
                        transition-colors
                        hover:border-theme-brand
                        hover:text-theme-brand
                      "
                    >
                      <Mail size={16} />

                      <span className="truncate">
                        {email}
                      </span>

                      <ArrowUpRight
                        className="ml-auto shrink-0"
                        size={16}
                      />
                    </a>
                  ) : (
                    <Link
                      to="/contact"
                      className="
                        mt-5
                        flex items-center
                        gap-2
                        rounded-xl
                        border border-theme
                        bg-theme-secondary
                        px-4 py-3
                        text-sm
                        text-theme-secondary
                        transition-colors
                        hover:border-theme-brand
                        hover:text-theme-brand
                      "
                    >
                      <Mail size={16} />

                      Contact us

                      <ArrowUpRight
                        className="ml-auto"
                        size={16}
                      />
                    </Link>
                  )}
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* =====================================================
            MAIN FOOTER
        ====================================================== */}

        <section>
          <div className="container py-14 sm:py-16">

            <div
              className="
                grid gap-12
                sm:grid-cols-2
                lg:grid-cols-[1.5fr_1fr_1fr_1.2fr]
              "
            >

              {/* =================================================
                  BRAND
              ================================================== */}

              <div className="lg:pr-8">

                <Link
                  to="/"
                  className="
                    inline-flex
                    items-center gap-3
                    group
                  "
                >
                  <span
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      border border-theme
                      bg-theme-secondary
                      text-lg font-bold
                      text-theme-primary
                      transition-all
                      group-hover:border-theme-brand
                      group-hover:text-theme-brand
                    "
                  >
                    {siteName
                      .charAt(0)
                      .toUpperCase()}
                  </span>

                  <span
                    className="
                      text-lg font-bold
                      tracking-tight
                      text-theme-primary
                    "
                  >
                    {siteName}
                  </span>
                </Link>

                <p
                  className="
                    mt-5
                    max-w-sm
                    text-sm leading-7
                    text-theme-muted
                  "
                >
                  {siteDescription}
                </p>

                {/* Social icons */}
                <div className="mt-6 flex flex-wrap gap-2.5">

                  <SocialIcon
                    href={githubUrl}
                    label="GitHub"
                  >
                    <FaGithub size={17} />
                  </SocialIcon>

                  <SocialIcon
                    href={linkedinUrl}
                    label="LinkedIn"
                  >
                    <FaLinkedinIn size={17} />
                  </SocialIcon>

                  <SocialIcon
                    href={instagramUrl}
                    label="Instagram"
                  >
                    <FaInstagram size={17} />
                  </SocialIcon>

                  <SocialIcon
                    href={facebookUrl}
                    label="Facebook"
                  >
                    <FaFacebookF size={15} />
                  </SocialIcon>

                  <SocialIcon
                    href={youtubeUrl}
                    label="YouTube"
                  >
                    <FaYoutube size={17} />
                  </SocialIcon>

                  <SocialIcon
                    href={twitterUrl}
                    label="X / Twitter"
                  >
                    <FaTwitter size={16} />
                  </SocialIcon>

                </div>
              </div>

              {/* =================================================
                  NAVIGATION
              ================================================== */}

              {navigation.map((group) => (
                <div key={group.title}>
                  <h3
                    className="
                      text-sm font-semibold
                      uppercase tracking-[0.16em]
                      text-theme-primary
                    "
                  >
                    {group.title}
                  </h3>

                  <ul className="mt-5 space-y-3">

                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          className="
                            group
                            inline-flex
                            items-center
                            gap-1
                            text-sm
                            text-theme-muted
                            transition-colors
                            hover:text-theme-brand
                          "
                        >
                          <ChevronRight
                            size={14}
                            className="
                              opacity-0
                              -ml-3
                              transition-all
                              group-hover:ml-0
                              group-hover:opacity-100
                            "
                          />

                          {link.label}
                        </Link>
                      </li>
                    ))}

                  </ul>
                </div>
              ))}

              {/* =================================================
                  SERVICES
              ================================================== */}

              <div>
                <h3
                  className="
                    text-sm font-semibold
                    uppercase tracking-[0.16em]
                    text-theme-primary
                  "
                >
                  Services
                </h3>

                <ul className="mt-5 space-y-3">

                  {isLoading ? (
                    <>
                      <li className="h-4 w-28 animate-pulse rounded bg-theme-tertiary" />
                      <li className="h-4 w-36 animate-pulse rounded bg-theme-tertiary" />
                      <li className="h-4 w-24 animate-pulse rounded bg-theme-tertiary" />
                    </>
                  ) : services.length > 0 ? (
                    services
                      .slice(0, 6)
                      .map((service) => (
                        <li key={service.id}>
                          <Link
                            to="/services"
                            className="
                              group
                              inline-flex
                              items-center
                              gap-1
                              text-sm
                              text-theme-muted
                              transition-colors
                              hover:text-theme-brand
                            "
                          >
                            <ChevronRight
                              size={14}
                              className="
                                opacity-0
                                -ml-3
                                transition-all
                                group-hover:ml-0
                                group-hover:opacity-100
                              "
                            />

                            {service.name}
                          </Link>
                        </li>
                      ))
                  ) : (
                    <>
                      <li>
                        <Link
                          to="/services"
                          className="
                            text-sm
                            text-theme-muted
                            hover:text-theme-brand
                          "
                        >
                          Web Development
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/services"
                          className="
                            text-sm
                            text-theme-muted
                            hover:text-theme-brand
                          "
                        >
                          Software Development
                        </Link>
                      </li>

                      <li>
                        <Link
                          to="/services"
                          className="
                            text-sm
                            text-theme-muted
                            hover:text-theme-brand
                          "
                        >
                          AI Solutions
                        </Link>
                      </li>
                    </>
                  )}

                </ul>

                <Link
                  to="/services"
                  className="
                    mt-5
                    inline-flex
                    items-center gap-1
                    text-sm font-semibold
                    text-theme-brand
                    hover:gap-2
                  "
                >
                  View all services

                  <ArrowUpRight
                    size={15}
                  />
                </Link>
              </div>

            </div>

            {/* ===================================================
                CONTACT STRIP
            ==================================================== */}

            <div
              className="
                mt-14
                grid gap-4
                border-y border-theme
                py-6
                sm:grid-cols-2
                lg:grid-cols-3
              "
            >

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="
                    flex items-center gap-3
                    text-sm
                    text-theme-muted
                    transition-colors
                    hover:text-theme-brand
                  "
                >
                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      bg-theme-secondary
                      text-theme-brand
                    "
                  >
                    <Mail size={16} />
                  </span>

                  <span className="truncate">
                    {email}
                  </span>
                </a>
              )}

              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="
                    flex items-center gap-3
                    text-sm
                    text-theme-muted
                    transition-colors
                    hover:text-theme-brand
                  "
                >
                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      bg-theme-secondary
                      text-theme-brand
                    "
                  >
                    <Phone size={16} />
                  </span>

                  <span>
                    {phone}
                  </span>
                </a>
              )}

              {address && (
                <div
                  className="
                    flex items-center gap-3
                    text-sm
                    text-theme-muted
                  "
                >
                  <span
                    className="
                      flex h-9 w-9
                      shrink-0
                      items-center justify-center
                      rounded-lg
                      bg-theme-secondary
                      text-theme-brand
                    "
                  >
                    <MapPin size={16} />
                  </span>

                  <span>
                    {address}
                  </span>
                </div>
              )}

            </div>

          </div>
        </section>

        {/* =====================================================
            COPYRIGHT
        ====================================================== */}

        <section className="border-t border-theme">
          <div
            className="
              container
              flex flex-col
              gap-4
              py-6
              text-sm
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <p className="text-theme-muted">
              © {currentYear}{" "}
              <span className="text-theme-primary">
                {siteName}
              </span>
              . All rights reserved.
            </p>

            <div
              className="
                flex flex-wrap
                items-center
                gap-4
              "
            >
              <Link
                to="/contact"
                className="
                  text-theme-muted
                  transition-colors
                  hover:text-theme-brand
                "
              >
                Contact
              </Link>

              <span
                aria-hidden="true"
                className="text-theme-muted"
              >
                •
              </span>

              <Link
                to="/quote"
                className="
                  inline-flex
                  items-center gap-1
                  font-medium
                  text-theme-brand
                  hover:underline
                "
              >
                Start a project
                <ArrowUpRight size={14} />
              </Link>
            </div>

          </div>
        </section>

      </div>
    </footer>
  );
}