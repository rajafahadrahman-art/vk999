import type { Metadata } from "next";
import Link from "next/link";
import { loadContent } from "@/lib/content";
import { enhanceArticleHtml, stripFaqFromHtml, extractFinalThoughts } from "@/lib/enhance-html";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  softwareApplicationSchema,
  webPageSchema,
} from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import ResponsiveImage from "@/components/ResponsiveImage";
import DownloadButton from "@/components/DownloadButton";
import RelatedGuides from "@/components/RelatedGuides";
import SchemaMarkup from "@/components/SchemaMarkup";
import TableOfContents from "@/components/TableOfContents";
import FaqAccordion from "@/components/FaqAccordion";
import CtaBox from "@/components/CtaBox";

const page = siteConfig.pages.download;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
});

export default function DownloadPage() {
  const content = loadContent("vk999-download");
  const banner = siteConfig.images.downloadBanner;
  const enhanced = enhanceArticleHtml(stripFaqFromHtml(content.mainHtml || content.bodyHtml));
  const { body, finalHtml } = extractFinalThoughts(enhanced);
  const marker = '<h2 id="apk-requirements">';
  const idx = body.indexOf(marker);
  const before = idx === -1 ? body : body.slice(0, idx);
  const after = idx === -1 ? "" : body.slice(idx);

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
            { name: "VK999 Download", path: page.path },
          ]),
          softwareApplicationSchema(),
          faqSchema(content.faqs),
        ]}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "VK999 Download", href: page.path },
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
            <DownloadButton />
            <Link href="/vk999-login/" className="btn btn-secondary">
              VK999 Login
            </Link>
          </div>
          <p className="age-note">
            18+ only. Download responsibly. vk999apk.pk is an informational guide and does
            not claim to be the official VK999 website.
          </p>
          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: content.introHtml }}
          />
          <TableOfContents items={content.toc} />
        </div>
      </section>

      <section className="section">
        <div className="container prose-width">
          <div className="content-body" dangerouslySetInnerHTML={{ __html: before }} />

          <CtaBox
            heading="Download VK999 APK"
            actions={[
              {
                label: "Download VK999 APK",
                href: siteConfig.downloadUrl,
                external: true,
                primary: true,
              },
            ]}
            note="18+ only. Confirm the source before installing any APK file."
          >
            <p>
              Use the verified download button below when you are ready to install the
              Android application.
            </p>
          </CtaBox>

          {after ? (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: after }} />
          ) : null}

          <div className="cta-row" style={{ marginTop: "1.25rem" }}>
            <DownloadButton label="Download VK999 APK" />
          </div>
          <p className="age-note">
            After installation, continue to the{" "}
            <Link href="/vk999-login/">VK999 Login</Link> guide or return to the{" "}
            <Link href="/">homepage</Link>.
          </p>

          <FaqAccordion faqs={content.faqs} />
          {finalHtml ? (
            <div className="content-body" dangerouslySetInnerHTML={{ __html: finalHtml }} />
          ) : null}
        </div>
      </section>

      <RelatedGuides currentSlug="download" />
    </main>
  );
}
