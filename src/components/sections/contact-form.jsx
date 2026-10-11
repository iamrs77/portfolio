"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { CONTACT_LIMITS, validateContact } from "@/lib/contact-form";
import { cn } from "@/lib/utils";

/** Submissions faster than this are almost certainly bots. */
const MIN_FILL_TIME_MS = 3000;

const inputStyles =
  "block w-full rounded-xl border border-border-strong bg-background px-4 py-3 text-[0.9375rem] transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/15 focus:outline-none aria-[invalid=true]:border-danger";

function readValues(data) {
  return {
    name: String(data.get("name") ?? "").trim(),
    email: String(data.get("email") ?? "").trim(),
    message: String(data.get("message") ?? "").trim(),
  };
}

export function ContactForm({ endpoint }) {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ state: "idle" });
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = readValues(data);

    const nextErrors = validateContact(values);
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      form.elements.namedItem(firstInvalid)?.focus();
      return;
    }

    // Spam protection: a filled honeypot or an instant submission gets a fake success and is never sent.
    if (data.get("_gotcha") || Date.now() - startedAt.current < MIN_FILL_TIME_MS) {
      form.reset();
      setStatus({ state: "success" });
      return;
    }

    setStatus({ state: "submitting" });
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, _subject: `Portfolio message from ${values.name}` }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.errors?.map((error) => error.message).join(" ") || "The message could not be sent.");
      }
      form.reset();
      setStatus({ state: "success" });
    } catch (error) {
      setStatus({
        state: "error",
        message: error instanceof Error ? error.message : "The message could not be sent.",
      });
    }
  }

  if (status.state === "success") {
    return (
      <div role="status" className="flex h-full flex-col items-start justify-center rounded-2xl border bg-background p-8">
        <CheckCircle2 aria-hidden="true" className="size-8 text-success" />
        <p className="mt-5 text-xl font-medium tracking-tight">Thanks, your message is on its way.</p>
        <p className="mt-2 text-muted">I&apos;ll get back to you as soon as I can.</p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus({ state: "idle" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const submitting = status.state === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="relative space-y-5 rounded-2xl border bg-background p-6 sm:p-8">
      <Field id="contact-name" label="Name" error={errors.name}>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={CONTACT_LIMITS.name.max}
          placeholder="Your name"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          className={inputStyles}
        />
      </Field>
      <Field id="contact-email" label="Email" error={errors.email}>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          className={inputStyles}
        />
      </Field>
      <Field id="contact-message" label="Message" error={errors.message}>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          maxLength={CONTACT_LIMITS.message.max}
          placeholder="What would you like to talk about?"
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          className={cn(inputStyles, "resize-y")}
        />
      </Field>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="contact-gotcha">Leave this field empty</label>
        <input id="contact-gotcha" type="text" name="_gotcha" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p aria-live="polite" className={cn("text-sm", status.state === "error" ? "text-danger" : "text-muted")}>
          {status.state === "error" ? status.message : "I usually reply within a couple of days."}
        </p>
        <Button type="submit" size="lg" disabled={submitting}>
          {submitting ? (
            <Loader2 aria-hidden="true" className="size-4 animate-spin" />
          ) : (
            <Send aria-hidden="true" className="size-4" />
          )}
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
