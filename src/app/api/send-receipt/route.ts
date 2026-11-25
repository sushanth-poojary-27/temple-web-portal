import { NextResponse } from "next/server";
import nodemailer, { type Transporter } from "nodemailer";
import type { ReceiptData, ReceiptType } from "@/utils/generateReceipt";
import { buildReceiptEmailContent } from "@/utils/receiptEmailTemplates";


interface SendReceiptRequestBody {
  receipt?: ReceiptData;
  type?: ReceiptType;
  receiptNo?: string;
  donorName?: string;
  donorEmail?: string;
  donorPhone?: string;
  donorAddress?: string;
  amount?: number;
  amountInWords?: string;
  purposeOrSeva?: string;
  sevaDate?: string;
  paymentId?: string;
  paymentMode?: string;
  timestamp?: string;
  pdfBase64?: string;
  fileName?: string;
}

function formatFromAddress(displayName: string, fallbackEmail: string): string {
  const configured =
    process.env.EMAIL_FROM ||
    process.env.RECEIPT_FROM_EMAIL ||
    fallbackEmail;
  const trimmed = configured.trim().replace(/^["']|["']$/g, "");
  if (trimmed.includes("<") && trimmed.includes(">")) {
    return trimmed;
  }
  return `"${displayName}" <${trimmed}>`;
}

function normalizeReceiptData(body: SendReceiptRequestBody): ReceiptData | null {
  if (body.receipt && body.receipt.receiptNo && body.receipt.email) {
    return body.receipt;
  }

  if (!body.receiptNo || !body.donorEmail) {
    return null;
  }

  const resolvedType: ReceiptType =
    body.type === "seva" || body.type === "donation"
      ? body.type
      : body.sevaDate && body.sevaDate !== "N/A"
        ? "seva"
        : "donation";

  return {
    type: resolvedType,
    receiptNo: body.receiptNo,
    paymentId: body.paymentId || "-",
    paymentMode: body.paymentMode,
    dateTime: body.timestamp || new Date().toLocaleString("en-IN"),
    donorName: body.donorName || "Devotee",
    mobile: body.donorPhone || "-",
    email: body.donorEmail,
    address: body.donorAddress || "-",
    purpose:
      body.purposeOrSeva ||
      (resolvedType === "seva"
        ? "Seva Booking"
        : "Education & General Trust Fund"),
    sevaName:
      resolvedType === "seva"
        ? (body.purposeOrSeva || "").replace(/^Seva Booking:\s*/i, "").trim()
        : undefined,
    sevaDate: body.sevaDate || "N/A",
    amount: Number(body.amount) || 0,
  };
}

async function sendViaNodemailerWithPdf(params: {
  transporter: Transporter;
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  fileName: string;
  pdfBuffer: Buffer;
}): Promise<{ sent: boolean; withAttachment: boolean }> {
  try {
    await params.transporter.sendMail({
      from: params.from,
      to: params.to,
      replyTo: params.replyTo,
      subject: params.subject,
      html: params.html,
      text: params.text,
      attachments: [
        {
          filename: params.fileName,
          content: params.pdfBuffer,
          contentType: "application/pdf",
        },
      ],
    });
    return { sent: true, withAttachment: true };
  } catch (err) {
    console.error("[/api/send-receipt] Nodemailer PDF delivery failed:", err);
    return { sent: false, withAttachment: false };
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SendReceiptRequestBody;
    const receipt = normalizeReceiptData(body);

    if (!receipt) {
      return NextResponse.json(
        {
          devoteeSent: false,
          trustSent: false,
          attachmentSent: false,
          configured: false,
          error: "Missing receipt metadata or donorEmail",
        },
        { status: 400 }
      );
    }

    const cleanPdfBase64 = (body.pdfBase64 || "")
      .replace(/^data:application\/pdf;[^,]*base64,/, "")
      .trim();

    if (!cleanPdfBase64) {
      return NextResponse.json({ error: "Missing PDF" }, { status: 400 });
    }

    const pdfBuffer = Buffer.from(cleanPdfBase64, "base64");
    if (pdfBuffer.length === 0) {
      return NextResponse.json({ error: "Missing PDF" }, { status: 400 });
    }

    const smtpHost = (process.env.SMTP_HOST || "").trim();
    const smtpPort = Number((process.env.SMTP_PORT || "465").trim());
    const smtpUser = (process.env.SMTP_USER || "").trim();
    const smtpPass = (process.env.SMTP_PASS || "").trim();

    if (!smtpHost || !smtpUser || !smtpPass) {
      console.warn(
        "[/api/send-receipt] SMTP environment variables (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) are not configured."
      );
      return NextResponse.json(
        {
          devoteeSent: false,
          trustSent: false,
          attachmentSent: false,
          configured: false,
          error: "SMTP not configured",
        },
        { status: 500 }
      );
    }

    const content = buildReceiptEmailContent(receipt);
    const fileName = body.fileName || `Receipt-${receipt.receiptNo}.pdf`;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const from = formatFromAddress(content.senderDisplayName, smtpUser);

    const [devoteeOutcome, trustOutcome] = await Promise.all([
      sendViaNodemailerWithPdf({
        transporter,
        from,
        to: receipt.email,
        replyTo: content.replyTo,
        subject: content.devoteeSubject,
        html: content.devoteeHtml,
        text: content.devoteeText,
        fileName,
        pdfBuffer,
      }),
      sendViaNodemailerWithPdf({
        transporter,
        from,
        to: content.trustEmail,
        replyTo: content.replyTo,
        subject: content.trustSubject,
        html: content.trustHtml,
        text: content.trustText,
        fileName,
        pdfBuffer,
      }),
    ]);

    return NextResponse.json({
      devoteeSent: devoteeOutcome.sent,
      trustSent: trustOutcome.sent,
      attachmentSent:
        devoteeOutcome.withAttachment && trustOutcome.withAttachment,
      configured: true,
    });
  } catch (error) {
    console.error("[/api/send-receipt] Unexpected error:", error);
    return NextResponse.json(
      {
        devoteeSent: false,
        trustSent: false,
        attachmentSent: false,
        configured: false,
      },
      { status: 500 }
    );
  }
}
