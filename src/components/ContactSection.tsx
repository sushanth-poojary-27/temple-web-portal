import {
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
  ShieldCheck,
} from "lucide-react";
import { siteData } from "@/data/siteData";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 py-16 sm:py-20 bg-amber-50 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <MapPin className="w-3.5 h-3.5 text-amber-600" />
            <span>Visit the Sannidhana</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            Location & Contact Details
          </h2>
          <p className="text-sm sm:text-base text-amber-800">
            Plan your visit to {siteData.trustName} or reach out to the trust
            office for seva and temple inquiries.
          </p>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Office Hours, and Action Buttons */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl bg-white p-6 sm:p-8 border border-amber-200 shadow-sm space-y-6">
            <div className="space-y-6">
              <div>
                <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800 border border-amber-200">
                  {siteData.registrationNo}
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold text-amber-900">
                  {siteData.trustName}
                </h3>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-amber-800">
                {/* Full Postal Address & Pincode */}
                <div className="flex items-start gap-3.5 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80">
                  <MapPin className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Temple Postal Address
                    </p>
                    <p className="font-semibold text-amber-900">
                      {siteData.fullAddress}
                    </p>
                    <p className="text-xs font-bold text-amber-700">
                      Pincode: {siteData.contact.pincode}
                    </p>
                  </div>
                </div>

                {/* Office & Darshan Hours */}
                <div className="flex items-start gap-3.5 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Temple & Office Hours
                    </p>
                    <p className="font-semibold text-amber-900">
                      Morning: {siteData.darshanTimings.morning}
                    </p>
                    <p className="font-semibold text-amber-900">
                      Evening: {siteData.darshanTimings.evening}
                    </p>
                  </div>
                </div>

                {/* Trust Administrator & Contact Info */}
                <div className="flex items-start gap-3.5 rounded-2xl bg-amber-50/80 p-4 border border-amber-200/80">
                  <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                      Trust Office Contact
                    </p>
                    <p className="font-bold text-amber-900">
                      {siteData.supervisor.name} ({siteData.supervisor.designation})
                    </p>
                    <p className="text-xs sm:text-sm flex items-center gap-2 text-amber-800">
                      <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{siteData.contact.phoneDisplay}</span>
                    </p>
                    <p className="text-xs sm:text-sm flex items-center gap-2 text-amber-800">
                      <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                      <a
                        href={siteData.contact.emailHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold text-amber-900 hover:text-amber-600 underline underline-offset-2 break-all transition-colors"
                      >
                        {siteData.contact.emailDisplay}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons: Email via Gmail & Google Maps Directions */}
            <div className="pt-4 border-t border-amber-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={siteData.contact.emailHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-amber-900 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>Email on Gmail</span>
              </a>

              <a
                href={siteData.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-amber-600 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-900 hover:bg-amber-600 hover:text-white transition-colors"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>

          {/* Right Column: Responsive Google Maps Embed */}
          <div className="lg:col-span-7 flex flex-col rounded-3xl overflow-hidden border-2 border-amber-600 bg-white shadow-md min-h-[380px] sm:min-h-[460px]">
            <div className="bg-amber-900 text-amber-50 px-5 py-3 flex items-center justify-between text-xs sm:text-sm font-semibold">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {siteData.shortName} • {siteData.contact.village} (
                  {siteData.contact.pincode})
                </span>
              </span>
              <a
                href={siteData.contact.googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-300 hover:text-white underline underline-offset-2"
              >
                Open in Maps ↗
              </a>
            </div>

            <div className="relative flex-1 w-full min-h-[340px]">
              <iframe
                title={`Google Maps location for ${siteData.trustName}`}
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
          </div>
        </div>
      </div>
    </section>
  );
}
