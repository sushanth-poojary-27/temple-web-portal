"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CreditCard,
  IndianRupee,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles,
  User,
} from "lucide-react";
import { siteData } from "@/data/siteData";
import type { ReceiptData } from "@/utils/generateReceipt";
import { sendReceiptEmails } from "@/utils/sendReceiptEmails";

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface RazorpayFailureResponse {
  error?: {
    code?: string;
    description?: string;
    reason?: string;
  };
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image?: string;
  handler: (response: RazorpaySuccessResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color: string;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (
    event: "payment.failed",
    callback: (response: RazorpayFailureResponse) => void
  ) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface TrustDonationFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  amount: string;
}

interface TrustDonationErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  amount?: string;
}

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const QUICK_AMOUNTS = [101, 501, 1001, 2501, 5001];

const INITIAL_FORM_DATA: TrustDonationFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  amount: "501",
};

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && window.Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true));
      existingScript.addEventListener("error", () => resolve(false));
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function EducationTrustDonationPage() {
  const router = useRouter();
  const [formData, setFormData] =
    useState<TrustDonationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<TrustDonationErrors>({});
  const [isLoadingGateway, setIsLoadingGateway] = useState(false);
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState<
    string | null
  >(null);

  const numericAmount = Number(formData.amount);
  const displayAmount =
    !Number.isNaN(numericAmount) && numericAmount >= 10 ? numericAmount : 0;

  const validateField = (
    field: keyof TrustDonationFormData,
    value: string
  ): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full Name is required.";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters.";
        return undefined;
      case "phone":
        if (!value.trim()) return "10-digit mobile number is required.";
        if (!INDIAN_MOBILE_REGEX.test(value.trim())) {
          return "Enter a valid 10-digit Indian mobile number (starting with 6-9).";
        }
        return undefined;
      case "email":
        if (!value.trim()) return "Email ID is required.";
        if (!EMAIL_REGEX.test(value.trim())) {
          return "Enter a valid Email ID.";
        }
        return undefined;
      case "address":
        if (!value.trim()) return "Full Address is required.";
        if (value.trim().length < 8)
          return "Please enter your complete postal address.";
        return undefined;
      case "amount": {
        if (!value.trim()) return "Contribution amount is required.";
        const num = Number(value);
        if (Number.isNaN(num) || num < 10) {
          return "Minimum contribution amount is ₹10.";
        }
        return undefined;
      }
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: TrustDonationErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      email: validateField("email", formData.email),
      address: validateField("address", formData.address),
      amount: validateField("amount", formData.amount),
    };

    Object.keys(newErrors).forEach((key) => {
      const k = key as keyof TrustDonationErrors;
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof TrustDonationFormData;

    if (gatewayError) setGatewayError(null);
    if (paymentFailedMessage) setPaymentFailedMessage(null);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    const fieldError = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  const handleQuickAmountSelect = (chipAmount: number) => {
    if (gatewayError) setGatewayError(null);
    if (paymentFailedMessage) setPaymentFailedMessage(null);

    const amountStr = String(chipAmount);
    setFormData((prev) => ({
      ...prev,
      amount: amountStr,
    }));
    setErrors((prev) => ({
      ...prev,
      amount: undefined,
    }));
  };

  const openRazorpayGateway = async () => {
    setGatewayError(null);
    setPaymentFailedMessage(null);

    if (!validateAll()) {
      return;
    }

    setIsLoadingGateway(true);

    try {
      const loaded = await loadRazorpayScript();
      if (!loaded || !window.Razorpay) {
        setGatewayError(
          "Failed to load Razorpay Checkout SDK. Please check your internet connection."
        );
        setIsLoadingGateway(false);
        return;
      }

      const razorpayKey =
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        process.env.NEXT_PUBLIC_RAZORPAY_TEST_KEY_ID ||
        "";

      if (!razorpayKey) {
        setGatewayError(
          "Razorpay Test Key ID (NEXT_PUBLIC_RAZORPAY_KEY_ID) is not configured in .env.local."
        );
        setIsLoadingGateway(false);
        return;
      }

      const finalAmount = Math.round(Number(formData.amount));

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: finalAmount * 100, // Amount in paise
        currency: "INR",
        name: siteData.trustName,
        description: `DEMO / TEST Donation: Education & General Trust Fund (₹${finalAmount})`,
        image: `${window.location.origin}/trust-logo.png`,
        handler: async (response: RazorpaySuccessResponse) => {
          console.log(response.razorpay_payment_id);
          const now = new Date();
          const receiptData: ReceiptData = {
            receiptNo: `DEMO-TRUST-${now.getTime().toString().slice(-6)}`,
            paymentId: response.razorpay_payment_id,
            dateTime: now.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }),
            donorName: formData.name.trim(),
            mobile: formData.phone.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            purpose: "Education & General Trust Fund",
            sevaDate: "N/A",
            amount: finalAmount,
          };

          const emailStatus = await sendReceiptEmails(receiptData);
          sessionStorage.setItem(
            "latest_receipt",
            JSON.stringify({ ...receiptData, emailStatus })
          );
          router.push("/donate/seva/receipt");
        },
        prefill: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          contact: formData.phone.trim(),
        },
        notes: {
          fund_type: "Education & General Trust Fund",
          amount_inr: String(finalAmount),
          donor_address: formData.address.trim(),
          mode: "DEMO / TEST, not a valid receipt",
        },
        theme: {
          color: "#d97706",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (failure: RazorpayFailureResponse) => {
        const desc =
          failure?.error?.description ||
          "Your test payment could not be completed. No amount was deducted.";
        setPaymentFailedMessage(desc);
      });
      rzp.open();
    } catch {
      setGatewayError(
        "Unable to initialize Razorpay Checkout modal. Please try again."
      );
    } finally {
      setIsLoadingGateway(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await openRazorpayGateway();
  };

  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Top Back to Home Link & Test Mode Notice */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-amber-900 border border-amber-300 shadow-sm hover:bg-amber-600 hover:text-white hover:border-amber-600 transition-colors"
          >
            <span>← Back to Home</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-200/80 px-3.5 py-1 text-xs font-extrabold uppercase tracking-wider text-amber-900 border border-amber-400">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>DEMO / TEST, not a valid receipt</span>
          </span>
        </div>

        {/* Page Header */}
        <div className="rounded-3xl bg-amber-900 text-amber-50 p-6 sm:p-8 border-2 border-amber-600 shadow-md space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>{siteData.trustName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Education & General Trust Fund
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Support student scholarships, educational assistance, Annadana, and
            temple preservation initiatives at {siteData.shortName}.
          </p>
        </div>

        {/* Donation Form Card */}
        <div className="rounded-3xl bg-white p-6 sm:p-10 border-2 border-amber-200 shadow-sm space-y-6">
          {/* Payment Failed Alert Banner with Try Again Button */}
          {paymentFailedMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-red-50 p-5 border-2 border-red-400 text-red-900"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm space-y-1">
                  <p className="font-bold text-base">Payment Failed</p>
                  <p className="text-red-800">{paymentFailedMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={openRazorpayGateway}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-red-700 transition-colors shrink-0"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
            </div>
          )}

          {/* Gateway / Configuration Error Alert */}
          {gatewayError && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-start gap-3 rounded-2xl bg-red-50 p-4 border border-red-300 text-red-900"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-bold">Payment Gateway Notice</p>
                <p className="text-red-800">{gatewayError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Contribution Amount (₹) with Quick-Select Chips */}
            <div className="space-y-3 rounded-2xl bg-amber-50/80 p-5 border border-amber-200">
              <label
                htmlFor="trust-amount"
                className="block text-sm font-bold text-amber-900"
              >
                Contribution Amount (₹) <span className="text-red-600">*</span>{" "}
                <span className="text-xs font-medium text-amber-700">
                  (Minimum ₹10)
                </span>
              </label>

              {/* Quick-Select Amount Chips */}
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((chip) => {
                  const isSelected = Number(formData.amount) === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => handleQuickAmountSelect(chip)}
                      className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-bold border transition-all ${
                        isSelected
                          ? "bg-amber-600 text-white border-amber-600 shadow-sm"
                          : "bg-white text-amber-900 border-amber-300 hover:border-amber-600"
                      }`}
                    >
                      ₹{chip}
                    </button>
                  );
                })}
              </div>

              <div className="relative">
                <IndianRupee className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="trust-amount"
                  name="amount"
                  type="number"
                  min={10}
                  step={1}
                  required
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="Enter amount in ₹ (min ₹10)"
                  className={`w-full rounded-xl bg-white pl-10 pr-4 py-3 text-base font-bold text-amber-900 border focus:outline-none focus:ring-2 ${
                    errors.amount
                      ? "border-red-500 focus:ring-red-500"
                      : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                  }`}
                />
              </div>
              {errors.amount && (
                <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.amount}</span>
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="trust-name"
                  className="block text-sm font-bold text-amber-900"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="trust-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter donor full name"
                    className={`w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* 10-Digit Indian Mobile Number */}
              <div className="space-y-2">
                <label
                  htmlFor="trust-phone"
                  className="block text-sm font-bold text-amber-900"
                >
                  10-Digit Mobile Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="trust-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Email ID */}
            <div className="space-y-2">
              <label
                htmlFor="trust-email"
                className="block text-sm font-bold text-amber-900"
              >
                Email ID <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="trust-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="donor@example.com"
                  className={`w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Full Address */}
            <div className="space-y-2">
              <label
                htmlFor="trust-address"
                className="block text-sm font-bold text-amber-900"
              >
                Full Address <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="trust-address"
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete postal address with Pincode"
                  className={`w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 ${
                    errors.address
                      ? "border-red-500 focus:ring-red-500"
                      : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                  }`}
                />
              </div>
              {errors.address && (
                <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{errors.address}</span>
                </p>
              )}
            </div>

            {/* Submit Button showing entered rupee amount */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-100">
              <div className="text-xs text-amber-800">
                Fund:{" "}
                <strong className="text-amber-900">
                  Education & General Trust Fund
                </strong>
              </div>

              <button
                type="submit"
                disabled={isLoadingGateway}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:bg-amber-900 disabled:opacity-60 transition-colors"
              >
                {isLoadingGateway ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Opening Razorpay...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>
                      Donate ₹{displayAmount > 0 ? displayAmount : "0"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
