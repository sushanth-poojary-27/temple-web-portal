"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Calendar, Clock, Sparkles } from "lucide-react";
import { siteData, type FestivalItem } from "@/data/siteData";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export default function EventsSection() {
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem>(
    siteData.festivals[0]
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  // On mount, select the nearest upcoming festival inside useEffect
  useEffect(() => {
    const now = Date.now();
    const upcoming = [...siteData.festivals]
      .filter((f) => new Date(f.isoDate).getTime() > now)
      .sort(
        (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime()
      );
    if (upcoming[0]) {
      setSelectedFestival(upcoming[0]);
    }
  }, []);

  // Update the countdown every second inside useEffect
  useEffect(() => {
    const updateTimer = () => {
      const diff = new Date(selectedFestival.isoDate).getTime() - Date.now();
      if (Number.isNaN(diff) || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        isPast: false,
      });
    };

    updateTimer();
    const timerId = window.setInterval(updateTimer, 1000);
    return () => window.clearInterval(timerId);
  }, [selectedFestival]);

  return (
    <section
      id="events"
      className="scroll-mt-24 py-16 sm:py-20 bg-amber-50 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Calendar className="w-3.5 h-3.5 text-amber-600" />
            <span>Annual Utsavas & Sevas</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            Upcoming Temple Festivals & Events
          </h2>
          <p className="text-sm sm:text-base text-amber-800">
            Sacred annual celebrations and monthly festivals observed at{" "}
            {siteData.shortName}.
          </p>
        </div>

        {/* Interactive Countdown Banner for Next / Selected Festival */}
        <div className="rounded-3xl bg-amber-900 text-amber-50 p-6 sm:p-8 lg:p-10 shadow-md border-2 border-amber-600">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-white">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upcoming Event Countdown • {selectedFestival.badge}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {selectedFestival.name}
              </h3>
              <p className="text-xs sm:text-sm text-amber-200 flex items-center gap-2 font-medium">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{selectedFestival.dateLabel}</span>
              </p>
              <p className="text-sm text-amber-100/90 leading-relaxed">
                {selectedFestival.description}
              </p>
            </div>

            {/* Live Countdown Boxes */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                {[
                  { label: "Days", value: timeLeft ? timeLeft.days : "--" },
                  { label: "Hours", value: timeLeft ? timeLeft.hours : "--" },
                  {
                    label: "Minutes",
                    value: timeLeft ? timeLeft.minutes : "--",
                  },
                  {
                    label: "Seconds",
                    value: timeLeft ? timeLeft.seconds : "--",
                  },
                ].map((unit) => (
                  <div
                    key={unit.label}
                    className="rounded-2xl bg-amber-950/80 border border-amber-700/80 p-3 sm:p-4 shadow-inner"
                  >
                    <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
                      {typeof unit.value === "number"
                        ? String(unit.value).padStart(2, "0")
                        : unit.value}
                    </div>
                    <div className="mt-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-100">
                      {unit.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-center text-xs text-amber-200/90 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>
                  Click any festival card below to view its countdown timer
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {siteData.festivals.map((festival) => {
            const isSelected = festival.id === selectedFestival.id;
            return (
              <div
                key={festival.id}
                onClick={() => setSelectedFestival(festival)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedFestival(festival);
                  }
                }}
                className={`group cursor-pointer rounded-2xl bg-white overflow-hidden border transition-all flex flex-col justify-between ${
                  isSelected
                    ? "border-amber-600 ring-2 ring-amber-600/30 shadow-md"
                    : "border-amber-200 shadow-sm hover:border-amber-600 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Festival Card Image */}
                  <div className="relative h-52 w-full overflow-hidden bg-amber-100">
                    <Image
                      src={festival.image}
                      alt={festival.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-900/90 backdrop-blur-sm px-3 py-1 text-xs font-bold text-amber-50 shadow-sm">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {festival.badge}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{festival.dateLabel}</span>
                    </div>

                    <h3 className="text-xl font-bold text-amber-900 group-hover:text-amber-600 transition-colors">
                      {festival.name}
                    </h3>

                    <p className="text-sm text-amber-800 leading-relaxed">
                      {festival.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-5 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-bold">
                  <span
                    className={
                      isSelected ? "text-amber-600" : "text-amber-800"
                    }
                  >
                    {isSelected
                      ? "Showing in Countdown Above"
                      : "Select for Countdown"}
                  </span>
                  <span className="text-amber-600 group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
