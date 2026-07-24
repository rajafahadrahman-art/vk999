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

const page = siteConfig.pages.deposit;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
});

export default function DepositPage() {
  const content = loadContent("vk999-deposit-guide");
  const banner = siteConfig.images.depositBanner;
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
            { name: "VK999 Deposit Guide", path: page.path },
          ]),
          faqSchema(content.faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "VK999 Deposit Guide", href: page.path },
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
            <Link href="/vk999-login/" className="btn btn-primary">
              VK999 Login
            </Link>
            <Link href="/vk999-withdrawal-guide/" className="btn btn-secondary">
              Withdrawal Guide
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
            heading="Continue with Account Access"
            actions={[
              { label: "VK999 Login", href: "/vk999-login/", primary: true },
              {
                label: "Withdrawal Guide",
                href: "/vk999-withdrawal-guide/",
                primary: false,
              },
            ]}
            note="18+ only. Deposit only through details shown inside the verified account dashboard."
          >
            <p>
              Sign in first if you need account access, or open the withdrawal guide when
              you are ready to cash out eligible funds.
            </p>
          </CtaBox>

          <p className="age-note">
            Platform overview: <Link href="/">homepage</Link>.
          </p>

          <FaqAccordion faqs={content.faqs} />
          {finalHtml ? (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: finalHtml }} />
          ) : null}
        </div>
      </section>

      <RelatedGuides currentSlug="deposit" />
    </main>
  );
}
