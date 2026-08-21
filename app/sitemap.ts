import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = ["", "/menu", "/barber", "/visit", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
  }));
}
