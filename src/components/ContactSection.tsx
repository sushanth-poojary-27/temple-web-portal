"use client";

import { useState } from "react";
import {
  ArrowUpRight,
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
      className="scroll-mt-24 py-10 sm:py-14 md:py-18 bg-amber-50 text-[#2B1810]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-7 sm:space-y-9">
        {/* Compact Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F0E2] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#7A1C1C] border border-[#C59B27]/60">
            <MapPin className="w-3.5 h-3.5 text-[#9A7214]" />
            <span>{t("Visit the Sannidhana", "ಶ್ರೀ ಕ್ಷೇತ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಿ")}</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#7A1C1C] leading-snug break-words">
            {t(
              "Location & Contact Details",
              "ಶ್ರೀ ಕ್ಷೇತ್ರದ ವಿಳಾಸ ಮತ್ತು ಸಂಪರ್ಕ ವಿವರ"
            )}
          </h2>
          <p className="text-xs sm:text-base text-[#4A2511]/90 leading-relaxed break-words">
            {t(
              `Plan your visit to ${siteData.trustName} or reach out to the trust office for seva and temple inquiries.`,
              `${siteData.trustNameKn} ಕ್ಷೇತ್ರಕ್ಕೆ ಭೇಟಿ ನೀಡಲು ಹಾಗೂ ಸೇವಾ ವಿವರಗಳಿಗಾಗಿ ಟ್ರಸ್ಟ್ ಕಚೇರಿಯನ್ನು ಸಂಪರ್ಕಿಸಿ.`
            )}
          </p>
        </div>

        {/* Single Unified 2-Column Card */}
        <div className="rounded-2xl border border-[#C59B27]/40 bg-[#FFFDF8] p-5 sm:p-7 lg:p-8 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column (lg:col-span-7): Contact, Hours & Social Buttons */}
            <div className="lg:col-span-7 min-w-0 space-y-4">
              {/* Regd. Pill + Temple Title */}
              <div className="space-y-1.5">
                <span className="inline-block rounded-full bg-[#F7F0E2] px-3 py-0.5 text-xs font-bold text-[#7A1C1C] border border-[#C59B27]/60">
                  {t("Regd. Trust 2008", "ನೋಂದಾಯಿತ ಟ್ರಸ್ಟ್ 2008")}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#7A1C1C] leading-snug break-words">
                  {t(siteData.trustName, siteData.trustNameKn)}
                </h3>
              </div>

              {/* Streamlined 2-Row Address & Hours (Hairline Dividers — No Heavy Nested Sub-Boxes) */}
              <div className="border-y border-[#C59B27]/35 divide-y divide-[#C59B27]/30 text-sm text-[#2B1810]">
                {/* Row 1: Address + Plus Code */}
                <div className="py-3 flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#9A7214] shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C1C]">
                      {t("Temple Postal Address", "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಅಂಚೆ ವಿಳಾಸ")}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#2B1810] leading-relaxed break-words">
                      {t(
                        "Post Kemundel, Ulluru Village, Yellur, Udupi – 574 119 • Plus Code: 5Q7W+92R",
                        "ಪೋಸ್ಟ್ ಕೆಮುಂಡೇಲ್, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಎಲ್ಲೂರು, ಉಡುಪಿ – 574 119 • ಪ್ಲಸ್ ಕೋಡ್: 5Q7W+92R"
                      )}
                    </p>
                  </div>
                </div>

                {/* Row 2: Temple & Office Hours */}
                <div className="py-3 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#9A7214] shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C1C]">
                      {t("Temple & Office Hours", "ದರ್ಶನ ಮತ್ತು ಕಚೇರಿ ಸಮಯ")}
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-[#2B1810] leading-relaxed break-words">
                      {t(
                        "Morning: 6:00 AM – 2:00 PM | Evening: 4:00 PM – 8:30 PM",
                        "ಬೆಳಿಗ್ಗೆ: 6:00 – ಮಧ್ಯಾಹ್ನ 2:00 | ಸಂಜೆ: 4:00 – ರಾತ್ರಿ 8:30"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tactile Contact Action Buttons */}
              <div className="space-y-2.5 pt-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#4A1C1C]">
                    <ShieldCheck className="w-4 h-4 text-[#9A7214] shrink-0" />
                    <span>
                      {t(
                        `${siteData.supervisor.designation}: ${siteData.supervisor.name}`,
                        `${siteData.supervisor.designationKn}: ${siteData.supervisor.nameKn}`
                      )}
                    </span>
                  </p>
                  <span className="text-xs font-medium text-[#6B4A35] break-all">
                    {siteData.contact.emailDisplay}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {/* 1. Primary Maroon Call Button */}
                  <a
                    href="tel:+919820790032"
                    aria-label={t(
                      "Call Temple Office at +91 98207 90032",
                      "ಟ್ರಸ್ಟ್ ಕಚೇರಿಗೆ ಕರೆ ಮಾಡಿ +91 98207 90032"
                    )}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#7A1C1C] hover:bg-[#5E1414] active:scale-[0.99] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#FFFDF7] border border-[#C59B27]/75 shadow-xs transition"
                  >
                    <Phone className="w-4 h-4 text-[#F4D078] shrink-0" />
                    <span className="whitespace-nowrap">
                      {t("Call +91 98207 90032", "ಕರೆ ಮಾಡಿ +91 98207 90032")}
                    </span>
                  </a>

                  {/* 2. Secondary Gold-Border Email Button */}
                  <a
                    href={siteData.contact.emailHref}
                    aria-label={t(
                      `Email Temple Office at ${siteData.contact.emailDisplay}`,
                      `ಟ್ರಸ್ಟ್ ಕಚೇರಿಗೆ ಇಮೇಲ್ ಕಳುಹಿಸಿ ${siteData.contact.emailDisplay}`
                    )}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl border border-[#C59B27]/75 bg-[#FDF8EE] hover:bg-[#F3E9D4] hover:border-[#7A1C1C] active:scale-[0.99] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#7A1C1C] shadow-xs transition"
                  >
                    <Mail className="w-4 h-4 text-[#9A7214] shrink-0" />
                    <span className="whitespace-nowrap">
                      {t("Email Temple Office", "ಟ್ರಸ್ಟ್ ಕಚೇರಿಗೆ ಇಮೇಲ್")}
                    </span>
                  </a>

                  {/* Paired Compact Copy Email Button */}
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={t(
                      `Copy email address ${siteData.contact.emailDisplay}`,
                      `ಇಮೇಲ್ ವಿಳಾಸ ನಕಲಿಸಿ ${siteData.contact.emailDisplay}`
                    )}
                    className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-xl border border-[#C59B27]/60 bg-[#FAF7F2] hover:bg-[#F3E9D4] hover:border-[#7A1C1C] active:scale-[0.99] px-3.5 py-2.5 text-xs font-bold text-[#4A1C1C] shadow-xs transition cursor-pointer"
                  >
                    {emailCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                        <span>{t("Copied", "ನಕಲಿಸಲಾಗಿದೆ")}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#9A7214] shrink-0" />
                        <span>{t("Copy Email", "ಇಮೇಲ್ ನಕಲಿಸಿ")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Compact Tactile Social Buttons Below Hairline Divider */}
              <div className="border-t border-[#C59B27]/35 pt-4 space-y-2.5">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#7A1C1C]">
                  {t("CONNECT WITH US", "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ")}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {siteData.socialLinks.map((item) => (
                    <a
                      key={item.id}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t(
                        `Follow ${siteData.shortName} on ${item.label}`,
                        `${siteData.shortNameKn} ${item.labelKn} ಪುಟಕ್ಕೆ ಭೇಟಿ ನೀಡಿ`
                      )}
                      className="min-w-0 inline-flex items-center justify-center gap-2 min-h-[44px] px-3 rounded-xl border border-[#C59B27]/50 bg-[#FDF8EE] text-[#4A1C1C] font-medium text-sm shadow-xs hover:border-[#7A1C1C] hover:bg-[#F5EBDA] active:scale-[0.99] transition"
                    >
                      <SocialIcon platform={item.id} className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {t(item.label, item.labelKn)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (lg:col-span-5): Compact Map + Attached Directions CTA */}
            <div className="lg:col-span-5 min-w-0 flex flex-col gap-3">
              <div className="relative w-full h-[240px] sm:h-[300px] rounded-xl overflow-hidden border border-[#C59B27]/50 bg-[#EFE6D4] shadow-xs">
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
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              <a
                href={siteData.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t(
                  `Get Directions on Google Maps to ${siteData.trustName}`,
                  `${siteData.trustNameKn} ಗೂಗಲ್ ಮ್ಯಾಪ್ ಮಾರ್ಗಸೂಚಿ ಪಡೆಯಿರಿ`
                )}
                className="w-full inline-flex items-center justify-center gap-2 min-h-[44px] rounded-xl bg-[#7A1C1C] hover:bg-[#5E1414] active:scale-[0.99] px-4 py-2.5 text-xs sm:text-sm font-bold text-[#FFFDF7] border border-[#C59B27]/75 shadow-sm transition text-center"
              >
                <Navigation className="w-4 h-4 text-[#F4D078] shrink-0" />
                <span>
                  {t(
                    "Get Directions on Google Maps",
                    "ಗೂಗಲ್ ಮ್ಯಾಪ್ಸ್‌ನಲ್ಲಿ ಮಾರ್ಗಸೂಚಿ ಪಡೆಯಿರಿ"
                  )}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[#F4D078] shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
