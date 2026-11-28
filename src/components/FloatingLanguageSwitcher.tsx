"use client";

import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/** High-contrast floating language switcher synced with the global LanguageContext. */
export default function FloatingLanguageSwitcher() {
  const { language, toggleLanguage } = useLanguage();
  const isEnglish = language === "en";

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40">
      <button
        type="button"
        onClick={toggleLanguage}
        aria-label={
          isEnglish ? "Read website in Kannada" : "Read website in English"
        }
        className="min-h-[46px] px-4 py-2.5 rounded-full bg-[#7A1C1C] text-white border-2 border-[#C59B27] shadow-lg hover:bg-[#5E1414] active:scale-[0.98] transition flex items-center gap-2 font-semibold text-sm sm:text-base cursor-pointer leading-snug"
      >
        <Globe className="w-4 h-4 text-[#F4D078] shrink-0" />
        <span>{isEnglish ? "ಕನ್ನಡದಲ್ಲಿ ಓದಿ" : "Read in English"}</span>
      </button>
    </div>
  );
}
