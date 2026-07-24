import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const logo = siteConfig.images.logo;

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="VK999 home">
            <Image
              src={logo.src}
              alt={logo.alt}
              title={logo.title}
              width={40}
              height={40}
            />
            <span>VK999</span>
          </Link>
          <p>
            Independent informational guides for VK999 download, login, deposits
            and withdrawals for users in Pakistan.
          </p>
        </div>

        <div className="footer-col">
          <h2>Main Guides</h2>
          <ul>
            {siteConfig.footerGuides.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h2>Company</h2>
          <ul>
            {siteConfig.companyNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h2>Legal</h2>
          <ul>
            {siteConfig.legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container">
        <p className="footer-note">{siteConfig.footerNotice}</p>
      </div>
    </footer>
  );
}
