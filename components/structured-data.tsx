import type { ReactNode } from "react";
import { pageDates, siteConfig } from "@/lib/config";
import type { Translations } from "@/lib/i18n";

// JSON-LD structured data (schema.org). Server components only: they render
// <script type="application/ld+json"> tags at build time (output: "export").
// All copy is pulled from lib/config.ts / lib/i18n so nothing can drift from
// the visible content.

const inLanguages: Record<string, string> = {
  en: "en",
  zh: "zh-Hans",
};

const organizationId = `${siteConfig.url}/#organization`;
const websiteId = `${siteConfig.url}/#website`;
const appId = `${siteConfig.url}/#app`;

function JsonLd({ data }: { data: object }): ReactNode {
  return (
    <script
      type="application/ld+json"
      // "<" is escaped so user-facing copy can never terminate the script tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Site-wide graph (Organization + WebSite + SoftwareApplication), mounted once
 * per locale in app/[locale]/layout.tsx.
 */
export function SiteStructuredData({ locale }: { locale: string }): ReactNode {
  const inLanguage = inLanguages[locale] ?? inLanguages.en;

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Organization",
            "@id": organizationId,
            name: siteConfig.authors[0].name,
            url: siteConfig.url,
            email: siteConfig.email,
            logo: {
              "@type": "ImageObject",
              url: `${siteConfig.url}/icon.png`,
            },
          },
          {
            "@type": "WebSite",
            "@id": websiteId,
            name: siteConfig.seoTitle,
            url: siteConfig.url,
            inLanguage,
            publisher: { "@id": organizationId },
          },
          {
            // Single node with both types: one entity for one product; a
            // second node would split the app into two competing entities.
            "@type": ["SoftwareApplication", "MobileApplication"],
            "@id": appId,
            name: siteConfig.seoTitle,
            description: siteConfig.description,
            applicationCategory: "LifestyleApplication",
            operatingSystem: "iOS, Android",
            offers: {
              "@type": "Offer",
              price: 0,
              priceCurrency: "USD",
            },
            // Store listings: downloadUrl for LLM parsers, sameAs for entity
            // consolidation (website + both store pages = one app). No
            // aggregateRating until real store ratings exist.
            downloadUrl: [siteConfig.appStore, siteConfig.googlePlay],
            sameAs: [siteConfig.appStore, siteConfig.googlePlay],
            dateModified: pageDates.home,
            author: { "@id": organizationId },
            url: `${siteConfig.url}/${locale}`,
            inLanguage,
          },
        ],
      }}
    />
  );
}

/**
 * FAQPage markup for the home page, the only page that renders the FAQ
 * section (components/faq.tsx), so the markup stays on the page whose visible
 * content it describes. Questions/answers are read from the i18n object.
 */
export function FaqStructuredData({ t }: { t: Translations }): ReactNode {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }}
    />
  );
}

/**
 * Two-level breadcrumb (home → current page) for the legal / methodology
 * subpages. `path` is the locale-relative path (e.g. "/privacy") and
 * `pageTitle` comes from the page's i18n data.
 */
export function BreadcrumbStructuredData({
  locale,
  path,
  pageTitle,
}: {
  locale: string;
  path: string;
  pageTitle: string;
}): ReactNode {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: siteConfig.name,
            item: `${siteConfig.url}/${locale}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: pageTitle,
            item: `${siteConfig.url}/${locale}${path}`,
          },
        ],
      }}
    />
  );
}
