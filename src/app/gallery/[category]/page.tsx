import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import {
  GALLERY_CATEGORY_SLUGS,
  getGalleryCategory,
  isGalleryCategorySlug,
} from "@/lib/gallery.server";
import GalleryCategoryClient from "@/components/GalleryCategoryClient";

export function generateStaticParams() {
  return GALLERY_CATEGORY_SLUGS.map((category) => ({
    category,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;

  if (!isGalleryCategorySlug(category)) {
    return {
      title: `Album Not Found | ${siteData.trustName}`,
    };
  }

  const detail = getGalleryCategory(category);
  return {
    title: `${detail.title} | Temple Gallery | ${siteData.trustName}`,
    description: detail.description,
  };
}

export default async function GalleryCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  if (!isGalleryCategorySlug(category)) {
    notFound();
  }

  const detail = getGalleryCategory(category);

  return <GalleryCategoryClient category={detail} />;
}
