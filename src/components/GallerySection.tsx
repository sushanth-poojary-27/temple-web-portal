"use client";

import { Camera } from "lucide-react";
import type { GalleryCategorySummary } from "@/types/gallery";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
import GalleryCategoryCards from "@/components/GalleryCategoryCards";

interface GallerySectionProps {
  categories: GalleryCategorySummary[];
}

export default function GallerySection({ categories }: GallerySectionProps) {
  const { t } = useLanguage();

  return (
    <section
      id="gallery"
      className="scroll-mt-24 py-12 md:py-20 bg-[#FAF7F2] border-y border-[#C59B27]/40 text-[#2B1810]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F0E2] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#7A1C1C] border border-[#C59B27]/60">
            <Camera className="w-3.5 h-3.5 text-[#9A7214]" />
            <span>{t("Sacred Moments", "ಪವಿತ್ರ ಕ್ಷಣಗಳು")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#7A1C1C] leading-relaxed break-words">
            {t("Temple Photo Gallery", "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಛಾಯಾಚಿತ್ರ ಸಂಗ್ರಹ")}
          </h2>
          <p className="text-sm sm:text-base text-[#4A2511]/90 leading-relaxed break-words">
            {t(
              `Explore Varshik Pooja, Navaratri, and sacred temple moments at ${siteData.shortName}.`,
              `${siteData.shortNameKn} ಕ್ಷೇತ್ರದ ವಾರ್ಷಿಕ ಪೂಜೆ, ನವರಾತ್ರಿ ಹಾಗೂ ಪವಿತ್ರ ಕ್ಷಣಗಳ ಚಿತ್ರ ಸಂಗ್ರಹ.`
            )}
          </p>
        </div>

        {/* Screen 1: 3 Prominent Category Cards */}
        <GalleryCategoryCards categories={categories} />
      </div>
    </section>
  );
}
