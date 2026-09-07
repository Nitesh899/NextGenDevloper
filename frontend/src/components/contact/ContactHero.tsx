import { Mail, MessageCircle, Send } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-theme-primary">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-10 h-64 w-64 rounded-full bg-green-500/10 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
            <MessageCircle className="h-4 w-4" />
            Let&apos;s Work Together
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Get in{" "}
            <span className="gradient-text">
              Touch
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
            Have a project idea, business requirement, technical question,
            or collaboration opportunity? Send us a message and let&apos;s
            discuss how we can work together.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              <Mail className="h-4 w-4 text-green-400" />
              Quick Response
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-300">
              <Send className="h-4 w-4 text-blue-400" />
              Project Consultation
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}