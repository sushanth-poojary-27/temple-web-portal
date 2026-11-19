"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { language, t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-amber-900 text-amber-50"
    >
      {/* Hero Banner Image Container */}
      <div className="relative w-full overflow-hidden min-h-[460px] sm:min-h-[520px] md:min-h-[580px] flex flex-col justify-end">
        <Image
          src={siteData.assets.heroBanner}
          alt={t(
            `${siteData.trustName} Hero Banner`,
            `${siteData.trustNameKn} ಮುಖ್ಯ ಚಿತ್ರ`
          )}
          fill
          priority
          fetchPriority="high"
          quality={90}
          sizes="(max-width: 767px) 1920px, 100vw"
          className="absolute inset-0 w-full h-full object-cover object-[78%_center] md:object-center"
        />
        {/* Directional Warm Dark-Maroon Gradient Overlay (mobile bottom-up, desktop left-to-right) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#240601]/95 via-[#240601]/70 via-45% to-transparent md:bg-gradient-to-r md:from-[#2B0902]/90 md:via-[#2B0902]/65 md:to-transparent" />

        {/* Overlay Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 pt-52 sm:pt-60 pb-8 md:py-24 flex flex-col justify-end md:justify-center items-start text-left">
          <div className="w-full max-w-[68%] sm:max-w-[65%] md:max-w-xl min-w-0 space-y-3 sm:space-y-4">
            <p className="text-[11px] sm:text-xs font-medium tracking-wider uppercase text-amber-300/90 mb-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] md:drop-shadow-none break-words">
              {t(
                "Official Temple Portal • Ullur",
                "ಅಧಿಕೃತ ಶ್ರೀ ಕ್ಷೇತ್ರ ಜಾಲತಾಣ • ಉಳ್ಳೂರು"
              )}
            </p>

            <h1
              className={`${
                language === "kn"
                  ? "text-lg sm:text-2xl md:text-4xl leading-relaxed"
                  : "text-xl sm:text-3xl md:text-5xl leading-snug"
              } font-bold tracking-tight text-amber-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] md:drop-shadow-md break-words`}
            >
              {t(siteData.trustName, siteData.trustNameKn)}
            </h1>

            <p className="flex items-start gap-2 text-xs sm:text-sm md:text-base text-amber-100/95 font-medium leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] md:drop-shadow-none min-w-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-0.5" />
              <span className="min-w-0 break-words">
                {t(siteData.fullAddress, siteData.fullAddressKn)}
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="pt-4 w-full sm:w-auto flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="#timings"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[44px] rounded-full bg-amber-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-amber-500 hover:brightness-105 active:scale-[0.99] transition duration-200 leading-snug text-center"
            >
              {t("Daily Pooja & Timings", "ದೈನಂದಿನ ಪೂಜೆ ಮತ್ತು ಸಮಯ")}
            </Link>
            <Link
              href="#about"
              className="inline-flex items-center justify-center w-full sm:w-auto min-h-[44px] rounded-full border border-amber-200/80 bg-amber-950/60 backdrop-blur-sm px-6 py-3 text-sm sm:text-base font-semibold text-amber-50 hover:bg-amber-900/80 hover:brightness-105 active:scale-[0.99] transition duration-200 leading-snug text-center"
            >
              {t(
                "About the Trust & Committee",
                "ಕ್ಷೇತ್ರ ಪರಿಚಯ ಮತ್ತು ಆಡಳಿತ ಸಮಿತಿ"
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Darshan & Aarti Strip below Banner */}
      <div className="bg-amber-900 border-t border-amber-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="min-w-0 flex items-center gap-3 bg-amber-950/50 hover:bg-amber-950/75 transition-colors duration-200 rounded-xl p-3.5 border border-amber-800/60">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="min-w-0 flex-1 break-words">
                <p className="text-amber-300 font-semibold leading-snug">
                  {t("Morning Darshan", "ಬೆಳಗಿನ ದರ್ಶನ ಸಮಯ")}
                </p>
                <p className="text-amber-50 font-medium leading-relaxed">
                  {t(
                    siteData.darshanTimings.morning,
                    siteData.darshanTimings.morningKn
                  )}
                </p>
              </div>
            </div>

            <div className="min-w-0 flex items-center gap-3 bg-amber-950/50 hover:bg-amber-950/75 transition-colors duration-200 rounded-xl p-3.5 border border-amber-800/60">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="min-w-0 flex-1 break-words">
                <p className="text-amber-300 font-semibold leading-snug">
                  {t("Evening Darshan", "ಸಂಜೆಯ ದರ್ಶನ ಸಮಯ")}
                </p>
                <p className="text-amber-50 font-medium leading-relaxed">
                  {t(
                    siteData.darshanTimings.evening,
                    siteData.darshanTimings.eveningKn
                  )}
                </p>
              </div>
            </div>

            <div className="min-w-0 flex items-center gap-3 bg-amber-950/50 hover:bg-amber-950/75 transition-colors duration-200 rounded-xl p-3.5 border border-amber-800/60">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div className="min-w-0 flex-1 break-words">
                <p className="text-amber-300 font-semibold leading-snug">
                  {t("Maha Pooja", "ಮಧ್ಯಾಹ್ನದ ಮಹಾಪೂಜೆ")}
                </p>
                <p className="text-amber-50 font-medium leading-relaxed">
                  {t(
                    siteData.aartiTimings[1]?.time ?? "12:30 PM - 1:30 PM",
                    siteData.aartiTimings[1]?.timeKn ?? "ಮಧ್ಯಾಹ್ನ 12:30 - 1:30"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
