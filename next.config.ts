import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      {
        source: "/download",
        destination: "/vk999-download/",
        permanent: true,
      },
      {
        source: "/download/",
        destination: "/vk999-download/",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/vk999-login/",
        permanent: true,
      },
      {
        source: "/login/",
        destination: "/vk999-login/",
        permanent: true,
      },
      {
        source: "/vk999-deposit",
        destination: "/vk999-deposit-guide/",
        permanent: true,
      },
      {
        source: "/vk999-deposit/",
        destination: "/vk999-deposit-guide/",
        permanent: true,
      },
      {
        source: "/vk999-withdrawal",
        destination: "/vk999-withdrawal-guide/",
        permanent: true,
      },
      {
        source: "/vk999-withdrawal/",
        destination: "/vk999-withdrawal-guide/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
