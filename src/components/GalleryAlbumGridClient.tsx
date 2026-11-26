"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Home,
  Images,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import type { GalleryAlbumPageData } from "@/types/gallery";
import { useLanguage } from "@/context/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocialPill from "@/components/FloatingSocialPill";

interface GalleryAlbumGridClientProps {
  data: GalleryAlbumPageData;
}

export default function GalleryAlbumGridClient({
  data,
}: GalleryAlbumGridClientProps) {
  const {
    category,
    album,
    photos,
    nextAlbumRecommendation,
    nextCategoryRecommendation,
  } = data;
  const { t } = useLanguage();

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const lastTapTimeRef = useRef<number>(0);

  const activePhoto =
    activeIndex !== null && photos[activeIndex] ? photos[activeIndex] : null;

  const photoCountLabelEn =
    photos.length === 1 ? "1 Photo" : `${photos.length} Photos`;
  const photoCountLabelKn = `${photos.length} ಚಿತ್ರಗಳು`;

  const closeLightbox = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => {
      if (prev === null || photos.length === 0) return prev;
      return (prev - 1 + photos.length) % photos.length;
    });
  }, [photos.length]);

  const showNext = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => {
      if (prev === null || photos.length === 0) return prev;
      return (prev + 1) % photos.length;
    });
  }, [photos.length]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  // Lock body scroll & wire Escape / ArrowLeft / ArrowRight keys while lightbox is open
  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      } else if (event.key === "ArrowRight") {
        showNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, closeLightbox, showNext, showPrevious]);

  const handleStageTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (event.touches.length !== 1) return;
    const touch = event.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleStageTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    touchStartRef.current = null;
    if (!start || event.changedTouches.length !== 1) return;

    const touch = event.changedTouches[0];
    const dx = touch.clientX - start.x;
    const dy = touch.clientY - start.y;
    const absX = Math.abs(dx);
    const absY = Math.abs(dy);

    // Double-tap zoom toggle (only when minimal finger movement)
    if (absX < 15 && absY < 15) {
      const now = Date.now();
      if (now - lastTapTimeRef.current < 300) {
        lastTapTimeRef.current = 0;
        toggleZoom();
      } else {
        lastTapTimeRef.current = now;
      }
      return;
    }

    // Horizontal swipe navigation when unzoomed
    if (!isZoomed && absX >= 45 && absX > absY * 1.2) {
      if (dx < 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip flex flex-col bg-[#FAF7F2] text-[#2B1810]">
      <Header />

      <main className="flex-1 min-w-0 max-w-full py-6 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
          {/* Top Bar: 2-Button Escape Row (<- Category | Home) + Album Heading */}
          <div className="rounded-2xl bg-[#FDF8EE] border border-[#C59B27]/55 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/gallery/${category.slug}`}
                className="inline-flex items-center gap-2 min-h-[42px] rounded-full bg-[#FAF7F2] border border-[#C59B27]/70 px-4 py-2 text-xs sm:text-sm font-bold text-[#7A1C1C] hover:bg-[#F2E9D8] hover:border-[#7A1C1C]/70 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>{t(category.title, category.titleKn)}</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-1.5 min-h-[42px] rounded-full bg-[#FAF7F2] border border-[#C59B27]/70 px-4 py-2 text-xs sm:text-sm font-bold text-[#7A1C1C] hover:bg-[#F2E9D8] hover:border-[#7A1C1C]/70 transition-colors"
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>{t("Home", "ಮುಖಪುಟ")}</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[#7A1C1C] leading-snug">
                {t(
                  `${category.title} — ${album.title}`,
                  `${category.titleKn} — ${album.titleKn}`
                )}
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A1C1C] px-3 py-1 text-xs font-bold text-[#FFFDF7] border border-[#C59B27]/60">
                <Images className="w-3.5 h-3.5 text-[#F4D078]" />
                <span>{t(photoCountLabelEn, photoCountLabelKn)}</span>
              </span>
            </div>
          </div>

          {/* Responsive Photo Grid: 2 cols mobile, 3-4 cols desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
            {photos.map((photo, index) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => {
                  setIsZoomed(false);
                  setActiveIndex(index);
                }}
                aria-label={t(
                  `Open photo ${index + 1} of ${photos.length}: ${photo.alt}`,
                  `ಚಿತ್ರ ${index + 1}/${photos.length} ವೀಕ್ಷಿಸಿ: ${photo.altKn}`
                )}
                className="group relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#EFE6D4] border border-[#C59B27]/55 shadow-sm hover:shadow-lg hover:border-[#7A1C1C] hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7A1C1C] cursor-pointer text-left"
              >
                <img
                  src={photo.src}
                  alt={t(photo.alt, photo.altKn)}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1810]/55 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                <span className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-[#FAF7F2]/95 text-[#7A1C1C] border border-[#C59B27]/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm">
                  <ZoomIn className="w-4 h-4" />
                </span>
              </button>
            ))}
          </div>

          {/* Bottom Recommendation Buttons (replace history to prevent back-button loops) */}
          <div className="rounded-2xl bg-[#FDF8EE] border border-[#C59B27]/55 p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {nextAlbumRecommendation && (
              <Link
                href={nextAlbumRecommendation.href}
                replace
                className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-full bg-[#FAF7F2] hover:bg-[#F2E9D8] px-5 py-2.5 text-sm font-bold text-[#7A1C1C] border-2 border-[#C59B27]/70 hover:border-[#7A1C1C] transition-colors"
              >
                <span>
                  {t(
                    nextAlbumRecommendation.label,
                    nextAlbumRecommendation.labelKn
                  )}
                </span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </Link>
            )}

            <Link
              href={nextCategoryRecommendation.href}
              replace
              className="inline-flex items-center justify-center gap-2 min-h-[46px] rounded-full bg-[#7A1C1C] hover:bg-[#5E1414] px-5 py-2.5 text-sm font-bold text-[#FFFDF7] border border-[#C59B27]/70 shadow-sm transition-colors sm:ml-auto"
            >
              <span>
                {t(
                  nextCategoryRecommendation.label,
                  nextCategoryRecommendation.labelKn
                )}
              </span>
              <ArrowRight className="w-4 h-4 shrink-0" />
            </Link>
          </div>
        </div>
      </main>

      {/* Full-Screen Lightbox Viewer */}
      {activePhoto && activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t(activePhoto.alt, activePhoto.altKn)}
          onClick={closeLightbox}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#1A0808]/95 backdrop-blur-md p-3 sm:p-6"
        >
          {/* Top Bar: Title + Counter + Zoom Toggle + Close */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full mx-auto flex items-center justify-between gap-2 text-[#FAF7F2]"
          >
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className="inline-flex items-center rounded-full bg-[#7A1C1C] border border-[#C59B27]/70 px-3 py-1 text-xs sm:text-sm font-bold text-[#FFFDF7] truncate">
                {t(
                  `${category.title} — ${album.title}`,
                  `${category.titleKn} — ${album.titleKn}`
                )}
              </span>
              <span className="inline-flex items-center rounded-full bg-white/10 border border-[#C59B27]/40 px-3 py-1 text-xs sm:text-sm font-bold text-[#F4D078] tabular-nums">
                {activeIndex + 1} / {photos.length}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={toggleZoom}
                aria-label={
                  isZoomed
                    ? t("Reset zoom", "ಜೂಮ್ ಮರುಹೊಂದಿಸಿ")
                    : t("Zoom in photo", "ಚಿತ್ರ ದೊಡ್ಡದಾಗಿಸಿ")
                }
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#7A1C1C] text-[#FFFDF7] border border-[#C59B27]/70 hover:bg-[#962626] transition-colors cursor-pointer"
              >
                {isZoomed ? (
                  <ZoomOut className="w-5 h-5" />
                ) : (
                  <ZoomIn className="w-5 h-5" />
                )}
              </button>

              <button
                type="button"
                onClick={closeLightbox}
                aria-label={t("Close lightbox (Esc)", "ಮುಚ್ಚಿ (Esc)")}
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full bg-[#7A1C1C] text-[#FFFDF7] border border-[#C59B27]/70 hover:bg-[#962626] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Center Image Stage with Prev/Next Arrows + Swipe + Double-Tap Zoom */}
          <div
            onTouchStart={handleStageTouchStart}
            onTouchEnd={handleStageTouchEnd}
            className="relative flex-1 min-h-0 max-w-6xl w-full mx-auto flex items-center justify-center my-2 sm:my-4"
          >
            {photos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showPrevious();
                }}
                aria-label={t("Previous photo", "ಹಿಂದಿನ ಚಿತ್ರ")}
                className="absolute left-1 sm:left-3 z-20 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#7A1C1C]/90 text-[#FFFDF7] border border-[#C59B27]/70 hover:bg-[#962626] shadow-lg transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div
              onClick={(e) => e.stopPropagation()}
              onDoubleClick={toggleZoom}
              className={`w-[92vw] h-[72vh] md:w-[85vw] md:h-[80vh] flex items-center justify-center ${
                isZoomed ? "overflow-auto" : "overflow-hidden"
              }`}
            >
              <img
                src={activePhoto.src}
                alt={t(activePhoto.alt, activePhoto.altKn)}
                className={`w-full h-full object-contain select-none transition-transform duration-200 ${
                  isZoomed
                    ? "scale-150 md:scale-[1.85] cursor-zoom-out"
                    : "scale-100 cursor-zoom-in"
                }`}
              />
            </div>

            {photos.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                aria-label={t("Next photo", "ಮುಂದಿನ ಚಿತ್ರ")}
                className="absolute right-1 sm:right-3 z-20 inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#7A1C1C]/90 text-[#FFFDF7] border border-[#C59B27]/70 hover:bg-[#962626] shadow-lg transition-colors cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Hints */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-2 text-xs text-[#F4D078]/90 border-t border-[#C59B27]/30 pt-2.5"
          >
            <p className="truncate font-medium text-[#FAF7F2]">
              {t(activePhoto.alt, activePhoto.altKn)}
            </p>
            <p className="hidden sm:block">
              {t(
                "Double-click to zoom • ← / → arrows • Esc to close",
                "ಜೂಮ್ ಮಾಡಲು ಡಬಲ್-ಕ್ಲಿಕ್ ಮಾಡಿ • ← / → ಕೀಗಳು • Esc ಮುಚ್ಚಲು"
              )}
            </p>
            <p className="sm:hidden">
              {t(
                "Swipe left/right • Double-tap to zoom",
                "ಬದಲಿಸಲು ಸ್ವೈಪ್ ಮಾಡಿ • ಜೂಮ್ ಮಾಡಲು ಡಬಲ್-ಟ್ಯಾಪ್ ಮಾಡಿ"
              )}
            </p>
          </div>
        </div>
      )}

      <Footer />
      <FloatingSocialPill />
    </div>
  );
}
