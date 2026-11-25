import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteData } from "@/data/siteData";
import {
  getAllGalleryAlbumParams,
  getGalleryAlbumPageData,
  isGalleryCategorySlug,
} from "@/lib/gallery.server";
import GalleryAlbumGridClient from "@/components/GalleryAlbumGridClient";

export function generateStaticParams() {
  return getAllGalleryAlbumParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; album: string }>;
}): Promise<Metadata> {
  const { category, album } = await params;

  if (!isGalleryCategorySlug(category)) {
    return {
      title: `Album Not Found | ${siteData.trustName}`,
    };
  }

  const data = getGalleryAlbumPageData(category, album);
  if (!data) {
    return {
      title: `Album Not Found | ${siteData.trustName}`,
    };
  }

  return {
    title: `${data.category.title} — ${data.album.title} | ${siteData.trustName}`,
    description: `${data.category.title} (${data.album.title}) photo gallery with ${data.photos.length} photos from ${siteData.shortName}.`,
  };
}

export default async function GalleryAlbumPage({
  params,
}: {
  params: Promise<{ category: string; album: string }>;
}) {
  const { category, album } = await params;

  if (!isGalleryCategorySlug(category)) {
    notFound();
  }

  const data = getGalleryAlbumPageData(category, album);
  if (!data) {
    notFound();
  }

  return <GalleryAlbumGridClient data={data} />;
}
