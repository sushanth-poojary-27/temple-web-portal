"use client";

import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-amber-900 text-amber-50"
    >
      {/* Hero Banner Image Container */}
      <div className="relative w-full min-h-[460px] sm:min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex flex-col justify-end">
        <Image
          src={siteData.assets.heroBanner}
          alt={t(
            `${siteData.trustName} Hero Banner`,
            `${siteData.trustNameKn} ಮುಖ್ಯ ಚಿತ್ರ`
          )}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Warm Temple Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-900/50 to-amber-950/30" />

        {/* Overlay Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-8 sm:pb-12 md:pb-16">
          <div className="max-w-3xl min-w-0 space-y-4">
            <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-amber-600/90 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm backdrop-blur-sm leading-snug">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="min-w-0 break-words">
                {t(
                  `${siteData.registrationNo} • Official Temple Portal`,
                  `${siteData.registrationNoKn} • ಅಧಿಕೃತ ಶ್ರೀ ಕ್ಷೇತ್ರ ಜಾಲತಾಣ`
                )}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-amber-50 drop-shadow-md leading-relaxed sm:leading-snug break-words">
              {t(siteData.trustName, siteData.trustNameKn)}
            </h1>

            <p className="flex items-start gap-2 text-sm sm:text-base md:text-lg text-amber-100/95 font-medium leading-relaxed min-w-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-1" />
              <span className="min-w-0 break-words">
                {t(siteData.fullAddress, siteData.fullAddressKn)}
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
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
