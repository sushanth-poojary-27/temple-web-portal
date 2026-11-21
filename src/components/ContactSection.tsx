"use client";

import { useState } from "react";
import {
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
import SocialIcon from "@/components/SocialIcon";

export default function ContactSection() {
  const { t } = useLanguage();
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteData.contact.emailDisplay);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      // Fallback no-op if clipboard permission is unavailable
    }
  };

  return (
    <section
      id="contact"
      className="scroll-mt-24 py-12 md:py-20 bg-amber-50 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>{t("Visit the Sannidhana", "ಶ್ರೀ ಕ್ಷೇತ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-relaxed break-words">
            {t(
              "Location & Contact Details",
              "ಶ್ರೀ ಕ್ಷೇತ್ರದ ವಿಳಾಸ ಮತ್ತು ಸಂಪರ್ಕ ವಿವರ"
            )}
          </h2>
          <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
            {t(
              `Plan your visit to ${siteData.trustName} or reach out to the trust office for seva and temple inquiries.`,
              `${siteData.trustNameKn} ಕ್ಷೇತ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಲು ಹಾಗೂ ಸೇವಾ ವಿವರಗಳಿಗಾಗಿ ಟ್ರಸ್ಟ್ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.`
            )}
          </p>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Office Hours, and Action Buttons */}
          <div className="lg:col-span-5 min-w-0 flex flex-col justify-between rounded-3xl bg-white p-5 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                  {t(siteData.registrationNo, siteData.registrationNoKn)}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-amber-900 leading-relaxed sm:leading-snug break-words">
                  {t(siteData.trustName, siteData.trustNameKn)}
                </h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-amber-800">
                {/* Full Postal Address & Pincode */}
                <div className="flex items-start gap-3.5 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {t("Temple Postal Address", "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಅಂಚೆ ವಿಳಾಸ")}
                    </p>
                    <p className="font-semibold text-amber-900 break-words">
                      {t(siteData.address, siteData.addressKn)}
                    </p>
                    <p className="text-xs font-bold text-amber-700 break-words">
                      {t("Pincode", "ಪಿನ್ ಕೋಡ್")}: {siteData.contact.pincode} •{" "}
                      {t("Plus Code", "ಪ್ಲಸ್ ಕೋಡ್")}:{" "}
                      {siteData.contact.plusCode}
                    </p>
                  </div>
                </div>

                {/* Office & Darshan Hours */}
                <div className="flex items-start gap-3.5 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {t("Temple & Office Hours", "ದರ್ಶನ ಮತ್ತು ಕಚೇರಿ ಸಮಯ")}
                    </p>
                    <p className="font-semibold text-amber-900 break-words">
                      {t("Morning", "ಬೆಳಿಗ್ಗೆ")}:{" "}
                      {t(
                        siteData.darshanTimings.morning,
                        siteData.darshanTimings.morningKn
                      )}
                    </p>
                    <p className="font-semibold text-amber-900 break-words">
                      {t("Evening", "ಸಂಜೆ")}:{" "}
                      {t(
                        siteData.darshanTimings.evening,
                        siteData.darshanTimings.eveningKn
                      )}
                    </p>
                  </div>
                </div>

                {/* Trust Administrator & Contact Info */}
                <div className="flex items-start gap-3.5 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1 space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      {t("Trust Office Contact", "ಟ್ರಸ್ಟ್ ಕಚೇರಿ ಸಂಪರ್ಕ")}
                    </p>
                    <p className="font-bold text-amber-900 break-words">
                      {t(
                        `${siteData.supervisor.name} (${siteData.supervisor.designation})`,
                        `${siteData.supervisor.nameKn} (${siteData.supervisor.designationKn})`
                      )}
                    </p>
                    <p className="text-xs sm:text-sm flex items-start gap-2 text-amber-800">
                      <Phone className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <a
                        href={siteData.contact.phoneHref}
                        className="font-semibold text-amber-900 hover:text-amber-600 underline underline-offset-2 min-w-0 break-words transition-colors"
                      >
                        {t(
                          siteData.contact.phoneDisplay,
                          siteData.contact.phoneDisplayKn
                        )}
                      </a>
                    </p>
                    <div className="text-xs sm:text-sm flex flex-wrap items-center gap-2 text-amber-800">
                      <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                      <a
                        href={siteData.contact.emailHref}
                        className="font-semibold text-amber-900 hover:text-amber-600 underline underline-offset-2 break-all transition-colors"
                      >
                        {siteData.contact.emailDisplay}
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-white px-2.5 py-0.5 text-[11px] font-semibold text-amber-800 hover:bg-amber-100 active:scale-[0.98] transition cursor-pointer"
                        aria-label={t("Copy email address", "ಇಮೇಲ್ ವಿಳಾಸ ನಕಲಿಸಿ")}
                      >
                        {emailCopied ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                            <span>{t("Copied", "ನಕಲಿಸಲಾಗಿದೆ")}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-amber-600 shrink-0" />
                            <span>{t("Copy Email", "ಇಮೇಲ್ ನಕಲಿಸಿ")}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Email via Mailto & Google Maps Directions */}
            <div className="pt-4 border-t border-amber-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={siteData.contact.emailHref}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-amber-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-900 hover:brightness-105 active:scale-[0.99] transition duration-200 text-center leading-snug"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{t("Email on Gmail", "ಜಿಮೇಲ್ ಮೂಲಕ ಇಮೇಲ್ ಮಾಡಿ")}</span>
              </a>

              <a
                href={siteData.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full border-2 border-amber-600 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900 hover:bg-amber-600 hover:text-white hover:brightness-105 active:scale-[0.99] transition duration-200 text-center leading-snug"
              >
                <Navigation className="w-4 h-4 shrink-0" />
                <span>{t("Get Directions", "ಗೂಗಲ್ ಮ್ಯಾಪ್ ಮಾರ್ಗಸೂಚಿ")}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Responsive Google Maps Embed */}
          <div className="lg:col-span-7 min-w-0 flex flex-col rounded-3xl overflow-hidden border-2 border-amber-600 bg-white shadow-md min-h-[380px] sm:min-h-[460px]">
            <div className="bg-amber-900 text-amber-50 px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-semibold">
              <span className="flex items-start sm:items-center gap-2 leading-relaxed min-w-0">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
                <span className="min-w-0 break-words">
                  {t(siteData.shortName, siteData.shortNameKn)} •{" "}
                  {t(siteData.contact.village, siteData.contact.villageKn)} (
                  {siteData.contact.pincode})
                </span>
              </span>
              <a
                href={siteData.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-white underline underline-offset-2 shrink-0 py-1 leading-snug transition-colors duration-200"
              >
                {t("Open in Maps ↗", "ನಕ್ಷೆ ತೆರೆಯಿರಿ ↗")}
              </a>
            </div>

            <div className="relative flex-1 w-full max-w-full min-h-[340px]">
              <iframe
                title={t(
                  `Google Maps location for ${siteData.trustName}`,
                  `${siteData.trustNameKn} ಗೂಗಲ್ ಮ್ಯಾಪ್ ಸ್ಥಳ`
                )}
                src={siteData.contact.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full max-w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Connect With Us Social Block */}
        <div className="rounded-3xl bg-white p-5 sm:p-8 border border-amber-200 shadow-sm space-y-5">
          <div className="text-center space-y-1">
            <h3 className="text-lg sm:text-xl font-bold text-amber-900 leading-relaxed break-words">
              {t(
                siteData.socialConnectLabels.sectionHeading,
                siteData.socialConnectLabels.sectionHeadingKn
              )}
            </h3>
            <p className="text-xs sm:text-sm text-amber-800 leading-relaxed break-words">
              {t(
                "Follow official temple updates, festival announcements, and live darshan highlights.",
                "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಅಧಿಕೃತ ಪ್ರಕಟಣೆಗಳು, ಉತ್ಸವಗಳ ಮಾಹಿತಿ ಮತ್ತು ವಿಶೇಷ ದರ್ಶನಕ್ಕಾಗಿ ಸಂಪರ್ಕದಲ್ಲಿರಿ."
              )}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {siteData.socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="min-w-0 inline-flex items-center justify-center gap-2.5 min-h-[44px] rounded-full border border-amber-300 bg-amber-50/70 px-4 py-2.5 text-sm font-semibold text-amber-900 hover:border-amber-600 hover:bg-amber-100 hover:-translate-y-0.5 active:scale-[0.99] transition duration-200 leading-snug text-center"
              >
                <SocialIcon platform={item.id} className="w-4 h-4 shrink-0" />
                <span className="truncate">{t(item.label, item.labelKn)}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
