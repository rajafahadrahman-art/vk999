import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";
import Breadcrumbs from "@/components/Breadcrumbs";
import SchemaMarkup from "@/components/SchemaMarkup";

const page = siteConfig.pages.contact;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <SchemaMarkup
        data={[
          webPageSchema({
            name: page.h1,
            description: page.description,
            path: page.path,
            type: "ContactPage",
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Contact Us", path: page.path },
          ]),
        ]}
      />
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Contact Us", href: page.path },
        ]}
      />
      <section className="page-hero">
        <div className="container prose-width prose">
          <h1>{page.h1}</h1>
          <p>
            Use this page for website-related messages only. vk999apk.pk can help with
            feedback about guide pages, content corrections, copyright concerns and
            broken-link reports.
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
          </p>
          <h2>What this page can help with</h2>
          <ul className="legal-list">
            <li>Website feedback and usability suggestions</li>
            <li>Corrections to published informational content</li>
            <li>Copyright or brand-use concerns related to this website</li>
            <li>Reports of broken internal links on vk999apk.pk</li>
          </ul>
          <h2>What this page cannot handle</h2>
          <p>
            This contact channel does not manage VK999 accounts, wallet balances,
            deposits, withdrawals, OTPs, passwords or identity verification. For those
            issues, use the verified support option inside the current VK999 app or
            platform interface.
          </p>
          <p>
            Helpful guides on this website include the{" "}
            <Link href="/vk999-download/">download page</Link>,{" "}
            <Link href="/vk999-login/">login page</Link>,{" "}
            <Link href="/vk999-deposit-guide/">deposit guide</Link> and{" "}
            <Link href="/vk999-withdrawal-guide/">withdrawal guide</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
