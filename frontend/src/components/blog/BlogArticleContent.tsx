import { FileText } from "lucide-react";
import type { BlogPost } from "../../types/portfolio";

interface BlogArticleContentProps {
  post: BlogPost;
}

export default function BlogArticleContent({
  post,
}: BlogArticleContentProps) {
  const hasContent = Boolean(post.content?.trim());

  return (
    <section className="section">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {post.cover_image && (
            <div className="mb-10 overflow-hidden rounded-2xl border border-white/10">
              <img
                src={post.cover_image}
                alt={post.title}
                className="max-h-[560px] w-full object-cover"
              />
            </div>
          )}

          <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-10">
            {hasContent ? (
              <div className="whitespace-pre-wrap text-base leading-8 text-gray-300">
                {post.content}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-400/10 text-purple-300">
                  <FileText size={26} />
                </div>

                <h2 className="text-xl font-semibold text-white">
                  Article content is being prepared
                </h2>

                <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-theme-muted">
                  The article introduction is available above.
                  Full content will be published soon.
                </p>
              </div>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}