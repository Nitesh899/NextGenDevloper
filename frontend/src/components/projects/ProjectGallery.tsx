import { Image as ImageIcon } from "lucide-react";
import type { Project } from "../../types/portfolio";
import SectionHeading from "../SectionHeading";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({
  project,
}: ProjectGalleryProps) {
  const images = [
    project.thumbnail,
    project.gallery_image_1,
    project.gallery_image_2,
    project.gallery_image_3,
  ].filter((image): image is string => Boolean(image));

  const uniqueImages = Array.from(new Set(images));

  return (
    <section className="section">
      <div className="container">
        <SectionHeading
          eyebrow="Project Showcase"
          title="Screenshots & Gallery"
          description="A visual look at the project interface and implementation."
        />

        {uniqueImages.length === 0 ? (
          <div className="theme-card mt-12 rounded-2xl p-10 text-center">
            <ImageIcon className="mx-auto h-12 w-12 text-theme-brand" />

            <h3 className="mt-5 text-xl font-bold text-theme-primary">
              Gallery Coming Soon
            </h3>

            <p className="mt-2 text-theme-muted">
              Project screenshots will appear here once they are added through
              Django Admin.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {uniqueImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/5 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <img
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  loading={index === 0 ? "eager" : "lazy"}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                    index === 0
                      ? "aspect-video"
                      : "aspect-video"
                  }`}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}