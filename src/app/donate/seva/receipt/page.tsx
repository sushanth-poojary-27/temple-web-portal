"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Download,
  FileWarning,
  Languages,
  Mail,
} from "lucide-react";
import { sevaList, siteData } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
import {
  createReceiptPdf,
  formatAmountInWords,
  type ReceiptData,
} from "@/utils/generateReceipt";

function translatePurposeKn(purpose: string): string {
  if (purpose === "Education & General Trust Fund") {
    return "ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಸಾಮಾನ್ಯ ಟ್ರಸ್ಟ್ ನಿಧಿ";
  }
  if (purpose.startsWith("Seva Booking:")) {
    const rawName = purpose.replace("Seva Booking:", "").trim();
    const matched = sevaList.find((s) => s.name === rawName);
    return `ಪೂಜಾ ಸೇವಾ ನೋಂದಣಿ: ${matched ? matched.nameKn : rawName}`;
  }
  return purpose;
}

export default function ReceiptPage() {
  const { language, toggleLanguage, t } = useLanguage();
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [whatsappFallbackNote, setWhatsappFallbackNote] = useState<
    string | null
  >(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("latest_receipt");
      if (raw) {
        const parsed = JSON.parse(raw) as ReceiptData;
        setReceipt(parsed);
      }
    } catch {
      setReceipt(null);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-amber-50 text-amber-900 flex items-center justify-center p-6">
        <p className="text-sm font-bold text-amber-800 animate-pulse">
          {t(
            "Loading DEMO Receipt Preview...",
            "ರಸೀದಿ ಪೂರ್ವವೀಕ್ಷಣೆ ಲೋಡ್ ಆಗುತ್ತಿದೆ..."
          )}
        </p>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="min-h-screen bg-amber-50 text-amber-900 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-[#FFFDF7] p-8 border-[3px] border-[#7A1C1C] text-center space-y-5">
          <div className="w-12 h-12 bg-amber-100 text-[#7A1C1C] flex items-center justify-center mx-auto border border-[#B8860B]">
            <FileWarning className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-serif font-bold text-[#7A1C1C]">
            {t("No Recent Receipt Found", "ಯಾವುದೇ ಇತ್ತೀಚಿನ ರಸೀದಿ ಕಂಡುಬಂದಿಲ್ಲ")}
          </h1>
          <p className="text-sm text-amber-900 leading-relaxed">
            {t(
              "We could not find an active Seva or Donation receipt in your current session. Please complete a test booking to generate a DEMO receipt.",
              "ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಅವಧಿಯಲ್ಲಿ ಯಾವುದೇ ಸಕ್ರಿಯ ಸೇವೆ ಅಥವಾ ದೇಣಿಗೆ ರಸೀದಿ ಕಂಡುಬಂದಿಲ್ಲ. ರಸೀದಿ ಪಡೆಯಲು ದಯವಿಟ್ಟು ಸೇವಾ ನೋಂದಣಿ ಪೂರ್ಣಗೊಳಿಸಿ."
            )}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/donate/seva"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#7A1C1C] px-6 py-2.5 text-sm font-bold text-white hover:bg-amber-900 transition-colors"
            >
              {t("Go to Seva Booking", "ಸೇವೆ ಕಾಯ್ದಿರಿಸಲು ತೆರಳಿ")}
            </Link>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-[#7A1C1C] bg-white px-6 py-2.5 text-sm font-bold text-[#7A1C1C] hover:bg-amber-50 transition-colors"
            >
              {t("← Back to Home", "← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const data = receipt;
  const isSeva = Boolean(data.sevaDate && data.sevaDate !== "N/A");
  const receiptType = isSeva
    ? "Online Seva Receipt"
    : "Online Donation Receipt";
  const receiptNumber = data.receiptNo.split("-").pop() || data.receiptNo;
  const pdfFileName = isSeva
    ? `Seva-Receipt-${receiptNumber}.pdf`
    : `Donation-Receipt-${receiptNumber}.pdf`;
  const shareText = `Shree Durgaparameshwari Sannidhana, Ullur\n${receiptType} for ${data.donorName}\nReceipt: ${data.receiptNo} (DEMO / TEST, not a valid receipt)`;

  const amountInWords = formatAmountInWords(data.amount);

  const handleDownloadReceipt = async () => {
    const pdf = await createReceiptPdf(data);
    pdf.save(pdfFileName);
  };

  const handleShareReceipt = async () => {
    setIsSharing(true);
    setWhatsappFallbackNote(null);

    try {
      const pdf = await createReceiptPdf(data);
      const blob = pdf.output("blob");
      const file = new File([blob], pdfFileName, {
        type: "application/pdf",
      });

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: `${receiptType} - ${data.receiptNo}`,
            text: shareText,
          });
        } catch (err) {
          if (err instanceof Error && err.name === "AbortError") {
            return;
          }
        }
      } else {
        pdf.save(pdfFileName);
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
          shareText
        )}`;
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
        setWhatsappFallbackNote(
          t(
            "Receipt PDF downloaded! Attach the downloaded PDF in the WhatsApp window to send it to anyone.",
            "ರಸೀದಿ ಪಿಡಿಎಫ್ (PDF) ಡೌನ್‌ಲೋಡ್ ಆಗಿದೆ! ವಾಟ್ಸಾಪ್ ವಿಂಡೋದಲ್ಲಿ ಈ ಪಿಡಿಎಫ್ ಅನ್ನು ಲಗತ್ತಿಸಿ ಕಳುಹಿಸಿ."
          )
        );
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Top Green Status Banner + Language Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-green-50 px-5 py-3.5 border border-green-400 text-green-900">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-700 shrink-0" />
            <div>
              <p className="text-sm sm:text-base font-bold">
                {t(
                  "Test Transaction Completed • Receipt Generated",
                  "ಪರೀಕ್ಷಾ ವಹಿವಾಟು ಪೂರ್ಣಗೊಂಡಿದೆ • ರಸೀದಿ ಸಿದ್ಧವಾಗಿದೆ"
                )}
              </p>
              <p className="text-xs text-green-800">
                {t(
                  'DEMO / TEST, not a valid receipt — click "Download PDF Receipt" below to save a copy.',
                  "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ. ರಸೀದಿ ಉಳಿಸಲು ಕೆಳಗಿನ 'ಪಿಡಿಎಫ್ ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' ಬಟನ್ ಒತ್ತಿ."
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#7A1C1C] bg-white px-3.5 py-1 text-xs font-bold text-[#7A1C1C] hover:bg-[#7A1C1C] hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <Languages className="w-3.5 h-3.5" />
            <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
          </button>
        </div>

        {/* Email Delivery Status Badge below top green banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FFFDF7] px-5 py-3 border border-[#B8860B] text-xs sm:text-sm text-[#4A2511]">
          <div className="flex items-center gap-2 font-semibold">
            <Mail className="w-4 h-4 text-[#7A1C1C] shrink-0" />
            <span>
              {t(
                "Automated Email Notification Status:",
                "ಸ್ವಯಂಚಾಲಿತ ಇಮೇಲ್ ರಸೀದಿ ಸ್ಥಿತಿ:"
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span>
              {t("Devotee", "ಭಕ್ತರು")} (
              <strong className="text-[#7A1C1C]">{receipt.email}</strong>):{" "}
              <strong
                className={
                  receipt.emailStatus?.devoteeSent
                    ? "text-green-700"
                    : "text-amber-700"
                }
              >
                {receipt.emailStatus?.devoteeSent
                  ? t("Sent ✓", "ಕಳುಹಿಸಲಾಗಿದೆ ✓")
                  : t("Skipped / Pending Key", "ಕಳುಹಿಸಲಾಗಿಲ್ಲ")}
              </strong>
            </span>
            <span>
              {t("Trust", "ಟ್ರಸ್ಟ್")} (
              <strong className="text-[#7A1C1C]">
                shridurgaparameshwariullur@gmail.com
              </strong>
              ):{" "}
              <strong
                className={
                  receipt.emailStatus?.trustSent
                    ? "text-green-700"
                    : "text-amber-700"
                }
              >
                {receipt.emailStatus?.trustSent
                  ? t("Sent ✓", "ಕಳುಹಿಸಲಾಗಿದೆ ✓")
                  : t("Skipped / Pending Key", "ಕಳುಹಿಸಲಾಗಿಲ್ಲ")}
              </strong>
            </span>
          </div>
        </div>

        {/* Printed Temple Paper Voucher Layout: Outer Thick Maroon (#7A1C1C) + Inner Thin Gold (#B8860B) */}
        <div className="rounded-none bg-[#FFFDF7] border-[3px] border-[#7A1C1C] p-1.5">
          <div className="relative rounded-none border border-[#B8860B] bg-[#FFFDF7] overflow-hidden">
            {/* Top Red Warning Strip */}
            <div className="bg-red-700 text-white text-center py-2 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase">
              {t(
                "DEMO / TEST RECEIPT — NOT A VALID TAX RECEIPT",
                "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ"
              )}
            </div>

            {/* Subtle Diagonal Watermark */}
            <div
              aria-hidden="true"
              className="pointer-events-none select-none absolute inset-0 flex items-center justify-center overflow-hidden"
            >
              <span className="-rotate-24 text-2xl sm:text-4xl md:text-5xl font-serif font-bold uppercase tracking-widest text-[#7A1C1C]/[0.07] whitespace-nowrap">
                {t(
                  "DEMO / TEST — NOT FOR LEGAL USE",
                  "ಡೆಮೊ / ಪರೀಕ್ಷಾ ರಸೀದಿ — ಇದು ಮಾನ್ಯ ರಸೀದಿ ಅಲ್ಲ"
                )}
              </span>
            </div>

            {/* Voucher Body */}
            <div className="relative z-10 px-6 sm:px-10 py-8 space-y-6 font-serif text-[#2B1810]">
              {/* Header: Centered trust-logo, Bold Serif Title, Verified Address, Underlined Heading */}
              <div className="text-center space-y-2 border-b-4 border-double border-[#7A1C1C] pb-5">
                <div className="relative w-20 h-20 mx-auto">
                  <Image
                    src="/trust-logo.png"
                    alt={t(
                      "Shree Durgaparameshwari Sannidhana Trust Logo",
                      "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ (ರಿ.), ಉಳ್ಳೂರು ಲಾಂಛನ"
                    )}
                    fill
                    sizes="80px"
                    className="object-contain"
                    priority
                  />
                </div>

                <h1 className="text-lg sm:text-2xl font-serif font-bold text-[#7A1C1C] tracking-wide uppercase pt-1">
                  {t(
                    "SHREE DURGAPARAMESHWARI SANNIDHANA (REGD.), ULLUR",
                    "ಶ್ರೀ ದುರ್ಗಾಪರಮೇಶ್ವರಿ ಸನ್ನಿಧಾನ (ರಿ.), ಉಳ್ಳೂರು"
                  )}
                </h1>

                <p className="text-xs sm:text-sm text-[#4A2511]">
                  {t(
                    "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
                    "ಪೋಸ್ಟ್ ಕೆಮುಂಡೇಲ್, ಉಳ್ಳೂರು ಗ್ರಾಮ, ಎಲ್ಲೂರು, ಉಡುಪಿ ಜಿಲ್ಲೆ, ಕರ್ನಾಟಕ - 574119"
                  )}
                </p>
                <p className="text-xs text-[#5C3317]">
                  {t("Plus Code", "ಪ್ಲಸ್ ಕೋಡ್")}: 5Q7W+92R |{" "}
                  {t("Email", "ಇಮೇಲ್")}: shridurgaparameshwariullur@gmail.com
                </p>

                <div className="pt-2">
                  <span className="inline-block text-sm sm:text-base font-bold uppercase tracking-widest text-[#7A1C1C] underline underline-offset-4 decoration-[#7A1C1C] decoration-2">
                    {t(
                      "SEVA & DONATION RECEIPT",
                      "ಸೇವೆ ಮತ್ತು ದೇಣಿಗೆ ರಸೀದಿ"
                    )}
                  </span>
                </div>
              </div>

              {/* Top Metadata Row: Receipt No. (Left) & Date & Time (Right) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm font-bold text-[#7A1C1C]">
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

              {/* Classic Receipt Lines with Subtle Bottom Underlines */}
              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex flex-wrap items-baseline gap-2 border-b border-[#B8860B]/60 pb-1.5">
                  <span className="font-bold text-[#7A1C1C] shrink-0">
                    {t(
                      "Received with thanks from Sri / Smt.:",
                      "ಶ್ರೀ / ಶ್ರೀಮತಿ ಇವರಿಂದ ಕೃತಜ್ಞತಾಪೂರ್ವಕವಾಗಿ ಸ್ವೀಕರಿಸಲಾಗಿದೆ:"
                    )}
                  </span>
                  <span className="font-semibold text-[#2B1810] flex-1">
                    {receipt.donorName}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 border-b border-[#B8860B]/60 pb-1.5">
                  <span className="font-bold text-[#7A1C1C] shrink-0">
                    {t("Mobile:", "ಮೊಬೈಲ್:")}
                  </span>
                  <span className="text-[#2B1810] mr-4">{receipt.mobile}</span>
                  <span className="font-bold text-[#7A1C1C] shrink-0">
                    | {t("Email:", "ಇಮೇಲ್:")}
                  </span>
                  <span className="text-[#2B1810] break-all">
                    {receipt.email}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 border-b border-[#B8860B]/60 pb-1.5">
                  <span className="font-bold text-[#7A1C1C] shrink-0">
                    {t("Address:", "ವಿಳಾಸ:")}
                  </span>
                  <span className="text-[#2B1810] flex-1">
                    {receipt.address}
                  </span>
                </div>

                <div className="flex flex-wrap items-baseline gap-2 border-b border-[#B8860B]/60 pb-1.5">
                  <span className="font-bold text-[#7A1C1C] shrink-0">
                    {t(
                      "Payment Ref (Razorpay Test ID):",
                      "ಪಾವತಿ ಉಲ್ಲೇಖ (ರೇಜರ್‌ಪೇ ಪರೀಕ್ಷಾ ಐಡಿ):"
                    )}
                  </span>
                  <span className="font-mono text-[#2B1810]">
                    {receipt.paymentId}
                  </span>
                  <span className="text-xs text-[#5C3317]">
                    {t("(Online — Test Mode)", "(ಆನ್‌ಲೈನ್ — ಪರೀಕ್ಷಾ ಮೋಡ್)")}
                  </span>
                </div>
              </div>

              {/* Sharp Particulars Grid (1px solid #7A1C1C, rounded-none) */}
              <div className="rounded-none overflow-x-auto">
                <table className="w-full border-collapse border border-[#7A1C1C] rounded-none text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-[#F6EEDC] text-[#7A1C1C]">
                      <th className="border border-[#7A1C1C] py-2.5 px-3 text-center font-bold w-16">
                        {t("Sl. No.", "ಕ್ರ. ಸಂ.")}
                      </th>
                      <th className="border border-[#7A1C1C] py-2.5 px-3 text-left font-bold">
                        {t("Particulars (Seva / Fund)", "ವಿವರಗಳು (ಸೇವೆ / ನಿಧಿ)")}
                      </th>
                      <th className="border border-[#7A1C1C] py-2.5 px-3 text-center font-bold w-32">
                        {t("Seva Date", "ಸೇವೆಯ ದಿನಾಂಕ")}
                      </th>
                      <th className="border border-[#7A1C1C] py-2.5 px-3 text-right font-bold w-32">
                        {t("Amount (₹)", "ಮೊತ್ತ (₹)")}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-[#7A1C1C] py-3 px-3 text-center">
                        1
                      </td>
                      <td className="border border-[#7A1C1C] py-3 px-3 font-bold text-[#2B1810]">
                        {t(receipt.purpose, translatePurposeKn(receipt.purpose))}
                      </td>
                      <td className="border border-[#7A1C1C] py-3 px-3 text-center">
                        {receipt.sevaDate && receipt.sevaDate !== "N/A"
                          ? receipt.sevaDate
                          : t("N/A", "ಅನ್ವಯಿಸುವುದಿಲ್ಲ")}
                      </td>
                      <td className="border border-[#7A1C1C] py-3 px-3 text-right font-bold">
                        ₹{Number(receipt.amount).toLocaleString("en-IN")}/-
                      </td>
                    </tr>
                    <tr className="bg-[#F6EEDC] font-bold text-[#7A1C1C]">
                      <td
                        colSpan={3}
                        className="border border-[#7A1C1C] py-2.5 px-3 text-right uppercase tracking-wide"
                      >
                        {t("Total Paid", "ಒಟ್ಟು ಪಾವತಿಸಿದ ಮೊತ್ತ")}
                      </td>
                      <td className="border border-[#7A1C1C] py-2.5 px-3 text-right text-sm sm:text-base">
                        ₹{Number(receipt.amount).toLocaleString("en-IN")}/-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Amount in Words Line */}
              <div className="flex flex-wrap items-baseline gap-2 border-b border-[#B8860B]/70 pb-1.5 text-xs sm:text-sm">
                <span className="font-bold text-[#7A1C1C] shrink-0">
                  {t("Amount in Words:", "ಮೊತ್ತ ಅಕ್ಷರಗಳಲ್ಲಿ:")}
                </span>
                <span className="italic font-semibold text-[#2B1810]">
                  {amountInWords}
                </span>
              </div>

              {/* Tax Exemption Note */}
              <p className="text-xs font-semibold text-[#7A1C1C]">
                {t(siteData.taxExemptionNote, siteData.taxExemptionNoteKn)}
              </p>

              {/* Footer & Signature Line (No official seals or stamps) */}
              <div className="pt-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6 text-xs">
                <p className="italic text-[#5C3317] max-w-sm">
                  {t(
                    "Note: Generated in Razorpay Test Mode for academic demonstration only. No real money was transferred.",
                    "ಸೂಚನೆ: ಶೈಕ್ಷಣಿಕ ಪ್ರಾತ್ಯಕ್ಷಿಕೆಗಾಗಿ ಮಾತ್ರ ರೇಜರ್‌ಪೇ ಪರೀಕ್ಷಾ ಮೋಡ್‌ನಲ್ಲಿ ರಚಿಸಲಾಗಿದೆ. ಯಾವುದೇ ನೈಜ ಹಣ ವರ್ಗಾವಣೆಯಾಗಿಲ್ಲ."
                  )}
                </p>
                <div className="text-right">
                  <div className="inline-block border-t border-[#7A1C1C] pt-1.5 px-2 font-bold text-[#7A1C1C]">
                    {t(
                      "Authorized Signatory (DEMO / TEST ONLY)",
                      "ಅಧಿಕೃತ ಸಹಿ (ಡೆಮೊ / ಪರೀಕ್ಷೆಗಾಗಿ ಮಾತ್ರ)"
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Red Disclaimer Strip */}
            <div className="bg-red-700 text-white text-center py-2 px-4 text-xs sm:text-sm font-bold tracking-wider uppercase">
              {t(siteData.demoDisclaimer, siteData.demoDisclaimerKn)}
            </div>
          </div>
        </div>

        {/* Manual Action Buttons Below Receipt Voucher */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            type="button"
            onClick={() => void handleDownloadReceipt()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#7A1C1C] px-7 py-3 text-sm font-bold text-white hover:bg-amber-900 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>
              {t("Download PDF Receipt", "ಪಿಡಿಎಫ್ ರಸೀದಿ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ")}
            </span>
          </button>

          <button
            type="button"
            disabled={isSharing}
            onClick={() => void handleShareReceipt()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] disabled:opacity-60 px-7 py-3 text-sm text-white font-semibold shadow-sm transition-colors cursor-pointer"
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
                ? t("Preparing PDF...", "ಪಿಡಿಎಫ್ ಸಿದ್ಧಪಡಿಸಲಾಗುತ್ತಿದೆ...")
                : t("Share on WhatsApp", "ವಾಟ್ಸಾಪ್‌ನಲ್ಲಿ ಹಂಚಿಕೊಳ್ಳಿ")}
            </span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-white px-7 py-3 text-sm font-bold text-[#7A1C1C] border-2 border-[#7A1C1C] hover:bg-amber-50 transition-colors"
          >
            <span>{t("← Back to Home", "← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}</span>
          </Link>
        </div>

        {/* Desktop Fallback Helper Note */}
        {whatsappFallbackNote && (
          <p
            role="status"
            className="text-center text-xs sm:text-sm font-semibold text-[#7A1C1C] bg-[#FFFDF7] border border-[#B8860B] px-4 py-2.5"
          >
            {whatsappFallbackNote}
          </p>
        )}
      </div>
    </div>
  );
}
