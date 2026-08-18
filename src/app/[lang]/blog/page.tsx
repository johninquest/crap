import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { Header } from "@/components/layout/Header";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { getAllPosts } from "@/lib/blog";
import { BRAND } from "@/lib/config";
import { buildAlternates, OG_IMAGE } from "@/lib/seo";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "de" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: `${dict.blog.metaTitle} – ${BRAND.name}`,
    description: dict.blog.metaDesc,
    openGraph: {
      title: `${dict.blog.metaTitle} – ${BRAND.name}`,
      description: dict.blog.metaDesc,
      type: "website",
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: buildAlternates(lang, "/blog"),
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  const posts = getAllPosts();

  return (
    <>
      <Header
        lang={lang}
        langSwitch={dict.common.langSwitch}
        cta={{ label: dict.common.navCta, href: `/${lang}/risk-check` }}
      />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Breadcrumbs
          items={[
            { label: dict.blog.breadcrumbs.home, href: `/${lang}` },
            { label: dict.blog.breadcrumbs.blog },
          ]}
        />

        <div className="mb-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary-soft text-primary border border-primary/20 mb-4">
            {BRAND.name} Insights
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-text tracking-tight mb-3">
            {dict.blog.pageTitle}
          </h1>
          <p className="text-base text-text-muted max-w-2xl leading-relaxed">
            {dict.blog.pageSubtitle}
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="p-8 text-center bg-surface rounded-2xl border border-border text-text-muted">
            {dict.blog.emptyMessage}
          </div>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} lang={lang} dict={dict.blog} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
