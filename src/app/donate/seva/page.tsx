"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CreditCard,
  Flame,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles,
  User,
} from "lucide-react";
import { sevaList, siteData, type SevaItem } from "@/data/siteData";
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

interface SevaBookingFormData {
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  sevaId: string;
}

interface SevaBookingErrors {
  name?: string;
  phone?: string;
  email?: string;
  address?: string;
  date?: string;
  sevaId?: string;
}

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM_DATA: SevaBookingFormData = {
  name: "",
  phone: "",
  email: "",
  address: "",
  date: "",
  sevaId: sevaList[0]?.id ?? "alankara-pooja",
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

export default function SevaBookingPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement | null>(null);
  const [formData, setFormData] =
    useState<SevaBookingFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<SevaBookingErrors>({});
  const [isLoadingGateway, setIsLoadingGateway] = useState(false);
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const [paymentFailedMessage, setPaymentFailedMessage] = useState<
    string | null
  >(null);

  const selectedSeva: SevaItem =
    sevaList.find((item) => item.id === formData.sevaId) ?? sevaList[0];

  const validateField = (
    field: keyof SevaBookingFormData,
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
        if (!value.trim())
          return "Full Postal Address with Pincode is required for Prasadam dispatch.";
        if (value.trim().length < 10)
          return "Please include complete postal address and 6-digit pincode.";
        return undefined;
      case "date":
        if (!value.trim()) return "Preferred Seva Date is required.";
        return undefined;
      case "sevaId":
        if (!value.trim()) return "Please select a Seva.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: SevaBookingErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      email: validateField("email", formData.email),
      address: validateField("address", formData.address),
      date: validateField("date", formData.date),
      sevaId: validateField("sevaId", formData.sevaId),
    };

    Object.keys(newErrors).forEach((key) => {
      const k = key as keyof SevaBookingErrors;
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof SevaBookingFormData;

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

      const options: RazorpayOptions = {
        key: razorpayKey,
        amount: selectedSeva.price * 100, // Amount in paise
        currency: "INR",
        name: siteData.trustName,
        description: `DEMO / TEST Seva Booking: ${selectedSeva.name} (₹${selectedSeva.price})`,
        image: `${window.location.origin}/trust-logo.png`,
        handler: async (response: RazorpaySuccessResponse) => {
          console.log(response.razorpay_payment_id);
          const now = new Date();
          const receiptData: ReceiptData = {
            receiptNo: `DEMO-SEVA-${now.getTime().toString().slice(-6)}`,
            paymentId: response.razorpay_payment_id,
            dateTime: now.toLocaleString("en-IN", {
              dateStyle: "medium",
              timeStyle: "short",
            }),
            donorName: formData.name.trim(),
            mobile: formData.phone.trim(),
            email: formData.email.trim(),
            address: formData.address.trim(),
            purpose: `Seva Booking: ${selectedSeva.name}`,
            sevaDate: formData.date,
            amount: selectedSeva.price,
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
          seva_name: selectedSeva.name,
          preferred_date: formData.date,
          postal_address: formData.address.trim(),
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
            <Flame className="w-4 h-4 text-amber-400" />
            <span>{siteData.trustName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Online Seva Booking
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            Select your Seva below and fill in your details for Sankalpa and
            Prasadam postal dispatch.
          </p>
        </div>

        {/* Booking Form Card */}
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

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="seva-name"
                  className="block text-sm font-bold text-amber-900"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="seva-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter devotee full name"
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

              {/* 10-Digit Mobile Number */}
              <div className="space-y-2">
                <label
                  htmlFor="seva-phone"
                  className="block text-sm font-bold text-amber-900"
                >
                  10-Digit Mobile Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="seva-phone"
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

              {/* Email ID */}
              <div className="space-y-2">
                <label
                  htmlFor="seva-email"
                  className="block text-sm font-bold text-amber-900"
                >
                  Email ID <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="seva-email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="devotee@example.com"
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

              {/* Preferred Seva Date */}
              <div className="space-y-2">
                <label
                  htmlFor="seva-date"
                  className="block text-sm font-bold text-amber-900"
                >
                  Preferred Seva Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="seva-date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    className={`w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 ${
                      errors.date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                    }`}
                  />
                </div>
                {errors.date && (
                  <p className="text-xs font-semibold text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Select Seva Dropdown */}
            <div className="space-y-2">
              <label
                htmlFor="seva-select"
                className="block text-sm font-bold text-amber-900"
              >
                Select Seva <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Flame className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="seva-select"
                  name="sevaId"
                  required
                  value={formData.sevaId}
                  onChange={handleChange}
                  className="w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3.5 text-sm font-bold text-amber-900 border border-amber-300 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600"
                >
                  {sevaList.map((seva) => (
                    <option key={seva.id} value={seva.id}>
                      {seva.name} - ₹{seva.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Postal Address with Pincode (for Prasadam dispatch) */}
            <div className="space-y-2">
              <label
                htmlFor="seva-address"
                className="block text-sm font-bold text-amber-900"
              >
                Full Postal Address with Pincode (for Prasadam dispatch){" "}
                <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="seva-address"
                  name="address"
                  rows={3}
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House/Flat No., Street, Village/Town, District, State & 6-digit Pincode"
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

            {/* Submit Button showing selected Seva rupee amount */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-100">
              <div className="text-xs text-amber-800">
                Selected Seva:{" "}
                <strong className="text-amber-900">{selectedSeva.name}</strong>{" "}
                (₹{selectedSeva.price})
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
                    <span>Proceed to Pay ₹{selectedSeva.price}</span>
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
