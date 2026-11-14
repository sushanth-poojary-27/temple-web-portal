import Link from "next/link";
import { ArrowRight, BookOpen, Flame, HeartHandshake } from "lucide-react";
import { sevaList, siteData } from "@/data/siteData";

export default function DonationSection() {
  return (
    <section
      id="donate"
      className="scroll-mt-24 py-16 sm:py-20 bg-amber-50 border-t border-amber-200 text-amber-900"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
            <span>Sacred Offerings & Support</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            Seva Booking & Temple Donations
          </h2>
          <p className="text-sm sm:text-base text-amber-800">
            Select an offering option below to book a sacred Seva or contribute
            towards the Education & General Trust Fund at {siteData.shortName}.
          </p>
        </div>

        {/* Two Side-by-Side Clickable Next.js <Link> Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Book a Seva -> /donate/seva */}
          <Link
            href="/donate/seva"
            className="group rounded-3xl bg-white p-6 sm:p-8 border-2 border-amber-300 hover:border-amber-600 hover:bg-amber-900 hover:text-amber-50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between gap-6 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-amber-500 transition-colors">
                <Flame className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-300">
                  Temple Rituals • {sevaList.length} Sevas
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 group-hover:text-white">
                  Book a Seva
                </h3>
                <p className="text-sm text-amber-800 group-hover:text-amber-100/90 leading-relaxed">
                  Book Alankara Pooja, Hunnime Pooja, Havina Pooja,
                  Kunkumarchane, and other daily sevas with Prasadam dispatch.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 group-hover:border-amber-800 flex items-center justify-between text-sm font-bold text-amber-600 group-hover:text-amber-300">
              <span>Proceed to Seva Booking</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Education & General Trust Fund -> /donate/education-trust */}
          <Link
            href="/donate/education-trust"
            className="group rounded-3xl bg-white p-6 sm:p-8 border-2 border-amber-300 hover:border-amber-600 hover:bg-amber-900 hover:text-amber-50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between gap-6 focus:outline-none focus:ring-2 focus:ring-amber-600"
          >
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:bg-amber-500 transition-colors">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-2">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-600 group-hover:text-amber-300">
                  Community Welfare
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-amber-900 group-hover:text-white">
                  Education & General Trust Fund
                </h3>
                <p className="text-sm text-amber-800 group-hover:text-amber-100/90 leading-relaxed">
                  Support student scholarships, educational aid, Annadana, and
                  ongoing temple development initiatives.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-amber-100 group-hover:border-amber-800 flex items-center justify-between text-sm font-bold text-amber-600 group-hover:text-amber-300">
              <span>Contribute to Trust Fund</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
