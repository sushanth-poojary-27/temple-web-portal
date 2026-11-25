import { jsPDF } from "jspdf";

export const IS_TEST_MODE = true;

export type ReceiptType = "seva" | "donation";

export interface EmailDeliveryStatus {
  devoteeSent: boolean;
  trustSent: boolean;
}

export interface ReceiptData {
  type?: ReceiptType;
  receiptNo: string;
  paymentId: string;
  paymentMode?: string;
  dateTime: string;
  donorName: string;
  mobile: string;
  email: string;
  address: string;
  purpose: string;
  sevaName?: string;
  sevaDate: string;
  amount: number;
  emailStatus?: EmailDeliveryStatus;
}

const TRUST_LOGO_PATH = "/trust-logo.png";

export function resolveReceiptType(data: ReceiptData): ReceiptType {
  if (data.type === "seva" || data.type === "donation") {
    return data.type;
  }
  return Boolean(data.sevaDate && data.sevaDate !== "N/A")
    ? "seva"
    : "donation";
}

export function getCleanSevaName(data: ReceiptData): string {
  if (data.sevaName && data.sevaName.trim()) {
    return data.sevaName.trim();
  }
  return data.purpose.replace(/^Seva Booking:\s*/i, "").trim();
}

export function getReceiptFileName(data: ReceiptData): string {
  return `Receipt-${data.receiptNo}.pdf`;
}

const ONES = [
  "",
  "One",
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Eleven",
  "Twelve",
  "Thirteen",
  "Fourteen",
  "Fifteen",
  "Sixteen",
  "Seventeen",
  "Eighteen",
  "Nineteen",
];

const TENS = [
  "",
  "",
  "Twenty",
  "Thirty",
  "Forty",
  "Fifty",
  "Sixty",
  "Seventy",
  "Eighty",
  "Ninety",
];

function twoDigitsToWords(n: number): string {
  if (n === 0) return "";
  if (n < 20) return ONES[n];
  const ten = Math.floor(n / 10);
  const one = n % 10;
  return `${TENS[ten]}${one > 0 ? ` ${ONES[one]}` : ""}`;
}

export function formatAmountInWords(amount: number): string {
  const num = Math.floor(Math.abs(Number(amount) || 0));
  if (num === 0) return "Rupees Zero Only";

  const parts: string[] = [];
  let remainder = num;

  const crore = Math.floor(remainder / 10000000);
  if (crore > 0) {
    parts.push(`${twoDigitsToWords(crore)} Crore`);
    remainder %= 10000000;
  }

  const lakh = Math.floor(remainder / 100000);
  if (lakh > 0) {
    parts.push(`${twoDigitsToWords(lakh)} Lakh`);
    remainder %= 100000;
  }

  const thousand = Math.floor(remainder / 1000);
  if (thousand > 0) {
    parts.push(`${twoDigitsToWords(thousand)} Thousand`);
    remainder %= 1000;
  }

  const hundred = Math.floor(remainder / 100);
  if (hundred > 0) {
    parts.push(`${ONES[hundred]} Hundred`);
    remainder %= 100;
  }

  if (remainder > 0) {
    parts.push(twoDigitsToWords(remainder));
  }

  return `Rupees ${parts.join(" ")} Only`;
}

