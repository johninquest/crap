import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "../globals.css";
import { BRAND } from "@/lib/config";
import { OG_IMAGE } from "@/lib/seo";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/Footer";
import { PostHogProvider } from "@/components/providers/PostHogProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

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
    metadataBase: new URL("https://cyberchecklist.app"),
    title: `${BRAND.name} – ${dict.home.heroTitle}`,
    description: dict.home.heroBody,
    openGraph: {
      type: "website",
      siteName: BRAND.name,
      images: OG_IMAGE,
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0B132B",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://cyberchecklist.app/#organization",
      name: BRAND.name,
      url: "https://cyberchecklist.app",
      logo: {
        "@type": "ImageObject",
        url: "https://cyberchecklist.app/og-image.png",
      },
    },
    {
      "@type": "WebApplication",
      "@id": "https://cyberchecklist.app/#webapp",
      name: BRAND.name,
      url: "https://cyberchecklist.app",
      description: BRAND.tagline,
      applicationCategory: "SecurityApplication",
      operatingSystem: "Any",
      inLanguage: ["en", "de"],
      isAccessibleForFree: true,
      publisher: { "@id": "https://cyberchecklist.app/#organization" },
    },
  ],
};

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className={`${inter.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full flex flex-col">
        <PostHogProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer dict={dict} lang={lang} />
        </PostHogProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}
    </html>
  );
}
