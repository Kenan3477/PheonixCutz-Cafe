import type { MetadataRoute } from "next";

const paths = ["", "/menu", "/barber", "/visit", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `https://phoenixcutzcafe.co.uk${path}`,
    lastModified: new Date(),
  }));
}
