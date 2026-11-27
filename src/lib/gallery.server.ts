import fs from "node:fs";
import path from "node:path";
import type {
  GalleryAlbumPageData,
  GalleryCategoryDetail,
  GalleryCategorySlug,
  GalleryCategorySummary,
  GalleryPhoto,
  GalleryRecommendation,
  GallerySubAlbumSummary,
} from "@/types/gallery";

interface CategoryConfig {
  slug: GalleryCategorySlug;
  assetFolder: "varshik-pooja" | "navaratri" | "temple-and-sacred moments";
  title: string;
  titleKn: string;
  subtitle: string;
  subtitleKn: string;
  description: string;
  descriptionKn: string;
  subfoldersNumericDesc: boolean;
}

interface SubAlbumLabel {
  title: string;
  titleKn: string;
}

interface ScannedSubAlbum {
  summary: GallerySubAlbumSummary;
  photos: GalleryPhoto[];
}

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

export const GALLERY_CATEGORY_SLUGS: GalleryCategorySlug[] = [
  "varshik-pooja",
  "navaratri",
  "temple-moments",
];

const CATEGORY_CONFIGS: Record<GalleryCategorySlug, CategoryConfig> = {
  "varshik-pooja": {
    slug: "varshik-pooja",
    assetFolder: "varshik-pooja",
    title: "Varshik Pooja",
    titleKn: "ವಾರ್ಷಿಕ ಪೂಜೆ",
    subtitle: "Annual festival celebrations across years",
    subtitleKn: "ವಾರ್ಷಿಕ ಪೂಜಾ ಮಹೋತ್ಸವದ ವರ್ಷವಾರು ಸಂಗ್ರಹ",
    description:
      "Select a year below to explore Varshik Pooja Mahotsava, Kalasha Pratishthe, and Annaprasada moments.",
    descriptionKn:
      "ವಾರ್ಷಿಕ ಪೂಜಾ ಮಹೋತ್ಸವ, ಕಲಶ ಪ್ರತಿಷ್ಠೆ ಮತ್ತು ಅನ್ನಪ್ರಸಾದದ ದೃಶ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಲು ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    subfoldersNumericDesc: true,
  },
  navaratri: {
    slug: "navaratri",
    assetFolder: "navaratri",
    title: "Navaratri",
    titleKn: "ನವರಾತ್ರಿ",
    subtitle: "Nine sacred nights of Devi Alankara",
    subtitleKn: "ಶ್ರೀ ದೇವಿಯ ನವರಾತ್ರಿ ಅಲಂಕಾರ ಮತ್ತು ಉತ್ಸವ",
    description:
      "Select a year below to browse Sharannavaratri Devi Alankara and Utsava celebrations.",
    descriptionKn:
      "ಶರನ್ನವರಾತ್ರಿ ದೇವಿ ಅಲಂಕಾರ ಮತ್ತು ಉತ್ಸವದ ದೃಶ್ಯಗಳನ್ನು ವೀಕ್ಷಿಸಲು ವರ್ಷವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    subfoldersNumericDesc: true,
  },
  "temple-moments": {
    slug: "temple-moments",
    assetFolder: "temple-and-sacred moments",
    title: "Temple & Sacred Moments",
    titleKn: "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಪವಿತ್ರ ಕ್ಷಣಗಳು",
    subtitle: "Seva, community outreach & sacred events",
    subtitleKn: "ಪೂಜೆ, ಸಮಾಜ ಸೇವೆ ಮತ್ತು ವಿಶೇಷ ಕ್ಷಣಗಳು",
    description:
      "Choose a section below to view sacred poojas, social service initiatives, and special temple gatherings.",
    descriptionKn:
      "ಪೂಜಾ ಕೈಂಕರ್ಯಗಳು, ಸಮಾಜ ಸೇವೆ ಹಾಗೂ ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮಗಳ ಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಲು ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.",
    subfoldersNumericDesc: false,
  },
};

