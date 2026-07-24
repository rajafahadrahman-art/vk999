import type { Metadata } from "next";
import Link from "next/link";
import { loadContent } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import {
  faqSchema,
  organizationSchema,
  webPageSchema,
  websiteSchema,
} from "@/lib/schema";
import ResponsiveImage from "@/components/ResponsiveImage";
import TableOfContents from "@/components/TableOfContents";
import RelatedGuides from "@/components/RelatedGuides";
import SchemaMarkup from "@/components/SchemaMarkup";

const page = siteConfig.pages.home;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
});

export default function HomePage() {
  const content = loadContent("homepage");
  const promo = siteConfig.images.homepagePromo;
  const featured = siteConfig.images.homepageFeatured;
  const introParts = content.introHtml.match(/<p>[\s\S]*?<\/p>/g) || [];
  const openingHtml = introParts[0] || "";
  const restIntroHtml = introParts.slice(1).join("\n");

  return (
    <main id="main-content">
      <SchemaMarkup
        data={[
          websiteSchema(),
          organizationSchema(),
          webPageSchema({
            name: content.h1 || page.h1,
            description: page.description,
            path: page.path,
          }),
          faqSchema(content.faqs),
        ]}
      />

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">VK999</p>
            <h1>{content.h1 || page.h1}</h1>
            <div className="lead" dangerouslySetInnerHTML={{ __html: openingHtml }} />
            <div className="cta-row">
              <Link href="/vk999-download/" className="btn btn-primary">
                Download VK999
              </Link>
              <Link href="/vk999-login/" className="btn btn-secondary">
                VK999 Login
              </Link>
            </div>
            <p className="age-note">
              18+ only. Use responsibly and follow the laws applicable in your location.
              vk999apk.pk is an informational guide website.
            </p>
          </div>
          <div className="banner-frame">
            <ResponsiveImage
              src={promo.src}
              alt={promo.alt}
              title={promo.title}
              width={promo.width}
              height={promo.height}
              priority
              sizes="(max-width: 768px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose-width">
          <div className="content-body" dangerouslySetInnerHTML={{ __html: restIntroHtml }} />
          <div className="cta-row">
            <Link href="/vk999-download/" className="btn btn-primary">
              Download VK999
            </Link>
            <Link href="/vk999-login/" className="btn btn-secondary">
              VK999 Login
            </Link>
          </div>
          <TableOfContents items={content.toc} />
          <div
            className="content-body"
            dangerouslySetInnerHTML={{ __html: content.mainHtml }}
          />
        </div>
      </section>

      <section className="section section-alt" aria-labelledby="feature-cards-heading">
        <div className="container">
          <h2 id="feature-cards-heading">Explore VK999 Guides</h2>
          <p className="lead">Focused pages for installation, account access and payments.</p>
          <div className="feature-cards">
            <Link href="/vk999-download/" className="feature-card">
              <h3>VK999 Download</h3>
              <p>Install and update the Android APK with clear steps.</p>
            </Link>
            <Link href="/vk999-login/" className="feature-card">
              <h3>VK999 Login</h3>
              <p>Register, sign in and recover access safely.</p>
            </Link>
            <Link href="/vk999-deposit-guide/" className="feature-card">
              <h3>Deposit Guide</h3>
              <p>Add funds with JazzCash, Easypaisa or bank transfer.</p>
            </Link>
            <Link href="/vk999-withdrawal-guide/" className="feature-card">
              <h3>Withdrawal Guide</h3>
              <p>Cash out funds and resolve pending requests.</p>
            </Link>
            <Link href="/about-us/" className="feature-card">
              <h3>About Us</h3>
              <p>Learn why vk999apk.pk is an independent guide site.</p>
            </Link>
            <Link href="/contact-us/" className="feature-card">
              <h3>Contact Us</h3>
              <p>Send website feedback or content corrections.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container prose-width">
          <div className="banner-frame">
            <ResponsiveImage
              src={featured.src}
              alt={featured.alt}
              title={featured.title}
              width={featured.width}
              height={featured.height}
              sizes="(max-width: 768px) 100vw, 720px"
            />
          </div>
        </div>
      </section>

      {content.faqHtml ? (
        <section className="section">
          <div className="container prose-width">
            <div
              className="content-body"
              dangerouslySetInnerHTML={{ __html: content.faqHtml }}
            />
          </div>
        </section>
      ) : null}

      <RelatedGuides currentSlug="home" />

      <section className="section">
        <div className="container prose-width">
          <div className="notice">
            <strong>Responsible use:</strong> Online gaming should only be used by adults
            aged 18+. Set personal limits, never share OTPs or PINs, and follow local laws.
            Read the <Link href="/responsible-gaming/">Responsible Gaming</Link> page for
            more guidance.
          </div>
        </div>
      </section>
    </main>
  );
}
