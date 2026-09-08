import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  ChevronDown,
  ExternalLink,
  LogIn,
  LogOut,
  Menu,
  MessageSquareQuote,
  X,
} from "lucide-react";

import {
  FaGithub,
} from "react-icons/fa";

import {
  useAuth,
} from "../context/AuthContext";

import {
  usePortfolio,
} from "../context/PortfolioContext";


interface NavigationItem {
  label: string;
  path: string;
}


const mainNavigation: NavigationItem[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Careers",
    path: "/careers",
  },
  {
    label: "Testimonials",
    path: "/testimonials",
  },
  {
    label: "Contact",
    path: "/contact",
  },
];


const servicesNavigation: NavigationItem[] = [
  {
    label: "All Services",
    path: "/services",
  },
];


const projectsNavigation: NavigationItem[] = [
  {
    label: "All Projects",
    path: "/projects",
  },
];


export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const [servicesOpen, setServicesOpen] =
    useState(false);

  const [projectsOpen, setProjectsOpen] =
    useState(false);


  const location =
    useLocation();


  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();


  const {
    portfolio,
  } = usePortfolio();


  const siteSettings =
    portfolio?.site_settings;


  const siteName =
    siteSettings?.site_name ||
    "NextGenDevloper";


  const API_SERVER_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/api\/?$/, "") ||
  "http://127.0.0.1:8000";

  const siteLogo = siteSettings?.logo
    ? siteSettings.logo.startsWith("http")
      ? siteSettings.logo
      : `${API_SERVER_URL}${siteSettings.logo}`
    : null;

  /*
   * Close mobile menu whenever
   * the route changes.
   */
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setProjectsOpen(false);
  }, [location.pathname]);


  /*
   * Prevent body scrolling while
   * mobile navigation is open.
   */
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }


    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);


  const handleLogout = async () => {
    setMobileMenuOpen(false);

    await logout();
  };


  const navLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => {
    return [
      "relative",
      "flex",
      "items-center",
      "gap-1",
      "text-sm",
      "font-medium",
      "transition-colors",
      "duration-200",

      isActive
        ? "text-white"
        : "text-gray-400 hover:text-white",
    ].join(" ");
  };


  const dropdownLinkClass = ({
    isActive,
  }: {
    isActive: boolean;
  }) => {
    return [
      "flex",
      "items-center",
      "justify-between",
      "rounded-lg",
      "px-3",
      "py-2.5",
      "text-sm",
      "transition-colors",

      isActive
        ? "bg-green-500/10 text-green-400"
        : "text-gray-300 hover:bg-white/5 hover:text-white",
    ].join(" ");
  };


  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="container">

          <div className="flex h-[72px] items-center justify-between gap-6">

            {/* =================================================
                LOGO
                ================================================= */}

            <Link
              to="/"
              className="group flex shrink-0 items-center gap-3"
            >

              {siteLogo ? (
                <img
                  src={siteLogo}
                  alt={siteName}
                  className="h-9 w-9 rounded-lg object-cover"
                />
              ) : (
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-blue-600 text-sm font-black text-white shadow-lg shadow-green-500/10">
                  N
                </div>
              )}


              <div className="hidden sm:block">

                <span className="block text-sm font-bold leading-none text-white">
                  {siteName}
                </span>

                <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  Digital Solutions
                </span>

              </div>

            </Link>


            {/* =================================================
                DESKTOP NAVIGATION
                ================================================= */}

            <nav className="hidden items-center gap-7 lg:flex">

              {/* Main Links */}

              {mainNavigation.map(
                (item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={navLinkClass}
                  >
                    {({ isActive }) => (
                      <>
                        <span>
                          {item.label}
                        </span>

                        {isActive && (
                          <span className="absolute -bottom-2 left-0 h-0.5 w-full rounded-full bg-green-400" />
                        )}
                      </>
                    )}
                  </NavLink>
                )
              )}


              {/* =================================================
                  SERVICES DROPDOWN
                  ================================================= */}

              <div
                className="relative"
                onMouseEnter={() =>
                  setServicesOpen(true)
                }
                onMouseLeave={() =>
                  setServicesOpen(false)
                }
              >

                <button
                  type="button"
                  onClick={() =>
                    setServicesOpen(
                      (current) => !current
                    )
                  }
                  className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  aria-expanded={servicesOpen}
                  aria-haspopup="menu"
                >
                  Services

                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      servicesOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>


                {servicesOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">

                    <div className="rounded-xl border border-white/10 bg-gray-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">

                      {servicesNavigation.map(
                        (item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={
                              dropdownLinkClass
                            }
                          >
                            {item.label}

                            <ExternalLink
                              size={14}
                              className="text-gray-600"
                            />
                          </NavLink>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>


              {/* =================================================
                  PROJECTS DROPDOWN
                  ================================================= */}

              <div
                className="relative"
                onMouseEnter={() =>
                  setProjectsOpen(true)
                }
                onMouseLeave={() =>
                  setProjectsOpen(false)
                }
              >

                <button
                  type="button"
                  onClick={() =>
                    setProjectsOpen(
                      (current) => !current
                    )
                  }
                  className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-white"
                  aria-expanded={projectsOpen}
                  aria-haspopup="menu"
                >
                  Projects

                  <ChevronDown
                    size={15}
                    className={`transition-transform ${
                      projectsOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>


                {projectsOpen && (
                  <div className="absolute left-1/2 top-full z-50 w-56 -translate-x-1/2 pt-3">

                    <div className="rounded-xl border border-white/10 bg-gray-950/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">

                      {projectsNavigation.map(
                        (item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className={
                              dropdownLinkClass
                            }
                          >
                            {item.label}

                            <ExternalLink
                              size={14}
                              className="text-gray-600"
                            />
                          </NavLink>
                        )
                      )}

                    </div>

                  </div>
                )}

              </div>

            </nav>


            {/* =================================================
                DESKTOP ACTIONS
                ================================================= */}

            <div className="hidden items-center gap-3 lg:flex">

              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-gray-300 transition hover:border-green-500/30 hover:bg-green-500/5 hover:text-white"
                  >
                    <span className="max-w-24 truncate">
                      {user?.first_name ||
                        "Profile"}
                    </span>
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  <LogIn size={16} />

                  Login
                </Link>
              )}


              <Link
                to="/quote"
                className="theme-button-primary px-4 py-2.5 text-sm"
              >
                <MessageSquareQuote
                  size={16}
                />

                Request Quote
              </Link>

            </div>


            {/* =================================================
                MOBILE MENU BUTTON
                ================================================= */}

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen(
                  (current) => !current
                )
              }
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={
                mobileMenuOpen
              }
            >
              {mobileMenuOpen ? (
                <X size={21} />
              ) : (
                <Menu size={21} />
              )}
            </button>

          </div>

        </div>


        {/* =====================================================
            MOBILE NAVIGATION
            ===================================================== */}

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-black/95 lg:hidden">

            <div className="container max-h-[calc(100vh-73px)] overflow-y-auto py-5">

              <nav className="flex flex-col gap-1">

                {/* Main Links */}

                {mainNavigation.map(
                  (item) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      end={item.path === "/"}
                      className={({ isActive }) =>
                        [
                          "rounded-lg",
                          "px-4",
                          "py-3",
                          "text-sm",
                          "font-medium",
                          "transition",

                          isActive
                            ? "bg-green-500/10 text-green-400"
                            : "text-gray-300 hover:bg-white/5 hover:text-white",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  )
                )}


                {/* Services */}

                <div className="mt-1">

                  <button
                    type="button"
                    onClick={() =>
                      setServicesOpen(
                        (current) => !current
                      )
                    }
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Services

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        servicesOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>


                  {servicesOpen && (
                    <div className="ml-4 border-l border-white/10 pl-3">

                      {servicesNavigation.map(
                        (item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className="block rounded-lg px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                          >
                            {item.label}
                          </NavLink>
                        )
                      )}

                    </div>
                  )}

                </div>


                {/* Projects */}

                <div className="mt-1">

                  <button
                    type="button"
                    onClick={() =>
                      setProjectsOpen(
                        (current) => !current
                      )
                    }
                    className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                  >
                    Projects

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        projectsOpen
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </button>


                  {projectsOpen && (
                    <div className="ml-4 border-l border-white/10 pl-3">

                      {projectsNavigation.map(
                        (item) => (
                          <NavLink
                            key={item.path}
                            to={item.path}
                            className="block rounded-lg px-4 py-2.5 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                          >
                            {item.label}
                          </NavLink>
                        )
                      )}

                    </div>
                  )}

                </div>


                {/* =================================================
                    MOBILE ACTIONS
                    ================================================= */}

                <div className="mt-4 border-t border-white/10 pt-4">

                  <Link
                    to="/quote"
                    className="theme-button-primary flex w-full"
                  >
                    <MessageSquareQuote
                      size={17}
                    />

                    Request a Quote
                  </Link>


                  {isAuthenticated ? (
                    <div className="mt-3 grid grid-cols-2 gap-2">

                      <Link
                        to="/dashboard"
                        className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                      >
                        Dashboard
                      </Link>


                      <button
                        type="button"
                        onClick={
                          handleLogout
                        }
                        className="flex items-center justify-center gap-2 rounded-lg border border-red-500/20 px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
                      >
                        <LogOut
                          size={16}
                        />

                        Logout
                      </button>

                    </div>
                  ) : (
                    <Link
                      to="/login"
                      className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-3 text-sm font-medium text-gray-300 transition hover:bg-white/5 hover:text-white"
                    >
                      <LogIn size={17} />

                      Login
                    </Link>
                  )}

                </div>


                {/* GitHub */}

                {siteSettings?.github_url && (
                  <a
                    href={
                      siteSettings.github_url
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 py-3 text-sm text-gray-500 transition hover:text-white"
                  >
                    <FaGithub size={18} />

                    GitHub

                    <ExternalLink
                      size={13}
                    />
                  </a>
                )}

              </nav>

            </div>

          </div>
        )}

      </header>
    </>
  );
}