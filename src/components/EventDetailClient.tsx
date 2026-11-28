"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  Clock,
  HeartHandshake,
  Info,
  Sparkles,
} from "lucide-react";
import type { EventItem } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingLanguageSwitcher from "@/components/FloatingLanguageSwitcher";
import SocialIcon from "@/components/SocialIcon";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getTimeLeft(isoDate: string, nowMs: number | null): TimeLeft | null {
  if (nowMs === null) return null;
  const targetMs = new Date(isoDate).getTime();
  if (Number.isNaN(targetMs)) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const diff = targetMs - nowMs;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

interface EventDetailClientProps {
  event: EventItem;
}

export default function EventDetailClient({ event }: EventDetailClientProps) {
  const { t } = useLanguage();
  const [nowMs, setNowMs] = useState<number | null>(null);

  useEffect(() => {
    setNowMs(Date.now());
    const timerId = window.setInterval(() => {
      setNowMs(Date.now());
    }, 1000);
    return () => window.clearInterval(timerId);
  }, []);

  const countdown = getTimeLeft(event.isoDate, nowMs);

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-amber-50 text-amber-900">
      <Header />

      <main className="flex-1 min-w-0 max-w-full py-8 sm:py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          {/* Top Back Link */}
          <div>
            <Link
              href="/#festivals"
              className="inline-flex items-center gap-2 min-h-[44px] rounded-full bg-white border border-amber-300 px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm hover:border-amber-600 hover:bg-amber-100 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 text-amber-700 shrink-0" />
              <span>{t("Back to Festivals", "ಉತ್ಸವಗಳಿಗೆ ಹಿಂತಿರುಗಿ")}</span>
            </Link>
          </div>

          {/* Main Event Detail Card */}
          <article className="rounded-3xl bg-white border border-amber-200 shadow-sm overflow-hidden p-5 sm:p-8 md:p-10 space-y-8">
            {/* Full 4:3 Invitation Banner */}
            <div className="relative aspect-[4/3] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden shadow-lg border-2 border-amber-300 bg-amber-100">
              <Image
                src={event.image}
                alt={t(event.title, event.titleKn)}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 672px"
                className="object-cover object-center"
              />
            </div>

            {/* Title, Badge & Date Header */}
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>{t(event.badge, event.badgeKn)}</span>
              </span>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-relaxed sm:leading-snug break-words">
                {t(event.title, event.titleKn)}
              </h1>

              <p className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-bold text-amber-700 leading-relaxed">
                <Calendar className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="break-words">
                  {t(event.dateLabel, event.dateLabelKn)}
                </span>
              </p>
            </div>

            {/* Live Automatic IST Countdown Timer */}
            <div className="max-w-xl mx-auto rounded-2xl bg-amber-900 text-amber-50 p-4 sm:p-6 border-2 border-amber-600 shadow-md space-y-3">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-200">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {t("Live Countdown (IST)", "ನೇರ ಕ್ಷಣಗಣನೆ (ಭಾರತೀಯ ಸಮಯ)")}
                </span>
              </div>

              {countdown?.isPast ? (
                <div className="rounded-xl bg-amber-950/70 border border-amber-700/80 py-3 px-4 text-center text-sm sm:text-base font-bold text-amber-200">
                  {t(event.pastLabel, event.pastLabelKn)}
                </div>
              ) : (
                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {[
                    {
                      label: t("Days", "ದಿನಗಳು"),
                      value: countdown ? countdown.days : "--",
                    },
                    {
                      label: t("Hrs", "ಗಂಟೆ"),
                      value: countdown ? countdown.hours : "--",
                    },
                    {
                      label: t("Mins", "ನಿಮಿಷ"),
                      value: countdown ? countdown.minutes : "--",
                    },
                    {
                      label: t("Secs", "ಸೆಕೆಂಡ್"),
                      value: countdown ? countdown.seconds : "--",
                    },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="rounded-xl bg-amber-950/80 border border-amber-700/80 py-3 px-1.5 sm:px-3"
                    >
                      <div className="text-xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                        {typeof unit.value === "number"
                          ? String(unit.value).padStart(2, "0")
                          : unit.value}
                      </div>
                      <div className="mt-1 text-[11px] sm:text-xs font-semibold uppercase text-amber-100/90 leading-snug">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Full Spiritual Description */}
            <div className="rounded-2xl bg-amber-50/80 p-5 sm:p-6 border border-amber-200 space-y-2">
              <h2 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                {t("About This Celebration", "ಉತ್ಸವದ ಮಹತ್ವ ಮತ್ತು ವಿವರ")}
              </h2>
              <p className="text-sm sm:text-base text-amber-800 leading-relaxed break-words">
                {t(event.fullDescription, event.fullDescriptionKn)}
              </p>
            </div>

            {/* Structured Programme Schedule Timeline */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-lg sm:text-xl font-bold text-amber-900 leading-snug">
                  {t("Programme Schedule", "ಪೂಜಾ ಕಾರ್ಯಕ್ರಮದ ವೇಳಾಪಟ್ಟಿ")}
                </h2>
              </div>

              {event.scheduleDisclaimer && event.scheduleDisclaimerKn && (
                <div className="flex items-start gap-2.5 rounded-xl bg-amber-100/80 border border-amber-300 px-4 py-3 text-xs sm:text-sm font-medium text-amber-900 leading-relaxed">
                  <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <span className="break-words">
                    {t(event.scheduleDisclaimer, event.scheduleDisclaimerKn)}
                  </span>
                </div>
              )}

              <ol className="relative border-l-2 border-amber-300 ml-3 space-y-5 pl-6">
                {event.schedule.map((item, idx) => (
                  <li key={`${event.slug}-step-${idx}`} className="relative">
                    <span
                      aria-hidden="true"
                      className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-600 border-2 border-white shadow-sm"
                    />
                    <div className="rounded-2xl bg-amber-50/70 border border-amber-200 p-4 space-y-1.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-900 text-amber-100 px-3 py-0.5 text-xs font-bold">
                        <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{t(item.time, item.timeKn)}</span>
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-amber-900 leading-snug break-words">
                        {t(item.title, item.titleKn)}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-800 leading-relaxed break-words">
                        {t(item.note, item.noteKn)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Bottom Offer Seva & WhatsApp Inquire CTAs */}
            <div className="pt-4 border-t border-amber-200 flex flex-col sm:flex-row gap-3">
              <Link
                href="/donate/seva"
                className="flex-1 inline-flex items-center justify-center gap-2 min-h-[48px] bg-amber-800 hover:bg-amber-900 text-white font-semibold rounded-xl px-6 py-3 text-sm sm:text-base shadow-sm hover:brightness-105 active:scale-[0.99] transition duration-200 text-center leading-snug"
              >
                <HeartHandshake className="w-5 h-5 shrink-0" />
                <span>{t(event.ctaLabel, event.ctaLabelKn)}</span>
              </Link>

              <a
                href="https://wa.me/919820790032"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-xl border-2 border-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-900 font-semibold px-5 py-3 text-sm sm:text-base active:scale-[0.99] transition duration-200 text-center leading-snug"
              >
                <SocialIcon platform="whatsapp" className="w-5 h-5 shrink-0" />
                <span>
                  {t("Inquire on WhatsApp", "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ವಿಚಾರಿಸಿ")}
                </span>
              </a>
            </div>
          </article>
        </div>
      </main>

      <Footer />
      <FloatingLanguageSwitcher />
    </div>
  );
}
