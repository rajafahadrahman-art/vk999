import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/vk999-download/",
    "/vk999-login/",
    "/vk999-deposit-guide/",
    "/vk999-withdrawal-guide/",
    "/about-us/",
    "/contact-us/",
  ];

  return paths.map((path) => ({
    url: `${siteConfig.domain}${path}`,
  }));
}
