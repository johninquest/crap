import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blog";
import type { Dictionary } from "@/lib/types/dictionary";

interface PostCardProps {
  post: BlogPostMeta;
  lang: string;
  dict: Dictionary["blog"];
}

export function PostCard({ post, lang, dict }: PostCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString(lang === "de" ? "de-DE" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group relative bg-surface rounded-2xl border border-border hover:border-primary/40 transition-all duration-200 p-6 sm:p-7 flex flex-col justify-between hover:shadow-md">
      <div>
        <div className="flex items-center gap-3 text-xs text-text-subtle mb-3">
          <time dateTime={post.date}>{formattedDate}</time>
          <span>•</span>
          <span className="font-medium text-text-muted">
            {post.readingTimeMinutes} {dict.readingTime}
          </span>
        </div>

        <h2 className="text-xl font-bold text-text group-hover:text-primary transition-colors tracking-tight leading-snug mb-3">
          <Link href={`/${lang}/blog/${post.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {post.title}
          </Link>
        </h2>

        <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
          {post.description}
        </p>
      </div>

      <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
        <span>{dict.readMore}</span>
      </div>
    </article>
  );
}
