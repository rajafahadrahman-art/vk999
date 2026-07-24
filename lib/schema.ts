import { siteConfig } from "@/lib/site-config";

type Faq = { question: string; answer: string };
type Crumb = { name: string; path: string };

function abs(path: string) {
  if (path.startsWith("http")) return path;
  return `${siteConfig.domain}${path}`;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.domain + "/",
    description: siteConfig.description,
    inLanguage: "en-PK",
    publisher: {
      "@type": "Organization",
      name: siteConfig.siteName,
      url: siteConfig.domain + "/",
      logo: abs(siteConfig.images.logo.src),
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.siteName,
    url: siteConfig.domain + "/",
    logo: abs(siteConfig.images.logo.src),
    email: siteConfig.contactEmail,
    description:
      "Independent informational website providing VK999 guides for users in Pakistan.",
  };
}

export function webPageSchema({
  name,
  description,
  path,
  type = "WebPage",
}: {
  name: string;
  description: string;
  path: string;
  type?: "WebPage" | "AboutPage" | "ContactPage";
}) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name,
    description,
    url: abs(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.domain + "/",
    },
    inLanguage: "en-PK",
  };
}

export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export function faqSchema(faqs: Faq[]) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function softwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VK999",
    operatingSystem: "Android",
    applicationCategory: "GameApplication",
    downloadUrl: siteConfig.downloadUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "PKR",
    },
  };
}
