"use client";

import { useEffect, useRef, useState } from "react";
import { Share2, X } from "lucide-react";
import { siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
import SocialIcon from "@/components/SocialIcon";

/** Floating expandable social connect pill using native anchor tags for mobile app deep-linking. */
export default function FloatingSocialPill() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5 max-w-[calc(100vw-2.5rem)]"
    >
      {isOpen && (
        <div
          role="menu"
          aria-label={t(
            siteData.socialConnectLabels.sectionHeading,
            siteData.socialConnectLabels.sectionHeadingKn
          )}
          className="flex flex-col items-end gap-2 transition-all duration-200"
        >
          {siteData.socialLinks.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              onClick={() => setIsOpen(false)}
              className="inline-flex items-center gap-2.5 min-h-[44px] rounded-full border border-amber-300 bg-white/95 backdrop-blur-md px-4 py-2 text-sm font-semibold text-amber-900 shadow-md hover:border-amber-600 hover:bg-amber-50 hover:-translate-y-0.5 active:scale-[0.99] transition duration-200 leading-snug"
            >
              <SocialIcon platform={item.id} className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">
                {t(item.label, item.labelKn)}
              </span>
            </a>
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={t(
          siteData.socialConnectLabels.floatingLabel,
          siteData.socialConnectLabels.floatingLabelKn
        )}
        className="inline-flex items-center justify-center gap-2 min-h-[48px] rounded-full border-2 border-amber-400/80 bg-amber-900 px-4 sm:px-5 py-2.5 text-sm font-bold text-amber-50 shadow-lg hover:bg-amber-800 hover:brightness-105 active:scale-[0.98] transition duration-200 cursor-pointer leading-snug"
      >
        {isOpen ? (
          <X className="w-4 h-4 text-amber-300 shrink-0" />
        ) : (
          <Share2 className="w-4 h-4 text-amber-300 shrink-0" />
        )}
        <span>
          {t(
            siteData.socialConnectLabels.floatingLabel,
            siteData.socialConnectLabels.floatingLabelKn
          )}
        </span>
      </button>
    </div>
  );
}
