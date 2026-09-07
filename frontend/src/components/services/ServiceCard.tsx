import {
  ArrowUpRight,
  Bot,
  Code2,
  Database,
  Globe2,
  Layout,
  Smartphone,
  Workflow,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Service } from "../../types/portfolio";

interface ServiceCardProps {
  service: Service;
}

const iconMap: Record<string, typeof Code2> = {
  web: Globe2,
  website: Globe2,
  frontend: Layout,
  backend: Database,
  mobile: Smartphone,
  android: Smartphone,
  ai: Bot,
  automation: Workflow,
  software: Wrench,
};

function getServiceIcon(service: Service) {
  const value = `
    ${service.icon ?? ""}
    ${service.category ?? ""}
    ${service.name ?? ""}
  `.toLowerCase();

  for (const [key, Icon] of Object.entries(iconMap)) {
    if (value.includes(key)) {
      return Icon;
    }
  }

  return Code2;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  const Icon = getServiceIcon(service);

  return (
    <article
      className="
        group
        theme-card
        relative
        overflow-hidden
        rounded-3xl
        border
        border-theme
        p-6
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-theme-brand/30
        hover:shadow-xl
        hover:shadow-cyan-500/10
        sm:p-7
      "
    >
      {/* =========================
          BACKGROUND GLOW
      ========================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-40
          w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
          opacity-0
          transition-all
          duration-500
          group-hover:scale-150
          group-hover:opacity-100
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-40
          w-40
          rounded-full
          bg-purple-400/10
          blur-3xl
          opacity-0
          transition-all
          duration-500
          group-hover:scale-125
          group-hover:opacity-100
        "
      />

      {/* =========================
          TOP ROW
      ========================== */}
      <div className="relative flex items-start justify-between gap-4">
        {/* Icon */}
        <div
          className="
            flex
            h-14
            w-14
            shrink-0
            items-center
            justify-center
            rounded-2xl
            border
            border-theme
            bg-theme-tertiary
            text-theme-brand
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:-rotate-3
            group-hover:bg-cyan-400/10
          "
        >
          <Icon
            className="
              h-7
              w-7
              transition-transform
              duration-500
              group-hover:scale-110
            "
            aria-hidden="true"
          />
        </div>

        {/* Display Order */}
        <span
          className="
            rounded-full
            border
            border-theme
            bg-theme-secondary
            px-3
            py-1
            text-[10px]
            font-bold
            tracking-[0.15em]
            text-theme-muted
          "
        >
          #{String(service.display_order).padStart(2, "0")}
        </span>
      </div>

      {/* =========================
          TITLE
      ========================== */}
      <h3
        className="
          relative
          mt-10
          py-6
          text-xl
          font-bold
          tracking-tight
          text-theme-primary
          transition-colors
          duration-300
          group-hover:text-theme-brand
        "
      >
        {service.name}
      </h3>


      {/* =========================
          CATEGORY + STATUS
      ========================== */}
      <div className="relative  flex flex-wrap items-center gap-2">
        {service.category && (
          <span
            className="
              rounded-full
              border
              border-theme
              bg-theme-tertiary
              px-3
              py-1
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              text-theme-brand
            "
          >
            {service.category}
          </span>
        )}

        {service.status && (
          <span
            className="
              rounded-full
              border
              border-theme
              bg-theme-secondary
              px-3
              py-1
              text-[10px]
              font-medium
              capitalize
              text-theme-muted
            "
          >
            {service.status}
          </span>
        )}
      </div>

      
      {/* =========================
          SHORT DESCRIPTION
      ========================== */}
      {service.short_description && (
        <p
          className="
            relative
            py-4
            line-clamp-3
            text-sm
            leading-7
            text-theme-muted
          "
        >
          {service.short_description}
        </p>
      )}
    

      {/* =========================
          FOOTER
      ========================== */}
      <div
        className="
          relative
          mt-6
          flex
          items-center
          justify-between
          border-t
          border-theme
          pt-5
        "
      >
        <Link
          to={`/services/${service.slug}`}
          className="
            inline-flex
            items-center
            gap-2
            text-sm
            font-semibold
            text-theme-brand
            transition-colors
            duration-300
            hover:text-theme-primary
          "
        >
          Explore Service

          <ArrowUpRight
            className="
              h-4
              w-4
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
            aria-hidden="true"
          />
        </Link>

        <span
          className="
            text-[10px]
            font-medium
            uppercase
            tracking-wider
            text-theme-muted
          "
        >
          NextGenDevloper
        </span>
      </div>

      {/* =========================
          BOTTOM ACCENT
      ========================== */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          bg-gradient-to-r
          from-cyan-400
          via-cyan-300
          to-transparent
          transition-all
          duration-500
          group-hover:w-2/3
        "
      />
    </article>
  );
}