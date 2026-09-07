import {
  Check,
  Code2,
  Layers3,
  Rocket,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import type { ServiceFeature } from "../../types/portfolio";
import SectionHeading from "../SectionHeading";

interface ServiceFeaturesProps {
  features: ServiceFeature[];
}

const icons = [Code2, ShieldCheck, Rocket, Layers3, Sparkles];

export default function ServiceFeatures({
  features,
}: ServiceFeaturesProps) {
  const visibleFeatures = features
    .filter((feature) => feature.is_active)
    .sort((a, b) => a.display_order - b.display_order);

  return (
    <section className="section relative overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <div className="container relative">
        <SectionHeading
          eyebrow="What's Included"
          title="Service Features"
          description="Everything you need to turn your requirements into a reliable and professional digital product."
        />

        {visibleFeatures.length === 0 ? (
          <div className="theme-card mt-12 rounded-2xl p-8 text-center">
            <p className="text-theme-muted">
              Features for this service will be added soon.
            </p>
          </div>
        ) : (
          <div className="relative mx-auto mt-16 max-w-6xl">
            {/* Desktop Roadmap Line */}
            <div
              className="
                absolute
                left-1/2
                top-8
                hidden
                h-[calc(100%-4rem)]
                w-px
                -translate-x-1/2
                bg-gradient-to-b
                from-cyan-400/0
                via-cyan-400/50
                to-purple-400/0
                md:block
              "
            />

            {/* Roadmap */}
            <div className="space-y-10 md:space-y-16">
              {visibleFeatures.map((feature, index) => {
                const Icon = icons[index % icons.length];
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={feature.id}
                    className="relative md:grid md:grid-cols-2 md:gap-20"
                  >
                    {/* =========================
                        CENTER NODE
                    ========================== */}
                    <div
                      className="
                        absolute
                        left-1/2
                        top-8
                        z-20
                        hidden
                        h-14
                        w-14
                        -translate-x-1/2
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-cyan-400/30
                        bg-theme-primary
                        shadow-[0_0_30px_rgba(34,211,238,0.15)]
                        md:flex
                      "
                    >
                      {/* Outer Ring */}
                      <div
                        className="
                          absolute
                          inset-[-6px]
                          rounded-full
                          border
                          border-cyan-400/10
                        "
                      />

                      {/* Number */}
                      <span className="relative text-sm font-bold text-theme-brand">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* =========================
                        LEFT SIDE
                    ========================== */}
                    {isLeft ? (
                      <div className="hidden md:block">
                        <FeatureRoadmapCard
                          feature={feature}
                          Icon={Icon}
                          index={index}
                        />
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}

                    {/* =========================
                        RIGHT SIDE
                    ========================== */}
                    {!isLeft ? (
                      <div className="hidden md:block">
                        <FeatureRoadmapCard
                          feature={feature}
                          Icon={Icon}
                          index={index}
                        />
                      </div>
                    ) : (
                      <div className="hidden md:block" />
                    )}

                    {/* =========================
                        MOBILE
                    ========================== */}
                    <div className="md:hidden">
                      <FeatureRoadmapCard
                        feature={feature}
                        Icon={Icon}
                        index={index}
                      />

                      {/* Mobile Connector */}
                      {index < visibleFeatures.length - 1 && (
                        <div className="flex justify-center py-5">
                          <div
                            className="
                              h-10
                              w-px
                              bg-gradient-to-b
                              from-cyan-400/60
                              to-purple-400/30
                            "
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   ROADMAP FEATURE CARD
========================================================= */

interface FeatureRoadmapCardProps {
  feature: ServiceFeature;
  Icon: typeof Code2;
  index: number;
}

function FeatureRoadmapCard({
  feature,
  Icon,
  index,
}: FeatureRoadmapCardProps) {
  return (
    <article
      className="
        theme-card
        group
        relative
        overflow-hidden
        rounded-2xl
        p-6
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-cyan-400/30
        hover:shadow-[0_20px_60px_rgba(34,211,238,0.10)]
      "
    >
      {/* Top Animated Line */}
      <div
        className="
          absolute
          left-0
          top-0
          h-px
          w-0
          bg-gradient-to-r
          from-cyan-400
          via-blue-400
          to-purple-400
          transition-all
          duration-500
          group-hover:w-full
        "
      />

      {/* Background Glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-cyan-400/10
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-cyan-400/20
        "
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
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
              border-cyan-400/20
              bg-cyan-400/10
              transition-all
              duration-500
              group-hover:scale-110
              group-hover:border-cyan-400/40
              group-hover:bg-cyan-400/15
            "
          >
            <Icon
              className="
                h-6
                w-6
                text-theme-brand
                transition-transform
                duration-500
                group-hover:rotate-6
              "
            />
          </div>

          {/* Feature Number */}
          <span
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-3
              py-1
              text-[10px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-theme-muted
            "
          >
            Feature {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h3
          className="
            py-2
            text-xl
            font-bold
            text-theme-primary
            transition-colors
            duration-300
            group-hover:text-cyan-300
          "
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p className="py-2 text-sm leading-7 text-theme-muted">
          {feature.description}
        </p>

        {/* Bottom Status */}
        <div
          className="
            mt-6
            flex
            items-center
            justify-between
            border-t
            border-white/5
            pt-4
          "
        >
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-6
                w-6
                items-center
                justify-center
                rounded-full
                bg-green-400/10
                ring-1
                ring-green-400/20
              "
            >
              <Check className="h-3.5 w-3.5 text-green-400" />
            </div>

            <span className="text-xs font-medium text-theme-brand">
              Included
            </span>
          </div>

          {/* Step */}
          <span className="text-xs font-semibold text-theme-muted">
            STEP {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </article>
  );
}