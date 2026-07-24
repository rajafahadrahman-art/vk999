import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const page = siteConfig.pages.privacy;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
  robots: page.robots,
});

export default function PrivacyPolicyPage() {
  return (
    <main id="main-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Privacy Policy", href: page.path },
        ]}
      />
      <section className="page-hero">
        <div className="container prose-width prose">
          <h1>{page.h1}</h1>
          <p>
            This Privacy Policy explains how vk999apk.pk handles limited visitor
            information when people use this informational website.
          </p>
          <h2>Who we are</h2>
          <p>
            vk999apk.pk is an independent guide website. It does not own or operate the
            VK999 platform and does not process VK999 account, wallet or payment data.
          </p>
          <h2>Information we may receive</h2>
          <ul className="legal-list">
            <li>Messages you voluntarily send to {siteConfig.contactEmail}</li>
            <li>Basic technical logs that hosting providers may collect automatically</li>
            <li>Theme preference stored locally in your browser when you use the theme toggle</li>
          </ul>
          <h2>Cookies and local storage</h2>
          <p>
            The website may use local storage to remember dark or light theme preference.
            Essential hosting or analytics tools used by the deployment platform may create
            their own technical cookies according to their policies.
          </p>
          <h2>How information is used</h2>
          <p>
            Contact messages are used only to respond to website feedback, content
            corrections, copyright concerns or broken-link reports. We do not ask for
            passwords, OTPs, wallet PINs or banking details.
          </p>
          <h2>Third parties</h2>
          <p>
            External download links leave vk999apk.pk and are subject to the destination
            site’s own terms and privacy practices. This website does not control those
            services.
          </p>
          <h2>Contact</h2>
          <p>
            Privacy questions about this website can be sent to{" "}
            <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>.
            See also the <Link href="/contact-us/">Contact Us</Link> page.
          </p>
        </div>
      </section>
    </main>
  );
}
