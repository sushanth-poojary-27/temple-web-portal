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
          className="group flex flex-col rounded-3xl bg-[#FDF8EE] border-2 border-[#C59B27]/60 shadow-md hover:shadow-2xl hover:border-[#7A1C1C]/80 hover:-translate-y-1 transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#7A1C1C]"
        >
          {/* Large Cover Image Banner */}
          <div className="relative h-56 sm:h-64 lg:h-72 w-full overflow-hidden bg-[#EFE6D4] border-b border-[#C59B27]/45">
            {category.coverImage ? (
              <img
                src={category.coverImage}
                alt={t(category.title, category.titleKn)}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#7A1C1C]/40">
                <Images className="w-12 h-12" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/50 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Card Content (Entire Card Clickable — Clean & Uncluttered) */}
          <div className="flex-1 flex flex-col justify-between p-6 sm:p-7 space-y-3">
            <div className="space-y-2">
              <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#9A7214]">
                {t(category.subtitle, category.subtitleKn)}
              </span>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#7A1C1C] leading-snug group-hover:text-[#5E1414] transition-colors">
                  {t(category.title, category.titleKn)}
                </h2>
                <ArrowRight className="w-5 h-5 text-[#7A1C1C] shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-sm sm:text-base text-[#4A2511]/90 leading-relaxed">
                {t(category.description, category.descriptionKn)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
