"use client";

import Link from "next/link";
import { ArrowRight, Images } from "lucide-react";
import type { GalleryCategorySummary } from "@/types/gallery";
import { useLanguage } from "@/context/LanguageContext";

interface GalleryCategoryCardsProps {
  categories: GalleryCategorySummary[];
}

export default function GalleryCategoryCards({
  categories,
}: GalleryCategoryCardsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
      {categories.map((category) => (
        <Link
          key={category.slug}
          href={`/gallery/${category.slug}`}
          className="group flex flex-col rounded-3xl bg-[#FDF8EE] border-2 border-[#C59B27]/65 shadow-md hover:shadow-2xl hover:border-[#7A1C1C]/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]"
        >
          {/* Custom Collage Cover Artwork (4:3 Uncropped Banner) */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-[22px] bg-[#4A0E0E] border-b-2 border-[#C59B27]/55">
            {category.coverImage ? (
              <img
                src={category.coverImage}
                alt={t(category.title, category.titleKn)}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#FAF7F2]/40">
                <Images className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* Card Content + Prominent Full-Width "Click to View ->" Button Pill */}
          <div className="flex-1 flex flex-col p-6 sm:p-7 gap-4">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#9A7214]">
                {t(category.subtitle, category.subtitleKn)}
              </span>
              <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#7A1C1C] leading-snug group-hover:text-[#5E1414] transition-colors">
                {t(category.title, category.titleKn)}
              </h2>
              <p className="text-sm sm:text-base text-[#4A2511]/90 leading-relaxed">
                {t(category.description, category.descriptionKn)}
              </p>
            </div>

            <div className="mt-auto pt-2">
              <span className="w-full inline-flex items-center justify-center gap-2 min-h-[46px] rounded-full bg-[#7A1C1C] group-hover:bg-[#5E1414] px-5 py-2.5 text-sm sm:text-base font-bold text-[#FFFDF7] border-2 border-[#C59B27]/80 shadow-sm transition-colors">
                <span>{t("Click to View", "ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ")}</span>
                <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
