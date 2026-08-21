import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      { source: "/eat", destination: "/menu", permanent: true },
      { source: "/food", destination: "/menu", permanent: true },
      { source: "/coffee", destination: "/menu", permanent: true },
      { source: "/cut", destination: "/barber", permanent: true },
      { source: "/hair", destination: "/barber", permanent: true },
      { source: "/haircut", destination: "/barber", permanent: true },
      { source: "/book", destination: "/barber", permanent: true },
      { source: "/hours", destination: "/visit", permanent: true },
      { source: "/contact", destination: "/visit", permanent: true },
      { source: "/find-us", destination: "/visit", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
