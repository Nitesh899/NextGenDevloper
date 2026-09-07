import {
  Award,
  CheckCircle2,
  Gift,
  GraduationCap,
  ListChecks,
  Wrench,
} from "lucide-react";
import type { JobOpening } from "../../types/portfolio";

interface JobDetailSectionsProps {
  job: JobOpening;
}

interface DetailBlockProps {
  title: string;
  content: string;
  icon: React.ReactNode;
}

function DetailBlock({
  title,
  content,
  icon,
}: DetailBlockProps) {
  if (!content?.trim()) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-green-300">
          {icon}
        </div>

        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>
      </div>

      <div className="mt-5 whitespace-pre-wrap text-sm leading-7 text-theme-muted">
        {content}
      </div>
    </section>
  );
}

export default function JobDetailSections({
  job,
}: JobDetailSectionsProps) {
  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto grid max-w-5xl gap-6">
          <DetailBlock
            title="About the Position"
            content={job.description}
            icon={<Award size={20} />}
          />

          <DetailBlock
            title="Responsibilities"
            content={job.responsibilities}
            icon={<ListChecks size={20} />}
          />

          <DetailBlock
            title="Requirements"
            content={job.requirements}
            icon={<CheckCircle2 size={20} />}
          />

          <DetailBlock
            title="Preferred Qualifications"
            content={job.preferred_qualifications}
            icon={<GraduationCap size={20} />}
          />

          <DetailBlock
            title="Required Skills"
            content={job.required_skills}
            icon={<Wrench size={20} />}
          />

          <DetailBlock
            title="Benefits"
            content={job.benefits}
            icon={<Gift size={20} />}
          />
        </div>
      </div>
    </section>
  );
}