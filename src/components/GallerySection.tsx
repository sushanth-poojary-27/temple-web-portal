"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Camera, X, ZoomIn } from "lucide-react";
import { siteData, type GalleryItem } from "@/data/siteData";

export default function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  // Close lightbox on Escape key press
  useEffect(() => {
    if (!selectedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage]);

  return (
    <section
      id="gallery"
      className="scroll-mt-24 py-16 sm:py-20 bg-white border-y border-amber-200 text-amber-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Camera className="w-3.5 h-3.5 text-amber-600" />
            <span>Sacred Moments</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            Temple Photo Gallery
          </h2>
          <p className="text-sm sm:text-base text-amber-800">
            Glimpses of Goddess Alankara, Varshik Pooja, Sharannavaratri, and
            community Annaprasada at {siteData.shortName}.
          </p>
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {siteData.gallery.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedImage(item)}
              aria-label={`View enlarged image: ${item.alt}`}
              className="group relative h-64 w-full rounded-2xl overflow-hidden bg-amber-100 border border-amber-200 shadow-sm hover:-translate-y-1 hover:shadow-lg hover:border-amber-600 transition-all duration-300 text-left focus:outline-none focus:ring-2 focus:ring-amber-600"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />

              {/* Hover Gradient & Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/90 via-amber-950/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block rounded-full bg-amber-600/90 px-2.5 py-0.5 text-[11px] font-bold text-white">
                    {item.category}
                  </span>
                  <span className="w-7 h-7 rounded-full bg-white/90 text-amber-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-semibold text-amber-50 line-clamp-2">
                  {item.alt}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={selectedImage.alt}
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-amber-950/85 backdrop-blur-md p-4 sm:p-6"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full rounded-3xl bg-amber-950 border-2 border-amber-600 overflow-hidden shadow-2xl"
          >
            {/* Close (X) Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              aria-label="Close enlarged image"
              className="absolute top-4 right-4 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-amber-900/90 text-amber-50 hover:bg-amber-600 border border-amber-500 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Enlarged Image */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] bg-black/40">
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                sizes="90vw"
                className="object-contain p-2 sm:p-4"
                priority
              />
            </div>

            {/* Modal Footer Caption */}
            <div className="p-4 sm:p-5 bg-amber-900 text-amber-50 flex flex-wrap items-center justify-between gap-2 border-t border-amber-700">
              <div>
                <span className="inline-block rounded-full bg-amber-600 px-2.5 py-0.5 text-xs font-bold text-white mb-1">
                  {selectedImage.category}
                </span>
                <p className="text-sm sm:text-base font-bold text-white">
                  {selectedImage.alt}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="rounded-full bg-amber-800 hover:bg-amber-700 px-4 py-1.5 text-xs font-semibold text-amber-100 border border-amber-600 transition-colors"
              >
                Close (Esc)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
