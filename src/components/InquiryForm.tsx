"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { siteData } from "@/data/siteData";

export type SevaInquiryType =
  | "Special Pooja"
  | "Annadana Seva"
  | "Alankara Pooja"
  | "General Inquiry";

export interface InquiryFormData {
  name: string;
  phone: string;
  date: string;
  sevaType: SevaInquiryType;
  message: string;
}

interface InquiryFormErrors {
  name?: string;
  phone?: string;
  date?: string;
  sevaType?: string;
  message?: string;
}

const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

const SEVA_OPTIONS: SevaInquiryType[] = [
  "Special Pooja",
  "Annadana Seva",
  "Alankara Pooja",
  "General Inquiry",
];

const INITIAL_FORM_DATA: InquiryFormData = {
  name: "",
  phone: "",
  date: "",
  sevaType: "Special Pooja",
  message: "",
};

export default function InquiryForm() {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<InquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateField = (
    field: keyof InquiryFormData,
    value: string
  ): string | undefined => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Full name is required.";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters.";
        return undefined;
      case "phone":
        if (!value.trim()) return "10-digit mobile number is required.";
        if (!INDIAN_MOBILE_REGEX.test(value.trim())) {
          return "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.";
        }
        return undefined;
      case "date":
        if (!value.trim()) return "Please select a preferred date.";
        return undefined;
      case "sevaType":
        if (!value.trim()) return "Please select a Seva or Inquiry type.";
        return undefined;
      default:
        return undefined;
    }
  };

  const validateAll = (): boolean => {
    const newErrors: InquiryFormErrors = {
      name: validateField("name", formData.name),
      phone: validateField("phone", formData.phone),
      date: validateField("date", formData.date),
      sevaType: validateField("sevaType", formData.sevaType),
    };

    // Remove undefined keys
    Object.keys(newErrors).forEach((key) => {
      const k = key as keyof InquiryFormErrors;
      if (!newErrors[k]) delete newErrors[k];
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof InquiryFormData;

    // Reset submission banners when editing
    if (isSuccess) setIsSuccess(false);
    if (error) setError(null);

    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Real-time field validation
    const fieldError = validateField(fieldName, value);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: fieldError,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSuccess(false);
    setError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const accessKey =
        process.env.NEXT_PUBLIC_WEB3FORMS_KEY ||
        process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ||
        siteData.web3formsKey;

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New ${formData.sevaType} Request from ${formData.name} - ${siteData.shortName}`,
          from_name: siteData.trustName,
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          preferred_date: formData.date,
          seva_type: formData.sevaType,
          message:
            formData.message.trim() || "No additional notes provided.",
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setIsSuccess(true);
        setFormData(INITIAL_FORM_DATA);
        setErrors({});
      } else {
        setError(
          result.message ||
            "Unable to submit inquiry. Please verify the Web3Forms access key or contact the trust office via email."
        );
      }
    } catch {
      setError(
        "Network error while submitting your request. Please check your connection or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="inquiry"
      className="scroll-mt-24 py-16 sm:py-20 bg-white border-t border-amber-200 text-amber-900"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-amber-800 border border-amber-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Online Seva & Temple Inquiry</span>
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-900">
            Seva Booking & Inquiry Form
          </h2>
          <p className="text-sm sm:text-base text-amber-800">
            Submit your request for Special Pooja, Annadana Seva, Alankara
            Pooja, or general temple inquiries at {siteData.shortName}.
          </p>
        </div>

        {/* Form Card */}
        <div className="rounded-3xl bg-amber-50/90 p-6 sm:p-10 border-2 border-amber-200 shadow-sm">
          {/* Accessible Success Toast Alert */}
          {isSuccess && (
            <div
              role="alert"
              aria-live="polite"
              className="mb-6 flex items-start gap-3 rounded-2xl bg-green-50 p-4 border border-green-300 text-green-900 shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-bold">
                  Seva Inquiry Submitted Successfully!
                </p>
                <p className="text-green-800">
                  Thank you. The trust office at {siteData.shortName} has
                  received your details and will contact you shortly.
                </p>
              </div>
            </div>
          )}

          {/* Accessible Error Toast Alert */}
          {error && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-6 flex items-start gap-3 rounded-2xl bg-red-50 p-4 border border-red-300 text-red-900 shadow-sm"
            >
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="text-sm space-y-1">
                <p className="font-bold">Submission Notice</p>
                <p className="text-red-800">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="inquiry-name"
                  className="block text-sm font-bold text-amber-900"
                >
                  Full Name <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter devotee full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className={`w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-amber-900 placeholder:text-amber-900/40 border focus:outline-none focus:ring-2 transition-colors ${
                      errors.name
                        ? "border-red-500 focus:ring-red-500"
                        : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                    }`}
                  />
                </div>
                {errors.name && (
                  <p
                    id="name-error"
                    className="text-xs font-semibold text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.name}</span>
                  </p>
                )}
              </div>

              {/* 10-Digit Indian Mobile Number */}
              <div className="space-y-2">
                <label
                  htmlFor="inquiry-phone"
                  className="block text-sm font-bold text-amber-900"
                >
                  10-Digit Mobile Number <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={`w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-amber-900 placeholder:text-amber-900/40 border focus:outline-none focus:ring-2 transition-colors ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-500"
                        : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                    }`}
                  />
                </div>
                {errors.phone && (
                  <p
                    id="phone-error"
                    className="text-xs font-semibold text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>

              {/* Preferred Date */}
              <div className="space-y-2">
                <label
                  htmlFor="inquiry-date"
                  className="block text-sm font-bold text-amber-900"
                >
                  Preferred Date <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="inquiry-date"
                    name="date"
                    type="date"
                    required
                    value={formData.date}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "date-error" : undefined}
                    className={`w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-amber-900 border focus:outline-none focus:ring-2 transition-colors ${
                      errors.date
                        ? "border-red-500 focus:ring-red-500"
                        : "border-amber-300 focus:border-amber-600 focus:ring-amber-600"
                    }`}
                  />
                </div>
                {errors.date && (
                  <p
                    id="date-error"
                    className="text-xs font-semibold text-red-600 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.date}</span>
                  </p>
                )}
              </div>

              {/* Seva / Inquiry Type Dropdown */}
              <div className="space-y-2">
                <label
                  htmlFor="inquiry-sevaType"
                  className="block text-sm font-bold text-amber-900"
                >
                  Seva / Inquiry Type <span className="text-red-600">*</span>
                </label>
                <div className="relative">
                  <Sparkles className="w-4 h-4 text-amber-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    id="inquiry-sevaType"
                    name="sevaType"
                    required
                    value={formData.sevaType}
                    onChange={handleChange}
                    className="w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm font-medium text-amber-900 border border-amber-300 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
                  >
                    {SEVA_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Message / Special Notes (Nakshatra, Gotra, etc.) */}
            <div className="space-y-2">
              <label
                htmlFor="inquiry-message"
                className="block text-sm font-bold text-amber-900"
              >
                Message / Special Notes (Nakshatra, Gotra, or Inquiry Details)
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-amber-600 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Optional: Mention Janma Nakshatra, Gotra, or specific timing questions..."
                  className="w-full rounded-xl bg-white pl-10 pr-4 py-3 text-sm text-amber-900 placeholder:text-amber-900/40 border border-amber-300 focus:border-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-amber-800">
                Fields marked with <span className="text-red-600 font-bold">*</span>{" "}
                are required.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-amber-900 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Request...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Seva / Inquiry</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
