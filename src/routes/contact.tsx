import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { EnrolmentForm } from "@/components/site/EnrolmentForm";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Enrol — Alpha Academy" },
      {
        name: "description",
        content:
          "Enrol in an Alpha Academy program or get in touch by email, phone or WhatsApp.",
      },
      { property: "og:title", content: "Contact & Enrol — Alpha Academy" },
      { property: "og:description", content: "Talk to Alpha Academy about programs and enrolment." },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

function Contact() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-20">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h1 className="mt-5 text-4xl font-extrabold uppercase sm:text-6xl">Enrol / Get in touch</h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Tell us what you do, and we'll show you how AI fits into it.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page grid gap-14 py-20 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
                `Alpha Academy enquiry — ${interest}`,
              )}&body=${encodeURIComponent(body)}`;
            }}
          >
            <div>
              <label htmlFor="name" className="font-display text-xs font-semibold tracking-[0.16em] uppercase">
                Full name
              </label>
              <input
                id="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-display text-xs font-semibold tracking-[0.16em] uppercase">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <div>
              <label htmlFor="interest" className="font-display text-xs font-semibold tracking-[0.16em] uppercase">
                I'm interested in
              </label>
              <select
                id="interest"
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option>YOUR AI EDGE</option>
                <option>Training for students</option>
                <option>Training for professionals</option>
                <option>Training for entrepreneurs</option>
                <option>Training for organizations</option>
                <option>Something else</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="font-display text-xs font-semibold tracking-[0.16em] uppercase">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full rounded-sm border border-border bg-background px-4 py-3 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Send className="size-4" /> Send enquiry
            </button>
            <p className="text-xs text-muted-foreground">
              This opens your email app with the message pre-filled, addressed to Alpha Academy.
            </p>
          </form>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-ink p-9 text-ink-foreground">
            <h2 className="font-display text-lg font-extrabold tracking-[0.12em] uppercase">
              Direct contact
            </h2>
            <ul className="mt-8 space-y-6 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                <a href={`mailto:${CONTACT.email}`} className="break-all hover:text-primary">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                <a href={CONTACT.phoneHref} className="hover:text-primary">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="mt-0.5 size-4 text-primary" aria-hidden="true" />
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:text-primary"
                >
                  Chat on WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </Reveal>
      </section>
    </>
  );
}