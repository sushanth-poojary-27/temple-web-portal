export type GalleryCategorySlug =
  | "varshik-pooja"
  | "navaratri"
  | "temple-moments";

export interface GalleryPhoto {
  id: string;
  src: string;
  filename: string;
  alt: string;
  altKn: string;
  albumSlug: string;
  albumTitle: string;
  albumTitleKn: string;
}

export interface GallerySubAlbumSummary {
  slug: string;
  title: string;
  titleKn: string;
  coverImage: string;
  photoCount: number;
  isYear: boolean;
}

export interface GalleryCategorySummary {
  slug: GalleryCategorySlug;
  title: string;
  titleKn: string;
  subtitle: string;
  subtitleKn: string;
  description: string;
  descriptionKn: string;
  coverImage: string;
  albumCount: number;
  photoCount: number;
}

export interface GalleryCategoryDetail extends GalleryCategorySummary {
  albums: GallerySubAlbumSummary[];
}

export interface GalleryRecommendation {
  label: string;
  labelKn: string;
  href: string;
}

export interface GalleryAlbumPageData {
  category: GalleryCategorySummary;
  album: GallerySubAlbumSummary;
  photos: GalleryPhoto[];
  nextAlbumRecommendation: GalleryRecommendation | null;
  nextCategoryRecommendation: GalleryRecommendation;
}
