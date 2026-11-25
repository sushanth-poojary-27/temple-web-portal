"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Languages } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-amber-50/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
      {/* Top announcement bar with seamless bilingual marquee */}
      <div className="w-full max-w-full overflow-hidden bg-amber-900 text-amber-50 text-xs py-1.5 leading-relaxed">
        <div className="animate-temple-marquee hover:[animation-play-state:paused]">
          <span className="inline-block whitespace-nowrap px-8 font-medium tracking-wide">
            {t(siteData.announcementBar, siteData.announcementBarKn)}
          </span>
          <span
            aria-hidden="true"
            className="inline-block whitespace-nowrap px-8 font-medium tracking-wide"
          >
            {t(siteData.announcementBar, siteData.announcementBarKn)}
          </span>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[5rem] py-2 gap-2 sm:gap-3">
          {/* Brand Logo & Trust Name */}
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group focus:outline-none flex-1 min-w-0 min-h-[44px]"
          >
            <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-600 bg-white shrink-0 shadow-sm">
              <Image
                src={siteData.assets.logo}
                alt={t(
                  `${siteData.trustName} Logo`,
                  `${siteData.trustNameKn} ಲಾಂಛನ`
                )}
                fill
                sizes="56px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm sm:text-lg md:text-xl font-bold text-amber-900 leading-snug py-0.5 group-hover:text-amber-600 transition-colors duration-200 truncate">
                {t(siteData.shortName, siteData.shortNameKn)}
              </span>
              <span className="text-xs sm:text-sm text-amber-800 font-medium leading-snug truncate">
                {t(
                  `Ullur, Karnataka (${siteData.registrationNo})`,
                  `ಉಳ್ಳೂರು, ಕರ್ನಾಟಕ (${siteData.registrationNoKn})`
                )}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links & Language Switcher */}
          <nav
            aria-label={t("Main Navigation", "ಮುಖ್ಯ ಸಂಚಾರ ಪಟ್ಟಿ")}
            className="hidden lg:flex items-center gap-5"
          >
            {siteData.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-amber-900 hover:text-amber-600 transition-colors duration-200 py-2 leading-snug whitespace-nowrap"
              >
                {t(item.label, item.labelKn)}
              </Link>
            ))}

            {/* Language Switcher Pill */}
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t(
                "Switch language to Kannada",
                "ಭಾಷೆಯನ್ನು ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಾಯಿಸಿ"
              )}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full border-2 border-amber-600 bg-amber-100/80 px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-600 hover:text-white hover:brightness-105 active:scale-[0.99] transition duration-200 cursor-pointer shrink-0 leading-snug"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
            </button>
          </nav>

          {/* Mobile Controls: Language Toggle + Hamburger Button */}
          <div className="flex lg:hidden items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t(
                "Switch language to Kannada",
                "ಭಾಷೆಯನ್ನು ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಾಯಿಸಿ"
              )}
              className="inline-flex items-center justify-center gap-1 min-h-[44px] min-w-[44px] rounded-full border-2 border-amber-600 bg-amber-100 px-2.5 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-600 hover:text-white active:scale-[0.99] transition duration-200 cursor-pointer leading-snug"
            >
              <Languages className="w-3.5 h-3.5 shrink-0" />
              <span>{language === "en" ? "ಕನ್ನಡ" : "EN"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] p-2 rounded-lg text-amber-900 hover:bg-amber-100 active:scale-[0.99] transition duration-200 focus:outline-none focus:ring-2 focus:ring-amber-600 cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label={t(
                "Toggle navigation menu",
                "ಮೆನು ತೆರೆಯಿರಿ / ಮುಚ್ಚಿರಿ"
              )}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label={t("Mobile Navigation", "ಮೊಬೈಲ್ ಸಂಚಾರ ಪಟ್ಟಿ")}
          className="lg:hidden bg-amber-50 border-t border-amber-200 px-4 pt-3 pb-6 space-y-1.5 shadow-lg"
        >
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center min-h-[44px] rounded-lg px-3 py-2.5 text-base font-semibold text-amber-900 hover:bg-amber-100 hover:text-amber-600 transition-colors duration-200 leading-relaxed"
            >
              {t(item.label, item.labelKn)}
            </Link>
          ))}
          <div className="pt-2 space-y-2.5">
            <button
              type="button"
              onClick={toggleLanguage}
              className="flex items-center justify-center gap-2 w-full min-h-[44px] rounded-full border-2 border-amber-600 bg-white px-5 py-2.5 text-sm font-bold text-amber-900 hover:bg-amber-600 hover:text-white active:scale-[0.99] transition duration-200 cursor-pointer leading-snug"
            >
              <Languages className="w-4 h-4 shrink-0" />
              <span>
                {language === "en"
                  ? "ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ (Kannada)"
                  : "Switch to English"}
              </span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
