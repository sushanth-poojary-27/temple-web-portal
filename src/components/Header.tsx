"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Clock, Languages } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-amber-50/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
      {/* Top announcement bar with darshan timings */}
      <div className="bg-amber-900 text-amber-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium tracking-wide">
            {t(siteData.registrationNo, siteData.registrationNoKn)} •{" "}
            {t(siteData.address, siteData.addressKn)}
          </span>
          <div className="flex items-center gap-1.5 text-amber-100">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {t(
                `Darshan: Morning ${siteData.darshanTimings.morning} | Evening ${siteData.darshanTimings.evening}`,
                `ದರ್ಶನ ಸಮಯ: ಬೆಳಿಗ್ಗೆ ${siteData.darshanTimings.morningKn} | ಸಂಜೆ ${siteData.darshanTimings.eveningKn}`
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3">
          {/* Brand Logo & Trust Name */}
          <Link
            href="#home"
            className="flex items-center gap-3 group focus:outline-none min-w-0"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-600 bg-white shrink-0 shadow-sm">
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
              <span className="text-sm sm:text-lg md:text-xl font-bold text-amber-900 leading-snug group-hover:text-amber-600 transition-colors truncate">
                {t(siteData.shortName, siteData.shortNameKn)}
              </span>
              <span className="text-xs sm:text-sm text-amber-800 font-medium truncate">
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
                className="text-sm font-semibold text-amber-900 hover:text-amber-600 transition-colors py-2 whitespace-nowrap"
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
              className="inline-flex items-center gap-1.5 rounded-full border-2 border-amber-600 bg-amber-100/80 px-3.5 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer shrink-0"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
            </button>

            <Link
              href="#timings"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 transition-colors whitespace-nowrap shrink-0"
            >
              {t("Aarti & Timings", "ಆರತಿ ಮತ್ತು ಸಮಯ")}
            </Link>
          </nav>

          {/* Mobile Controls: Language Toggle + Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={t(
                "Switch language to Kannada",
                "ಭಾಷೆಯನ್ನು ಇಂಗ್ಲಿಷ್‌ಗೆ ಬದಲಾಯಿಸಿ"
              )}
              className="inline-flex items-center gap-1 rounded-full border-2 border-amber-600 bg-amber-100 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-amber-600 hover:text-white transition-colors"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{language === "en" ? "ಕನ್ನಡ" : "EN"}</span>
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="inline-flex items-center justify-center p-2.5 rounded-lg text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
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
          className="lg:hidden bg-amber-50 border-t border-amber-200 px-4 pt-3 pb-6 space-y-2 shadow-lg"
        >
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-semibold text-amber-900 hover:bg-amber-100 hover:text-amber-600 transition-colors"
            >
              {t(item.label, item.labelKn)}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="#timings"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 transition-colors"
            >
              {t(
                "View Aarti & Darshan Timings",
                "ಆರತಿ ಮತ್ತು ದರ್ಶನದ ಸಮಯ ನೋಡಿ"
              )}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
