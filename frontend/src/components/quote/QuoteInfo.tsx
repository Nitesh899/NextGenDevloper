import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const points = [
  {
    icon: CheckCircle2,
    title: "Clear Requirements",
    description:
      "Share your exact project requirements and expectations.",
  },
  {
    icon: Clock3,
    title: "Realistic Timeline",
    description:
      "Tell us your preferred delivery timeline.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Process",
    description:
      "We believe in clear communication and transparent planning.",
  },
  {
    icon: Sparkles,
    title: "Custom Solution",
    description:
      "Every project is evaluated according to its unique needs.",
  },
];

export default function QuoteInfo() {
  return (
    <section className="bg-theme-secondary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-400">
            Before You Submit
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
            Help Us Understand Your Project
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-400 sm:text-base">
            The more information you provide, the better we can
            understand your requirements and prepare an accurate
            project estimate.
          </p>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {points.map((point) => {
            const Icon = point.icon;

            return (
              <div
                key={point.title}
                className="theme-card p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-400">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-white">
                  {point.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  {point.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}