const TEMPLE_MOMENTS_SUBFOLDER_LABELS: Record<string, SubAlbumLabel> = {
  "Donation-social-help": {
    title: "Donation & Social Help",
    titleKn: "ದೇಣಿಗೆ ಮತ್ತು ಸಮಾಜ ಸೇವೆ",
  },
  "events-organized-custom": {
    title: "Events Organized",
    titleKn: "ಆಯೋಜಿತ ವಿಶೇಷ ಕಾರ್ಯಕ್ರಮಗಳು",
  },
  "events-organized-extrenal": {
    title: "Events Organized (External)",
    titleKn: "ಹೊರಗಿನ ಆಯೋಜಿತ ಕಾರ್ಯಕ್ರಮಗಳು",
  },
  "great-personality": {
    title: "Great Personalities",
    titleKn: "ಗಣ್ಯ ವ್ಯಕ್ತಿಗಳು",
  },
  "monthly-pooname-pooja": {
    title: "Monthly Pooname Pooja",
    titleKn: "ಮಾಸಿಕ ಹುಣ್ಣಿಮೆ ಪೂಜೆ",
  },
};

const TEMPLE_MOMENTS_ORDER = [
  "monthly-pooname-pooja",
  "Donation-social-help",
  "events-organized-custom",
  "events-organized-extrenal",
  "great-personality",
];

export function isGalleryCategorySlug(
  value: string
): value is GalleryCategorySlug {
  return (GALLERY_CATEGORY_SLUGS as readonly string[]).includes(value);
}

function encodeUrlSegment(segment: string): string {
  return encodeURIComponent(segment);
}

function buildAssetUrl(
  assetFolder: CategoryConfig["assetFolder"],
  subFolder: string,
  filename: string
): string {
  return [
    "",
    "assets",
    encodeUrlSegment(assetFolder),
    encodeUrlSegment(subFolder),
    encodeUrlSegment(filename),
  ].join("/");
}

function isSupportedImageFile(filename: string): boolean {
  const ext = path.extname(filename).toLowerCase();
  return IMAGE_EXTENSIONS.has(ext);
}

function naturalCompare(a: string, b: string): number {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
}

function toSubAlbumLabel(
  config: CategoryConfig,
  folderName: string
): SubAlbumLabel & { isYear: boolean } {
  if (/^\d{4}$/.test(folderName)) {
    return {
      title: folderName,
      titleKn: folderName,
      isYear: true,
    };
  }

  const mapped = TEMPLE_MOMENTS_SUBFOLDER_LABELS[folderName];
  if (mapped) {
    return { ...mapped, isYear: false };
  }

  const formatted = folderName
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (ch) => ch.toUpperCase());

  return {
    title: formatted,
    titleKn: formatted,
    isYear: false,
  };
}

function formatReadableAlt(
  categoryTitle: string,
  categoryTitleKn: string,
  albumLabel: SubAlbumLabel,
  filename: string,
  index: number
): { alt: string; altKn: string } {
  const baseName = path.parse(filename).name.replace(/[_-]+/g, " ").trim();
  const isGenericName =
    /^(img[\s-]?\d+|whatsapp image|unnamed|file[\s_]?[0-9a-f]+)/i.test(
      baseName
    );

  if (isGenericName || !baseName) {
    return {
      alt: `${categoryTitle} - ${albumLabel.title} - Photo ${index}`,
      altKn: `${categoryTitleKn} - ${albumLabel.titleKn} - ಚಿತ್ರ ${index}`,
    };
  }

  return {
    alt: `${categoryTitle} - ${albumLabel.title} - ${baseName}`,
    altKn: `${categoryTitleKn} - ${albumLabel.titleKn} - ${baseName}`,
  };
}

