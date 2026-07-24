import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const page = siteConfig.pages.disclaimer;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
  robots: page.robots,
});

export default function DisclaimerPage() {
  return (
    <main id="main-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Disclaimer", href: page.path },
        ]}
      />
      <section className="page-hero">
        <div className="container prose-width prose">
          <h1>{page.h1}</h1>
          <p>
            vk999apk.pk is an independent informational website. It is not the official
            VK999 website and does not own, operate, manage or control the VK999
            platform, application, payments or customer support systems.
          </p>
          <h2>Informational purpose only</h2>
          <p>
            Guides on this website are published to help visitors understand common
            download, login, deposit and withdrawal topics. Platform features, limits,
            payment methods and availability can change without notice.
          </p>
          <h2>No guarantees</h2>
          <p>
            We do not guarantee uninterrupted access, specific outcomes, promotional
            rewards, deposit confirmation times or withdrawal processing times. Always
            verify current instructions inside the verified application.
          </p>
          <h2>External links</h2>
          <p>
            External APK or platform links are provided for convenience. Visiting those
            destinations is at the user’s own risk and subject to third-party terms.
          </p>
          <h2>Legal compliance</h2>
          <p>
            Users must be 18+ and follow the laws applicable in their location. If online
            gaming activity is restricted where you live, do not use related services.
          </p>
          <p>
            Related pages: <Link href="/terms-and-conditions/">Terms and Conditions</Link>,{" "}
            <Link href="/responsible-gaming/">Responsible Gaming</Link>,{" "}
            <Link href="/about-us/">About Us</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
