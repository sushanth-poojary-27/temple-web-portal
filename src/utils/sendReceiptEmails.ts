import emailjs from "@emailjs/browser";
import type { EmailDeliveryStatus, ReceiptData } from "./generateReceipt";

export async function sendReceiptEmails(
  data: ReceiptData
): Promise<EmailDeliveryStatus> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

  if (!serviceId || !templateId || !publicKey) {
    return { devoteeSent: false, trustSent: false };
  }

  const isSeva = Boolean(data.sevaDate && data.sevaDate !== "N/A");

  // Email 1 — Devotee Confirmation (to_email: data.email)
  const devoteeSubject = isSeva
    ? `Seva Booking Receipt (${data.receiptNo}) - Shree Durgaparameshwari Sannidhana, Ullur`
    : `Contribution Receipt (${data.receiptNo}) - Shree Durgaparameshwari Sannidhana, Ullur`;

  const devoteeGreeting = isSeva
    ? `Dear ${data.donorName}, thank you for booking ${data.purpose} at Shree Durgaparameshwari Sannidhana (Regd.), Ullur.`
    : `Dear ${data.donorName}, thank you for your donation to Shree Durgaparameshwari Sannidhana (Regd.), Ullur.`;

  const devoteeMessage = [
    devoteeGreeting,
    "",
    "--- TRANSACTION RECEIPT SUMMARY ---",
    `Receipt No.: ${data.receiptNo}`,
    `Seva / Fund Name: ${data.purpose}`,
    `Preferred Seva Date: ${data.sevaDate || "N/A"}`,
    `Amount Paid: Rs. ${data.amount}/-`,
    `Razorpay Payment ID: ${data.paymentId}`,
    `Date & Time: ${data.dateTime}`,
    "",
    "Temple Address:",
    "Shree Durgaparameshwari Sannidhana (Regd.)",
    "Post Kemundel, Ulluru Village, Yellur, Udupi District, Karnataka - 574119",
    "Plus Code: 5Q7W+92R | Email: shridurgaparameshwariullur@gmail.com",
    "",
    "NOTE: DEMO / TEST, not a valid receipt (OJT Prototype Simulation).",
  ].join("\n");

  const devoteeParams = {
    to_email: data.email,
    name: data.donorName,
    subject: devoteeSubject,
    greeting: devoteeGreeting,
    message: devoteeMessage,
    receipt_no: data.receiptNo,
    purpose: data.purpose,
    seva_date: data.sevaDate || "N/A",
    amount: `Rs. ${data.amount}/-`,
    payment_id: data.paymentId,
    date_time: data.dateTime,
  };

  // Email 2 — Temple Trust Notification (to_email: 'shridurgaparameshwariullur@gmail.com')
  const trustSubject = isSeva
    ? `[DEMO/TEST] ${data.donorName} booked ${data.purpose} - Rs.${data.amount} (${data.receiptNo})`
    : `[DEMO/TEST] ${data.donorName} donated Rs. ${data.amount} (${data.receiptNo})`;

  const trustGreeting = isSeva
    ? `${data.donorName} booked ${data.purpose} (Rs. ${data.amount}) for ${data.sevaDate}.`
    : `${data.donorName} donated Rs. ${data.amount} towards ${data.purpose}.`;

  const trustMessage = [
    trustGreeting,
    "",
    "--- FULL DEVOTEE & PAYMENT RECORD ---",
    `Receipt No.: ${data.receiptNo}`,
    `Devotee Name: ${data.donorName}`,
    `Mobile: ${data.mobile}`,
    `Email: ${data.email}`,
    `Postal Address: ${data.address}`,
    `Seva / Fund Chosen: ${data.purpose}`,
    `Preferred Seva Date: ${data.sevaDate || "N/A"}`,
    `Amount Paid: Rs. ${data.amount}/-`,
    `Razorpay Payment ID: ${data.paymentId}`,
    `Date & Time: ${data.dateTime}`,
    "",
    "NOTE: DEMO / TEST, not a valid receipt.",
  ].join("\n");

  const trustParams = {
    to_email: "shridurgaparameshwariullur@gmail.com",
    name: data.donorName,
    subject: trustSubject,
    greeting: trustGreeting,
    message: trustMessage,
    receipt_no: data.receiptNo,
    purpose: data.purpose,
    seva_date: data.sevaDate || "N/A",
    amount: `Rs. ${data.amount}/-`,
    payment_id: data.paymentId,
    date_time: data.dateTime,
  };

  try {
    const [devoteeResult, trustResult] = await Promise.allSettled([
      emailjs.send(serviceId, templateId, devoteeParams, { publicKey }),
      emailjs.send(serviceId, templateId, trustParams, { publicKey }),
    ]);

    return {
      devoteeSent: devoteeResult.status === "fulfilled",
      trustSent: trustResult.status === "fulfilled",
    };
  } catch {
    return { devoteeSent: false, trustSent: false };
  }
}