function selectSubAlbumCover(
  categorySlug: GalleryCategorySlug,
  folderName: string,
  photos: GalleryPhoto[]
): string {
  if (photos.length === 0) return "";

  if (categorySlug === "navaratri") {
    if (folderName === "2026") {
      const target =
        photos.find((photo) => /un+amed\s*\(\s*15\s*\)/i.test(photo.filename)) ??
        photos.find((photo) => photo.filename.includes("15")) ??
        photos[0];
      return target.src;
    }
    if (folderName === "2025") {
      const target =
        photos.find(
          (photo) => photo.filename.toLowerCase() === "img-20251005-wa0014.jpg"
        ) ?? photos[0];
      return target.src;
    }
  }

  if (categorySlug === "varshik-pooja") {
    if (folderName === "2018") {
      const target =
        photos.find((photo) => /pjshot7/i.test(photo.filename)) ?? photos[0];
      return target.src;
    }

    const exactDevi = photos.find((photo) =>
      /(^|[-_\s])devi\b/i.test(path.parse(photo.filename).name)
    );
    const anyDevi = photos.find((photo) => /devi/i.test(photo.filename));
    return (exactDevi ?? anyDevi ?? photos[0]).src;
  }

  if (categorySlug === "temple-moments") {
    if (folderName === "monthly-pooname-pooja") {
      const target =
        photos.find((photo) =>
          photo.filename
            .toLowerCase()
            .includes("a3e081fda88f18388cb2ac8d")
        ) ?? photos[0];
      return target.src;
    }
    if (
      folderName === "events-organized-custom" ||
      folderName === "events-organized-extrenal"
    ) {
      const target =
        photos.find(
          (photo) => photo.filename.toLowerCase() === "img-20261017-wa0015.jpg"
        ) ?? photos[0];
      return target.src;
    }
    if (folderName === "Donation-social-help") {
      const target =
        photos.find(
          (photo) => photo.filename.toLowerCase() === "2026-donation.jpg"
        ) ?? photos[0];
      return target.src;
    }
    if (folderName === "great-personality") {
      const target =
        photos.find(
          (photo) => photo.filename.toLowerCase() === "img-20260203-wa0031.jpg"
        ) ?? photos[0];
      return target.src;
    }
  }

  const preferred =
    photos.find((photo) => /devi/i.test(photo.filename)) ?? photos[0];
  return preferred.src;
}

const CATEGORY_CUSTOM_COVERS: Record<GalleryCategorySlug, string> = {
  "varshik-pooja": `/assets/website-assets/${encodeUrlSegment("Varshik Pooja Temple gallery.png")}`,
  navaratri: `/assets/website-assets/${encodeUrlSegment("navaratri temple gallery.png")}`,
  "temple-moments": `/assets/website-assets/${encodeUrlSegment("Temple Rituals and Sacred Moments gallery.png")}`,
};

function sortSubFolderNames(
  names: string[],
  config: CategoryConfig
): string[] {
  return [...names].sort((a, b) => {
    if (config.subfoldersNumericDesc) {
      const numA = Number(a);
      const numB = Number(b);
      if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
        return numB - numA;
      }
      return naturalCompare(b, a);
    }

    const idxA = TEMPLE_MOMENTS_ORDER.indexOf(a);
    const idxB = TEMPLE_MOMENTS_ORDER.indexOf(b);
    if (idxA !== -1 && idxB !== -1) return idxA - idxB;
    if (idxA !== -1) return -1;
    if (idxB !== -1) return 1;
    return naturalCompare(a, b);
  });
}

function scanCategory(config: CategoryConfig): {
  summary: GalleryCategorySummary;
  subAlbums: ScannedSubAlbum[];
} {
  const rootDir = path.join(
    process.cwd(),
    "public",
    "assets",
    config.assetFolder
  );

  if (!fs.existsSync(rootDir)) {
    return {
      summary: {
        slug: config.slug,
        title: config.title,
        titleKn: config.titleKn,
        subtitle: config.subtitle,
        subtitleKn: config.subtitleKn,
        description: config.description,
        descriptionKn: config.descriptionKn,
        coverImage: CATEGORY_CUSTOM_COVERS[config.slug],
        albumCount: 0,
        photoCount: 0,
      },
      subAlbums: [],
    };
  }

  const subDirNames = sortSubFolderNames(
    fs
      .readdirSync(rootDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name),
    config
  );

  const subAlbums: ScannedSubAlbum[] = [];
  let totalPhotos = 0;

  for (const folderName of subDirNames) {
    const subDirPath = path.join(rootDir, folderName);
    const files = fs
      .readdirSync(subDirPath, { withFileTypes: true })
      .filter((entry) => entry.isFile() && isSupportedImageFile(entry.name))
      .map((entry) => entry.name)
      .sort(naturalCompare);

    if (files.length === 0) {
      continue;
    }

    const label = toSubAlbumLabel(config, folderName);
    const photos: GalleryPhoto[] = files.map((filename, idx) => {
      const { alt, altKn } = formatReadableAlt(
        config.title,
        config.titleKn,
        label,
        filename,
        idx + 1
      );
      return {
        id: `${config.slug}-${folderName}-${idx + 1}`,
        src: buildAssetUrl(config.assetFolder, folderName, filename),
        filename,
        alt,
        altKn,
        albumSlug: folderName,
        albumTitle: label.title,
        albumTitleKn: label.titleKn,
      };
    });

    const coverImage = selectSubAlbumCover(config.slug, folderName, photos);

    totalPhotos += photos.length;
    subAlbums.push({
      summary: {
        slug: folderName,
        title: label.title,
        titleKn: label.titleKn,
        coverImage,
        photoCount: photos.length,
        isYear: label.isYear,
      },
      photos,
    });
  }

  const categoryCover =
    CATEGORY_CUSTOM_COVERS[config.slug] ||
    subAlbums[0]?.summary.coverImage ||
    "";

  return {
    summary: {
      slug: config.slug,
      title: config.title,
      titleKn: config.titleKn,
      subtitle: config.subtitle,
      subtitleKn: config.subtitleKn,
      description: config.description,
      descriptionKn: config.descriptionKn,
      coverImage: categoryCover,
      albumCount: subAlbums.length,
      photoCount: totalPhotos,
    },
    subAlbums,
  };
}