const KANNADA_UNDER_100: string[] = [
  "",
  "ಒಂದು",
  "ಎರಡು",
  "ಮೂರು",
  "ನಾಲ್ಕು",
  "ಐದು",
  "ಆರು",
  "ಏಳು",
  "ಎಂಟು",
  "ಒಂಬತ್ತು",
  "ಹತ್ತು",
  "ಹನ್ನೊಂದು",
  "ಹನ್ನೆರಡು",
  "ಹದಿಮೂರು",
  "ಹದಿನಾಲ್ಕು",
  "ಹದಿನೈದು",
  "ಹದಿನಾರು",
  "ಹದಿನೇಳು",
  "ಹದಿನೆಂಟು",
  "ಹತ್ತೊಂಬತ್ತು",
  "ಇಪ್ಪತ್ತು",
  "ಇಪ್ಪತ್ತೊಂದು",
  "ಇಪ್ಪತ್ತೆರಡು",
  "ಇಪ್ಪತ್ತಮೂರು",
  "ಇಪ್ಪತ್ತನಾಲ್ಕು",
  "ಇಪ್ಪತ್ತೈದು",
  "ಇಪ್ಪತ್ತಾರು",
  "ಇಪ್ಪತ್ತೇಳು",
  "ಇಪ್ಪತ್ತೆಂಟು",
  "ಇಪ್ಪತ್ತೊಂಬತ್ತು",
  "ಮೂವತ್ತು",
  "ಮೂವತ್ತೊಂದು",
  "ಮೂವತ್ತೆರಡು",
  "ಮೂವತ್ತಮೂರು",
  "ಮೂವತ್ತನಾಲ್ಕು",
  "ಮೂವತ್ತೈದು",
  "ಮೂವತ್ತಾರು",
  "ಮೂವತ್ತೇಳು",
  "ಮೂವತ್ತೆಂಟು",
  "ಮೂವತ್ತೊಂಬತ್ತು",
  "ನಲವತ್ತು",
  "ನಲವತ್ತೊಂದು",
  "ನಲವತ್ತೆರಡು",
  "ನಲವತ್ತಮೂರು",
  "ನಲವತ್ತನಾಲ್ಕು",
  "ನಲವತ್ತೈದು",
  "ನಲವತ್ತಾರು",
  "ನಲವತ್ತೇಳು",
  "ನಲವತ್ತೆಂಟು",
  "ನಲವತ್ತೊಂಬತ್ತು",
  "ಐವತ್ತು",
  "ಐವತ್ತೊಂದು",
  "ಐವತ್ತೆರಡು",
  "ಐವತ್ತಮೂರು",
  "ಐವತ್ತನಾಲ್ಕು",
  "ಐವತ್ತೈದು",
  "ಐವತ್ತಾರು",
  "ಐವತ್ತೇಳು",
  "ಐವತ್ತೆಂಟು",
  "ಐವತ್ತೊಂಬತ್ತು",
  "ಅರವತ್ತು",
  "ಅರವತ್ತೊಂದು",
  "ಅರವತ್ತೆರಡು",
  "ಅರವತ್ತಮೂರು",
  "ಅರವತ್ತನಾಲ್ಕು",
  "ಅರವತ್ತೈದು",
  "ಅರವತ್ತಾರು",
  "ಅರವತ್ತೇಳು",
  "ಅರವತ್ತೆಂಟು",
  "ಅರವತ್ತೊಂಬತ್ತು",
  "ಎಪ್ಪತ್ತು",
  "ಎಪ್ಪತ್ತೊಂದು",
  "ಎಪ್ಪತ್ತೆರಡು",
  "ಎಪ್ಪತ್ತಮೂರು",
  "ಎಪ್ಪತ್ತನಾಲ್ಕು",
  "ಎಪ್ಪತ್ತೈದು",
  "ಎಪ್ಪತ್ತಾರು",
  "ಎಪ್ಪತ್ತೇಳು",
  "ಎಪ್ಪತ್ತೆಂಟು",
  "ಎಪ್ಪತ್ತೊಂಬತ್ತು",
  "ಎಂಟತ್ತು",
  "ಎಂಟತ್ತೊಂದು",
  "ಎಂಟತ್ತೆರಡು",
  "ಎಂಟತ್ತಮೂರು",
  "ಎಂಟತ್ತನಾಲ್ಕು",
  "ಎಂಟತ್ತೈದು",
  "ಎಂಟತ್ತಾರು",
  "ಎಂಟತ್ತೇಳು",
  "ಎಂಟತ್ತೆಂಟು",
  "ಎಂಟತ್ತೊಂಬತ್ತು",
  "ತೊಂಬತ್ತು",
  "ತೊಂಬತ್ತೊಂದು",
  "ತೊಂಬತ್ತೆರಡು",
  "ತೊಂಬತ್ತಮೂರು",
  "ತೊಂಬತ್ತನಾಲ್ಕು",
  "ತೊಂಬತ್ತೈದು",
  "ತೊಂಬತ್ತಾರು",
  "ತೊಂಬತ್ತೇಳು",
  "ತೊಂಬತ್ತೆಂಟು",
  "ತೊಂಬತ್ತೊಂಬತ್ತು",
];

