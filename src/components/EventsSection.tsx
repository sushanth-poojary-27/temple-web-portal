"use client";

import Image from "next/image";
import Link from "next/link";
import { Calendar, Sparkles } from "lucide-react";
import { eventsData, siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";

export default function EventsSection() {
  const { t } = useLanguage();

  return (
    <section
      id="events"
      className="scroll-mt-24 py-12 md:py-20 bg-amber-50 text-amber-900"
    >
      {/* Secondary #festivals anchor so both /#events and /#festivals land cleanly */}
      <span id="festivals" className="scroll-mt-24 block h-0" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>
              {t("Annual Utsavas & Sevas", "ವಾರ್ಷಿಕ ಉತ್ಸವಗಳು ಮತ್ತು ಸೇವೆಗಳು")}
            </span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-relaxed break-words">
            {t(
              "Upcoming Temple Festivals & Events",
              "ಶ್ರೀ ಕ್ಷೇತ್ರದ ಮುಂಬರುವ ಉತ್ಸವಗಳು ಮತ್ತು ವಿಶೇಷ ಪೂಜೆಗಳು"
            )}
          </h2>
          <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
            {t(
              `Sacred annual celebrations and monthly festivals observed at ${siteData.shortName}.`,
              `${siteData.shortNameKn} ಕ್ಷೇತ್ರದಲ್ಲಿ ಆಚರಿಸಲಾಗುವ ವಾರ್ಷಿಕ ಮಹೋತ್ಸವಗಳು ಹಾಗೂ ಮಾಸಿಕ ವಿಶೇಷ ಸೇವೆಗಳು.`
            )}
          </p>
        </div>

        {/* 3-Column Invitation Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {eventsData.map((event) => (
            <div
              key={event.slug}
              className="group min-w-0 flex flex-col h-full rounded-2xl bg-white overflow-hidden border border-amber-200 shadow-sm hover:border-amber-600 hover:shadow-md hover:-translate-y-0.5 transition duration-200"
            >
              {/* Clickable Card Image & Text Body -> /events/[slug] */}
              <Link
                href={`/events/${event.slug}`}
                className="flex flex-col flex-1 focus:outline-none focus:ring-2 focus:ring-amber-600"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-amber-100">
                  <Image
                    src={event.image}
                    alt={t(event.title, event.titleKn)}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-900/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-amber-50 shadow-sm">
                      <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                      <span>{t(event.badge, event.badgeKn)}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6 pb-3 space-y-2.5">
                  <div className="inline-flex items-start gap-1.5 text-xs font-bold text-amber-700 leading-relaxed min-w-0">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span className="min-w-0 break-words">
                      {t(event.dateLabel, event.dateLabelKn)}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-amber-900 group-hover:text-amber-700 transition-colors duration-200 leading-snug break-words">
                    {t(event.title, event.titleKn)}
                  </h3>

                  <p className="text-sm text-amber-800 leading-relaxed line-clamp-2 break-words">
                    {t(event.shortInviteNote, event.shortInviteNoteKn)}
                  </p>
                </div>
              </Link>

              {/* Single Bottom Details Button */}
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 mt-auto">
                <Link
                  href={`/events/${event.slug}`}
                  className="min-h-[44px] w-full rounded-xl bg-amber-800 hover:bg-amber-900 text-white font-semibold px-4 py-2.5 text-sm transition-colors duration-200 flex items-center justify-center text-center leading-snug"
                >
                  {t(
                    "Click for More Details →",
                    "ಹೆಚ್ಚಿನ ವಿವರಗಳಿಗಾಗಿ ಕ್ಲಿಕ್ ಮಾಡಿ →"
                  )}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
