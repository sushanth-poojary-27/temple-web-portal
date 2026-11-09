import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Sparkles } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-amber-900 text-amber-50"
    >
      {/* Hero Banner Image Container */}
      <div className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px]">
        <Image
          src={siteData.assets.heroBanner}
          alt={`${siteData.trustName} Hero Banner`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Warm Temple Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-900/50 to-amber-950/30" />

        {/* Overlay Hero Content */}
        <div className="absolute inset-0 flex flex-col justify-end">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber-600/90 px-3.5 py-1 text-xs sm:text-sm font-semibold text-white shadow-sm backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{siteData.registrationNo} • Official Temple Portal</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-amber-50 drop-shadow-md">
                {siteData.trustName}
              </h1>

              <p className="flex items-center gap-2 text-sm sm:text-base md:text-lg text-amber-100/95 font-medium">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                <span>{siteData.fullAddress}</span>
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                <Link
                  href="#timings"
                  className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-amber-500 transition-colors"
                >
                  Daily Pooja & Timings
                </Link>
                <Link
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full border border-amber-200/80 bg-amber-950/60 backdrop-blur-sm px-6 py-3 text-sm sm:text-base font-semibold text-amber-50 hover:bg-amber-900/80 transition-colors"
                >
                  About the Trust & Committee
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Darshan & Aarti Strip below Banner */}
      <div className="bg-amber-900 border-t border-amber-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-3 bg-amber-950/50 rounded-xl p-3 border border-amber-800/60">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-amber-300 font-semibold">Morning Darshan</p>
                <p className="text-amber-50 font-medium">
                  {siteData.darshanTimings.morning}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-amber-950/50 rounded-xl p-3 border border-amber-800/60">
              <Clock className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-amber-300 font-semibold">Evening Darshan</p>
                <p className="text-amber-50 font-medium">
                  {siteData.darshanTimings.evening}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-amber-950/50 rounded-xl p-3 border border-amber-800/60">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-amber-300 font-semibold">Maha Pooja</p>
                <p className="text-amber-50 font-medium">
                  {siteData.aartiTimings[1]?.time ?? "12:30 PM - 1:30 PM"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
