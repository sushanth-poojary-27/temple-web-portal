"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  Eye,
  FileWarning,
  Languages,
  Mail,
  X,
} from "lucide-react";
import { sevaList, siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
import {
  amountToKannadaWords,
  createReceiptPdf,
  formatAmountInWords,
  generateKannadaReceiptPdf,
  getCleanSevaName,
  getReceiptFileName,
  IS_TEST_MODE,
  resolveReceiptType,
  type ReceiptData,
} from "@/utils/generateReceipt";

function translateSevaNameKn(sevaName: string): string {
  const matched = sevaList.find(
    (s) => s.name.toLowerCase() === sevaName.toLowerCase()
  );
  return matched ? matched.nameKn : sevaName;
}

function translatePurposeKn(purpose: string): string {
  if (purpose === "Education & General Trust Fund") {
    return "ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಾಮಾನ್ಯ ಟ್ರಸ್ಟ್ ನಿಧಿ";
  }
  if (purpose.startsWith("Seva Booking:")) {
    const rawName = purpose.replace("Seva Booking:", "").trim();
    return `ಪೂಜಾ ಸೇವಾ ನೋಂದಣಿ: ${translateSevaNameKn(rawName)}`;
  }
  return purpose;
}

interface FullReceiptSlipProps {
  receipt: ReceiptData;
  language: "en" | "kn";
  t: (en: string, kn: string) => string;
}

function FullReceiptSlip({ receipt, language, t }: FullReceiptSlipProps) {
  const receiptType = resolveReceiptType(receipt);
  const isSeva = receiptType === "seva";
  const sevaNameEn = getCleanSevaName(receipt);
  const sevaNameKn = translateSevaNameKn(sevaNameEn);
  const formattedAmount = Number(receipt.amount).toLocaleString("en-IN");
  const paymentMode =
    receipt.paymentMode ||
    (IS_TEST_MODE ? "Online (Razorpay Test)" : "Online (Razorpay)");
  const amountInWords =
    language === "kn"
      ? amountToKannadaWords(receipt.amount)
      : formatAmountInWords(receipt.amount);

  return (
    <div className="bg-[#FFFDF7] border-[3px] border-[#7A1C1C] p-1.5">
      <div className="relative border border-[#C59B27] bg-[#FFFDF7] overflow-hidden">
        {IS_TEST_MODE && (
          <>
            <div className="bg-red-700 text-white text-center py-1.5 px-3 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
              {t(
                "DEMO / TEST — NOT A VALID RECEIPT",
                "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ"
              )}
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <span className="-rotate-24 text-2xl sm:text-3xl font-serif font-bold uppercase tracking-widest text-[#7A1C1C]/[0.07] whitespace-nowrap">
                {t(
                  "DEMO / TEST — NOT FOR LEGAL USE",
                  "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ"
                )}
              </span>
            </div>
          </>
        )}

        <div className="relative z-10 px-4 sm:px-7 py-5 sm:py-6 space-y-4 font-serif text-[#2B1810]">
          {/* Header */}
          <div className="text-center space-y-1.5 border-b-2 border-[#C59B27] pb-4">
            <div className="relative w-14 h-14 mx-auto">
              <Image
                src="/trust-logo.png"
                alt={t(
                  "Shree Durgaparameshwari Sannidhana Emblem",
                  "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಲಾಂಛನ"
                )}
                fill
                sizes="56px"
                className="object-contain"
                priority
              />
            </div>

            <p className="text-xs font-bold uppercase tracking-widest text-[#7A1C1C] underline underline-offset-4 decoration-[#C59B27]">
              {t("SEVA & DONATION RECEIPT", "ಸೇವೆ ಮತ್ತು ದೇಣಿಗೆ ರಸೀದಿ")}
            </p>

            <h2 className="text-base sm:text-lg font-bold text-[#7A1C1C] tracking-wide uppercase leading-snug">
              {isSeva
                ? t(
                    "SHREE DURGAPARAMESHWARI SANNIDHANA, ULLUR",
                    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ, ಉಳ್ಳೂರು"
                  )
                : t(
                    "SHREE DURGA PARAMESHWARI SANNIDHANA TRUST",
                    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಟ್ರಸ್ಟ್"
                  )}
            </h2>

            <p className="text-xs text-[#4A2511] leading-relaxed">
              {t(
                "Post Kemundel, Ulluru Village, Yellur, Udupi Dist., Karnataka - 574119",
                "ಪೋಸ್ಟ್ ಕೆಮುಂಡೇಲ್, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಎಲ್ಲೂರು, ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ - 574119"
              )}
            </p>
          </div>

          {/* Metadata Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs sm:text-sm font-bold text-[#7A1C1C]">
            <p>
              {t("Receipt No.:", "ರಸೀದಿ ಸಂಖ್ಯೆ:")}{" "}
              <span className="font-mono text-[#2B1810]">
                {receipt.receiptNo}
              </span>
            </p>
            <p>
              {t("Date & Time:", "ದಿನಾಂಕ ಮತ್ತು ಸಮಯ:")}{" "}
              <span className="font-normal text-[#2B1810]">
                {receipt.dateTime}
              </span>
            </p>
          </div>

          {/* Structured 2-Column Bordered Table (Fits Mobile & Desktop With Zero Clipping) */}
          <table className="w-full table-fixed border-collapse border border-[#7A1C1C] text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#F6EEDC] text-[#7A1C1C]">
                <th className="w-[68%] border border-[#7A1C1C] py-2 px-3 text-left font-bold">
                  {t(
                    "Particulars / Seva Details",
                    "ವಿವರಗಳು / ಸೇವಾ ಮಾಹಿತಿ"
                  )}
                </th>
                <th className="w-[32%] border border-[#7A1C1C] py-2 px-3 text-right font-bold">
                  {t("Amount (₹)", "ಮೊತ್ತ (₹)")}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-[#7A1C1C] py-2.5 px-3 font-semibold text-[#2B1810] break-words">
                  {isSeva
                    ? `${t(sevaNameEn, sevaNameKn)} (${t("Seva Date", "ದಿನಾಂಕ")}: ${receipt.sevaDate})`
                    : t(receipt.purpose, translatePurposeKn(receipt.purpose))}
                </td>
                <td className="border border-[#7A1C1C] py-2.5 px-3 text-right font-bold text-[#2B1810]">
                  ₹ {formattedAmount}/-
                </td>
              </tr>
              <tr className="bg-[#F6EEDC] font-bold text-[#7A1C1C]">
                <td className="border border-[#7A1C1C] py-2 px-3">
                  {t("Total Contribution", "ಒಟ್ಟು ಸಮರ್ಪಣೆ")}
                </td>
                <td className="border border-[#7A1C1C] py-2 px-3 text-right">
                  ₹ {formattedAmount}/-
                </td>
              </tr>
            </tbody>
          </table>

          {/* Formal Lines */}
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex flex-wrap items-baseline gap-1.5 border-b border-[#C59B27]/60 pb-1">
              <span className="font-bold text-[#7A1C1C]">
                {t("Received with thanks from:", "ಕೃತಜ್ಞತಾಪೂರ್ವಕವಾಗಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ:")}
              </span>
              <span className="font-semibold text-[#2B1810] break-words">
                {receipt.donorName}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5 border-b border-[#C59B27]/60 pb-1">
              <span className="font-bold text-[#7A1C1C]">
                {t("Amount in words:", "ಮೊತ್ತ ಅಕ್ಷರಗಳಲ್ಲಿ:")}
              </span>
              <span className="italic font-semibold text-[#2B1810] break-words">
                {amountInWords}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5 border-b border-[#C59B27]/60 pb-1">
              <span className="font-bold text-[#7A1C1C]">
                {t("Payment Mode & Ref:", "ಪಾವತಿ ವಿಧಾನ ಮತ್ತು ಉಲ್ಲೇಖ:")}
              </span>
              <span className="font-mono text-xs text-[#2B1810] break-all">
                {paymentMode} • {receipt.paymentId}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5 border-b border-[#C59B27]/60 pb-1">
              <span className="font-bold text-[#7A1C1C]">
                {t("Contact:", "ಸಂಪರ್ಕ:")}
              </span>
              <span className="text-xs text-[#2B1810] break-all">
                {receipt.mobile} | {receipt.email}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-1.5 border-b border-[#C59B27]/60 pb-1">
              <span className="font-bold text-[#7A1C1C]">
                {t("Address:", "ವಿಳಾಸ:")}
              </span>
              <span className="text-xs text-[#2B1810] break-words">
                {receipt.address}
              </span>
            </div>
          </div>

          {/* Clean Centered Computer-Generated Footer (No Signature or Stamp) */}
          <p className="pt-2 text-center text-xs italic text-[#5C3317]">
            {t(
              "Computer-generated acknowledgement • Signature not required",
              "ಕಂಪ್ಯೂಟರ್‌ನಿಂದ ರಚಿಸಲಾದ ಸ್ವೀಕೃತಿ • ಸಹಿಯ ಅಗತ್ಯವಿಲ್ಲ"
            )}
          </p>
        </div>

        {IS_TEST_MODE && (
          <div className="bg-red-700 text-white text-center py-1.5 px-3 text-[11px] sm:text-xs font-bold tracking-wider uppercase">
            {t(
              "DEMO / TEST — NOT A VALID RECEIPT",
              "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ"
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ReceiptPage() {
  const { language, toggleLanguage, t } = useLanguage();
  const receiptRef = useRef<HTMLDivElement>(null);
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [shareNote, setShareNote] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("latest_receipt");
      if (raw) {
        setReceipt(JSON.parse(raw) as ReceiptData);
      }
    } catch {
      setReceipt(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isPreviewOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isPreviewOpen]);

  if (!isLoaded) {
    return (
      <div className="min-h-[100dvh] w-full max-w-full overflow-x-clip bg-[#F5EFE6] text-[#7A1C1C] flex items-center justify-center p-6">
        <p className="text-sm font-bold animate-pulse">
          {t("Loading confirmation...", "ದೃಢೀಕರಣ ಲೋಡ್ ಆಗುತ್ತಿದೆ...")}
        </p>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-[100dvh] w-full max-w-full overflow-x-clip bg-[#F5EFE6] text-[#2B1810] flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full rounded-3xl bg-[#FDF8EE] p-6 sm:p-8 border-2 border-[#C59B27]/60 shadow-md text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-amber-100 text-[#7A1C1C] flex items-center justify-center mx-auto border border-[#C59B27]">
            <FileWarning className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-serif font-bold text-[#7A1C1C]">
            {t("No Recent Receipt Found", "ಯಾವುದೇ ಇತ್ತೀಚಿನ ರಸೀದಿ ಕಂಡುಬಂದಿಲ್ಲ")}
          </h1>
          <p className="text-sm text-[#4A2511] leading-relaxed">
            {t(
              "We could not find an active Seva or Donation receipt in your current session. Please complete a booking or contribution first.",
              "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಅವಧಿಯಲ್ಲಿ ಯಾವುದೇ ಸಕ್ರಿಯ ಸೇವೆ ಅಥವಾ ದೇಣಿಗೆ ರಸೀದಿ ಕಂಡುಬಂದಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೊದಲು ಸೇವಾ ನೋಂದಣಿ ಅಥವಾ ದೇಣಿಗೆಯನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ."
            )}
          </p>
          <div className="pt-1 flex flex-col sm:flex-row gap-2.5">
            <Link
              href="/donate/seva"
              className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-xl bg-[#7A1C1C] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#5E1414] transition-colors"
            >
              {t("Book a Seva", "ಸೇವೆ ಕಾಯ್ದಿರಿಸಿ")}
            </Link>
            <Link
              href="/"
              className="flex-1 min-h-[44px] inline-flex items-center justify-center rounded-xl border border-[#7A1C1C] bg-[#FAF7F2] px-5 py-2.5 text-sm font-bold text-[#7A1C1C] hover:bg-[#F2E9D8] transition-colors"
            >
              {t("Back to Home", "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const receiptType = resolveReceiptType(receipt);
  const isSeva = receiptType === "seva";
  const sevaNameEn = getCleanSevaName(receipt);
  const sevaNameKn = translateSevaNameKn(sevaNameEn);
  const formattedAmount = Number(receipt.amount).toLocaleString("en-IN");
  const pdfFileName = getReceiptFileName(receipt);

  const entityHeaderTitle = isSeva
    ? t(
        "SHREE DURGAPARAMESHWARI SANNIDHANA, ULLUR",
        "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ, ಉಳ್ಳೂರು"
      )
    : t(
        "SHREE DURGA PARAMESHWARI SANNIDHANA TRUST",
        "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಟ್ರಸ್ಟ್"
      );

  const confirmationTitle = isSeva
    ? t(
        "Your Seva Booking is Confirmed!",
        "ನಿಮ್ಮ ಸೇವಾ ನೋಂದಣಿ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ!"
      )
    : t("Thank You for Your Donation!", "ನಿಮ್ಮ ಉದಾರ ದೇಣಿಗೆಗಾಗಿ ಧನ್ಯವಾದಗಳು!");

  const confirmationMessage = isSeva
    ? t(
        `Namaskara ${receipt.donorName}, your sankalpa for ${sevaNameEn} on ${receipt.sevaDate} has been recorded at Shree Durgaparameshwari Sannidhana, Ullur. May Goddess Durgaparameshwari bless you and your family.`,
        `ನಮಸ್ಕಾರ ${receipt.donorName}, ದಿನಾಂಕ ${receipt.sevaDate} ರಂದು ನಡೆಯಲಿರುವ ${sevaNameKn} ಸೇವೆಗಾಗಿ ನಿಮ್ಮ ಸಂಕಲ್ಪವು ಉಳ್ಳೂರಿನ ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನದಲ್ಲಿ ದಾಖಲಾಗಿದೆ. ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಅಮ್ಮನವರು ನಿಮಗೂ ನಿಮ್ಮ ಕುಟುಂಬಕ್ಕೂ ಶುಭವನ್ನು ಅನುಗ್ರಹಿಸಲಿ.`
      )
    : t(
        `Namaskara ${receipt.donorName}, your generous contribution of ₹ ${formattedAmount} to Shree Durga Parameshwari Sannidhana Trust has been gracefully accepted. Your support helps needy students, educational initiatives, and community welfare.`,
        `ನಮಸ್ಕಾರ ${receipt.donorName}, ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಟ್ರಸ್ಟ್‌ಗೆ ನೀವು ಸಮರ್ಪಿಸಿದ ₹ ${formattedAmount} ಉದಾರ ದೇಣಿಗೆಯನ್ನು ಕೃತಜ್ಞತೆಯಿಂದ ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಈ ಸಹಾಯವು ಬಡ ವಿದ್ಯಾರ್ಥಿಗಳು, ಶೈಕ್ಷಣಿಕ ಯೋಜನೆಗಳು ಮತ್ತು ಸಮಾಜ ಸೇವೆಗೆ ನೆರವಾಗುತ್ತದೆ.`
      );

  const shareTitle = isSeva
    ? t(
        `Seva Confirmation - ${receipt.receiptNo}`,
        `ಸೇವಾ ದೃಢೀಕರಣ - ${receipt.receiptNo}`
      )
    : t(
        `Donation Acknowledgement - ${receipt.receiptNo}`,
        `ದೇಣಿಗೆ ಸ್ವೀಕೃತಿ - ${receipt.receiptNo}`
      );

  const shareText = isSeva
    ? language === "kn"
      ? `${siteData.trustNameKn}\n${receipt.donorName} ಅವರಿಂದ ${sevaNameKn} (${receipt.sevaDate}) ಸೇವಾ ಸಂಕಲ್ಪ ದೃಢೀಕರಿಸಲ್ಪಟ್ಟಿದೆ.\nಮೊತ್ತ: ₹ ${formattedAmount} | ರಸೀದಿ: ${receipt.receiptNo}${IS_TEST_MODE ? `\n(${siteData.demoDisclaimerKn})` : ""}`
      : `Shree Durgaparameshwari Sannidhana, Ullur\nSeva Confirmation for ${receipt.donorName}: ${sevaNameEn} on ${receipt.sevaDate}\nAmount: ₹ ${formattedAmount} | Receipt No.: ${receipt.receiptNo}${IS_TEST_MODE ? "\n(DEMO / TEST — NOT A VALID RECEIPT)" : ""}`
    : language === "kn"
      ? `${siteData.trustNameKn}\n${receipt.donorName} ಅವರಿಂದ ಟ್ರಸ್ಟ್ ನಿಧಿಗೆ ₹ ${formattedAmount} ದೇಣಿಗೆ ಸಮರ್ಪಿಸಲಾಗಿದೆ.\nರಸೀದಿ: ${receipt.receiptNo}${IS_TEST_MODE ? `\n(${siteData.demoDisclaimerKn})` : ""}`
      : `Shree Durga Parameshwari Sannidhana Trust, Ullur\nDonation Acknowledgement for ${receipt.donorName}: ₹ ${formattedAmount} (${receipt.purpose})\nReceipt No.: ${receipt.receiptNo}${IS_TEST_MODE ? "\n(DEMO / TEST — NOT A VALID RECEIPT)" : ""}`;

  const handleDownloadReceipt = async () => {
    if (language === "kn" && receiptRef.current) {
      await generateKannadaReceiptPdf(
        receiptRef.current,
        pdfFileName,
        "download"
      );
      return;
    }
    const pdf = await createReceiptPdf(receipt);
    pdf.save(pdfFileName);
  };

  const handleShareReceipt = async () => {
    setIsSharing(true);
    setShareNote(null);

    try {
      let blob: Blob;
      if (language === "kn" && receiptRef.current) {
        const resultBlob = await generateKannadaReceiptPdf(
          receiptRef.current,
          pdfFileName,
          "blob"
        );
        blob = resultBlob as Blob;
      } else {
        const pdf = await createReceiptPdf(receipt);
        blob = pdf.output("blob");
      }

      const file = new File([blob], pdfFileName, {
        type: "application/pdf",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: shareTitle,
            text: shareText,
          });
          return;
        } catch (err) {
          if (err instanceof Error && err.name === "AbortError") {
            return;
          }
        }
      }

      await handleDownloadReceipt();
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        shareText
      )}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      setShareNote(
        t(
          "Receipt PDF downloaded — attach it in the WhatsApp chat.",
          "ರಸೀದಿ ಪಿಡಿಎಫ್ ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ — ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಲಗತ್ತಿಸಿ ಹಂಚಿಕೊಳ್ಳಿ."
        )
      );
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-[100dvh] w-full max-w-full overflow-x-clip bg-[#F5EFE6] text-[#2B1810] flex flex-col justify-center px-3.5 sm:px-6 py-3 sm:py-5">
      <div className="max-w-lg w-full mx-auto rounded-3xl bg-[#FDF8EE] border-2 border-[#C59B27]/60 shadow-lg px-4 py-3.5 sm:p-6 space-y-3 sm:space-y-4">
        {/* Top Status Bar */}
        <div className="flex items-center justify-between gap-2">
          {IS_TEST_MODE ? (
            <span className="inline-flex items-center rounded-full bg-red-50 border border-red-300 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-red-700 leading-none">
              {t(
                "DEMO / TEST — NOT A VALID RECEIPT",
                "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಮಾನ್ಯವಲ್ಲ"
              )}
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-300 px-2.5 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wide text-emerald-800 leading-none">
              {t("Confirmed Acknowledgement", "ದೃಢೀಕೃತ ಸ್ವೀಕೃತಿ")}
            </span>
          )}

          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center justify-center gap-1.5 min-h-[36px] sm:min-h-[40px] rounded-full border border-[#7A1C1C] bg-[#FAF7F2] px-3 py-1 text-xs font-bold text-[#7A1C1C] hover:bg-[#F2E9D8] transition-colors duration-200 cursor-pointer shrink-0"
          >
            <Languages className="w-3.5 h-3.5 shrink-0" />
            <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
          </button>
        </div>

        {/* Sacred Header & Emotional Confirmation Message */}
        <div className="text-center space-y-2">
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#C59B27] bg-[#FAF7F2] shadow-sm">
              <Image
                src="/trust-logo.png"
                alt={t(
                  "Shree Durgaparameshwari Sannidhana Emblem",
                  "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ ಲಾಂಛನ"
                )}
                fill
                sizes="64px"
                className="object-contain p-0.5"
                priority
              />
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-0.5 -right-0.5 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center border-2 border-[#FDF8EE] shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>

          <h1 className="text-lg sm:text-2xl font-serif font-bold text-[#7A1C1C] leading-snug break-words">
            {confirmationTitle}
          </h1>

          <p className="text-xs sm:text-sm text-[#4A2511] leading-relaxed break-words">
            {confirmationMessage}
          </p>
        </div>

        {/* Compact Email Delivery Pill */}
        <div className="rounded-xl border border-[#C59B27]/50 bg-[#F7F0E2] px-3 py-2 text-center space-y-0.5">
          <p className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#7A1C1C] flex-wrap">
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="break-all">
              {t(
                `Receipt PDF emailed to ${receipt.email}`,
                `ರಸೀದಿ ಪಿಡಿಎಫ್ ಅನ್ನು ${receipt.email} ಗೆ ಇಮೇಲ್ ಮಾಡಲಾಗಿದೆ`
              )}
            </span>
          </p>
          <p className="text-[11px] text-[#5C3317]">
            {t(
              "Please check Inbox or Spam folder",
              "ದಯವಿಟ್ಟು ಇನ್‌ಬಾಕ್ಸ್ ಅಥವಾ ಸ್ಪ್ಯಾಮ್ (Spam) ಫೋಲ್ಡರ್ ಪರಿಶೀಲಿಸಿ"
            )}
          </p>
        </div>

        {/* Mini Cropped "Peek" Receipt Card */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => setIsPreviewOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsPreviewOpen(true);
            }
          }}
          aria-label={t(
            "Tap to Preview Full Slip",
            "ಪೂರ್ಣ ರಸೀದಿ ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ"
          )}
          className="group relative max-h-32 sm:max-h-36 overflow-hidden rounded-xl border-2 border-[#7A1C1C] p-0.5 bg-[#FAF6ED] cursor-pointer shadow-xs hover:shadow-md transition-shadow"
        >
          <div className="border border-[#C59B27] px-3 py-2.5 space-y-1 font-serif text-left">
            <p className="text-[11px] sm:text-xs font-bold text-[#7A1C1C] tracking-wide truncate">
              {entityHeaderTitle}
            </p>
            <p className="text-[11px] sm:text-xs font-semibold text-[#2B1810]">
              {t("Receipt No.:", "ರಸೀದಿ ಸಂಖ್ಯೆ:")}{" "}
              <span className="font-mono">{receipt.receiptNo}</span> |{" "}
              {t("Paid:", "ಪಾವತಿ:")}{" "}
              <strong className="text-[#7A1C1C]">₹ {formattedAmount}</strong>
            </p>
            <p className="text-[11px] sm:text-xs text-[#4A2511] truncate">
              {isSeva
                ? `${t("Seva:", "ಸೇವೆ:")} ${t(sevaNameEn, sevaNameKn)} (${receipt.sevaDate})`
                : `${t("Purpose:", "ಉದ್ದೇಶ:")} ${t(receipt.purpose, translatePurposeKn(receipt.purpose))}`}
            </p>
            <p className="text-[10px] text-[#5C3317] truncate">
              {t("Donor:", "ದಾನಿ:")} {receipt.donorName} • {receipt.paymentId}
            </p>
          </div>

          {/* Bottom Gradient Fade + Clickable Pill */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#FAF6ED] via-[#FAF6ED]/90 to-transparent flex items-end justify-center pb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7A1C1C] text-white px-3 py-1 text-[11px] font-semibold shadow-sm group-hover:bg-[#5E1414] transition-colors">
              <Eye className="w-3.5 h-3.5 shrink-0" />
              <span>
                {t(
                  "Tap to Preview Full Slip",
                  "ಪೂರ್ಣ ರಸೀದಿ ನೋಡಲು ಟ್ಯಾಪ್ ಮಾಡಿ"
                )}
              </span>
            </span>
          </div>
        </div>

        {/* Bottom Action Bar (Thumb-Reachable on Single Screen) */}
        <div className="space-y-2 pt-0.5">
          <button
            type="button"
            onClick={() => void handleDownloadReceipt()}
            className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A1C1C] hover:bg-[#5E1414] text-white px-5 py-2.5 text-sm font-bold shadow-sm hover:brightness-105 active:scale-[0.99] transition duration-200 cursor-pointer"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>
              {t("Download PDF Receipt", "ಪಿಡಿಎಫ್ ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ")}
            </span>
          </button>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={isSharing}
              onClick={() => void handleShareReceipt()}
              className="min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] hover:bg-[#1EBE5D] disabled:opacity-60 text-white px-3 py-2 text-xs sm:text-sm font-semibold shadow-sm active:scale-[0.99] transition duration-200 cursor-pointer text-center leading-tight"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 shrink-0"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L0 24l6.33-1.66a11.86 11.86 0 0 0 5.73 1.46h.01c6.55 0 11.89-5.34 11.9-11.9a11.82 11.82 0 0 0-3.45-8.42ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.66-.24-.37a9.85 9.85 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.9 6.99c0 5.45-4.44 9.89-9.89 9.89Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
              </svg>
              <span>
                {isSharing
                  ? t("Preparing...", "ಸಿದ್ಧವಾಗುತ್ತಿದೆ...")
                  : t("Share on WhatsApp", "ವಾಟ್ಸಾಪ್ ಹಂಚಿಕೆ")}
              </span>
            </button>

            <Link
              href="/"
              className="min-h-[44px] inline-flex items-center justify-center rounded-xl border-2 border-[#7A1C1C] bg-[#FAF7F2] hover:bg-[#F2E9D8] text-[#7A1C1C] px-3 py-2 text-xs sm:text-sm font-bold active:scale-[0.99] transition duration-200 text-center leading-tight"
            >
              {t("Back to Home", "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}
            </Link>
          </div>

          {shareNote && (
            <p
              role="status"
              className="text-center text-[11px] font-semibold text-[#7A1C1C] bg-[#FAF7F2] border border-[#C59B27] rounded-lg px-2.5 py-1.5"
            >
              {shareNote}
            </p>
          )}
        </div>
      </div>

      {/* Off-screen Full Slip for Kannada html-to-image PDF Export */}
      <div
        aria-hidden="true"
        className="fixed -left-[9999px] top-0 w-[680px] pointer-events-none"
      >
        <div ref={receiptRef}>
          <FullReceiptSlip receipt={receipt} language={language} t={t} />
        </div>
      </div>

      {/* Full Slip Preview Modal */}
      {isPreviewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("Full Receipt Slip Preview", "ಪೂರ್ಣ ರಸೀದಿ ಪೂರ್ವವೀಕ್ಷಣೆ")}
          onClick={() => setIsPreviewOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-2xl bg-[#FAF7F2] p-3 sm:p-5 shadow-2xl space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs sm:text-sm font-bold text-[#7A1C1C]">
                {t("Full Receipt Preview", "ಪೂರ್ಣ ರಸೀದಿ ಪೂರ್ವವೀಕ್ಷಣೆ")}
              </span>
              <button
                type="button"
                onClick={() => setIsPreviewOpen(false)}
                aria-label={t("Close preview", "ಮುಚ್ಚಿ")}
                className="inline-flex items-center justify-center min-h-[40px] min-w-[40px] rounded-full bg-[#FAF7F2] border border-[#7A1C1C] text-[#7A1C1C] hover:bg-[#F2E9D8] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <FullReceiptSlip receipt={receipt} language={language} t={t} />

            <button
              type="button"
              onClick={() => void handleDownloadReceipt()}
              className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl bg-[#7A1C1C] hover:bg-[#5E1414] text-white px-5 py-2.5 text-sm font-bold transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4 shrink-0" />
              <span>
                {t("Download PDF Receipt", "ಪಿಡಿಎಫ್ ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ")}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
