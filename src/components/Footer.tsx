"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, ShieldCheck } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-amber-900 text-amber-50 border-t-4 border-amber-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Trust Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500 bg-white shrink-0">
                <Image
                  src={siteData.assets.logo}
                  alt={`${siteData.trustName} Logo`}
                  fill
                  sizes="48px"
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <h2 className="text-base font-bold text-white leading-snug">
                  {siteData.shortName}
                </h2>
                <p className="text-xs text-amber-300 font-medium">
                  {siteData.registrationNo}
                </p>
              </div>
            </div>
            <p className="text-sm text-amber-100/90 leading-relaxed">
              {siteData.trustName} is a registered religious trust dedicated to
              preserving sacred traditions, daily sevas, and community welfare at
              Ullur, Karnataka.
            </p>
          </div>

          {/* Column 2: Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {siteData.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-amber-100 hover:text-amber-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Daily Darshan & Aarti Timings */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Daily Timings
            </h3>
            <div className="space-y-2 text-sm text-amber-100">
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Morning:</strong>{" "}
                  {siteData.darshanTimings.morning}
                </span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Evening:</strong>{" "}
                  {siteData.darshanTimings.evening}
                </span>
              </p>
              <div className="pt-2 border-t border-amber-800 space-y-1 text-xs text-amber-200">
                {siteData.aartiTimings.map((aarti) => (
                  <p key={aarti.id}>
                    <span className="font-semibold text-amber-50">
                      {aarti.name}:
                    </span>{" "}
                    {aarti.time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Column 4: Address & Trust Contact Info */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300">
              Trust Address & Contact
            </h3>
            <div className="space-y-2.5 text-sm text-amber-100">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>{siteData.fullAddress}</span>
              </p>
              <p className="flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <span>
                  {siteData.supervisor.name} ({siteData.supervisor.designation})
                </span>
              </p>
              <p className="flex items-start gap-2.5 text-xs text-amber-200">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{siteData.placeholders.contactPhone}</span>
              </p>
              <p className="flex items-start gap-2.5 text-xs text-amber-200">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{siteData.placeholders.contactEmail}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-10 pt-6 border-t border-amber-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-amber-200">
          <p>
            © {currentYear} {siteData.trustName}. All rights reserved.
          </p>
          <p>Official Temple Trust Web Portal • {siteData.address}</p>
        </div>
      </div>
    </footer>
  );
}