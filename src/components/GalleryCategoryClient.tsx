"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Images } from "lucide-react";
import type { GalleryCategoryDetail } from "@/types/gallery";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingLanguageSwitcher from "@/components/FloatingLanguageSwitcher";

interface GalleryCategoryClientProps {
  category: GalleryCategoryDetail;
}

export default function GalleryCategoryClient({
  category,
}: GalleryCategoryClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#FAF7F2] text-[#2B1810]">
      <Header />

      <main className="flex-1 min-w-0 max-w-full py-6 sm:py-10 md:py-14">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Top Navigation: Direct Back to Home (#gallery) */}
          <div>
            <Link
              href="/#gallery"
              className="inline-flex items-center gap-2 min-h-[44px] rounded-full bg-[#FDF8EE] border border-[#C59B27]/70 px-4 py-2 text-sm font-bold text-[#7A1C1C] shadow-sm hover:bg-[#F2E9D8] hover:border-[#7A1C1C]/70 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{t("Back to Home", "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}</span>
            </Link>
          </div>

          {/* Category Title & 1-line Description */}
          <div className="space-y-1.5 border-b border-[#C59B27]/40 pb-5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#7A1C1C] leading-snug">
              {t(category.title, category.titleKn)}
            </h1>
            <p className="text-sm sm:text-base text-[#4A2511]/90 leading-relaxed">
              {t(category.description, category.descriptionKn)}
            </p>
          </div>

          {/* Sub-Album Clickable Cards (Year or Sub-Section) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-5">
            {category.albums.map((album) => {
              const photoCountLabelEn =
                album.photoCount === 1 ? "1 Photo" : `${album.photoCount} Photos`;
              const photoCountLabelKn = `${album.photoCount} ಚಿತ್ರಗಳು`;

              return (
                <Link
                  key={album.slug}
                  href={`/gallery/${category.slug}/${encodeURIComponent(album.slug)}`}
                  className="group flex items-center gap-3.5 sm:gap-4 rounded-2xl bg-[#FDF8EE] border-2 border-[#C59B27]/55 p-3 sm:p-4 shadow-sm hover:shadow-lg hover:border-[#7A1C1C]/75 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]"
                >
                  {/* Cover Thumbnail on Left */}
                  <div className="relative w-24 h-20 sm:w-28 sm:h-24 shrink-0 rounded-xl overflow-hidden bg-[#EFE6D4] border border-[#C59B27]/45">
                    {album.coverImage ? (
                      <img
                        src={album.coverImage}
                        alt={t(album.title, album.titleKn)}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#7A1C1C]/40">
                        <Images className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  {/* Year / Sub-Section Title + Explicit Photo Count */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <h2 className="text-lg sm:text-xl font-bold text-[#7A1C1C] leading-snug break-words">
                      {t(album.title, album.titleKn)}
                    </h2>
                    <p className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#5C4438]">
                      <Images className="w-3.5 h-3.5 text-[#9A7214] shrink-0" />
                      <span>{t(photoCountLabelEn, photoCountLabelKn)}</span>
                    </p>
                  </div>

                  {/* Clear "Open ->" Interactive Pill */}
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A1C1C] text-[#FFFDF7] group-hover:bg-[#5E1414] px-3.5 py-2 text-xs sm:text-sm font-bold border border-[#C59B27]/60 shadow-sm shrink-0 transition-colors">
                    <span>{t("Open", "ತೆರೆಯಿರಿ")}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
      <FloatingLanguageSwitcher />
    </div>
  );
}
