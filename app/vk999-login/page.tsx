import type { Metadata } from "next";
import Link from "next/link";
import { loadContent } from "@/lib/content";
import { enhanceArticleHtml, stripFaqFromHtml, extractFinalThoughts } from "@/lib/enhance-html";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, webPageSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResponsiveImage from "@/components/ResponsiveImage";
import RelatedGuides from "@/components/RelatedGuides";
import SchemaMarkup from "@/components/SchemaMarkup";
import TableOfContents from "@/components/TableOfContents";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBox from "@/components/CtaBox";

const page = siteConfig.pages.login;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
});

export default function LoginPage() {
  const content = loadContent("vk999-login");
  const banner = siteConfig.images.loginBanner;
  const enhanced = enhanceArticleHtml(stripFaqFromHtml(content.mainHtml || content.bodyHtml));
  const { body, finalHtml } = extractFinalThoughts(enhanced);

  return (
    <main id="main-content">
      <SchemaMarkup
        data={[
          webPageSchema({
            name: content.h1 || page.h1,
            description: page.description,
            path: page.path,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "VK999 Login", path: page.path },
          ]),
          faqSchema(content.faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "VK999 Login", href: page.path },
        ]}
      />

      <section className="page-hero">
        <div className="container prose-width">
          <h1>{content.h1 || page.h1}</h1>
          <div className="banner-frame" style={{ marginBottom: "1rem" }}>
            <ResponsiveImage
              src={banner.src}
              alt={banner.alt}
              title={banner.title}
              width={banner.width}
              height={banner.height}
              sizes="(max-width: 768px) 100vw, 860px"
            />
          </div>
          <div className="cta-row">
            <Link href="/vk999-download/" className="btn btn-primary">
              Get VK999 Download
            </Link>
            <Link href="/vk999-deposit-guide/" className="btn btn-secondary">
              Deposit Guide
            </Link>
          </div>
          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: content.introHtml }}
          />
          <TableOfContents items={content.toc} />
        </div>
      </section>

      <section className="section">
        <div className="container prose-width">
          <div className="content-body" dangerouslySetInnerHTML={{ __html: body }} />

          <CtaBox
            heading="Need the App First?"
            actions={[
              { label: "VK999 Download", href: "/vk999-download/", primary: true },
              { label: "Deposit Guide", href: "/vk999-deposit-guide/", primary: false },
            ]}
          >
            <p>
              If you have not installed the application yet, open the download guide before
              creating or signing into an account.
            </p>
          </CtaBox>

          <p className="age-note">
            Ready to add funds after signing in? Read the{" "}
            <Link href="/vk999-deposit-guide/">deposit guide</Link>. Return to the{" "}
            <Link href="/">homepage</Link> for a full platform overview.
          </p>

          <FaqAccordion faqs={content.faqs} />
          {finalHtml ? (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: finalHtml }} />
          ) : null}
        </div>
      </section>

      <RelatedGuides currentSlug="login" />
    </main>
  );
}