export function amountToKannadaWords(amount: number): string {
  const num = Math.floor(Math.abs(Number(amount) || 0));
  if (num === 0) return "ಸೊನ್ನೆ ರೂಪಾಯಿಗಳು ಮಾತ್ರ";

  const parts: string[] = [];
  let remainder = num;

  const crore = Math.floor(remainder / 10000000);
  if (crore > 0) {
    remainder %= 10000000;
    const croreWord = KANNADA_UNDER_100[crore] || String(crore);
    parts.push(`${croreWord} ಕೋಟಿ`);
  }

  const lakh = Math.floor(remainder / 100000);
  if (lakh > 0) {
    remainder %= 100000;
    const lakhWord = KANNADA_UNDER_100[lakh] || String(lakh);
    parts.push(`${lakhWord} ಲಕ್ಷ${remainder > 0 ? "ದ" : ""}`);
  }

  const thousand = Math.floor(remainder / 1000);
  if (thousand > 0) {
    remainder %= 1000;
    const thousandWord = KANNADA_UNDER_100[thousand] || String(thousand);
    parts.push(`${thousandWord} ಸಾವಿರ${remainder > 0 ? "ದ" : ""}`);
  }

  const hundred = Math.floor(remainder / 100);
  if (hundred > 0) {
    remainder %= 100;
    const hundredWord = KANNADA_UNDER_100[hundred] || String(hundred);
    parts.push(`${hundredWord} ${remainder > 0 ? "ನೂರ" : "ನೂರು"}`);
  }

  if (remainder > 0) {
    parts.push(KANNADA_UNDER_100[remainder] || String(remainder));
  }

  return `${parts.join(" ")} ರೂಪಾಯಿಗಳು ಮಾತ್ರ`;
}

export async function generateKannadaReceiptPdf(
  element: HTMLElement,
  fileName: string,
  mode: "download" | "blob"
): Promise<Blob | void> {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(element, {
    pixelRatio: 2,
    cacheBust: true,
    backgroundColor: "#FFFDF7",
  });

  const img = new window.Image();
  await new Promise<void>((resolve, reject) => {
    img.onload = () => resolve();
    img.onerror = () =>
      reject(new Error("Failed to load captured Kannada receipt image"));
    img.src = dataUrl;
  });

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 12;
  const maxW = pageWidth - margin * 2;
  const maxH = pageHeight - margin * 2;

  const imgW = img.naturalWidth || element.offsetWidth || 800;
  const imgH = img.naturalHeight || element.offsetHeight || 1000;
  const ratio = Math.min(maxW / imgW, maxH / imgH);

  const renderW = imgW * ratio;
  const renderH = imgH * ratio;
  const x = (pageWidth - renderW) / 2;
  const y = margin;

  doc.addImage(dataUrl, "PNG", x, y, renderW, renderH, undefined, "FAST");

  if (mode === "download") {
    doc.save(fileName);
    return;
  }
  return doc.output("blob");
}

