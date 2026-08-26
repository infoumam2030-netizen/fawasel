"use client";

import { Check, Loader2, Send } from "lucide-react";
import { useState } from "react";

import type { UiStrings } from "@/i18n/strings";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  strings,
  services,
  successMessage,
}: {
  strings: UiStrings;
  services: string[];
  successMessage: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const nextErrors: Record<string, string> = {};
    for (const field of ["name", "email", "brief"]) {
      if (!data[field]?.trim()) nextErrors[field] = strings.formRequired;
    }
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = strings.formInvalidEmail;
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass relative flex min-h-[320px] flex-col items-center justify-center gap-4 overflow-hidden rounded-lg p-10 text-center">
        <div className="grid-field pointer-events-none absolute inset-0 opacity-40" aria-hidden />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(96deg,var(--accent-from),var(--accent-to))] text-[#0a0a0b]">
          <Check className="h-5 w-5" aria-hidden />
        </span>
        <p className="relative max-w-sm text-sm leading-relaxed text-offwhite/90" role="status">
          {successMessage}
        </p>
      </div>
    );
  }

  const field = (
    name: string,
    label: string,
    type: "text" | "email" | "tel" = "text",
    required = false,
  ) => (
    <div>
      <label className="admin-label" htmlFor={`contact-${name}`}>
        {label}
        {required ? <span className="text-accent"> *</span> : null}
      </label>
      <input
        id={`contact-${name}`}
        name={name}
        type={type}
        required={required}
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? `contact-${name}-error` : undefined}
        className="admin-input"
      />
      {errors[name] ? (
        <p id={`contact-${name}-error`} className="mt-1.5 text-xs text-accent">
          {errors[name]}
        </p>
      ) : null}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-lg p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", strings.formName, "text", true)}
        {field("company", strings.formCompany)}
        {field("email", strings.formEmail, "email", true)}
        {field("phone", strings.formPhone, "tel")}
        <div>
          <label className="admin-label" htmlFor="contact-service">
            {strings.formService}
          </label>
          <select id="contact-service" name="service" className="admin-input" defaultValue="">
            <option value="">{strings.formSelect}</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        {field("budget", strings.formBudget)}
      </div>

      <div className="mt-5">
        <label className="admin-label" htmlFor="contact-brief">
          {strings.formBrief}
          <span className="text-accent"> *</span>
        </label>
        <textarea
          id="contact-brief"
          name="brief"
          rows={5}
          required
          aria-invalid={Boolean(errors.brief)}
          aria-describedby={errors.brief ? "contact-brief-error" : undefined}
          className="admin-input resize-y"
        />
        {errors.brief ? (
          <p id="contact-brief-error" className="mt-1.5 text-xs text-accent">
            {errors.brief}
          </p>
        ) : null}
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 text-sm text-accent">
          {strings.formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-shine mt-7 inline-flex items-center gap-2 rounded-full bg-[linear-gradient(96deg,var(--accent-from),var(--accent-to))] px-7 py-3.5 text-xs font-medium uppercase tracking-[0.18em] text-[#0a0a0b] disabled:opacity-60"
      >
        {status === "sending" ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        ) : (
          <Send className="h-4 w-4" aria-hidden />
        )}
        {status === "sending" ? strings.formSending : strings.formSubmit}
      </button>
    </form>
  );
}
