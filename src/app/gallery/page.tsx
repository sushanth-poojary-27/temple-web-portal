import type { Metadata } from "next";
import { siteData } from "@/data/siteData";
import { getGalleryCategories } from "@/lib/gallery.server";
import GalleryOverviewClient from "@/components/GalleryOverviewClient";

export const metadata: Metadata = {
  title: `Photo Gallery | ${siteData.trustName}`,
  description: `Explore Navaratri Utsava, Varshik Pooja, and Temple & Sacred Moments photo albums from ${siteData.shortName}.`,
};

export default function GalleryPage() {
  const categories = getGalleryCategories();

  return <GalleryOverviewClient categories={categories} />;
}
