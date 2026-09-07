import { CheckCircle2, RotateCcw } from "lucide-react";

interface QuoteSuccessProps {
  quoteId: number | null;
  onReset: () => void;
}

export default function QuoteSuccess({
  quoteId,
  onReset,
}: QuoteSuccessProps) {
  return (
    <section className="bg-theme-primary px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-green-500/20 bg-white/[0.03] p-8 text-center shadow-2xl sm:p-12">
          {/* Success Icon */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10">
            <CheckCircle2
              size={42}
              className="text-green-400"
            />
          </div>

          {/* Heading */}
          <h2 className="mt-7 text-3xl font-bold text-white sm:text-4xl">
            Quote Request Submitted!
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
            Thank you for sharing your project requirements. Our team
            will review your request and contact you soon.
          </p>

          {/* Quote ID */}
          {quoteId !== null && (
            <div className="mx-auto mt-7 max-w-sm rounded-2xl border border-white/10 bg-black/20 px-6 py-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                Quote Reference
              </p>

              <p className="mt-2 text-2xl font-bold text-green-400">
                #{quoteId}
              </p>
            </div>
          )}

          {/* Action */}
          <button
            type="button"
            onClick={onReset}
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-green-400"
          >
            <RotateCcw size={17} />
            Submit Another Request
          </button>
        </div>
      </div>
    </section>
  );
}