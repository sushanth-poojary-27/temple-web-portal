"use client";

import Link from "next/link";
import { ArrowLeft, Camera } from "lucide-react";
import type { GalleryCategorySummary } from "@/types/gallery";
import { useLanguage } from "@/context/LanguageContext";
import { siteData } from "@/data/siteData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocialPill from "@/components/FloatingSocialPill";
import GalleryCategoryCards from "@/components/GalleryCategoryCards";

interface GalleryOverviewClientProps {
  categories: GalleryCategorySummary[];
}

export default function GalleryOverviewClient({
  categories,
}: GalleryOverviewClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#FAF7F2] text-[#2B1810]">
      <Header />

      <main className="flex-1 min-w-0 max-w-full py-6 sm:py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-9">
          {/* Top Back Link */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 min-h-[42px] rounded-full bg-[#FDF8EE] border border-[#C59B27]/60 px-4 py-2 text-xs sm:text-sm font-bold text-[#7A1C1C] shadow-sm hover:bg-[#F2E9D8] hover:border-[#7A1C1C]/60 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{t("Back to Home", "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}</span>
            </Link>
          </div>

          {/* Compact Section Title */}
          <div className="text-center max-w-2xl mx-auto space-y-2 sm:space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F0E2] px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#7A1C1C] border border-[#C59B27]/60">
              <Camera className="w-3.5 h-3.5 text-[#9A7214]" />
              <span>{t("Temple Gallery", "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಗ್ಯಾಲರಿ")}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#7A1C1C] leading-snug">
              {t("Temple Photo Gallery", "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಛಾಯಾಚಿತ್ರ ಸಂಗ್ರಹ")}
            </h1>
            <p className="text-xs sm:text-base text-[#4A2511]/90 leading-relaxed">
              {t(
                `Choose a collection below to browse festivals and sacred moments from ${siteData.shortName}.`,
                `${siteData.shortNameKn} ಕ್ಷೇತ್ರದ ಉತ್ಸವಗಳು ಹಾಗೂ ಪವಿತ್ರ ಕ್ಷಣಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಕೆಳಗಿನ ವಿಭಾಗವನ್ನು ಆಯ್ಕೆಮಾಡಿ.`
              )}
            </p>
          </div>

          {/* Screen 1: Compact 3 Category Cards */}
          <GalleryCategoryCards categories={categories} />
        </div>
      </main>

      <Footer />
      <FloatingSocialPill />
    </div>
  );
}
