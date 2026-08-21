"use client";

import { forwardRef, useId } from "react";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------------------
 * Shared control surface
 * ---------------------------------------------------------------------- */

const CONTROL_CLASSES = cn(
  "w-full rounded-none border bg-surface px-4 py-3 text-body-sm text-foreground",
  "transition-[border-color,box-shadow] duration-200 ease-panther",
  "placeholder:text-faint",
  "focus:border-lavender focus:shadow-glow-sm focus:outline-none",
  "disabled:cursor-not-allowed disabled:opacity-45"
);

/* -------------------------------------------------------------------------
 * Field wrapper — label, hint, error
 * ---------------------------------------------------------------------- */

interface FieldProps {
  label: string;
  /** Rendered under the label. Hidden once an error is showing. */
  hint?: string;
  error?: string;
  required?: boolean;
  /** Receives the ids and flags it must wire to the control. */
  children: (props: {
    id: string;
    "aria-describedby": string | undefined;
    "aria-invalid": boolean | undefined;
    required: boolean | undefined;
    className: string;
  }) => React.ReactNode;
  className?: string;
}

/**
 * Owns labelling and error wiring so no form has to reinvent it. The control
 * itself is supplied by the caller, which keeps this usable with plain inputs
 * and with React Hook Form's `register` alike.
 */
export function Field({ label, hint, error, required, children, className }: FieldProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  const describedBy = error ? errorId : hint ? hintId : undefined;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-body-sm font-medium text-foreground">
        {label}
        {required && (
          <span className="text-lavender-soft" aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>

      {children({
        id,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
        // Forwarded so the asterisk in the label always reflects a control
        // that is genuinely required, for validation and for screen readers.
        required: required || undefined,
        className: cn(CONTROL_CLASSES, error ? "border-danger focus:border-danger" : "border-border"),
      })}

      {error ? (
        <p id={errorId} role="alert" className="text-caption text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-caption text-faint">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------
 * Controls
 * ---------------------------------------------------------------------- */

export const Input = forwardRef<HTMLInputElement, React.ComponentPropsWithoutRef<"input">>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(CONTROL_CLASSES, "border-border", className)} {...props} />;
  }
);

export const Textarea = forwardRef<HTMLTextAreaElement, React.ComponentPropsWithoutRef<"textarea">>(
  function Textarea({ className, rows = 4, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        rows={rows}
        className={cn(CONTROL_CLASSES, "border-border resize-y", className)}
        {...props}
      />
    );
  }
);

export const Select = forwardRef<HTMLSelectElement, React.ComponentPropsWithoutRef<"select">>(
  function Select({ className, children, ...props }, ref) {
    return (
      <select
        ref={ref}
        // The native disclosure arrow is kept deliberately: the browser places
        // it on the correct side in both RTL and LTR without a second rule.
        className={cn(CONTROL_CLASSES, "border-border", className)}
        {...props}
      >
        {children}
      </select>
    );
  }
);
