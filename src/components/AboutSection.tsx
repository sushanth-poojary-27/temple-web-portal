"use client";

import Image from "next/image";
import { Clock, Landmark, MapPin, ShieldCheck, Users } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutSection() {
  const { t } = useLanguage();

  return (
    <section
      id="about"
      className="scroll-mt-24 py-12 md:py-20 bg-amber-50 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Part 1: Temple Overview & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-start bg-white rounded-3xl p-5 sm:p-10 border border-amber-200 shadow-sm">
          {/* Left Column: Sannidana Emblem + Quick Reference Cards */}
          <div className="lg:col-span-5 min-w-0 space-y-5">
            <div className="relative aspect-square w-full max-w-sm mx-auto rounded-2xl border-2 border-amber-500/40 bg-amber-950/5 shadow-md overflow-hidden">
              <Image
                src="/assets/banner(2).png"
                alt={t(
                  "Shri Durga Parameshwari Sannidhana, Ullur",
                  "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ (ರಿ.), ಉಳ್ಳೂರು"
                )}
                fill
                sizes="(max-width: 1024px) 100vw, 384px"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Compact Official Registration & Founder Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              <div className="min-w-0 flex items-start gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80">
                <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-amber-700 uppercase">
                    {t("Official Registration", "ಅಧಿಕೃತ ಟ್ರಸ್ಟ್ ನೋಂದಣಿ")}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-amber-900 leading-relaxed break-words">
                    {t(
                      siteData.trustProfile.registrationDetails,
                      siteData.trustProfile.registrationDetailsKn
                    )}
                  </p>
                </div>
              </div>

              <div className="min-w-0 flex items-start gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80">
                <Users className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-amber-700 uppercase">
                    {t(
                      siteData.trustProfile.founderLabel,
                      siteData.trustProfile.founderLabelKn
                    )}
                  </p>
                  <p className="text-sm font-bold text-amber-900 break-words">
                    {t(
                      siteData.trustProfile.founderName,
                      siteData.trustProfile.founderNameKn
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Daily Darshan Timings Card */}
            <div className="rounded-2xl bg-amber-50/90 p-4 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-900 break-words">
                  {t(
                    siteData.darshanTimings.title,
                    siteData.darshanTimings.titleKn
                  )}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="min-w-0 rounded-xl bg-white px-3.5 py-2.5 border border-amber-200/80">
                  <p className="text-xs font-semibold text-amber-700 uppercase leading-snug">
                    {t(
                      siteData.darshanTimings.morningLabel,
                      siteData.darshanTimings.morningLabelKn
                    )}
                  </p>
                  <p className="text-sm font-bold text-amber-900 leading-relaxed break-words">
                    {t(
                      siteData.darshanTimings.morning,
                      siteData.darshanTimings.morningKn
                    )}
                  </p>
                </div>
                <div className="min-w-0 rounded-xl bg-white px-3.5 py-2.5 border border-amber-200/80">
                  <p className="text-xs font-semibold text-amber-700 uppercase leading-snug">
                    {t(
                      siteData.darshanTimings.eveningLabel,
                      siteData.darshanTimings.eveningLabelKn
                    )}
                  </p>
                  <p className="text-sm font-bold text-amber-900 leading-relaxed break-words">
                    {t(
                      siteData.darshanTimings.evening,
                      siteData.darshanTimings.eveningKn
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: About, Motto & Core Mission Content */}
          <div className="lg:col-span-7 min-w-0 space-y-6">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
              <Landmark className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span className="min-w-0 break-words">
                {t("About the Temple & Trust", "ಶ್ರೀ ಕ್ಷೇತ್ರ ಮತ್ತು ಟ್ರಸ್ಟ್ ಪರಿಚಯ")}
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-relaxed sm:leading-snug break-words">
                {t(siteData.trustProfile.legalName, siteData.trustProfile.legalNameKn)}
              </h2>

              <p className="text-sm sm:text-base font-semibold text-amber-700 break-words">
                {t(
                  siteData.trustProfile.educationalWing,
                  siteData.trustProfile.educationalWingKn
                )}
              </p>

              <p className="flex items-start gap-2 text-sm sm:text-base text-amber-800 font-medium min-w-0 pt-1">
                <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <span className="min-w-0 break-words">
                  {t(
                    siteData.trustProfile.officialAddress,
                    siteData.trustProfile.officialAddressKn
                  )}
                </span>
              </p>
            </div>

            {/* Guiding Motto + 1-line Explanation */}
            <div className="rounded-2xl border-l-4 border-amber-600 bg-amber-50 px-4 py-3.5 space-y-1.5">
              <blockquote className="text-sm sm:text-base font-semibold italic text-amber-900 break-words">
                &ldquo;{t(siteData.trustProfile.motto, siteData.trustProfile.mottoKn)}&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed break-words">
                {t(
                  siteData.trustProfile.mottoSubline,
                  siteData.trustProfile.mottoSublineKn
                )}
              </p>
            </div>

            {/* Sacred Heritage & Trust Mission Card */}
            <div className="rounded-2xl bg-amber-50/80 p-5 border border-amber-200 space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900 break-words">
                  {t(
                    "Sacred Heritage & Trust Mission",
                    "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಪರಂಪರೆ ಮತ್ತು ಟ್ರಸ್ಟ್ ಧ್ಯೇಯೋದ್ದೇಶಗಳು"
                  )}
                </h3>
                <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
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
                    className="min-w-0 rounded-xl bg-white p-4 border border-amber-200/80 space-y-1.5"
                  >
                    <p className="text-xs sm:text-sm font-bold text-amber-900 break-words">
                      {t(obj.title, obj.titleKn)}
                    </p>
                    <p className="text-xs sm:text-sm text-amber-800 leading-relaxed break-words">
                      {t(obj.description, obj.descriptionKn)}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs sm:text-sm font-semibold text-amber-900 bg-amber-100/80 rounded-xl px-3.5 py-2.5 border border-amber-200 break-words">
                {t(
                  siteData.trustProfile.inclusionNote,
                  siteData.trustProfile.inclusionNoteKn
                )}
              </p>
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
