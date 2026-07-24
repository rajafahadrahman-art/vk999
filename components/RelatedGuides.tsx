import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

function GuideIcon({ type }: { type: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    className: "card-icon",
    "aria-hidden": true as const,
  };

  switch (type) {
    case "download":
      return (
        <svg {...common}>
          <path d="M12 3v12M7 10l5 5 5-5M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "login":
      return (
        <svg {...common}>
          <path d="M10 17l5-5-5-5M15 12H3M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "deposit":
      return (
        <svg {...common}>
          <path d="M12 3v12M8 7l4-4 4 4M5 19h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "withdrawal":
      return (
        <svg {...common}>
          <path d="M12 21V9M8 13l4 4 4-4M5 5h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
  }
}

export default function RelatedGuides({ currentSlug }: { currentSlug: string }) {
  const guides = siteConfig.relatedGuides.filter((g) => g.slug !== currentSlug);

  return (
    <section className="section" aria-labelledby="related-guides-heading">
      <div className="container">
        <h2 id="related-guides-heading">Related VK999 Guides</h2>
        <p className="lead">Continue with another focused VK999 guide.</p>
        <div className="related-grid">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href} className="related-card">
              <GuideIcon type={guide.icon} />
              <h3>{guide.title}</h3>
              <p>{guide.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
