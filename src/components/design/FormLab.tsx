"use client";

import { useState } from "react";
import { Field, Input, Select, Textarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";

/**
 * Live field states — including a real error and a real loading submit — so
 * the review covers what the quote form will actually look like in Phase 06.
 */
export function FormLab({
  labels,
  submitLabel,
  loadingLabel,
}: {
  labels: Record<string, string>;
  submitLabel: string;
  loadingLabel: string;
}) {
  const [isSubmitting, setSubmitting] = useState(false);

  return (
    <form
      // This is a specimen of the field states, not a real form: the email
      // below deliberately holds an invalid value so the error state is
      // visible. Real validation is React Hook Form + Zod in Phase 06.
      noValidate
      className="grid gap-6 sm:grid-cols-2"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        setTimeout(() => setSubmitting(false), 1600);
      }}
    >
      <Field label={labels.name} required>
        {(props) => <input {...props} type="text" placeholder={labels.namePlaceholder} />}
      </Field>

      <Field label={labels.email} error={labels.emailError} required>
        {(props) => <input {...props} type="email" defaultValue="not-an-email" />}
      </Field>

      <Field label={labels.service} hint={labels.serviceHint}>
        {(props) => (
          <select {...props} defaultValue="">
            <option value="" disabled>
              {labels.choose}
            </option>
            <option value="digital-marketing">Digital Marketing</option>
            <option value="branding">Branding &amp; Identity</option>
            <option value="web">Websites &amp; Digital Systems</option>
          </select>
        )}
      </Field>

      <Field label={labels.disabled}>
        {(props) => <input {...props} disabled defaultValue="—" />}
      </Field>

      <Field label={labels.details} className="sm:col-span-2">
        {(props) => <textarea {...props} rows={4} placeholder={labels.detailsPlaceholder} />}
      </Field>

      <div className="sm:col-span-2">
        <Button type="submit" isLoading={isSubmitting} loadingLabel={loadingLabel}>
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

/** Re-exported so the page can show the standalone controls too. */
export { Input, Select, Textarea };
