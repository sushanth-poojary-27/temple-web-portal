"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-amber-900 text-amber-50 border-t-4 border-amber-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Trust Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 bg-white shrink-0">
                <Image
                  src={siteData.assets.logo}
                  alt={t(
                    `${siteData.trustName} Logo`,
                    `${siteData.trustNameKn} ಲಾಂಛನ`
                  )}
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-snug">
                  {t(siteData.shortName, siteData.shortNameKn)}
                </h2>
                <p className="text-xs text-amber-300 font-medium">
                  {t(siteData.registrationNo, siteData.registrationNoKn)}
                </p>
              </div>
            </div>
            <p className="text-sm text-amber-100/90 leading-relaxed">
              {t(
                `${siteData.trustName} is a registered religious trust dedicated to preserving sacred traditions, daily sevas, and community welfare at Ullur, Karnataka.`,
                `${siteData.trustNameKn} ಧಾರ್ಮಿಕ ಪರಂಪರೆ, ನಿತ್ಯ ಪೂಜಾ ಕೈಂಕರ್ಯಗಳು, ಅನ್ನದಾನ ಹಾಗೂ ಸಮಾಜಮುಖಿ ಕಾರ್ಯಗಳಿಗೆ ಸಮರ್ಪಿತವಾಗಿರುವ ನೋಂದಾಯಿತ ಧಾರ್ಮಿಕ ಟ್ರಸ್ಟ್ ಆಗಿದೆ.`
              )}
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              {t("Quick Links", "ಪ್ರಮುಖ ಕೊಂಡಿಗಳು")}
            </h3>
            <ul className="space-y-2 text-sm">
              {siteData.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-amber-100 hover:text-amber-300 transition-colors"
                  >
                    {t(item.label, item.labelKn)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Daily Darshan & Aarti Timings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              {t("Daily Timings", "ದೈನಂದಿನ ದರ್ಶನ ಸಮಯ")}
            </h3>
            <div className="space-y-2 text-sm text-amber-100">
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">
                    {t("Morning:", "ಬೆಳಿಗ್ಗೆ:")}
                  </strong>{" "}
                  {t(
                    siteData.darshanTimings.morning,
                    siteData.darshanTimings.morningKn
                  )}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">
                    {t("Evening:", "ಸಂಜೆ:")}
                  </strong>{" "}
                  {t(
                    siteData.darshanTimings.evening,
                    siteData.darshanTimings.eveningKn
                  )}
                </span>
              </p>
              <div className="pt-2 border-t border-amber-800 space-y-1 text-xs text-amber-200">
                {siteData.aartiTimings.map((aarti) => (
                  <p key={aarti.id}>
                    <span className="font-semibold text-amber-50">
                      {t(aarti.name, aarti.nameKn)}:
                    </span>{" "}
                    {t(aarti.time, aarti.timeKn)}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Address & Trust Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              {t("Trust Address & Contact", "ವಿಳಾಸ ಮತ್ತು ಸಂಪರ್ಕ")}
            </h3>
            <div className="space-y-2.5 text-sm text-amber-100">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{t(siteData.fullAddress, siteData.fullAddressKn)}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>
                  {t(
                    `${siteData.supervisor.name} (${siteData.supervisor.designation})`,
                    `${siteData.supervisor.nameKn} (${siteData.supervisor.designationKn})`
                  )}
                </span>
              </p>
              <p className="flex items-start gap-2.5 text-xs text-amber-200">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {t(
                    siteData.placeholders.contactPhone,
                    siteData.placeholders.contactPhoneKn
                  )}
                </span>
              </p>
              <p className="flex items-start gap-2.5 text-xs text-amber-200">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <a
                  href={siteData.contact.emailHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-100 hover:text-amber-300 underline underline-offset-2 break-all transition-colors"
                >
                  {siteData.contact.emailDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200">
          <p>
            © {currentYear} {t(siteData.trustName, siteData.trustNameKn)}.{" "}
            {t("All rights reserved.", "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.")}
          </p>
          <p>
            {t(
              `Official Temple Trust Web Portal • ${siteData.address}`,
              `ಅಧಿಕೃತ ಶ್ರೀ ಕ್ಷೇತ್ರ ಟ್ರಸ್ಟ್ ಜಾಲತಾಣ • ${siteData.addressKn}`
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
