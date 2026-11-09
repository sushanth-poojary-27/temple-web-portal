import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { siteData } from "@/data/siteData";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-amber-50 text-amber-900">
      {/* Sticky Navigation Header */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Banner Section */}
        <Hero />

        {/* Layout Skeleton Section Anchors for Phase 2 & 3 */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
          <section
            id="about"
            className="scroll-mt-24 rounded-2xl bg-white p-6 sm:p-8 border border-amber-200 shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Upcoming Section • Task 5
            </span>
            <h2 className="mt-1 text-2xl font-bold text-amber-900">
              About {siteData.shortName} & Managing Committee
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              {siteData.placeholders.historyNote} ({siteData.committee.length}{" "}
              committee & clergy members loaded in{" "}
              <code className="rounded bg-amber-100 px-1.5 py-0.5 text-xs font-mono">
                siteData.ts
              </code>
              ).
            </p>
          </section>

          <section
            id="timings"
            className="scroll-mt-24 rounded-2xl bg-white p-6 sm:p-8 border border-amber-200 shadow-sm"
          >
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              Upcoming Section • Task 6
            </span>
            <h2 className="mt-1 text-2xl font-bold text-amber-900">
              Daily Darshan, Aarti & Seva Timings
            </h2>
            <p className="mt-2 text-sm text-amber-800">
              Morning Darshan: {siteData.darshanTimings.morning} | Evening
              Darshan: {siteData.darshanTimings.evening} (
              {siteData.aartiTimings.length} daily aarti schedules configured).
            </p>
          </section>
        </div>
      </main>

      {/* Temple Trust Footer */}
      <Footer />
    </div>
  );
}
