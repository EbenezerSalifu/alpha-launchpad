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
          <EnrolmentForm />
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