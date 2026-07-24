import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const page = siteConfig.pages.terms;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
  robots: page.robots,
});

export default function TermsPage() {
  return (
    <main id="main-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Terms and Conditions", href: page.path },
        ]}
      />
      <section className="page-hero">
        <div className="container prose-width prose">
          <h1>{page.h1}</h1>
          <p>
            These Terms and Conditions govern use of vk999apk.pk. By browsing this
            website, you agree to use it as an informational resource only.
          </p>
          <h2>Acceptable use</h2>
          <ul className="legal-list">
            <li>Use the website for lawful informational purposes</li>
            <li>Do not attempt to disrupt hosting, security or availability</li>
            <li>Do not misuse contact channels to request account credentials</li>
            <li>Do not copy site content for misleading or deceptive purposes</li>
          </ul>
          <h2>Independent website</h2>
          <p>
            vk999apk.pk does not own the VK999 platform. Mentions of VK999 are for
            identification and guidance. Platform rules, transactions and support remain
            under the control of the platform operator.
          </p>
          <h2>Content accuracy</h2>
          <p>
            We aim to keep guides clear and organised, but information may become outdated
            after application updates. Users should confirm the latest details inside the
            current app version.
          </p>
          <h2>External destinations</h2>
          <p>
            Download and third-party links may leave this website. Those destinations have
            separate terms. vk999apk.pk is not responsible for their content or practices.
          </p>
          <h2>Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, vk999apk.pk is not liable for losses
            connected to platform use, deposits, withdrawals, account access issues or
            reliance on third-party services.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms can be sent through the{" "}
            <Link href="/contact-us/">Contact Us</Link> page or emailed to{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
