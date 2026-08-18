import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { Header } from "@/components/layout/Header";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { KeyTakeaways } from "@/components/blog/KeyTakeaways";
import { BlogCTA } from "@/components/blog/BlogCTA";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BRAND } from "@/lib/config";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = getAllPosts();
  const locales = ["en", "de"];

  const params: Array<{ lang: string; slug: string }> = [];

  for (const lang of locales) {
    for (const post of posts) {
      params.push({ lang, slug: post.slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};

  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} – ${BRAND.name}`,
    description: post.description,
    openGraph: {
      title: `${post.title} – ${BRAND.name}`,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.lastModified || post.date,
      authors: [post.author],
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} – ${BRAND.name}`,
      description: post.description,
    },
    alternates: buildAlternates(lang, `/blog/${slug}`),
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const dict = await getDictionary(lang as Locale);

  const formattedDate = new Date(post.date).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.lastModified || post.date,
    inLanguage: "en",
    author: {
      "@type": "Organization",
      name: post.author,
      url: "https://cyberchecklist.app",
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.name,
      url: "https://cyberchecklist.app",
      logo: {
        "@type": "ImageObject",
        url: "https://cyberchecklist.app/og-image.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://cyberchecklist.app/${lang}/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header
        lang={lang}
        langSwitch={dict.common.langSwitch}
        cta={{ label: dict.common.navCta, href: `/${lang}/risk-check` }}
      />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: dict.blog.breadcrumbs.home, href: `/${lang}` },
            { label: dict.blog.breadcrumbs.blog, href: `/${lang}/blog` },
            { label: post.title },
          ]}
        />

        <article>
          <header className="mb-8 border-b border-border pb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight mb-4 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-text-muted mb-6 leading-relaxed">
              {post.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-text-subtle font-medium">
              <span className="text-text font-semibold">{post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {dict.blog.publishedOn}: {formattedDate}
              </time>
              <span>•</span>
              <span>
                {post.readingTimeMinutes} {dict.blog.readingTime}
              </span>
            </div>
          </header>

          {post.takeaways && (
            <KeyTakeaways
              takeaways={post.takeaways}
              title={dict.blog.keyTakeaways}
            />
          )}

          <div
            className="prose-content text-text leading-relaxed font-normal"
            dangerouslySetInnerHTML={{ __html: post.htmlContent }}
          />

          <BlogCTA checkType={post.ctaCheck} lang={lang} dict={dict} />

          <div className="pt-8 mt-10 border-t border-border flex items-center justify-between">
            <Link
              href={`/${lang}/blog`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline underline-offset-2"
            >
              {dict.blog.backToBlog}
            </Link>
          </div>
        </article>
      </main>
    </>
  );
}
