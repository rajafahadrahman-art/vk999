export function buildPageMetadata({
  title,
  description,
  path,
  ogImage,
  robots,
}: {
  title: string;
  description: string;
  path: string;
  ogImage: string;
  robots?: string;
}) {
  const url = `https://vk999apk.pk${path}`;
  const imageUrl = ogImage.startsWith("http")
    ? ogImage
    : `https://vk999apk.pk${ogImage}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    robots: robots
      ? {
          index: !robots.includes("noindex"),
          follow: !robots.includes("nofollow"),
        }
      : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      siteName: "VK999",
      locale: "en_PK",
      type: "website" as const,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [imageUrl],
    },
  };
}
