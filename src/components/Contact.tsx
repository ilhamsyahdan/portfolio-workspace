import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import { contactContent } from "../data/contact";
import type { ContactContent, SocialIcon, SocialLink } from "../data/contact";
import { Reveal } from "./Reveal";

/* -------------------------------- Types ----------------------------------- */

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

type FieldName = keyof ContactFormData;
type FieldErrors = Partial<Record<FieldName, string>>;
type TouchedFields = Partial<Record<FieldName, boolean>>;
type SubmitStatus = "idle" | "submitting" | "success" | "error";

interface ContactProps {
  content?: ContactContent;
  /**
   * Handles the submitted data. Throw / reject to show the error message.
   * Defaults to console.log (MVP). Swap for a real API call or a service
   * such as Formspree later.
   */
  onSubmit?: (data: ContactFormData) => Promise<void>;
}

const FIELD_ORDER: readonly FieldName[] = ["name", "email", "message"];
const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

/* ------------------------------ Validation -------------------------------- */

function validateField(field: FieldName, value: string): string | undefined {
  const trimmed = value.trim();

  switch (field) {
    case "name":
      if (!trimmed) return "Please enter your name.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      return undefined;
    case "email":
      if (!trimmed) return "Please enter your email address.";
      if (!EMAIL_PATTERN.test(trimmed))
        return "Please enter a valid email address.";
      return undefined;
    case "message":
      if (!trimmed) return "Please write a message.";
      if (trimmed.length < 10) return "Message must be at least 10 characters.";
      return undefined;
  }
}

function validateAll(data: ContactFormData): FieldErrors {
  const errors: FieldErrors = {};
  FIELD_ORDER.forEach((field) => {
    const message = validateField(field, data[field]);
    if (message) errors[field] = message;
  });
  return errors;
}

/** MVP submit handler: logs the data and simulates a network delay. */
async function defaultSubmit(data: ContactFormData): Promise<void> {
  console.log("Contact form submitted:", data);
  await new Promise<void>((resolve) => setTimeout(resolve, 800));
}

/* -------------------------------- Icons ----------------------------------- */

function SocialIconSvg({ icon }: { icon: SocialIcon }) {
  switch (icon) {
    case "github":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="currentColor"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );
    case "email":
      return (
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
  }
}

function ArrowIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12L12 4M6 4h6v6" />
    </svg>
  );
}

/* ----------------------------- Social links ------------------------------- */

function SocialCard({ link }: { link: SocialLink }) {
  const externalProps = link.external
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <a
      href={link.href}
      {...externalProps}
      className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm transition-colors duration-200 hover:border-cyan-400/30 hover:bg-white/[0.05] ${focusRing}`}
    >
      <span
        aria-hidden
        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
      >
        <SocialIconSvg icon={link.icon} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium text-white">{link.label}</span>
        <span className="block truncate text-sm text-slate-400">
          {link.display}
        </span>
      </span>
      <span
        aria-hidden
        className="text-slate-600 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300"
      >
        <ArrowIcon />
      </span>
      {link.external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  );
}

/* ------------------------------ Form pieces ------------------------------- */

function inputClass(hasError: boolean): string {
  return `w-full rounded-2xl border bg-white/[0.04] px-4 py-3 text-slate-100 placeholder:text-slate-500 transition-colors duration-200 focus:outline-none focus:ring-2 ${
    hasError
      ? "border-red-400/50 focus:border-red-400/70 focus:ring-red-400/20"
      : "border-white/10 hover:border-white/20 focus:border-cyan-400/60 focus:ring-cyan-400/20"
  }`;
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-slate-200"
      >
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-sm text-red-300"
        >
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------- Contact --------------------------------- */

export function Contact({
  content = contactContent,
  onSubmit = defaultSubmit,
}: ContactProps) {
  const [values, setValues] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const isSubmitting = status === "submitting";

  const handleChange =
    (field: FieldName) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      // Once a field has been visited, validate live while typing.
      if (touched[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validateField(field, value),
        }));
      }
      if (status === "success" || status === "error") setStatus("idle");
    };

  const handleBlur = (field: FieldName) => (): void => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, values[field]),
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }

    setStatus("submitting");
    try {
      await onSubmit({
        name: values.name.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
      });
      setValues(EMPTY_FORM);
      setErrors({});
      setTouched({});
      setStatus("success");
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
    }
  };

  const describedBy = (field: FieldName): string | undefined =>
    errors[field] ? `contact-${field}-error` : undefined;

  return (
    <section
      id="contact"
      className="relative isolate scroll-mt-24 overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Contact"
          title="Let's work together"
          description={content.intro}
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Social links */}
          <Reveal>
            <ul className="space-y-3">
              {content.socials.map((link) => (
                <li key={link.id}>
                  <SocialCard link={link} />
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
              className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:p-8"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="contact-name" label="Name" error={errors.name}>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    value={values.name}
                    onChange={handleChange("name")}
                    onBlur={handleBlur("name")}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={describedBy("name")}
                    className={inputClass(Boolean(errors.name))}
                  />
                </Field>

                <Field id="contact-email" label="Email" error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={values.email}
                    onChange={handleChange("email")}
                    onBlur={handleBlur("email")}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={describedBy("email")}
                    className={inputClass(Boolean(errors.email))}
                  />
                </Field>
              </div>

              <Field
                id="contact-message"
                label="Message"
                error={errors.message}
              >
                <textarea
                  id="contact-message"
                  name="message"
                  rows={6}
                  maxLength={2000}
                  placeholder="Tell me about your project or question..."
                  value={values.message}
                  onChange={handleChange("message")}
                  onBlur={handleBlur("message")}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={describedBy("message")}
                  className={`${inputClass(Boolean(errors.message))} resize-y`}
                />
              </Field>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500 px-7 py-3.5 text-base font-semibold text-slate-950 shadow-[0_0_36px_-6px_rgba(6,182,212,0.7)] transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70 ${focusRing}`}
                >
                  {isSubmitting && (
                    <span
                      aria-hidden
                      className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent motion-reduce:animate-none"
                    />
                  )}
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>

                {/* Feedback (always mounted so screen readers announce changes) */}
                <div aria-live="polite" className="min-h-[1.5rem] text-sm">
                  {status === "success" && (
                    <p className="text-emerald-300">
                      Thanks! Your message has been sent.
                    </p>
                  )}
                  {status === "error" && (
                    <p role="alert" className="text-red-300">
                      Something went wrong. Please try again or email me
                      directly.
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
