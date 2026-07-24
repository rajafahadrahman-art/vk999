import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaMarkup from "@/components/SchemaMarkup";
import ResponsiveImage from "@/components/ResponsiveImage";

const page = siteConfig.pages.about;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
});

export default function AboutPage() {
  const logo = siteConfig.images.logo;

  return (
    <main id="main-content">
      <SchemaMarkup
        data={[
          webPageSchema({
            name: page.h1,
            description: page.description,
            path: page.path,
            type: "AboutPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "About Us", path: page.path },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "About Us", href: page.path },
        ]}
      />
      <section className="page-hero">
        <div className="container prose-width prose">
          <h1>{page.h1}</h1>
          <div className="banner-frame" style={{ maxWidth: 180, marginBottom: "1rem" }}>
            <ResponsiveImage
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              width={logo.width}
              height={logo.height}
              sizes="180px"
            />
          </div>
          <p>
            vk999apk.pk is an independent informational website that publishes clear
            guides about the VK999 gaming platform for users in Pakistan. The site
            focuses on download, login, deposit and withdrawal topics so visitors can
            find practical information before using the application.
          </p>
          <p>
            This website does not own, operate, manage or claim to represent the VK999
            platform. Brand names, logos and product references appear only for
            informational identification. Platform features, payment options and
            availability can change inside the live application.
          </p>
          <p>
            Our goal is to keep long-form guides organised, readable and easy to navigate
            on mobile devices. Visitors can start with the{" "}
            <Link href="/">homepage overview</Link>, continue to the{" "}
            <Link href="/vk999-download/">download guide</Link>, or move into account and
            payment topics such as <Link href="/vk999-login/">login</Link>,{" "}
            <Link href="/vk999-deposit-guide/">deposits</Link> and{" "}
            <Link href="/vk999-withdrawal-guide/">withdrawals</Link>.
          </p>
          <p>
            For website feedback or content corrections, use the{" "}
            <Link href="/contact-us/">Contact Us</Link> page. For account-specific
            problems, use only the verified support option shown inside the current
            platform.
          </p>
        </div>
      </section>
    </main>
  );
}
