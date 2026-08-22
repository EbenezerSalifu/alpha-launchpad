import { useState } from "react";
import { z } from "zod";
import { Check, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

// Hardcoded exact options requested
const INTEREST_OPTIONS = [
  "AI for Students",
  "AI for Professionals",
  "AI for Entrepreneurs"
];

const schema = z.object({
  full_name: z.string().trim().min(1, "Please enter your full name.").max(120),
  contact: z.string().trim().min(6, "Please enter a valid phone/WhatsApp number.").max(40),
  gmail: z.string().trim().email("Please enter a valid email address.").max(200),
  interests: z.array(z.string()).min(1, "Please select at least one interest."),
});

export function EnrolmentForm() {
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [gmail, setGmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const toggle = (value: string) =>
    setInterests((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ full_name: fullName, contact, gmail, interests });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Please check your details.");
      return;
    }
    setSubmitting(true);
    
    // 1. Save to Supabase Database
    const { error: insertError } = await supabase.from("enrolments").insert(parsed.data);
    
    if (insertError) {
      setSubmitting(false);
      setError("We couldn't submit your details. Please try again in a moment.");
      return;
    }

    // 2. Send Email Notification to alphaacademy500@gmail.com
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "25e09229-ccd7-4f96-97b7-31352ffd6402", // We will replace this in the next step!
          subject: "New Student Registration - Alpha Academy",
          from_name: "Alpha Academy Website",
          message: `New student registration!\n\nName: ${parsed.data.full_name}\nContact: ${parsed.data.contact}\nGmail: ${parsed.data.gmail}\nInterests: ${parsed.data.interests.join(", ")}`
        })
      });
    } catch (err) {
      console.error("Email notification failed, but database save worked.", err);
    }

    setSubmitting(false);
    setDone(true);
    setFullName("");
    setContact("");
    setGmail("");
    setInterests([]);
  }

  const field =
    "mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 text-base focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const label = "font-display text-xs font-semibold tracking-[0.16em] uppercase";

  if (done) {
    return (
      <div className="rounded-sm border border-primary bg-secondary p-9" role="status">
        <Check className="size-8 text-primary" aria-hidden="true" />
        <h3 className="mt-5 font-display text-xl font-extrabold uppercase">Details received</h3>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Thank you for your interest in Alpha Academy. Your details have been received
          successfully.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-7 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary hover:underline"
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form className="space-y-6" onSubmit={onSubmit} noValidate>
      <div>
        <label htmlFor="full_name" className={label}>
          Full name
        </label>
        <input
          id="full_name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          maxLength={120}
          autoComplete="name"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="contact" className={label}>
          Contact
        </label>
        <input
          id="contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          maxLength={40}
          inputMode="tel"
          autoComplete="tel"
          placeholder="Phone / WhatsApp number"
          className={field}
        />
      </div>
      <div>
        <label htmlFor="gmail" className={label}>
          Gmail
        </label>
        <input
          id="gmail"
          type="email"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
          maxLength={200}
          autoComplete="email"
          className={field}
        />
      </div>

      <fieldset>
        <legend className={label}>I am interested in</legend>
        <p className="mt-2 text-xs text-muted-foreground">Select one or more.</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {INTEREST_OPTIONS.map((option) => {
            const active = interests.includes(option);
            return (
              <button
                key={option}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() => toggle(option)}
                className={cn(
                  "flex min-h-14 items-center justify-between gap-3 rounded-sm border px-4 py-4 text-left font-display text-xs font-semibold tracking-[0.12em] uppercase transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary",
                )}
              >
                {option}
                {active && <Check className="size-4 shrink-0" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-14 items-center gap-2 rounded-sm bg-primary px-10 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
      >
        <Send className="size-4" aria-hidden="true" /> {submitting ? "SUBMITTING..." : "SUBMIT"}
      </button>
    </form>
  );
}