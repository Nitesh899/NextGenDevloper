import { type FormEvent, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  ChevronDown,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { usePortfolio } from "../../context/PortfolioContext";
import {
  type QuoteRequestPayload,
  type QuoteServicePayload,
  quoteService,
} from "../../services/quoteService";
import QuoteSuccess from "./QuoteSuccess";

interface QuoteFormData {
  name: string;
  email: string;
  phone_number: string;
  company_name: string;
  project_type: string;
  project_title: string;
  project_description: string;
  required_features: string;
  existing_website: string;
  budget_range: string;
  timeline: string;
  preferred_technologies: string;
  additional_notes: string;
  priority: string;
  services: QuoteServicePayload[];
}

interface FormErrors {
  [key: string]: string;
}

const projectTypes = [
  { value: "WEBSITE", label: "Website" },
  { value: "WEB_APP", label: "Web Application" },
  { value: "MOBILE_APP", label: "Mobile Application" },
  { value: "ECOMMERCE", label: "E-Commerce" },
  { value: "AI_ML", label: "AI / Machine Learning" },
  { value: "SOFTWARE", label: "Software Development" },
  { value: "API", label: "API Development" },
  { value: "AUTOMATION", label: "Business Automation" },
  { value: "UI_UX", label: "UI/UX Design" },
  { value: "OTHER", label: "Other" },
];

const budgetRanges = [
  { value: "UNDER_25K", label: "Under ₹25,000" },
  { value: "25K_50K", label: "₹25,000 - ₹50,000" },
  { value: "50K_1L", label: "₹50,000 - ₹1,00,000" },
  { value: "1L_3L", label: "₹1,00,000 - ₹3,00,000" },
  { value: "3L_5L", label: "₹3,00,000 - ₹5,00,000" },
  { value: "ABOVE_5L", label: "Above ₹5,00,000" },
  { value: "CUSTOM", label: "Custom Budget" },
];

const timelines = [
  { value: "ASAP", label: "As Soon As Possible" },
  { value: "ONE_MONTH", label: "Within 1 Month" },
  { value: "1_TO_3_MONTHS", label: "1-3 Months" },
  { value: "3_TO_6_MONTHS", label: "3-6 Months" },
  { value: "6_PLUS_MONTHS", label: "6+ Months" },
  { value: "FLEXIBLE", label: "Flexible" },
];

const priorities = [
  { value: "LOW", label: "Low" },
  { value: "NORMAL", label: "Normal" },
  { value: "HIGH", label: "High" },
  { value: "URGENT", label: "Urgent" },
];

function Field({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  name: keyof QuoteFormData;
  value: string;
  onChange: (name: keyof QuoteFormData, value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:ring-2 ${
          error
            ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
            : "border-white/10 focus:border-green-500/60 focus:ring-green-500/20"
        }`}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
}: {
  label: string;
  name: keyof QuoteFormData;
  value: string;
  onChange: (name: keyof QuoteFormData, value: string) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className={`w-full appearance-none rounded-xl border bg-black/30 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:ring-2 ${
            error
              ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
              : "border-white/10 focus:border-green-500/60 focus:ring-green-500/20"
          }`}
        >
          <option value="" className="bg-gray-950">
            Select an option
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-gray-950"
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
  required = false,
  rows = 5,
}: {
  label: string;
  name: keyof QuoteFormData;
  value: string;
  onChange: (name: keyof QuoteFormData, value: string) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-white"
      >
        {label}
        {required && <span className="ml-1 text-red-400">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        className={`w-full resize-y rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:ring-2 ${
          error
            ? "border-red-500/70 focus:border-red-500 focus:ring-red-500/20"
            : "border-white/10 focus:border-green-500/60 focus:ring-green-500/20"
        }`}
      />

      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function QuoteForm() {
  const { user } = useAuth();
  const { portfolio } = usePortfolio();

  const [submittedQuoteId, setSubmittedQuoteId] = useState<number | null>(
    null,
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const [form, setForm] = useState<QuoteFormData>({
    name: "",
    email: "",
    phone_number: "",
    company_name: "",
    project_type: "",
    project_title: "",
    project_description: "",
    required_features: "",
    existing_website: "",
    budget_range: "",
    timeline: "",
    preferred_technologies: "",
    additional_notes: "",
    priority: "NORMAL",
    services: [],
  });

  /*
   * Django Admin services are used as the source of truth.
   */
  const availableServices = useMemo(() => {
    if (!portfolio?.services) {
      return [];
    }

    return [...portfolio.services]
      .filter((service) => service.status === "ACTIVE")
      .sort((a, b) => a.display_order - b.display_order);
  }, [portfolio]);

  /*
   * Prefill authenticated user information.
   * Existing typed values are never overwritten.
   */
  useEffect(() => {
    if (!user) {
      return;
    }

    const fullName = [user.first_name, user.last_name]
      .filter(Boolean)
      .join(" ");

    setForm((current) => ({
      ...current,
      name: current.name.trim() || fullName,
      email: current.email.trim() || user.email || "",
      phone_number: current.phone_number.trim() || user.phone_number || "",
    }));
  }, [user]);

  const handleChange = (
    name: keyof QuoteFormData,
    value: string,
  ) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((current) => ({
        ...current,
        [name]: "",
      }));
    }

    if (serverError) {
      setServerError("");
    }
  };

  const addService = () => {
    const firstAvailableService = availableServices.find(
      (service) =>
        !form.services.some(
          (selected) => selected.service_name === service.title,
        ),
    );

    if (!firstAvailableService) {
      return;
    }

    setForm((current) => ({
      ...current,
      services: [
        ...current.services,
        {
          service_name: firstAvailableService.title,
          description: "",
          estimated_quantity: 1,
        },
      ],
    }));
  };

  const updateService = (
    index: number,
    field: keyof QuoteServicePayload,
    value: string | number,
  ) => {
    setForm((current) => ({
      ...current,
      services: current.services.map((service, serviceIndex) =>
        serviceIndex === index
          ? {
              ...service,
              [field]:
                field === "estimated_quantity"
                  ? Math.max(1, Number(value) || 1)
                  : value,
            }
          : service,
      ),
    }));

    setServerError("");
  };

  const removeService = (index: number) => {
    setForm((current) => ({
      ...current,
      services: current.services.filter(
        (_, serviceIndex) => serviceIndex !== index,
      ),
    }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required.";
    } else if (form.name.trim().length < 2) {
      nextErrors.name = "Name must contain at least 2 characters.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (form.phone_number.trim().length > 20) {
      nextErrors.phone_number = "Phone number is too long.";
    }

    if (!form.project_type) {
      nextErrors.project_type = "Please select a project type.";
    }

    if (!form.project_description.trim()) {
      nextErrors.project_description =
        "Project description is required.";
    } else if (form.project_description.trim().length < 20) {
      nextErrors.project_description =
        "Project description must contain at least 20 characters.";
    }

    if (!form.budget_range) {
      nextErrors.budget_range = "Please select your budget range.";
    }

    if (!form.timeline) {
      nextErrors.timeline = "Please select your preferred timeline.";
    }

    if (!form.priority) {
      nextErrors.priority = "Please select a priority.";
    }

    form.services.forEach((service, index) => {
      if (!service.service_name.trim()) {
        nextErrors[`service_${index}`] =
          "Please select a service.";
      }

      if (
        !Number.isInteger(service.estimated_quantity) ||
        service.estimated_quantity < 1
      ) {
        nextErrors[`service_quantity_${index}`] =
          "Quantity must be at least 1.";
      }
    });

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setServerError("");

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const payload: QuoteRequestPayload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone_number: form.phone_number.trim(),
      company_name: form.company_name.trim(),
      project_type: form.project_type,
      project_title: form.project_title.trim(),
      project_description: form.project_description.trim(),
      required_features: form.required_features.trim(),
      existing_website: form.existing_website.trim(),
      budget_range: form.budget_range,
      timeline: form.timeline,
      preferred_technologies: form.preferred_technologies.trim(),
      additional_notes: form.additional_notes.trim(),
      priority: form.priority,
      services: form.services.map((service) => ({
        service_name: service.service_name.trim(),
        description: service.description.trim(),
        estimated_quantity: Math.max(
          1,
          Number(service.estimated_quantity) || 1,
        ),
      })),
    };

    try {
      const response = await quoteService.submitQuote(payload);

      if (!response.success) {
        setServerError(
          response.message || "Unable to submit your quote request.",
        );

        if (response.errors) {
          const backendErrors: FormErrors = {};

          Object.entries(response.errors).forEach(([field, messages]) => {
            backendErrors[field] = messages.join(" ");
          });

          setErrors(backendErrors);
        }

        return;
      }

      setSubmittedQuoteId(response.quote_id ?? null);
    } catch (error: any) {
      const responseData = error?.response?.data;

      if (responseData?.errors) {
        const backendErrors: FormErrors = {};

        Object.entries(responseData.errors).forEach(
          ([field, messages]) => {
            backendErrors[field] = Array.isArray(messages)
              ? messages.join(" ")
              : String(messages);
          },
        );

        setErrors(backendErrors);
      }

      setServerError(
        responseData?.message ||
          "Something went wrong while submitting your quote request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmittedQuoteId(null);
    setServerError("");
    setErrors({});

    setForm({
      name: user
        ? [user.first_name, user.last_name].filter(Boolean).join(" ")
        : "",
      email: user?.email || "",
      phone_number: user?.phone_number || "",
      company_name: "",
      project_type: "",
      project_title: "",
      project_description: "",
      required_features: "",
      existing_website: "",
      budget_range: "",
      timeline: "",
      preferred_technologies: "",
      additional_notes: "",
      priority: "NORMAL",
      services: [],
    });
  };

  if (submittedQuoteId !== null) {
    return (
      <QuoteSuccess
        quoteId={submittedQuoteId}
        onReset={resetForm}
      />
    );
  }

  return (
    <section className="bg-theme-primary px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] shadow-2xl">
          <div className="border-b border-white/10 px-6 py-8 sm:px-8 lg:px-10">
            <div className="max-w-2xl">
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-green-400">
                Request a Quote
              </p>

              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Tell us about your project
              </h2>

              <p className="mt-3 text-sm leading-7 text-gray-400">
                Share your requirements, preferred services, budget and
                timeline. We will review everything and contact you with
                the next steps.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10 p-6 sm:p-8 lg:p-10">
            {serverError && (
              <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4">
                <AlertCircle
                  size={20}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <div>
                  <p className="text-sm font-semibold text-red-300">
                    Unable to submit request
                  </p>

                  <p className="mt-1 text-sm text-red-400">
                    {serverError}
                  </p>
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Contact Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Tell us how we can reach you.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <Field
                  label="Full Name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your full name"
                  required
                />

                <Field
                  label="Email Address"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="you@example.com"
                  type="email"
                  required
                />

                <Field
                  label="Phone Number"
                  name="phone_number"
                  value={form.phone_number}
                  onChange={handleChange}
                  error={errors.phone_number}
                  placeholder="+91 9876543210"
                  type="tel"
                />

                <Field
                  label="Company Name"
                  name="company_name"
                  value={form.company_name}
                  onChange={handleChange}
                  error={errors.company_name}
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Project Information */}
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Project Information
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Help us understand what you want to build.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <SelectField
                  label="Project Type"
                  name="project_type"
                  value={form.project_type}
                  onChange={handleChange}
                  options={projectTypes}
                  error={errors.project_type}
                  required
                />

                <Field
                  label="Project Title"
                  name="project_title"
                  value={form.project_title}
                  onChange={handleChange}
                  error={errors.project_title}
                  placeholder="e.g. E-Commerce Platform"
                />

                <div className="md:col-span-2">
                  <TextAreaField
                    label="Project Description"
                    name="project_description"
                    value={form.project_description}
                    onChange={handleChange}
                    error={errors.project_description}
                    placeholder="Describe your project, its goals, target users and what you want to achieve..."
                    required
                    rows={7}
                  />
                </div>

                <div className="md:col-span-2">
                  <TextAreaField
                    label="Required Features"
                    name="required_features"
                    value={form.required_features}
                    onChange={handleChange}
                    error={errors.required_features}
                    placeholder={`Enter one feature per line:\nUser authentication\nPayment gateway\nAdmin dashboard\nEmail notifications`}
                    rows={6}
                  />
                </div>

                <Field
                  label="Existing Website"
                  name="existing_website"
                  value={form.existing_website}
                  onChange={handleChange}
                  error={errors.existing_website}
                  placeholder="https://example.com"
                  type="url"
                />

                <Field
                  label="Preferred Technologies"
                  name="preferred_technologies"
                  value={form.preferred_technologies}
                  onChange={handleChange}
                  error={errors.preferred_technologies}
                  placeholder="React, Django, PostgreSQL..."
                />
              </div>
            </div>

            {/* Requested Services */}
            <div>
              <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Requested Services
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Select the services you are interested in. This section
                    is optional.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={addService}
                  disabled={
                    availableServices.length === 0 ||
                    form.services.length >= availableServices.length
                  }
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-2.5 text-sm font-semibold text-green-300 transition hover:border-green-400/50 hover:bg-green-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Plus size={17} />
                  Add Service
                </button>
              </div>

              {availableServices.length === 0 && (
                <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-5">
                  <p className="text-sm text-yellow-300">
                    No active services are currently available.
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Services can be added and activated from Django Admin.
                  </p>
                </div>
              )}

              {form.services.length === 0 &&
                availableServices.length > 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-8 text-center">
                    <p className="text-sm text-gray-400">
                      No services selected yet.
                    </p>

                    <button
                      type="button"
                      onClick={addService}
                      className="mt-3 text-sm font-semibold text-green-400 hover:text-green-300"
                    >
                      + Add your first service
                    </button>
                  </div>
                )}

              <div className="space-y-4">
                {form.services.map((service, index) => {
                  const selectedServiceNames = form.services
                    .filter((_, serviceIndex) => serviceIndex !== index)
                    .map((item) => item.service_name);

                  return (
                    <div
                      key={`${service.service_name}-${index}`}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="mb-5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-white">
                            Service {index + 1}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            Select a service and provide optional details.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 transition hover:border-red-500/40 hover:bg-red-500/20"
                          aria-label={`Remove service ${index + 1}`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <div className="grid gap-5 md:grid-cols-3">
                        <div className="space-y-2 md:col-span-2">
                          <label
                            htmlFor={`service-${index}`}
                            className="block text-sm font-medium text-white"
                          >
                            Service
                            <span className="ml-1 text-red-400">*</span>
                          </label>

                          <div className="relative">
                            <select
                              id={`service-${index}`}
                              value={service.service_name}
                              onChange={(event) =>
                                updateService(
                                  index,
                                  "service_name",
                                  event.target.value,
                                )
                              }
                              className={`w-full appearance-none rounded-xl border bg-black/30 px-4 py-3 pr-10 text-sm text-white outline-none transition focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 ${
                                errors[`service_${index}`]
                                  ? "border-red-500/70"
                                  : "border-white/10"
                              }`}
                            >
                              <option
                                value=""
                                className="bg-gray-950"
                              >
                                Select a service
                              </option>

                              {availableServices.map((availableService) => (
                                <option
                                  key={availableService.id}
                                  value={availableService.title}
                                  disabled={selectedServiceNames.includes(
                                    availableService.title,
                                  )}
                                  className="bg-gray-950"
                                >
                                  {availableService.title}
                                </option>
                              ))}
                            </select>

                            <ChevronDown
                              size={18}
                              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                          </div>

                          {errors[`service_${index}`] && (
                            <p className="text-xs text-red-400">
                              {errors[`service_${index}`]}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label
                            htmlFor={`service-quantity-${index}`}
                            className="block text-sm font-medium text-white"
                          >
                            Quantity
                          </label>

                          <input
                            id={`service-quantity-${index}`}
                            type="number"
                            min={1}
                            value={service.estimated_quantity}
                            onChange={(event) =>
                              updateService(
                                index,
                                "estimated_quantity",
                                event.target.value,
                              )
                            }
                            className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none transition focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 ${
                              errors[`service_quantity_${index}`]
                                ? "border-red-500/70"
                                : "border-white/10"
                            }`}
                          />

                          {errors[`service_quantity_${index}`] && (
                            <p className="text-xs text-red-400">
                              {errors[`service_quantity_${index}`]}
                            </p>
                          )}
                        </div>

                        <div className="md:col-span-3">
                          <label
                            htmlFor={`service-description-${index}`}
                            className="mb-2 block text-sm font-medium text-white"
                          >
                            Service Description
                          </label>

                          <textarea
                            id={`service-description-${index}`}
                            rows={3}
                            value={service.description}
                            onChange={(event) =>
                              updateService(
                                index,
                                "description",
                                event.target.value,
                              )
                            }
                            placeholder="Optional details about this particular service..."
                            className="w-full resize-y rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Budget */}
            <div>
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  Budget & Timeline
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  This helps us prepare a realistic proposal.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-3">
                <SelectField
                  label="Budget Range"
                  name="budget_range"
                  value={form.budget_range}
                  onChange={handleChange}
                  options={budgetRanges}
                  error={errors.budget_range}
                  required
                />

                <SelectField
                  label="Timeline"
                  name="timeline"
                  value={form.timeline}
                  onChange={handleChange}
                  options={timelines}
                  error={errors.timeline}
                  required
                />

                <SelectField
                  label="Priority"
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  options={priorities}
                  error={errors.priority}
                  required
                />
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <TextAreaField
                label="Additional Notes"
                name="additional_notes"
                value={form.additional_notes}
                onChange={handleChange}
                error={errors.additional_notes}
                placeholder="Anything else we should know about your project?"
                rows={5}
              />
            </div>

            {/* Submit */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-500/10">
                    <Check size={16} className="text-green-400" />
                  </div>

                  <p className="max-w-lg text-xs leading-5 text-gray-500">
                    Your information will be securely submitted to our
                    backend for review. We will use the information only
                    to evaluate your project request and contact you.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Quote Request"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}