import type { MetadataRoute } from "next";
import { STATES } from "@/lib/tax-data";

const BASE_URL = "https://incomeref.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "monthly", priority: 1.0 },
    { url: `${BASE_URL}/paycheck-calculator`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/salary-to-hourly`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/compare`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
  ];

  const statePages: MetadataRoute.Sitemap = STATES.map((state) => ({
    url: `${BASE_URL}/paycheck-calculator/${state.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const comparePages: MetadataRoute.Sitemap = [];
  const sorted = [...STATES].sort((a, b) => a.name.localeCompare(b.name));
  for (let i = 0; i < sorted.length; i++) {
    for (let j = i + 1; j < sorted.length; j++) {
      comparePages.push({
        url: `${BASE_URL}/compare/${sorted[i].slug}-vs-${sorted[j].slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return [...staticPages, ...statePages, ...comparePages];
}