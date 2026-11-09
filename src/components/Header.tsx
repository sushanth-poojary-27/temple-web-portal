"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Clock } from "lucide-react";
import { siteData } from "@/data/siteData";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-amber-50/95 backdrop-blur-md border-b border-amber-200 shadow-sm">
      {/* Top announcement bar with darshan timings */}
      <div className="bg-amber-900 text-amber-50 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span className="font-medium tracking-wide">
            {siteData.registrationNo} • {siteData.address}
          </span>
          <div className="flex items-center gap-1.5 text-amber-100">
            <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Darshan: Morning {siteData.darshanTimings.morning} | Evening{" "}
              {siteData.darshanTimings.evening}
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo & Trust Name */}
          <Link
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-amber-600 bg-white shrink-0 shadow-sm">
              <Image
                src={siteData.assets.logo}
                alt={`${siteData.trustName} Logo`}
                fill
                sizes="56px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-lg md:text-xl font-bold text-amber-900 leading-tight group-hover:text-amber-600 transition-colors">
                {siteData.shortName}
              </span>
              <span className="text-xs sm:text-sm text-amber-800 font-medium">
                Ullur, Karnataka ({siteData.registrationNo})
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-6"
          >
            {siteData.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-amber-900 hover:text-amber-600 transition-colors py-2"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#timings"
              className="inline-flex items-center justify-center rounded-full bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 transition-colors"
            >
              Aarti & Timings
            </Link>
          </nav>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-lg text-amber-900 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="lg:hidden bg-amber-50 border-t border-amber-200 px-4 pt-3 pb-6 space-y-2 shadow-lg"
        >
          {siteData.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-base font-semibold text-amber-900 hover:bg-amber-100 hover:text-amber-600 transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="#timings"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-full bg-amber-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-900 transition-colors"
            >
              View Aarti & Darshan Timings
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
