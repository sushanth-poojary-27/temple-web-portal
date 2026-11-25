import {
  formatAmountInWords,
  getCleanSevaName,
  getReceiptFileName,
  resolveReceiptType,
  type ReceiptData,
} from "./generateReceipt";

export const TRUST_OFFICIAL_EMAIL = "shridurgaparameshwariullur@gmail.com";

export interface ReceiptEmailContent {
  fileName: string;
  replyTo: string;
  trustEmail: string;
  senderDisplayName: string;
  devoteeSubject: string;
  devoteeText: string;
  devoteeHtml: string;
  trustSubject: string;
  trustText: string;
  trustHtml: string;
}

function escapeHtml(value: string): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPlainLetterText(blocks: string[][]): string {
  return blocks.map((lines) => lines.join("\n")).join("\n\n");
}

function renderPlainLetterHtml(blocks: string[][]): string {
  const paragraphs = blocks
    .map((lines, index) => {
      const marginStyle =
        index === blocks.length - 1 ? "margin: 0;" : "margin: 0 0 14px 0;";
      const body = lines.map((line) => escapeHtml(line)).join("<br />");
      return `  <p style="${marginStyle}">${body}</p>`;
    })
    .join("\n");

  return [
    `<div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #222222;">`,
    paragraphs,
    `</div>`,
  ].join("\n");
}

export function buildReceiptEmailContent(
  data: ReceiptData
): ReceiptEmailContent {
  const type = resolveReceiptType(data);
  const isSeva = type === "seva";
  const sevaName = getCleanSevaName(data);
  const formattedAmount = Number(data.amount).toLocaleString("en-IN");
  const amountInWords = formatAmountInWords(data.amount);
  const fileName = getReceiptFileName(data);
  const scheduledDate = data.sevaDate || "N/A";
  const purposeDisplay = data.purpose || "Education & General Trust Fund";

  const senderDisplayName = isSeva
    ? "Shree Durgaparameshwari Sannidhana, Ullur"
    : "Shree Durga Parameshwari Sannidhana Trust";

  const devoteeSubject = isSeva
    ? `Seva Booking Confirmation & Receipt (#${data.receiptNo}) - Shree Durgaparameshwari Sannidhana`
    : `Donation Receipt (#${data.receiptNo}) - Shree Durga Parameshwari Sannidhana Trust`;

  const devoteeBlocks: string[][] = isSeva
    ? [
        [`Namaskara ${data.donorName},`],
        [
          `Your sankalpa and booking for ${sevaName} scheduled on ${scheduledDate} have been received and recorded at Shree Durgaparameshwari Sannidhana, Ullur.`,
        ],
        [
          `Please find your official seva booking receipt attached to this email as a PDF (${fileName}).`,
        ],
        [
          "May Goddess Durgaparameshwari bless you and your family with peace, health, and prosperity.",
        ],
        [
          "Shree Durgaparameshwari Sannidhana, Ullur",
          "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
        ],
      ]
    : [
        [`Namaskara ${data.donorName},`],
        [
          `Thank you for your generous contribution of ₹ ${formattedAmount} (${amountInWords}) towards ${purposeDisplay} at Shree Durga Parameshwari Sannidhana Trust.`,
        ],
        [
          "Your kind support helps needy students, strengthens educational initiatives, and sustains community welfare programs.",
        ],
        [
          `Please find your official donation receipt attached to this email as a PDF (${fileName}).`,
        ],
        [
          "With prayers and blessings of Goddess Durgaparameshwari,",
          "Shree Durga Parameshwari Sannidhana Trust",
          "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
        ],
      ];

  const trustSubject = isSeva
    ? `New Seva Booking (#${data.receiptNo}) - ${data.donorName} (${sevaName})`
    : `New Trust Donation (#${data.receiptNo}) - ${data.donorName} (₹ ${formattedAmount})`;

  const trustBlocks: string[][] = isSeva
    ? [
        ["Namaskara Trust Office,"],
        [
          `A new online seva booking has been recorded for ${data.donorName}. Please find the official PDF receipt attached (${fileName}).`,
        ],
        [
          `Receipt No.: ${data.receiptNo}`,
          `Date & Time: ${data.dateTime}`,
          `Seva Booked: ${sevaName}`,
          `Scheduled Date: ${scheduledDate}`,
          `Amount: ₹ ${formattedAmount} (${amountInWords})`,
          `Payment Ref: ${data.paymentId}`,
          `Devotee Name: ${data.donorName}`,
          `Email: ${data.email}`,
          `Mobile: ${data.mobile}`,
          `Address: ${data.address || "-"}`,
        ],
        [
          "Shree Durgaparameshwari Sannidhana, Ullur",
          "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
        ],
      ]
    : [
        ["Namaskara Trust Office,"],
        [
          `A new online contribution of ₹ ${formattedAmount} has been received from ${data.donorName}. Please find the official PDF receipt attached (${fileName}).`,
        ],
        [
          `Receipt No.: ${data.receiptNo}`,
          `Date & Time: ${data.dateTime}`,
          `Purpose: ${purposeDisplay}`,
          `Amount: ₹ ${formattedAmount} (${amountInWords})`,
          `Payment Ref: ${data.paymentId}`,
          `Donor Name: ${data.donorName}`,
          `Email: ${data.email}`,
          `Mobile: ${data.mobile}`,
          `Address: ${data.address || "-"}`,
        ],
        [
          "Shree Durga Parameshwari Sannidhana Trust",
          "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
        ],
      ];

  return {
    fileName,
    replyTo: TRUST_OFFICIAL_EMAIL,
    trustEmail: TRUST_OFFICIAL_EMAIL,
    senderDisplayName,
    devoteeSubject,
    devoteeText: renderPlainLetterText(devoteeBlocks),
    devoteeHtml: renderPlainLetterHtml(devoteeBlocks),
    trustSubject,
    trustText: renderPlainLetterText(trustBlocks),
    trustHtml: renderPlainLetterHtml(trustBlocks),
  };
}
