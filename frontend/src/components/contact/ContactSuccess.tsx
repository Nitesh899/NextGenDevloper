import {
  CheckCircle2,
  RotateCcw,
} from "lucide-react";

interface ContactSuccessProps {
  message: string;
  inquiryId?: number;
  onSendAnother: () => void;
}

export default function ContactSuccess({
  message,
  inquiryId,
  onSendAnother,
}: ContactSuccessProps) {
  return (
    <div className="theme-card p-8 text-center sm:p-10">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
        <CheckCircle2 className="h-9 w-9 text-green-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-white">
        Message Sent Successfully
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-gray-400 sm:text-base">
        {message}
      </p>

      {inquiryId && (
        <p className="mt-4 text-sm text-gray-500">
          Inquiry ID:{" "}
          <span className="font-semibold text-gray-300">
            #{inquiryId}
          </span>
        </p>
      )}

      <button
        type="button"
        onClick={onSendAnother}
        className="theme-button-primary mt-8 inline-flex items-center gap-2"
      >
        <RotateCcw className="h-4 w-4" />
        Send Another Message
      </button>
    </div>
  );
}