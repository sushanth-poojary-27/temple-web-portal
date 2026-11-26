"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  Landmark,
  ShieldCheck,
  Users,
} from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section
      id="about"
      className="scroll-mt-24 py-8 sm:py-12 md:py-18 bg-amber-50 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 md:space-y-16">
        {/* Part 1: Compact Temple & Trust Summary Card + Expandable Details */}
        <div className="rounded-3xl bg-[#FDF8EE] border-2 border-[#C59B27]/55 p-4 sm:p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-center">
            {/* Left / Top: 4:3 Landscape Photo (Zero Grey Letterboxing) + Subtle Caption */}
            <div className="lg:col-span-5 min-w-0 space-y-2">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border-2 border-[#C59B27]/60 bg-[#EFE6D4] shadow-sm">
                <Image
                  src="/assets/website-assets/first-temple-2008.png"
                  alt={t(
                    "Original Shree Durgaparameshwari Sannidhana (2007), Ullur",
                    "ಮೂಲ ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ (2007), ಉಳ್ಳೂರು"
                  )}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <p className="text-[11px] sm:text-xs font-semibold text-[#7A1C1C]/90 text-center tracking-wide">
                {t(
                  "Original Sannidhana (2007) • Regd. Trust 2008",
                  "ಮೂಲ ಸನ್ನಿಧಾನ (2007) • ನೋಂದಾಯಿತ ಟ್ರಸ್ಟ್ 2008"
                )}
              </p>
            </div>

            {/* Right / Bottom: Concise Scannable Summary + 2-Box Strip + Toggle Button */}
            <div className="lg:col-span-7 min-w-0 space-y-3.5 sm:space-y-4">
              <div className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#F7F0E2] px-3 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#7A1C1C] border border-[#C59B27]/60">
                <Landmark className="w-3.5 h-3.5 text-[#9A7214] shrink-0" />
                <span className="min-w-0 break-words">
                  {t(
                    "ABOUT THE TEMPLE & TRUST",
                    "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮತ್ತು ಟ್ರಸ್ಟ್ ಪರಿಚಯ"
                  )}
                </span>
              </div>

              <div className="space-y-1.5">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#7A1C1C] leading-snug break-words">
                  {t(
                    siteData.trustProfile.legalName,
                    siteData.trustProfile.legalNameKn
                  )}
                </h2>

                <p className="text-xs sm:text-sm md:text-base text-[#4A2511]/90 font-medium leading-relaxed break-words">
                  {t(
                    "Conductors of Shree Durgaparameshwari Education Trust (Vidyanidhi) • Shree Devi Kripa, Ullur Village, Udupi – 574 119.",
                    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಎಜುಕೇಶನ್ ಟ್ರಸ್ಟ್ (ವಿದ್ಯಾನಿಧಿ) ಸಂಚಾಲಕರು • ಶ್ರೀ ದೇವಿ ಕೃಪಾ, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಉಡುಪಿ – 574 119."
                  )}
                </p>
              </div>

              {/* Compact 2-Box Essential Strip (2-col on Mobile & Desktop) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 pt-0.5">
                <div className="min-w-0 rounded-xl bg-[#FAF7F2] p-3 sm:p-3.5 border border-[#C59B27]/50 space-y-1">
                  <p className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#9A7214]">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      {t("Daily Darshan", "ದೈನಂದಿನ ದರ್ಶನ")}
                    </span>
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#2B1810] leading-snug">
                    {t("6:00 AM – 2:00 PM", "ಬೆಳಿಗ್ಗೆ 6:00 – 2:00")}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-[#2B1810] leading-snug">
                    {t("4:00 PM – 8:30 PM", "ಸಂಜೆ 4:00 – 8:30")}
                  </p>
                </div>

                <div className="min-w-0 rounded-xl bg-[#FAF7F2] p-3 sm:p-3.5 border border-[#C59B27]/50 space-y-1 flex flex-col justify-center">
                  <p className="flex items-center gap-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wide text-[#9A7214]">
                    <Users className="w-3.5 h-3.5 shrink-0" />
                    <span className="line-clamp-1">
                      {t(
                        siteData.trustProfile.founderLabel,
                        siteData.trustProfile.founderLabelKn
                      )}
                    </span>
                  </p>
                  <p className="text-sm sm:text-base font-extrabold text-[#7A1C1C] leading-snug break-words">
                    {t(
                      siteData.trustProfile.founderName,
                      siteData.trustProfile.founderNameKn
                    )}
                  </p>
                </div>
              </div>

              {/* Interactive Maroon/Gold Toggle Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsExpanded((prev) => !prev)}
                  aria-expanded={isExpanded}
                  aria-controls="about-heritage-details"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-[#7A1C1C] hover:bg-[#5E1414] px-5 py-2.5 text-xs sm:text-sm font-bold text-[#FFFDF7] border-2 border-[#C59B27]/80 shadow-sm transition-colors cursor-pointer"
                >
                  <span>
                    {isExpanded
                      ? t("Show Less ↑", "ಕಡಿಮೆ ತೋರಿಸಿ ↑")
                      : t(
                          "Read Full Trust & Heritage Details ↓",
                          "ಟ್ರಸ್ಟ್ ಮತ್ತು ಪರಂಪರೆಯ ಸಂಪೂರ್ಣ ವಿವರ ಓದಿ ↓"
                        )}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 shrink-0" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Full Details Panel (Collapsed by Default) */}
          <div
            id="about-heritage-details"
            aria-hidden={!isExpanded}
            className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
              isExpanded
                ? "grid-rows-[1fr] opacity-100 mt-6"
                : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
            }`}
          >
            <div className="overflow-hidden">
              <div className="border-t border-[#C59B27]/45 pt-5 space-y-4">
                {/* Official Registration + Guiding Quote */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 rounded-2xl bg-[#FAF7F2] p-4 border border-[#C59B27]/45">
                    <ShieldCheck className="w-5 h-5 text-[#9A7214] shrink-0 mt-0.5" />
                    <div className="min-w-0 space-y-1">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#7A1C1C]">
                        {t("Official Registration", "ಅಧಿಕೃತ ಟ್ರಸ್ಟ್ ನೋಂದಣಿ")}
                      </p>
                      <p className="text-xs sm:text-sm font-semibold text-[#2B1810] leading-relaxed break-words">
                        {t(
                          siteData.trustProfile.registrationDetails,
                          siteData.trustProfile.registrationDetailsKn
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl border-l-4 border-[#7A1C1C] bg-[#FAF7F2] px-4 py-3.5 border-y border-r border-y-[#C59B27]/40 border-r-[#C59B27]/40 space-y-1">
                    <blockquote className="text-sm sm:text-base font-bold italic text-[#7A1C1C] break-words">
                      &ldquo;
                      {t(
                        siteData.trustProfile.motto,
                        siteData.trustProfile.mottoKn
                      )}
                      &rdquo;
                    </blockquote>
                    <p className="text-xs sm:text-sm text-[#4A2511]/90 leading-relaxed break-words">
                      {t(
                        siteData.trustProfile.mottoSubline,
                        siteData.trustProfile.mottoSublineKn
                      )}
                    </p>
                  </div>
                </div>

                {/* Sacred Heritage & Trust Mission */}
                <div className="rounded-2xl bg-[#FAF7F2] p-4 sm:p-5 border border-[#C59B27]/45 space-y-3.5">
                  <div className="space-y-1.5">
                    <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#7A1C1C]">
                      {t(
                        "Sacred Heritage & Trust Mission",
                        "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಪರಂಪರೆ ಮತ್ತು ಟ್ರಸ್ಟ್ ಧ್ಯೇಯೋದ್ದೇಶಗಳು"
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#2B1810] leading-relaxed break-words">
                      {t(
                        siteData.trustProfile.heritageSummary,
                        siteData.trustProfile.heritageSummaryKn
                      )}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {siteData.trustProfile.coreObjectives.map((obj) => (
                      <div
                        key={obj.id}
                        className="min-w-0 rounded-xl bg-[#FDF8EE] p-3.5 border border-[#C59B27]/45 space-y-1"
                      >
                        <p className="text-xs sm:text-sm font-bold text-[#7A1C1C] break-words">
                          {t(obj.title, obj.titleKn)}
                        </p>
                        <p className="text-xs sm:text-sm text-[#4A2511]/90 leading-relaxed break-words">
                          {t(obj.description, obj.descriptionKn)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-[#7A1C1C] bg-[#F7F0E2] rounded-xl px-3.5 py-2.5 border border-[#C59B27]/50 break-words">
                    {t(
                      siteData.trustProfile.inclusionNote,
                      siteData.trustProfile.inclusionNoteKn
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Managing Committee & Temple Clergy */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>
                {t(
                  "Trust Management & Clergy",
                  "ಆಡಳಿತ ಮಂಡಳಿ ಮತ್ತು ಅರ್ಚಕ ವೃಂದ"
                )}
              </span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-900 leading-relaxed break-words">
              {t(
                "Managing Committee & Temple Priests",
                "ವ್ಯವಸ್ಥಾಪನಾ ಸಮಿತಿ ಮತ್ತು ಪ್ರಧಾನ ಅರ್ಚಕರು"
              )}
            </h3>
            <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
              {t(
                `Dedicated office bearers and temple priests serving ${siteData.shortName}.`,
                `${siteData.shortNameKn} ಕ್ಷೇತ್ರದ ಸೇವೆಯಲ್ಲಿ ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಪದಾಧಿಕಾರಿಗಳು ಮತ್ತು ಅರ್ಚಕ ವೃಂದ.`
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.committee.map((member) => (
              <div
                key={member.id}
                className="group min-w-0 flex items-center gap-4 rounded-2xl bg-white p-5 border border-amber-200 shadow-sm hover:-translate-y-0.5 hover:border-amber-600 hover:shadow-md transition duration-200"
              >
                {/* Member Photo or Initials Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-600 bg-amber-100 shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={t(member.name, member.nameKn)}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-amber-900">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Member Details */}
                <div className="min-w-0 flex-1 space-y-1">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      member.category === "clergy"
                        ? "bg-amber-900 text-amber-50"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}
                  >
                    {t(member.role, member.roleKn)}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-amber-900 leading-relaxed break-words">
                    {t(member.name, member.nameKn)}
                  </h4>
                  <p className="text-xs text-amber-700 font-medium">
                    {member.category === "clergy"
                      ? t("Temple Clergy", "ಕ್ಷೇತ್ರದ ಅರ್ಚಕರು")
                      : t("Managing Committee", "ವ್ಯವಸ್ಥಾಪನಾ ಸಮಿತಿ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
