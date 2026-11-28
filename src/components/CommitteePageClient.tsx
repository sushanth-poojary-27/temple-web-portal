"use client";

import Link from "next/link";
import { ArrowLeft, CalendarCheck2, Users } from "lucide-react";
import {
  COMMITTEE_TERM_META,
  type ResolvedCommitteeSection,
} from "@/data/committee";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingLanguageSwitcher from "@/components/FloatingLanguageSwitcher";
import CommitteeMemberCard from "@/components/CommitteeMemberCard";

interface CommitteePageClientProps {
  sections: ResolvedCommitteeSection[];
}

export default function CommitteePageClient({
  sections,
}: CommitteePageClientProps) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#FAF7F2] text-[#2B1810]">
      <Header />

      <main className="flex-1 min-w-0 max-w-full py-6 sm:py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* Top Bar: Single Back to Home Button */}
          <div>
            <Link
              href="/#committee"
              className="inline-flex items-center gap-2 min-h-[44px] rounded-full bg-[#FDF8EE] border border-[#C59B27]/75 px-4 py-2 text-xs sm:text-sm font-bold text-[#7A1C1C] shadow-sm hover:bg-[#F2E9D8] hover:border-[#7A1C1C]/75 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>{t("Back to Home", "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}</span>
            </Link>
          </div>

          {/* Page Header & Official 2026–2028 Term Badge */}
          <div className="rounded-3xl bg-[#FDF8EE] border-2 border-[#C59B27]/60 p-5 sm:p-8 text-center shadow-sm space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F0E2] border border-[#C59B27]/70 px-3.5 py-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#7A1C1C]">
              <Users className="w-3.5 h-3.5 text-[#9A7214] shrink-0" />
              <span>
                {t(
                  "TRUST MANAGEMENT & CLERGY",
                  "ಆಡಳಿತ ಮಂಡಳಿ ಮತ್ತು ಅರ್ಚಕ ವೃಂದ"
                )}
              </span>
            </span>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7A1C1C] leading-snug break-words">
              {t(
                "Managing Committee & Temple Priests",
                "ವ್ಯವಸ್ಥಾಪನಾ ಸಮಿತಿ ಮತ್ತು ಪ್ರಧಾನ ಅರ್ಚಕರು"
              )}
            </h1>

            <div className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#7A1C1C] text-[#FFFDF7] border border-[#C59B27]/80 px-4 py-2 text-xs sm:text-sm font-semibold leading-relaxed max-w-full">
              <CalendarCheck2 className="w-4 h-4 text-[#F4D078] shrink-0" />
              <span className="break-words">
                {t(
                  COMMITTEE_TERM_META.termFullBadge,
                  COMMITTEE_TERM_META.termFullBadgeKn
                )}
              </span>
            </div>
          </div>

          {/* 4 Directly Visible Subsections on Scroll */}
          <div className="space-y-10 sm:space-y-12">
            {sections.map((section) => {
              const isWomensSection =
                section.id === "womens-wing-and-advisory";

              if (isWomensSection) {
                const womensWingMembers = section.members.filter(
                  (m) => m.subGroup === "womens-wing"
                );
                const advisoryMembers = section.members.filter(
                  (m) => m.subGroup === "advisory-committee"
                );

                return (
                  <section
                    key={section.id}
                    aria-labelledby={`heading-${section.id}`}
                    className="space-y-5"
                  >
                    <div className="border-b-2 border-[#C59B27]/45 pb-3 space-y-1">
                      <h2
                        id={`heading-${section.id}`}
                        className="text-xl sm:text-2xl font-extrabold text-[#7A1C1C] leading-snug"
                      >
                        {t(section.title, section.titleKn)}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#4A2511]/85 leading-relaxed">
                        {t(section.subtitle, section.subtitleKn)}
                      </p>
                    </div>

                    {/* Subtle Sub-Group 1: Women's Wing */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block rounded-full bg-[#7A1C1C]/10 border border-[#C59B27]/60 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-[#7A1C1C]">
                          {t("Women's Wing", "ಮಹಿಳಾ ವಿಭಾಗ")}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {womensWingMembers.map((member) => (
                          <CommitteeMemberCard
                            key={member.id}
                            member={member}
                            showSubGroupLabel
                          />
                        ))}
                      </div>
                    </div>

                    {/* Subtle Sub-Group 2: Advisory Committee */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2">
                        <span className="inline-block rounded-full bg-[#7A1C1C]/10 border border-[#C59B27]/60 px-3 py-0.5 text-xs font-bold uppercase tracking-wide text-[#7A1C1C]">
                          {t(
                            "Women's Advisory Committee",
                            "ಮಹಿಳಾ ಸಲಹಾ ಸಮಿತಿ"
                          )}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                        {advisoryMembers.map((member) => (
                          <CommitteeMemberCard
                            key={member.id}
                            member={member}
                            showSubGroupLabel
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                );
              }

              return (
                <section
                  key={section.id}
                  aria-labelledby={`heading-${section.id}`}
                  className="space-y-4"
                >
                  <div className="border-b-2 border-[#C59B27]/45 pb-3 space-y-1">
                    <h2
                      id={`heading-${section.id}`}
                      className="text-xl sm:text-2xl font-extrabold text-[#7A1C1C] leading-snug"
                    >
                      {t(section.title, section.titleKn)}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#4A2511]/85 leading-relaxed">
                      {t(section.subtitle, section.subtitleKn)}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                    {section.members.map((member) => (
                      <CommitteeMemberCard key={member.id} member={member} />
                    ))}
                  </div>
                </section>
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
