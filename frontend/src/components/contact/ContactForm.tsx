import {
  AlertCircle,
  Loader2,
  Send,
} from "lucide-react";
import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import { useAuth } from "../../context/AuthContext";
import ContactSuccess from "./ContactSuccess";
import {
  contactService,
  type ContactInquiryPayload,
} from "../../services/contactService";

interface ContactOption {
  value: string;
  label: string;
}

interface ContactFormProps {
  inquiryTypes: ContactOption[];
  priorities: ContactOption[];
}

interface FormErrors {
  name?: string;
  email?: string;
  phone_number?: string;
  subject?: string;
  message?: string;
  inquiry_type?: string;
  priority?: string;
}

const initialForm: ContactInquiryPayload = {
  name: "",
  email: "",
  phone_number: "",
  subject: "",
  message: "",
  inquiry_type: "GENERAL",
  priority: "NORMAL",
};

export default function ContactForm({
  inquiryTypes,
  priorities,
}: ContactFormProps) {
  const { user } = useAuth();

  const [form, setForm] =
    useState<ContactInquiryPayload>(initialForm);

  const [errors, setErrors] =
    useState<FormErrors>({});

  const [serverError, setServerError] =
    useState("");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [isSuccess, setIsSuccess] =
    useState(false);

  const [successMessage, setSuccessMessage] =
    useState("");

  const [inquiryId, setInquiryId] =
    useState<number | undefined>();

  /*
   * Prefill authenticated user's information.
   *
   * Existing user-entered values are never overwritten.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    const fullName = [
      user.first_name,
      user.last_name,
    ]
      .filter(Boolean)
      .join(" ");

    setForm((current) => ({
      ...current,

      name:
        current.name.trim() ||
        fullName,

      email:
        current.email.trim() ||
        user.email ||
        "",

      phone_number:
        current.phone_number.trim() ||
        user.phone_number ||
        "",
    }));
  }, [user]);

  const handleChange = (
    field: keyof ContactInquiryPayload,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    setServerError("");
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        form.email.trim(),
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    if (
      form.phone_number.trim() &&
      form.phone_number.trim().length > 20
    ) {
      newErrors.phone_number =
        "Phone number cannot exceed 20 characters.";
    }

    if (!form.subject.trim()) {
      newErrors.subject =
        "Subject is required.";
    } else if (
      form.subject.trim().length < 3
    ) {
      newErrors.subject =
        "Subject must contain at least 3 characters.";
    }

    if (!form.message.trim()) {
      newErrors.message =
        "Message is required.";
    } else if (
      form.message.trim().length < 10
    ) {
      newErrors.message =
        "Message must contain at least 10 characters.";
    }

    if (!form.inquiry_type) {
      newErrors.inquiry_type =
        "Please select an inquiry type.";
    }

    if (!form.priority) {
      newErrors.priority =
        "Please select a priority.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setServerError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const payload: ContactInquiryPayload = {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone_number: form.phone_number.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
        inquiry_type: form.inquiry_type,
        priority: form.priority,
      };

      const response =
        await contactService.submitInquiry(
          payload,
        );

      if (!response.success) {
        setServerError(
          response.message ||
            "Unable to submit your inquiry.",
        );

        if (response.errors) {
          setErrors(response.errors);
        }

        return;
      }

      setSuccessMessage(
        response.message ||
          "Your inquiry has been submitted successfully.",
      );

      setInquiryId(response.inquiry_id);
      setIsSuccess(true);
    } catch (error: any) {
      const responseData =
        error?.response?.data;

      if (responseData?.errors) {
        setErrors(responseData.errors);
      }

      setServerError(
        responseData?.message ||
          "Something went wrong while submitting your inquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSendAnother = () => {
    setForm({
      ...initialForm,

      /*
       * Keep authenticated user's details
       * after resetting the inquiry-specific fields.
       */
      name: user
        ? [
            user.first_name,
            user.last_name,
          ]
            .filter(Boolean)
            .join(" ")
        : "",

      email: user?.email || "",

      phone_number:
        user?.phone_number || "",
    });

    setErrors({});
    setServerError("");
    setSuccessMessage("");
    setInquiryId(undefined);
    setIsSuccess(false);
  };

  if (isSuccess) {
    return (
      <section className="bg-theme-primary">
        <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl">
            <ContactSuccess
              message={successMessage}
              inquiryId={inquiryId}
              onSendAnother={handleSendAnother}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-theme-primary">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-green-400">
              Contact Form
            </p>

            <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
              Tell Us About Your Requirement
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Fill in the details below and we&apos;ll
              get back to you as soon as possible.
            </p>
          </div>

          <div className="theme-card p-6 sm:p-8 lg:p-10">
            {serverError && (
              <div
                role="alert"
                className="mb-6 flex gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400" />

                <div>
                  <p className="font-semibold">
                    Submission failed
                  </p>

                  <p className="mt-1 leading-6">
                    {serverError}
                  </p>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
            >
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name */}
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Name
                    <span className="ml-1 text-red-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-name"
                    type="text"
                    value={form.name}
                    onChange={(event) =>
                      handleChange(
                        "name",
                        event.target.value,
                      )
                    }
                    placeholder="Your name"
                    autoComplete="name"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-green-500/50"
                    }`}
                  />

                  {errors.name && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Email
                    <span className="ml-1 text-red-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                      handleChange(
                        "email",
                        event.target.value,
                      )
                    }
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-green-500/50"
                    }`}
                  />

                  {errors.email && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="contact-phone"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Phone Number
                  </label>

                  <input
                    id="contact-phone"
                    type="tel"
                    value={form.phone_number}
                    onChange={(event) =>
                      handleChange(
                        "phone_number",
                        event.target.value,
                      )
                    }
                    placeholder="+91 9876543210"
                    autoComplete="tel"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 ${
                      errors.phone_number
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-green-500/50"
                    }`}
                  />

                  {errors.phone_number && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.phone_number}
                    </p>
                  )}
                </div>

                {/* Inquiry Type */}
                <div>
                  <label
                    htmlFor="contact-inquiry-type"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Inquiry Type
                    <span className="ml-1 text-red-400">
                      *
                    </span>
                  </label>

                  <select
                    id="contact-inquiry-type"
                    value={form.inquiry_type}
                    onChange={(event) =>
                      handleChange(
                        "inquiry_type",
                        event.target.value,
                      )
                    }
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-sm text-white outline-none transition ${
                      errors.inquiry_type
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-green-500/50"
                    }`}
                  >
                    {inquiryTypes.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-gray-900"
                        >
                          {option.label}
                        </option>
                      ),
                    )}
                  </select>

                  {errors.inquiry_type && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.inquiry_type}
                    </p>
                  )}
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Subject
                    <span className="ml-1 text-red-400">
                      *
                    </span>
                  </label>

                  <input
                    id="contact-subject"
                    type="text"
                    value={form.subject}
                    onChange={(event) =>
                      handleChange(
                        "subject",
                        event.target.value,
                      )
                    }
                    placeholder="How can we help?"
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 ${
                      errors.subject
                        ? "border-red-500/50 focus:border-red-500"
                        : "border-white/10 focus:border-green-500/50"
                    }`}
                  />

                  {errors.subject && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.subject}
                    </p>
                  )}
                </div>

                {/* Priority */}
                <div>
                  <label
                    htmlFor="contact-priority"
                    className="mb-2 block text-sm font-medium text-gray-200"
                  >
                    Priority
                    <span className="ml-1 text-red-400">
                      *
                    </span>
                  </label>

                  <select
                    id="contact-priority"
                    value={form.priority}
                    onChange={(event) =>
                      handleChange(
                        "priority",
                        event.target.value,
                      )
                    }
                    disabled={isSubmitting}
                    className={`w-full rounded-xl border bg-black/20 px-4 py-3 text-sm text-white outline-none transition ${
                      errors.priority
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-green-500/50"
                    }`}
                  >
                    {priorities.map(
                      (option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          className="bg-gray-900"
                        >
                          {option.label}
                        </option>
                      ),
                    )}
                  </select>

                  {errors.priority && (
                    <p className="mt-2 text-xs text-red-400">
                      {errors.priority}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-gray-200"
                >
                  Message
                  <span className="ml-1 text-red-400">
                    *
                  </span>
                </label>

                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(event) =>
                    handleChange(
                      "message",
                      event.target.value,
                    )
                  }
                  placeholder="Tell us about your project, requirements, budget, timeline, or anything else you'd like us to know..."
                  rows={7}
                  disabled={isSubmitting}
                  className={`w-full resize-y rounded-xl border bg-black/20 px-4 py-3 text-sm leading-7 text-white outline-none transition placeholder:text-gray-600 ${
                    errors.message
                      ? "border-red-500/50 focus:border-red-500"
                      : "border-white/10 focus:border-green-500/50"
                  }`}
                />

                <div className="mt-2 flex items-center justify-between">
                  {errors.message ? (
                    <p className="text-xs text-red-400">
                      {errors.message}
                    </p>
                  ) : (
                    <span />
                  )}

                  <span className="text-xs text-gray-600">
                    {form.message.length} characters
                  </span>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end border-t border-white/10 pt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="theme-button-primary inline-flex min-w-[180px] items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}