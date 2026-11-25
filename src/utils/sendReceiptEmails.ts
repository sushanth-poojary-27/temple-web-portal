import {
  createReceiptPdf,
  formatAmountInWords,
  getCleanSevaName,
  getReceiptFileName,
  IS_TEST_MODE,
  resolveReceiptType,
  type EmailDeliveryStatus,
  type ReceiptData,
} from "./generateReceipt";

export async function sendReceiptEmails(
  data: ReceiptData
): Promise<EmailDeliveryStatus> {
  const type = resolveReceiptType(data);
  const fileName = getReceiptFileName(data);
  const amountInWords = formatAmountInWords(data.amount);
  const purposeOrSeva =
    type === "seva" ? getCleanSevaName(data) : data.purpose;
  const paymentMode =
    data.paymentMode ||
    (IS_TEST_MODE ? "Online (Razorpay Test)" : "Online (Razorpay)");

  let pdfBase64 = "";
  try {
    const doc = await createReceiptPdf(data);
    const pdfDataUri = doc.output("datauristring");
    pdfBase64 = pdfDataUri.split(",")[1] || "";
  } catch (err) {
    console.error("[sendReceiptEmails] Failed to generate receipt PDF:", err);
    return { devoteeSent: false, trustSent: false };
  }

  if (!pdfBase64) {
    console.error(
      `[sendReceiptEmails] Refusing to send receipt ${data.receiptNo}: empty pdfBase64.`
    );
    return { devoteeSent: false, trustSent: false };
  }

  try {
    const response = await fetch("/api/send-receipt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        receiptNo: data.receiptNo,
        donorName: data.donorName,
        donorEmail: data.email,
        donorPhone: data.mobile,
        donorAddress: data.address,
        amount: data.amount,
        amountInWords,
        purposeOrSeva,
        sevaDate: data.sevaDate,
        paymentId: data.paymentId,
        paymentMode,
        timestamp: data.dateTime,
        pdfBase64,
        fileName,
        receipt: data,
      }),
    });

    if (!response.ok) {
      console.error(
        `[sendReceiptEmails] /api/send-receipt failed with HTTP ${response.status}`
      );
      return { devoteeSent: false, trustSent: false };
    }

    const apiResult = (await response.json()) as {
      devoteeSent?: boolean;
      trustSent?: boolean;
      configured?: boolean;
    };

    if (!apiResult.configured) {
      console.error(
        "[sendReceiptEmails] Server SMTP mailer is not configured."
      );
      return { devoteeSent: false, trustSent: false };
    }

    return {
      devoteeSent: Boolean(apiResult.devoteeSent),
      trustSent: Boolean(apiResult.trustSent),
    };
  } catch (err) {
    console.error("[sendReceiptEmails] Error calling /api/send-receipt:", err);
    return { devoteeSent: false, trustSent: false };
  }
}
