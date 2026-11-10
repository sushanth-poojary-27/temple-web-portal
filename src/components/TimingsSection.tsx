"use client";

import { useState } from "react";
import { Clock, Flame, Sun, Moon, Sparkles } from "lucide-react";
import { siteData } from "@/data/siteData";

type ActiveTab = "aarti" | "darshan";

export default function TimingsSection() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("aarti");

  return (
    <section
      id="timings"
      className="scroll-mt-24 py-16 sm:py-20 bg-white border-y border-amber-200 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Sacred Schedule</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            Daily Darshan, Aarti & Pooja Timings
          </h2>
          <p className="text-sm sm:text-base text-amber-800">
            View the daily worship and darshan hours at {siteData.shortName}.
          </p>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Temple Schedule Tabs"
            className="inline-flex rounded-full bg-amber-100 p-1.5 border border-amber-200 shadow-inner"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "aarti"}
              onClick={() => setActiveTab("aarti")}
              className={`flex items-center gap-2 rounded-full px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "aarti"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-amber-900 hover:text-amber-600"
              }`}
            >
              <Flame className="w-4 h-4" />
              <span>Aarti & Pooja Timings</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "darshan"}
              onClick={() => setActiveTab("darshan")}
              className={`flex items-center gap-2 rounded-full px-5 sm:px-7 py-2.5 text-xs sm:text-sm font-bold transition-all ${
                activeTab === "darshan"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "text-amber-900 hover:text-amber-600"
              }`}
            >
              <Sun className="w-4 h-4" />
              <span>Darshan Hours</span>
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
                className="flex flex-col justify-between rounded-2xl bg-amber-50 p-6 border border-amber-200 shadow-sm hover:border-amber-600 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-amber-600 text-white shadow-sm">
                      <Sparkles className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
                      Daily Ritual #{index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-amber-900">
                    {aarti.name}
                  </h3>

                  {aarti.description && (
                    <p className="text-sm text-amber-800">
                      {aarti.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-amber-200 flex items-center gap-2 text-amber-900 font-bold">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{aarti.time}</span>
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
            <div className="rounded-2xl bg-amber-50 p-6 sm:p-8 border border-amber-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Sun className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Morning Session
                </span>
                <h3 className="text-xl font-bold text-amber-900">
                  Morning Darshan
                </h3>
                <p className="text-lg font-bold text-amber-600">
                  {siteData.darshanTimings.morning}
                </p>
                <p className="text-xs sm:text-sm text-amber-800">
                  Includes Kakad Aarti and afternoon Maha Pooja & Naivedya.
                </p>
              </div>
            </div>

            {/* Evening Darshan Card */}
            <div className="rounded-2xl bg-amber-50 p-6 sm:p-8 border border-amber-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-900 text-amber-50 flex items-center justify-center shrink-0 shadow-sm">
                <Moon className="w-6 h-6" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                  Evening Session
                </span>
                <h3 className="text-xl font-bold text-amber-900">
                  Evening Darshan
                </h3>
                <p className="text-lg font-bold text-amber-600">
                  {siteData.darshanTimings.evening}
                </p>
                <p className="text-xs sm:text-sm text-amber-800">
                  Includes evening deeparadhana, Night Aarti, and Shej Aarti.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
