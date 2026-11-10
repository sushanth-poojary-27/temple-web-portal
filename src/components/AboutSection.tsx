import Image from "next/image";
import { Landmark, MapPin, ShieldCheck, Users } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 py-16 sm:py-20 bg-amber-50 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Temple Overview & History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-white rounded-3xl p-6 sm:p-10 border border-amber-200 shadow-sm">
          {/* Temple Sanctum Image */}
          <div className="lg:col-span-5 relative h-72 sm:h-80 lg:h-96 w-full rounded-2xl overflow-hidden border-2 border-amber-600/30 shadow-md bg-amber-100">
            <Image
              src="/assets/gallery/devi-1.webp"
              alt={siteData.trustName}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-center"
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-amber-950/90 via-amber-950/50 to-transparent p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                {siteData.registrationNo}
              </p>
              <p className="text-sm font-bold text-amber-50">
                {siteData.shortName}, {siteData.address}
              </p>
            </div>
          </div>

          {/* About & History Content */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
              <Landmark className="w-3.5 h-3.5 text-amber-600" />
              <span>About the Temple & Trust</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900 leading-tight">
              {siteData.trustName}
            </h2>

            <p className="flex items-start gap-2 text-sm sm:text-base text-amber-800 font-medium">
              <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <span>{siteData.fullAddress}</span>
            </p>

            {/* History Box (uses official text or placeholder from siteData) */}
            <div className="rounded-2xl bg-amber-50/80 p-5 border border-amber-200 space-y-2">
              <h3 className="text-sm font-bold uppercase tracking-wider text-amber-900">
                Sacred Heritage & History
              </h3>
              <p className="text-sm sm:text-base text-amber-800 leading-relaxed">
                {siteData.placeholders.historyNote}
              </p>
            </div>

            {/* Trust Administration Summary */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80">
                <ShieldCheck className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 uppercase">
                    Registration
                  </p>
                  <p className="text-sm font-bold text-amber-900">
                    {siteData.registrationNo}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-amber-50 p-3.5 border border-amber-200/80">
                <Users className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-amber-700 uppercase">
                    Trust Administration
                  </p>
                  <p className="text-sm font-bold text-amber-900">
                    {siteData.supervisor.name} ({siteData.supervisor.designation})
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Managing Committee & Temple Clergy */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
              <Users className="w-3.5 h-3.5 text-amber-600" />
              <span>Trust Management & Clergy</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-900">
              Managing Committee & Temple Priests
            </h3>
            <p className="text-sm sm:text-base text-amber-800">
              Dedicated office bearers and temple priests serving{" "}
              {siteData.shortName}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {siteData.committee.map((member) => (
              <div
                key={member.id}
                className="group flex items-center gap-4 rounded-2xl bg-white p-5 border border-amber-200 shadow-sm hover:border-amber-600 hover:shadow-md transition-all"
              >
                {/* Member Photo or Initials Avatar */}
                <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-amber-600 bg-amber-100 shrink-0">
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="80px"
                      className="object-cover object-top"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-lg font-bold text-amber-900">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Member Details */}
                <div className="min-w-0 flex-1 space-y-1">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      member.category === "clergy"
                        ? "bg-amber-900 text-amber-50"
                        : "bg-amber-100 text-amber-900 border border-amber-300"
                    }`}
                  >
                    {member.role}
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-amber-900 truncate">
                    {member.name}
                  </h4>
                  <p className="text-xs text-amber-700 font-medium capitalize">
                    {member.category === "clergy"
                      ? "Temple Clergy"
                      : "Managing Committee"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
