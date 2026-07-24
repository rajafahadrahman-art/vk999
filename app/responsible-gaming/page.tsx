import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";

const page = siteConfig.pages.responsible;

export const metadata: Metadata = buildPageMetadata({
  title: page.title,
  description: page.description,
  path: page.path,
  ogImage: page.ogImage,
  robots: page.robots,
});

export default function ResponsibleGamingPage() {
  return (
    <main id="main-content">
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Responsible Gaming", href: page.path },
        ]}
      />
      <section className="page-hero">
        <div className="container prose-width prose">
          <h1>{page.h1}</h1>
          <p>
            Online gaming should remain an adult leisure activity. vk999apk.pk encourages
            visitors to set clear personal limits and follow the laws applicable in their
            location.
          </p>
          <h2>Age requirement</h2>
          <p>
            Content on this website is intended for adults aged 18 and above. Minors should
            not install gaming applications or attempt to create accounts.
          </p>
          <h2>Safer habits</h2>
          <ul className="legal-list">
            <li>Set a spending and time limit before you start</li>
            <li>Use only money reserved for leisure</li>
            <li>Do not chase losses</li>
            <li>Take regular breaks</li>
            <li>Keep passwords, OTPs and withdrawal PINs private</li>
            <li>Avoid borrowing money for gaming</li>
            <li>Stop when the activity is no longer enjoyable</li>
          </ul>
          <h2>Account and payment safety</h2>
          <p>
            Never share verification codes or wallet PINs. Deposit and withdraw only
            through details shown inside the verified account dashboard. Review our{" "}
            <Link href="/vk999-deposit-guide/">deposit guide</Link> and{" "}
            <Link href="/vk999-withdrawal-guide/">withdrawal guide</Link> for general
            safety reminders.
          </p>
          <h2>Independent notice</h2>
          <p>
            This page provides general educational guidance. It is not medical, legal or
            financial advice. Platform-specific tools and restrictions remain under the
            control of the VK999 operator.
          </p>
          <p>
            Return to the <Link href="/">homepage</Link> or read the{" "}
            <Link href="/disclaimer/">Disclaimer</Link> for more site context.
          </p>
        </div>
      </section>
    </main>
  );
}
