"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Calendar,
  CreditCard,
  Flame,
  Languages,
  Loader2,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  Sparkles,
  User,
} from "lucide-react";
import { sevaList, siteData, type SevaItem } from "@/data/siteData";
import { useLanguage } from "@/context/LanguageContext";
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
  const { language, toggleLanguage, t } = useLanguage();
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
        if (!value.trim())
          return t("Full Name is required.", "ಭಕ್ತರ ಪೂರ್ಣ ಹೆಸರು ಕಡ್ಡಾಯವಾಗಿದೆ.");
        if (value.trim().length < 2)
          return t(
            "Name must be at least 2 characters.",
            "ಹೆಸರು ಕನಿಷ್ಠ 2 ಅಕ್ಷರಗಳನ್ನು ಹೊಂದಿರಬೇಕು."
          );
        return undefined;
      case "phone":
        if (!value.trim())
          return t(
            "10-digit mobile number is required.",
            "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ ಕಡ್ಡಾಯವಾಗಿದೆ."
          );
        if (!INDIAN_MOBILE_REGEX.test(value.trim())) {
          return t(
            "Enter a valid 10-digit Indian mobile number (starting with 6-9).",
            "6 ರಿಂದ 9 ರಲ್ಲಿ ಪ್ರಾರಂಭವಾಗುವ ಮಾನ್ಯ 10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ."
          );
        }
        return undefined;
      case "email":
        if (!value.trim())
          return t("Email ID is required.", "ಇಮೇಲ್ ವಿಳಾಸ ಕಡ್ಡಾಯವಾಗಿದೆ.");
        if (!EMAIL_REGEX.test(value.trim())) {
          return t("Enter a valid Email ID.", "ಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.");
        }
        return undefined;
      case "address":
        if (!value.trim())
          return t(
            "Full Postal Address with Pincode is required for Prasadam dispatch.",
            "ಪ್ರಸಾದ ಕಳುಹಿಸಲು ಪಿನ್ ಕೋಡ್ ಸಹಿತ ಪೂರ್ಣ ಅಂಚೆ ವಿಳಾಸ ಕಡ್ಡಾಯವಾಗಿದೆ."
          );
        if (value.trim().length < 10)
          return t(
            "Please include complete postal address and 6-digit pincode.",
            "ದಯವಿಟ್ಟು ಪೂರ್ಣ ಅಂಚೆ ವಿಳಾಸ ಮತ್ತು 6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್ ನಮೂದಿಸಿ."
          );
        return undefined;
      case "date":
        if (!value.trim())
          return t(
            "Preferred Seva Date is required.",
            "ಸೇವೆಯ ದಿನಾಂಕವನ್ನು ಆಯ್ಕೆಮಾಡುವುದು ಕಡ್ಡಾಯವಾಗಿದೆ."
          );
        return undefined;
      case "sevaId":
        if (!value.trim())
          return t("Please select a Seva.", "ದಯವಿಟ್ಟು ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ.");
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
          t(
            "Failed to load Razorpay Checkout SDK. Please check your internet connection.",
            "ರೇಜರ್‌ಪೇ ಪಾವತಿ ಗೇಟ್‌ವೇ ಲೋಡ್ ಮಾಡಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಇಂಟರ್ನೆಟ್ ಸಂಪರ್ಕವನ್ನು ಪರಿಶೀಲಿಸಿ."
          )
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
          t(
            "Razorpay Test Key ID (NEXT_PUBLIC_RAZORPAY_KEY_ID) is not configured in .env.local.",
            "ರೇಜರ್‌ಪೇ ಪರೀಕ್ಷಾ ಕೀ (NEXT_PUBLIC_RAZORPAY_KEY_ID) ಹೊಂದಿಸಲಾಗಿಲ್ಲ."
          )
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
          t(
            "Your test payment could not be completed. No amount was deducted.",
            "ಪರೀಕ್ಷಾ ಪಾವತಿ ಪೂರ್ಣಗೊಂಡಿಲ್ಲ. ಯಾವುದೇ ಹಣ ಕಡಿತಗೊಂಡಿಲ್ಲ."
          );
        setPaymentFailedMessage(desc);
      });
      rzp.open();
    } catch {
      setGatewayError(
        t(
          "Unable to initialize Razorpay Checkout modal. Please try again.",
          "ಪಾವತಿ ವಿಂಡೋ ತೆರೆಯಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
        )
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
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-amber-50 text-amber-900 py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto min-w-0 space-y-8">
        {/* Top Back to Home Link, Language Switcher & Test Mode Notice */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/#donate"
            className="inline-flex items-center gap-2 min-h-[44px] rounded-full bg-white px-4 py-2 text-sm font-bold text-amber-900 border border-amber-300 shadow-sm hover:bg-amber-600 hover:text-white hover:border-amber-600 hover:brightness-105 active:scale-[0.99] transition duration-200 leading-snug"
          >
            <span>{t("← Back to Home", "← ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 max-w-full">
            <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-amber-200/80 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-900 border border-amber-400 leading-snug break-words">
              <Sparkles className="w-3.5 h-3.5 text-amber-700 shrink-0" />
              <span className="min-w-0 break-words">
                {t(siteData.demoDisclaimer, siteData.demoDisclaimerKn)}
              </span>
            </span>

            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] rounded-full border-2 border-amber-600 bg-white px-4 py-2 text-xs font-bold text-amber-900 hover:bg-amber-600 hover:text-white hover:brightness-105 active:scale-[0.99] transition duration-200 cursor-pointer leading-snug"
            >
              <Languages className="w-3.5 h-3.5 shrink-0" />
              <span>{language === "en" ? "ಕನ್ನಡ" : "English"}</span>
            </button>
          </div>
        </div>

        {/* Page Header */}
        <div className="rounded-3xl bg-amber-900 text-amber-50 p-5 sm:p-8 border-2 border-amber-600 shadow-md space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 leading-relaxed max-w-full">
            <Flame className="w-4 h-4 text-amber-400 shrink-0" />
            <span className="min-w-0 break-words">
              {t(siteData.trustName, siteData.trustNameKn)}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-relaxed break-words">
            {t("Online Seva Booking", "ಆನ್‌ಲೈನ್ ಪೂಜಾ ಸೇವಾ ನೋಂದಣಿ")}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed break-words">
            {t(
              "Select your Seva below and fill in your details for Sankalpa and Prasadam postal dispatch.",
              "ಶ್ರೀ ದೇವಿಯ ಸಂಕಲ್ಪ ಪೂಜೆ ಹಾಗೂ ಅಂಚೆ ಮೂಲಕ ಪ್ರಸಾದ ಪಡೆಯಲು ಕೆಳಗೆ ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ ನಿಮ್ಮ ವಿವರಗಳನ್ನು ಭರ್ತಿ ಮಾಡಿ."
            )}
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="min-w-0 rounded-3xl bg-white p-5 sm:p-10 border-2 border-amber-200 shadow-sm space-y-6">
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
                  <p className="font-bold text-base">
                    {t("Payment Failed", "ಪಾವತಿ ವಿಫಲವಾಗಿದೆ")}
                  </p>
                  <p className="text-red-800">{paymentFailedMessage}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={openRazorpayGateway}
                className="inline-flex items-center justify-center gap-2 min-h-[44px] rounded-full bg-red-600 px-5 py-2.5 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-red-700 hover:brightness-105 active:scale-[0.99] transition duration-200 shrink-0 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{t("Try Again", "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ")}</span>
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
                <p className="font-bold">
                  {t("Payment Gateway Notice", "ಪಾವತಿ ಗೇಟ್‌ವೇ ಸೂಚನೆ")}
                </p>
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
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="seva-name"
                  className="block text-sm font-bold text-amber-900 leading-relaxed break-words"
                >
                  {t("Full Name", "ಭಕ್ತರ ಪೂರ್ಣ ಹೆಸರು")}{" "}
                  <span className="text-red-600">*</span>
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
                    placeholder={t(
                      "Enter devotee full name",
                      "ಭಕ್ತರ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ"
                    )}
                    className={`w-full max-w-full min-h-[44px] rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 transition-colors ${
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
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="seva-phone"
                  className="block text-sm font-bold text-amber-900 leading-relaxed break-words"
                >
                  {t("10-Digit Mobile Number", "10 ಅಂಕಿಯ ಮೊಬೈಲ್ ಸಂಖ್ಯೆ")}{" "}
                  <span className="text-red-600">*</span>
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
                    placeholder={t("e.g. 9876543210", "ಉದಾ: 9876543210")}
                    className={`w-full max-w-full min-h-[44px] rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 transition-colors ${
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
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="seva-email"
                  className="block text-sm font-bold text-amber-900 leading-relaxed break-words"
                >
                  {t("Email ID", "ಇಮೇಲ್ ವಿಳಾಸ")}{" "}
                  <span className="text-red-600">*</span>
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
                    className={`w-full max-w-full min-h-[44px] rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 transition-colors ${
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
              <div className="min-w-0 space-y-2">
                <label
                  htmlFor="seva-date"
                  className="block text-sm font-bold text-amber-900 leading-relaxed break-words"
                >
                  {t("Preferred Seva Date", "ಸೇವೆಯ ದಿನಾಂಕ")}{" "}
                  <span className="text-red-600">*</span>
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
                    className={`w-full max-w-full min-h-[44px] rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 transition-colors ${
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
            <div className="min-w-0 space-y-2">
              <label
                htmlFor="seva-select"
                className="block text-sm font-bold text-amber-900 leading-relaxed break-words"
              >
                {t("Select Seva", "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ")}{" "}
                <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Flame className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id="seva-select"
                  name="sevaId"
                  required
                  value={formData.sevaId}
                  onChange={handleChange}
                  className="w-full max-w-full min-h-[44px] rounded-xl bg-amber-50/50 pl-10 pr-4 py-3.5 text-sm font-bold text-amber-900 border border-amber-300 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
                >
                  {sevaList.map((seva) => (
                    <option key={seva.id} value={seva.id}>
                      {t(seva.name, seva.nameKn)} - ₹{seva.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Full Postal Address with Pincode (for Prasadam dispatch) */}
            <div className="min-w-0 space-y-2">
              <label
                htmlFor="seva-address"
                className="block text-sm font-bold text-amber-900 leading-relaxed break-words"
              >
                {t(
                  "Full Postal Address with Pincode (for Prasadam dispatch)",
                  "ಪಿನ್ ಕೋಡ್ ಸಹಿತ ಪೂರ್ಣ ಅಂಚೆ ವಿಳಾಸ (ಪ್ರಸಾದ ಕಳುಹಿಸಲು)"
                )}{" "}
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
                  placeholder={t(
                    "House/Flat No., Street, Village/Town, District, State & 6-digit Pincode",
                    "ಮನೆ ಸಂಖ್ಯೆ, ರಸ್ತೆ, ಗ್ರಾಮ/ನಗರ, ಜಿಲ್ಲೆ, ರಾಜ್ಯ ಮತ್ತು 6 ಅಂಕಿಯ ಪಿನ್ ಕೋಡ್"
                  )}
                  className={`w-full max-w-full rounded-xl bg-amber-50/50 pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 transition-colors ${
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

            {/* Tax Exemption Notice */}
            <div className="rounded-xl bg-amber-50 p-3.5 border border-amber-200 text-xs font-medium text-amber-900 leading-relaxed">
              {t(siteData.taxExemptionNote, siteData.taxExemptionNoteKn)}
            </div>

            {/* Submit Button showing selected Seva rupee amount */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-amber-100">
              <div className="text-xs text-amber-800 leading-relaxed">
                {t("Selected Seva:", "ಆಯ್ಕೆಮಾಡಿದ ಸೇವೆ:")}{" "}
                <strong className="text-amber-900">
                  {t(selectedSeva.name, selectedSeva.nameKn)}
                </strong>{" "}
                (₹{selectedSeva.price})
              </div>

              <button
                type="submit"
                disabled={isLoadingGateway}
                className="w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-8 py-3.5 text-sm sm:text-base font-bold text-white shadow-md hover:bg-amber-900 hover:brightness-105 active:scale-[0.99] disabled:opacity-60 transition duration-200 cursor-pointer leading-snug"
              >
                {isLoadingGateway ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>
                      {t("Opening Razorpay...", "ಪಾವತಿ ವಿಂಡೋ ತೆರೆಯುತ್ತಿದೆ...")}
                    </span>
                  </>
                ) : (
                  <>
                    <CreditCard className="w-4 h-4" />
                    <span>
                      {t(
                        `Proceed to Pay ₹${selectedSeva.price}`,
                        `ಪಾವತಿಸಲು ಮುಂದುವರಿಯಿರಿ ₹${selectedSeva.price}`
                      )}
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