export function getGalleryCategories(): GalleryCategorySummary[] {
  return GALLERY_CATEGORY_SLUGS.map(
    (slug) => scanCategory(CATEGORY_CONFIGS[slug]).summary
  );
}

export function getGalleryCategory(
  slug: GalleryCategorySlug
): GalleryCategoryDetail {
  const scanned = scanCategory(CATEGORY_CONFIGS[slug]);
  return {
    ...scanned.summary,
    albums: scanned.subAlbums.map((item) => item.summary),
  };
}

export function getAllGalleryAlbumParams(): Array<{
  category: GalleryCategorySlug;
  album: string;
}> {
  const params: Array<{ category: GalleryCategorySlug; album: string }> = [];
  for (const slug of GALLERY_CATEGORY_SLUGS) {
    const scanned = scanCategory(CATEGORY_CONFIGS[slug]);
    for (const item of scanned.subAlbums) {
      params.push({
        category: slug,
        album: item.summary.slug,
      });
    }
  }
  return params;
}

export function getGalleryAlbumPageData(
  categorySlug: GalleryCategorySlug,
  rawAlbumSlug: string
): GalleryAlbumPageData | null {
  let decodedAlbumSlug = rawAlbumSlug;
  try {
    decodedAlbumSlug = decodeURIComponent(rawAlbumSlug);
  } catch {
    decodedAlbumSlug = rawAlbumSlug;
  }

  const scanned = scanCategory(CATEGORY_CONFIGS[categorySlug]);
  const albumIndex = scanned.subAlbums.findIndex(
    (item) =>
      item.summary.slug === decodedAlbumSlug ||
      item.summary.slug === rawAlbumSlug
  );

  if (albumIndex === -1) {
    return null;
  }

  const currentAlbum = scanned.subAlbums[albumIndex];

  let nextAlbumRecommendation: GalleryRecommendation | null = null;
  if (scanned.subAlbums.length > 1) {
    const nextAlbum =
      scanned.subAlbums[(albumIndex + 1) % scanned.subAlbums.length];
    nextAlbumRecommendation = {
      label: `Check ${nextAlbum.summary.title}`,
      labelKn: `${nextAlbum.summary.titleKn} ನೋಡಿ`,
      href: `/gallery/${categorySlug}/${encodeUrlSegment(nextAlbum.summary.slug)}`,
    };
  }

  const currentCategoryIndex = GALLERY_CATEGORY_SLUGS.indexOf(categorySlug);
  const nextCategorySlug =
    GALLERY_CATEGORY_SLUGS[
      (currentCategoryIndex + 1) % GALLERY_CATEGORY_SLUGS.length
    ];
  const nextCategoryConfig = CATEGORY_CONFIGS[nextCategorySlug];
  const nextCategoryRecommendation: GalleryRecommendation = {
    label: `Explore ${nextCategoryConfig.title}`,
    labelKn: `${nextCategoryConfig.titleKn} ನೋಡಿ`,
    href: `/gallery/${nextCategoryConfig.slug}`,
  };

  return {
    category: scanned.summary,
    album: currentAlbum.summary,
    photos: currentAlbum.photos,
    nextAlbumRecommendation,
    nextCategoryRecommendation,
  };
}