async function loadImageAsJpegDataUrl(src: string): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return new Promise((resolve) => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth || 200;
        canvas.height = img.naturalHeight || 200;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.fillStyle = "#FFFDF7";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function createReceiptPdf(data: ReceiptData): Promise<jsPDF> {
  const receiptType = resolveReceiptType(data);
  const isSeva = receiptType === "seva";
  const entityTitle = isSeva
    ? "SHREE DURGAPARAMESHWARI SANNIDHANA, ULLUR"
    : "SHREE DURGA PARAMESHWARI SANNIDHANA TRUST";
  const particularsText = isSeva
    ? `${getCleanSevaName(data)} (Seva Date: ${data.sevaDate})`
    : data.purpose;
  const paymentMode =
    data.paymentMode ||
    (IS_TEST_MODE ? "Online (Razorpay Test)" : "Online (Razorpay)");
  const formattedAmount = `Rs. ${Number(data.amount).toLocaleString("en-IN")}/-`;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const outerX = 14;
  const outerY = 14;
  const outerW = pageWidth - outerX * 2; // 182mm
  const outerH = 264;

  const innerX = outerX + 2.2;
  const innerY = outerY + 2.2;
  const innerW = outerW - 4.4;
  const innerH = outerH - 4.4;

  const contentLeft = innerX + 9;
  const contentRight = innerX + innerW - 9;
  const contentWidth = contentRight - contentLeft;

  // Warm ivory card background + double maroon & muted gold border
  doc.setFillColor(255, 253, 247); // #FFFDF7
  doc.rect(outerX, outerY, outerW, outerH, "F");

  doc.setDrawColor(122, 28, 28); // #7A1C1C
  doc.setLineWidth(1.2);
  doc.rect(outerX, outerY, outerW, outerH, "S");

  doc.setDrawColor(197, 155, 39); // #C59B27
  doc.setLineWidth(0.45);
  doc.rect(innerX, innerY, innerW, innerH, "S");

  let currentY = innerY + 12;

  if (IS_TEST_MODE) {
    doc.setFillColor(185, 28, 28);
    doc.rect(innerX, innerY, innerW, 8.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(
      "DEMO / TEST — NOT A VALID RECEIPT",
      pageWidth / 2,
      innerY + 5.7,
      { align: "center" }
    );
    currentY = innerY + 14;

    // Subtle diagonal watermark
    doc.setTextColor(238, 226, 212);
    doc.setFont("times", "bold");
    doc.setFontSize(22);
    doc.text("DEMO / TEST — NOT FOR LEGAL USE", pageWidth / 2, 156, {
      align: "center",
      angle: 26,
    });
  }

  // Temple Emblem
  const logoDataUrl = await loadImageAsJpegDataUrl(TRUST_LOGO_PATH);
  if (logoDataUrl) {
    const logoSize = 20;
    doc.addImage(
      logoDataUrl,
      "JPEG",
      (pageWidth - logoSize) / 2,
      currentY,
      logoSize,
      logoSize,
      undefined,
      "FAST"
    );
    currentY += logoSize + 6;
  } else {
    currentY += 4;
  }

  // Heading: SEVA & DONATION RECEIPT
  doc.setFont("times", "bold");
  doc.setFontSize(11.5);
  doc.setTextColor(122, 28, 28);
  const headingText = "SEVA & DONATION RECEIPT";
  doc.text(headingText, pageWidth / 2, currentY, { align: "center" });
  const headingW = doc.getTextWidth(headingText);
  doc.setDrawColor(197, 155, 39);
  doc.setLineWidth(0.45);
  doc.line(
    (pageWidth - headingW) / 2,
    currentY + 1.2,
    (pageWidth + headingW) / 2,
    currentY + 1.2
  );

  // Entity Title
  currentY += 7.5;
  doc.setFont("times", "bold");
  doc.setFontSize(14);
  doc.setTextColor(122, 28, 28);
  doc.text(entityTitle, pageWidth / 2, currentY, { align: "center" });

  // Address
  currentY += 5.5;
  doc.setFont("times", "normal");
  doc.setFontSize(9.8);
  doc.setTextColor(74, 37, 17);
  doc.text(
    "Post Kemundel, Ulluru Village, Yellur, Udupi Dist., Karnataka - 574119",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );

  // Double horizontal rule below header
  currentY += 5.5;
  doc.setDrawColor(122, 28, 28);
  doc.setLineWidth(0.5);
  doc.line(contentLeft, currentY, contentRight, currentY);
  doc.setDrawColor(197, 155, 39);
  doc.setLineWidth(0.3);
  doc.line(contentLeft, currentY + 1.2, contentRight, currentY + 1.2);

  // Metadata row: Receipt No. & Date & Time
  currentY += 8;
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(122, 28, 28);
  doc.text(`Receipt No.: ${data.receiptNo}`, contentLeft, currentY);
  doc.text(`Date & Time: ${data.dateTime}`, contentRight, currentY, {
    align: "right",
  });

  currentY += 7;

  // Structured 2-column bordered table (72% / 28% width — zero clipping)
  const col1W = contentWidth * 0.72;
  const col2W = contentWidth - col1W;
  const x1 = contentLeft;
  const x2 = x1 + col1W;

  const headerH = 9.5;
  doc.setFillColor(246, 238, 220);
  doc.setDrawColor(122, 28, 28);
  doc.setLineWidth(0.35);
  doc.rect(x1, currentY, col1W, headerH, "FD");
  doc.rect(x2, currentY, col2W, headerH, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(122, 28, 28);
  doc.text("Particulars / Seva Details", x1 + 4, currentY + 6.3);
  doc.text("Amount (Rs.)", x2 + col2W - 4, currentY + 6.3, { align: "right" });

  currentY += headerH;

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  const wrappedParticulars = doc.splitTextToSize(particularsText, col1W - 8);
  const rowH = Math.max(14, wrappedParticulars.length * 5.2 + 7);

  doc.setFillColor(255, 253, 247);
  doc.rect(x1, currentY, col1W, rowH, "FD");
  doc.rect(x2, currentY, col2W, rowH, "FD");

  doc.setTextColor(30, 20, 15);
  doc.text(wrappedParticulars, x1 + 4, currentY + 6.8);

  doc.setFont("times", "bold");
  doc.text(formattedAmount, x2 + col2W - 4, currentY + 6.8, { align: "right" });

  currentY += rowH;

  // Total Contribution Row
  const totalH = 10.5;
  doc.setFillColor(246, 238, 220);
  doc.rect(x1, currentY, col1W, totalH, "FD");
  doc.rect(x2, currentY, col2W, totalH, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(122, 28, 28);
  doc.text("Total Contribution", x1 + 4, currentY + 7);
  doc.text(formattedAmount, x2 + col2W - 4, currentY + 7, { align: "right" });

  currentY += totalH + 10;

  // Formal acknowledgement lines with subtle gold underlines
  const drawFormalLine = (label: string, value: string, italic = false) => {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(122, 28, 28);
    doc.text(label, contentLeft, currentY);

    const labelW = doc.getTextWidth(label) + 3;
    doc.setFont("times", italic ? "italic" : "normal");
    doc.setTextColor(30, 20, 15);
    const maxValW = contentWidth - labelW;
    const lines = doc.splitTextToSize(value || "-", maxValW);
    doc.text(lines[0] || "-", contentLeft + labelW, currentY);

    doc.setDrawColor(197, 155, 39);
    doc.setLineWidth(0.25);
    doc.line(
      contentLeft + labelW,
      currentY + 1.5,
      contentRight,
      currentY + 1.5
    );
    currentY += 9.5;
  };

  drawFormalLine("Received with thanks from:", data.donorName);
  drawFormalLine("Amount in words:", formatAmountInWords(data.amount), true);
  drawFormalLine("Payment Mode & Ref:", `${paymentMode} • ${data.paymentId}`);
  drawFormalLine("Contact:", `${data.mobile} | ${data.email}`);
  drawFormalLine("Address:", data.address);

  // Clean centered footer — NO scanned signatures, stamps, or signatory lines
  const footerTextY = IS_TEST_MODE
    ? innerY + innerH - 15
    : innerY + innerH - 8;
  doc.setFont("times", "italic");
  doc.setFontSize(9.5);
  doc.setTextColor(92, 51, 23);
  doc.text(
    "Computer-generated acknowledgement • Signature not required",
    pageWidth / 2,
    footerTextY,
    { align: "center" }
  );

  if (IS_TEST_MODE) {
    const bottomStripH = 8.5;
    const bottomStripY = innerY + innerH - bottomStripH;
    doc.setFillColor(185, 28, 28);
    doc.rect(innerX, bottomStripY, innerW, bottomStripH, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(
      "DEMO / TEST — NOT A VALID RECEIPT",
      pageWidth / 2,
      bottomStripY + 5.7,
      { align: "center" }
    );
  }

  return doc;
}

export async function downloadReceiptPDF(data: ReceiptData): Promise<void> {
  const pdf = await createReceiptPdf(data);
  pdf.save(getReceiptFileName(data));
}
