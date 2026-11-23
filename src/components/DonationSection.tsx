"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Flame, HeartHandshake } from "lucide-react";
import { sevaList, siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function DonationSection() {
  const { t } = useLanguage();

  return (
    <section
      id="donate"
      className="scroll-mt-24 py-12 md:py-20 bg-amber-50 border-t border-amber-200 text-amber-900"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {t("Sacred Offerings & Support", "ಸೇವಾ ಕೈಂಕರ್ಯ ಮತ್ತು ದೇಣಿಗೆ")}
            </span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-relaxed break-words">
            {t(
              "Seva Booking & Temple Donations",
              "ಆನ್‌ಲೈನ್ ಸೇವಾ ನೋಂದಣಿ ಮತ್ತು ದೇಣಿಗೆ ಸಮರ್ಪಣೆ"
            )}
          </h2>
          <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
            {t(
              `Select an offering option below to book a sacred Seva or contribute towards the Education & General Trust Fund at ${siteData.shortName}.`,
              `${siteData.shortNameKn} ಕ್ಷೇತ್ರದಲ್ಲಿ ಪೂಜಾ ಸೇವೆಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲು ಅಥವಾ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಾಮಾನ್ಯ ಟ್ರಸ್ಟ್ ನಿಧಿಗೆ ದೇಣಿಗೆ ನೀಡಲು ಕೆಳಗಿನ ಆಯ್ಕೆಯನ್ನು ಆರಿಸಿ.`
            )}
          </p>
        </div>

        {/* Two Side-by-Side Clickable Next.js <Link> Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Book a Seva -> /donate/seva */}
          <Link
            id="seva-form"
            href="/donate/seva"
            className="scroll-mt-24 group min-w-0 rounded-3xl bg-white p-5 sm:p-8 border-2 border-amber-300 hover:-translate-y-0.5 hover:border-amber-600 hover:bg-amber-900 hover:text-amber-50 shadow-sm hover:shadow-md active:scale-[0.99] transition duration-200 flex flex-col justify-between gap-6 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-amber-500 transition-colors duration-200">
                <Flame className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-300 leading-snug break-words">
                  {t(
                    `Temple Rituals • ${sevaList.length} Sevas`,
                    `ಶ್ರೀ ದೇವಿಯ ಪೂಜಾ ಸೇವೆಗಳು • ${sevaList.length} ಸೇವೆಗಳು`
                  )}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 group-hover:text-white leading-relaxed break-words">
                  {t("Book a Seva", "ಪೂಜಾ ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ")}
                </h3>
                <p className="text-sm text-amber-800 group-hover:text-amber-100/90 leading-relaxed break-words">
                  {t(
                    "Book Alankara Pooja, Hunnime Pooja, Huvina Pooja, Kunkumarchane, and other daily sevas with Prasadam dispatch.",
                    "ಅಲಂಕಾರ ಪೂಜೆ, ಹುಣ್ಣಿಮೆ ಪೂಜೆ, ಹೂವಿನ ಪೂಜೆ, ಕುಂಕುಮಾರ್ಚನೆ ಹಾಗೂ ಇತರ ನಿತ್ಯ ಸೇವೆಗಳನ್ನು ಅಂಚೆ ಪ್ರಸಾದ ವ್ಯವಸ್ಥೆಯೊಂದಿಗೆ ಕಾಯ್ದಿರಿಸಿ."
                  )}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 group-hover:border-amber-800 flex items-center justify-between text-sm font-bold text-amber-600 group-hover:text-amber-300 min-h-[44px]">
              <span>
                {t("Proceed to Seva Booking", "ಸೇವೆ ಕಾಯ್ದಿರಿಸಲು ಮುಂದುವರಿಯಿರಿ")}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>

          {/* Card 2: Education & General Trust Fund -> /donate/education-trust */}
          <Link
            id="donate-form"
            href="/donate/education-trust"
            className="scroll-mt-24 group min-w-0 rounded-3xl bg-white p-5 sm:p-8 border-2 border-amber-300 hover:-translate-y-0.5 hover:border-amber-600 hover:bg-amber-900 hover:text-amber-50 shadow-sm hover:shadow-md active:scale-[0.99] transition duration-200 flex flex-col justify-between gap-6 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <div className="flex items-start gap-4 min-w-0">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-amber-500 transition-colors duration-200">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="min-w-0 flex-1 space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-300 leading-snug break-words">
                  {t("Community Welfare", "ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಮಾಜಮುಖಿ ಸೇವೆ")}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 group-hover:text-white leading-relaxed break-words">
                  {t(
                    "Education & General Trust Fund",
                    "ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಾಮಾನ್ಯ ಟ್ರಸ್ಟ್ ನಿಧಿ"
                  )}
                </h3>
                <p className="text-sm text-amber-800 group-hover:text-amber-100/90 leading-relaxed break-words">
                  {t(
                    "Support student scholarships, educational aid, Annadana, and ongoing temple development initiatives.",
                    "ವಿದ್ಯಾರ್ಥಿ ವೇತನ, ಶೈಕ್ಷಣಿಕ ನೆರವು, ನಿತ್ಯ ಅನ್ನದಾನ ಹಾಗೂ ಶ್ರೀ ಕ್ಷೇತ್ರದ ಅಭಿವೃದ್ಧಿ ಕಾರ್ಯಗಳಿಗೆ ನಿಮ್ಮ ದೇಣಿಗೆಯನ್ನು ಸಮರ್ಪಿಸಿ."
                  )}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 group-hover:border-amber-800 flex items-center justify-between text-sm font-bold text-amber-600 group-hover:text-amber-300 min-h-[44px]">
              <span>
                {t("Contribute to Trust Fund", "ಟ್ರಸ್ಟ್ ನಿಧಿಗೆ ದೇಣಿಗೆ ನೀಡಿ")}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </Link>
        </div>

        {/* Tax Exemption Notice */}
        <p className="text-center text-xs sm:text-sm font-medium text-amber-800 leading-relaxed">
          {t(siteData.taxExemptionNote, siteData.taxExemptionNoteKn)}
        </p>
      </div>
    </section>
  );
}
