import { jsPDF } from "jspdf";

export interface EmailDeliveryStatus {
  devoteeSent: boolean;
  trustSent: boolean;
}

export interface ReceiptData {
  receiptNo: string;
  paymentId: string;
  dateTime: string;
  donorName: string;
  mobile: string;
  email: string;
  address: string;
  purpose: string;
  sevaDate: string;
  amount: number;
  emailStatus?: EmailDeliveryStatus;
}

const TRUST_LOGO_PATH = "/trust-logo.png";

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

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
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
        // Fill warm ivory background (#FFFDF7) before JPEG compression
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
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const outerX = 12;
  const outerY = 12;
  const outerW = pageWidth - 24; // 186mm
  const outerH = 258;

  const innerX = outerX + 2.2;
  const innerY = outerY + 2.2;
  const innerW = outerW - 4.4;
  const innerH = outerH - 4.4;

  const contentLeft = innerX + 8;
  const contentRight = innerX + innerW - 8;
  const contentWidth = contentRight - contentLeft;

  // 1. Warm Ivory Paper Voucher Background (#FFFDF7) & Classic Double Border
  doc.setFillColor(255, 253, 247); // #FFFDF7
  doc.rect(outerX, outerY, outerW, outerH, "F");

  // Outer thick maroon border (#7A1C1C)
  doc.setDrawColor(122, 28, 28); // #7A1C1C
  doc.setLineWidth(1.2);
  doc.rect(outerX, outerY, outerW, outerH, "S");

  // Inner thin gold border (#B8860B)
  doc.setDrawColor(184, 134, 11); // #B8860B
  doc.setLineWidth(0.4);
  doc.rect(innerX, innerY, innerW, innerH, "S");

  // 2. Top Red Warning Strip inside inner border
  doc.setFillColor(185, 28, 28); // red-700
  doc.rect(innerX, innerY, innerW, 9, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(
    "DEMO / TEST RECEIPT — NOT A VALID TAX RECEIPT",
    pageWidth / 2,
    innerY + 6,
    { align: "center" }
  );

  // 3. Subtle Diagonal Watermark across center
  doc.setTextColor(235, 224, 210);
  doc.setFont("times", "bold");
  doc.setFontSize(25);
  doc.text("DEMO / TEST — NOT FOR LEGAL USE", pageWidth / 2, 152, {
    align: "center",
    angle: 28,
  });

  // 4. Centered trust-logo Image (compressed JPEG with FAST mode)
  let currentY = innerY + 14;
  const logoDataUrl = await loadImageAsJpegDataUrl(TRUST_LOGO_PATH);
  if (logoDataUrl) {
    const logoSize = 22;
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
    currentY += 6;
  }

  // 5. Bold Serif Title & Verified Temple Address
  doc.setTextColor(122, 28, 28); // #7A1C1C
  doc.setFont("times", "bold");
  doc.setFontSize(15.5);
  doc.text(
    "SHREE DURGAPARAMESHWARI SANNIDHANA (REGD.)",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );

  currentY += 5.5;
  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.setTextColor(80, 30, 20);
  doc.text(
    "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );

  currentY += 4.5;
  doc.setFontSize(9);
  doc.text(
    "Plus Code: 5Q7W+92R | Email: shridurgaparameshwariullur@gmail.com",
    pageWidth / 2,
    currentY,
    { align: "center" }
  );

  // Underlined Uppercase Heading: SEVA & DONATION RECEIPT
  currentY += 8;
  doc.setFont("times", "bold");
  doc.setFontSize(12);
  doc.setTextColor(122, 28, 28);
  const headingText = "SEVA & DONATION RECEIPT";
  doc.text(headingText, pageWidth / 2, currentY, { align: "center" });
  const headingW = doc.getTextWidth(headingText);
  doc.setDrawColor(122, 28, 28);
  doc.setLineWidth(0.4);
  doc.line(
    (pageWidth - headingW) / 2,
    currentY + 1,
    (pageWidth + headingW) / 2,
    currentY + 1
  );

  // Double horizontal rule below header
  currentY += 5;
  doc.setDrawColor(122, 28, 28);
  doc.setLineWidth(0.5);
  doc.line(contentLeft, currentY, contentRight, currentY);
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(0.3);
  doc.line(contentLeft, currentY + 1.2, contentRight, currentY + 1.2);

  // 6. Top Metadata Row: Receipt No. (Left) and Date & Time (Right)
  currentY += 8;
  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(122, 28, 28);
  doc.text(`Receipt No.: ${data.receiptNo}`, contentLeft, currentY);
  doc.text(`Date & Time: ${data.dateTime}`, contentRight, currentY, {
    align: "right",
  });

  // 7. Classic Printed Voucher Lines with Subtle Bottom Underlines
  currentY += 9;
  const drawVoucherLine = (label: string, value: string) => {
    doc.setFont("times", "bold");
    doc.setFontSize(10);
    doc.setTextColor(90, 25, 25);
    doc.text(label, contentLeft, currentY);

    const labelW = doc.getTextWidth(label) + 2;
    doc.setFont("times", "normal");
    doc.setTextColor(30, 20, 15);
    const maxValW = contentWidth - labelW;
    const truncatedVal = doc.splitTextToSize(value || "-", maxValW)[0] || "-";
    doc.text(truncatedVal, contentLeft + labelW, currentY);

    // Subtle bottom underline across the value
    doc.setDrawColor(184, 134, 11); // #B8860B
    doc.setLineWidth(0.25);
    doc.line(
      contentLeft + labelW,
      currentY + 1.5,
      contentRight,
      currentY + 1.5
    );
    currentY += 9;
  };

  drawVoucherLine(
    "Received with thanks from Sri / Smt.:",
    data.donorName
  );
  drawVoucherLine(
    "Mobile & Email:",
    `Mobile: ${data.mobile}  |  Email: ${data.email}`
  );
  drawVoucherLine("Address:", data.address);
  drawVoucherLine(
    "Payment Ref (Razorpay Test ID):",
    `${data.paymentId} (Online - Test Mode)`
  );

  currentY += 2;

  // 8. Sharp Particulars Grid (1px solid #7A1C1C, sharp corners)
  const col1W = 18; // Sl. No.
  const col2W = contentWidth - 18 - 34 - 36; // Particulars (Seva / Fund)
  const col3W = 34; // Seva Date
  const col4W = 36; // Amount (Rs.)

  const x1 = contentLeft;
  const x2 = x1 + col1W;
  const x3 = x2 + col2W;
  const x4 = x3 + col3W;

  // Table Header
  const headerH = 9.5;
  doc.setFillColor(246, 238, 220);
  doc.setDrawColor(122, 28, 28); // #7A1C1C
  doc.setLineWidth(0.35);
  doc.rect(x1, currentY, col1W, headerH, "FD");
  doc.rect(x2, currentY, col2W, headerH, "FD");
  doc.rect(x3, currentY, col3W, headerH, "FD");
  doc.rect(x4, currentY, col4W, headerH, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(122, 28, 28);
  doc.text("Sl. No.", x1 + col1W / 2, currentY + 6.2, { align: "center" });
  doc.text("Particulars (Seva / Fund)", x2 + 3, currentY + 6.2);
  doc.text("Seva Date", x3 + col3W / 2, currentY + 6.2, { align: "center" });
  doc.text("Amount (Rs.)", x4 + col4W - 3, currentY + 6.2, { align: "right" });

  currentY += headerH;

  // Table Body Row
  const rowH = 13;
  doc.setFillColor(255, 253, 247);
  doc.rect(x1, currentY, col1W, rowH, "FD");
  doc.rect(x2, currentY, col2W, rowH, "FD");
  doc.rect(x3, currentY, col3W, rowH, "FD");
  doc.rect(x4, currentY, col4W, rowH, "FD");

  doc.setFont("times", "normal");
  doc.setFontSize(10);
  doc.setTextColor(30, 20, 15);
  doc.text("1", x1 + col1W / 2, currentY + 8, { align: "center" });

  doc.setFont("times", "bold");
  doc.text(data.purpose, x2 + 3, currentY + 8);

  doc.setFont("times", "normal");
  doc.text(data.sevaDate || "N/A", x3 + col3W / 2, currentY + 8, {
    align: "center",
  });

  doc.setFont("times", "bold");
  doc.text(
    `Rs. ${Number(data.amount).toLocaleString("en-IN")}/-`,
    x4 + col4W - 3,
    currentY + 8,
    { align: "right" }
  );

  currentY += rowH;

  // Total Paid Row
  const totalH = 10.5;
  doc.setFillColor(246, 238, 220);
  doc.rect(x1, currentY, col1W + col2W + col3W, totalH, "FD");
  doc.rect(x4, currentY, col4W, totalH, "FD");

  doc.setFont("times", "bold");
  doc.setFontSize(10.5);
  doc.setTextColor(122, 28, 28);
  doc.text("Total Paid", x3 + col3W - 3, currentY + 7, { align: "right" });
  doc.text(
    `Rs. ${Number(data.amount).toLocaleString("en-IN")}/-`,
    x4 + col4W - 3,
    currentY + 7,
    { align: "right" }
  );

  currentY += totalH + 8;

  // Amount in Words Line
  const wordsText = formatAmountInWords(data.amount);
  doc.setFont("times", "bold");
  doc.setFontSize(10);
  doc.setTextColor(122, 28, 28);
  doc.text("Amount in Words:", contentLeft, currentY);
  const wordsLabelW = doc.getTextWidth("Amount in Words:") + 3;
  doc.setFont("times", "italic");
  doc.setTextColor(30, 20, 15);
  doc.text(wordsText, contentLeft + wordsLabelW, currentY);
  doc.setDrawColor(184, 134, 11);
  doc.setLineWidth(0.25);
  doc.line(
    contentLeft + wordsLabelW,
    currentY + 1.5,
    contentRight,
    currentY + 1.5
  );

  // 9. Right-Aligned Signature Line (No official seals or stamps)
  const sigY = outerY + outerH - 22;
  doc.setDrawColor(122, 28, 28);
  doc.setLineWidth(0.35);
  doc.line(contentRight - 62, sigY - 5, contentRight, sigY - 5);
  doc.setFont("times", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(122, 28, 28);
  doc.text("Authorized Signatory (DEMO / TEST ONLY)", contentRight, sigY, {
    align: "right",
  });

  doc.setFont("times", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 40, 30);
  doc.text(
    "Note: Test Mode simulation only. No legal or tax validity.",
    contentLeft,
    sigY
  );

  // 10. Bottom Red Disclaimer Strip
  const bottomStripH = 9;
  const bottomStripY = innerY + innerH - bottomStripH;
  doc.setFillColor(185, 28, 28);
  doc.rect(innerX, bottomStripY, innerW, bottomStripH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text(
    "DEMO / TEST, not a valid receipt",
    pageWidth / 2,
    bottomStripY + 6,
    { align: "center" }
  );

  return doc;
}

export async function downloadReceiptPDF(data: ReceiptData): Promise<void> {
  const isSeva = Boolean(data.sevaDate && data.sevaDate !== "N/A");
  const receiptNumber = data.receiptNo.split("-").pop() || data.receiptNo;
  const pdfFileName = isSeva
    ? `Seva-Receipt-${receiptNumber}.pdf`
    : `Donation-Receipt-${receiptNumber}.pdf`;
  const pdf = await createReceiptPdf(data);
  pdf.save(pdfFileName);
}
