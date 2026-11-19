"use client";

import { useState } from "react";
import { Clock, Flame, Sun, Moon, Sparkles } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

type ActiveTab = "aarti" | "darshan";

export default function TimingsSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("aarti");
  const { t } = useLanguage();

  return (
    <section
      id="timings"
      className="scroll-mt-24 py-12 md:py-20 bg-white border-y border-amber-200 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{t("Sacred Schedule", "ದೈನಂದಿನ ಪೂಜಾ ವೇಳಾಪಟ್ಟಿ")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-relaxed break-words">
            {t(
              "Daily Darshan, Aarti & Pooja Timings",
              "ದೈನಂದಿನ ದರ್ಶನ, ಆರತಿ ಮತ್ತು ಪೂಜಾ ಸಮಯ"
            )}
          </h2>
          <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
            {t(
              `View the daily worship and darshan hours at ${siteData.shortName}.`,
              `${siteData.shortNameKn} ಕ್ಷೇತ್ರದ ದೈನಂದಿನ ಪೂಜೆ ಹಾಗೂ ದರ್ಶನದ ಸಮಯದ ವಿವರ.`
            )}
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex justify-center max-w-full">
          <div
            role="tablist"
            aria-label={t("Temple Schedule Tabs", "ದೇವಸ್ಥಾನದ ಸಮಯದ ಟ್ಯಾಬ್‌ಗಳು")}
            className="inline-flex flex-wrap sm:flex-nowrap justify-center w-full sm:w-auto max-w-full overflow-x-auto rounded-2xl sm:rounded-full bg-amber-100 p-1.5 border border-amber-200 shadow-inner gap-1.5"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "aarti"}
              onClick={() => setActiveTab("aarti")}
              className={`flex flex-1 sm:flex-none min-w-0 items-center justify-center gap-2 min-h-[44px] rounded-xl sm:rounded-full px-3.5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold leading-snug text-center transition duration-200 hover:brightness-105 active:scale-[0.99] cursor-pointer ${
                activeTab === "aarti"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-amber-900 hover:text-amber-600"
              }`}
            >
              <Flame className="w-4 h-4 shrink-0" />
              <span className="min-w-0 break-words">
                {t("Aarti & Pooja Timings", "ಆರತಿ ಮತ್ತು ಪೂಜಾ ಸಮಯ")}
              </span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "darshan"}
              onClick={() => setActiveTab("darshan")}
              className={`flex flex-1 sm:flex-none min-w-0 items-center justify-center gap-2 min-h-[44px] rounded-xl sm:rounded-full px-3.5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold leading-snug text-center transition duration-200 hover:brightness-105 active:scale-[0.99] cursor-pointer ${
                activeTab === "darshan"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-amber-900 hover:text-amber-600"
              }`}
            >
              <Sun className="w-4 h-4 shrink-0" />
              <span className="min-w-0 break-words">
                {t("Darshan Hours", "ದರ್ಶನದ ಸಮಯ")}
              </span>
            </button>
          </div>
        </div>

        {/* Tab Panel 1: Daily Aarti & Pooja Timings */}
        {activeTab === "aarti" && (
          <div
            role="tabpanel"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {siteData.aartiTimings.map((aarti, index) => (
              <div
                key={aarti.id}
                className="min-w-0 flex flex-col justify-between rounded-2xl bg-amber-50 p-6 border border-amber-200 shadow-sm hover:-translate-y-0.5 hover:border-amber-600 hover:shadow-md transition duration-200"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-600 text-white shadow-sm shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                      {t(`Daily Ritual #${index + 1}`, `ನಿತ್ಯ ಪೂಜೆ #${index + 1}`)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-amber-900 leading-relaxed break-words">
                    {t(aarti.name, aarti.nameKn)}
                  </h3>

                  {aarti.description && (
                    <p className="text-sm text-amber-800 leading-relaxed break-words">
                      {t(
                        aarti.description,
                        aarti.descriptionKn ?? aarti.description
                      )}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200 flex items-center gap-2 text-amber-900 font-bold leading-relaxed break-words">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{t(aarti.time, aarti.timeKn)}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Panel 2: Darshan Timings */}
        {activeTab === "darshan" && (
          <div
            role="tabpanel"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {/* Morning Darshan Card */}
            <div className="min-w-0 rounded-2xl bg-amber-50 p-6 sm:p-8 border border-amber-200 shadow-sm hover:-translate-y-0.5 hover:border-amber-600 hover:shadow-md transition duration-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sun className="w-6 h-6" />
              </div>
              <div className="min-w-0 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  {t("Morning Session", "ಬೆಳಗಿನ ಅವಧಿ")}
                </span>
                <h3 className="text-xl font-bold text-amber-900 leading-relaxed break-words">
                  {t("Morning Darshan", "ಬೆಳಗಿನ ದರ್ಶನ")}
                </h3>
                <p className="text-lg font-bold text-amber-600 leading-relaxed">
                  {t(
                    siteData.darshanTimings.morning,
                    siteData.darshanTimings.morningKn
                  )}
                </p>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {t(
                    "Includes Kakad Aarti and afternoon Maha Pooja & Naivedya.",
                    "ಪ್ರಾತಃಕಾಲದ ಕಾಕಡ ಆರತಿ ಹಾಗೂ ಮಧ್ಯಾಹ್ನದ ಮಹಾಪೂಜೆ ಮತ್ತು ನೈವೇದ್ಯ ಒಳಗೊಂಡಿರುತ್ತದೆ."
                  )}
                </p>
              </div>
            </div>

            {/* Evening Darshan Card */}
            <div className="min-w-0 rounded-2xl bg-amber-50 p-6 sm:p-8 border border-amber-200 shadow-sm hover:-translate-y-0.5 hover:border-amber-600 hover:shadow-md transition duration-200 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-900 text-amber-50 flex items-center justify-center shrink-0 shadow-sm">
                <Moon className="w-6 h-6" />
              </div>
              <div className="min-w-0 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  {t("Evening Session", "ಸಂಜೆಯ ಅವಧಿ")}
                </span>
                <h3 className="text-xl font-bold text-amber-900 leading-relaxed break-words">
                  {t("Evening Darshan", "ಸಂಜೆಯ ದರ್ಶನ")}
                </h3>
                <p className="text-lg font-bold text-amber-600 leading-relaxed">
                  {t(
                    siteData.darshanTimings.evening,
                    siteData.darshanTimings.eveningKn
                  )}
                </p>
                <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                  {t(
                    "Includes evening deeparadhana, Night Aarti, and Shej Aarti.",
                    "ಸಂಜೆಯ ದೀಪಾರಾಧನೆ, ರಾತ್ರಿ ಮಹಾಮಂಗಳಾರತಿ ಹಾಗೂ ಶೇಜ್ ಆರತಿ ಒಳಗೊಂಡಿರುತ್ತದೆ."
                  )}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
