import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources — Alpha Academy" },
      {
        name: "description",
        content:
          "Articles, AI resources, guides & prompts, and events from Alpha Academy — learn more, do more.",
      },
      { property: "og:title", content: "Resources — Alpha Academy" },
      { property: "og:description", content: "Learn more. Do more. Resources from Alpha Academy." },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

const CATEGORIES = [
  { title: "Articles", copy: "Perspectives on applying AI to real work." },
  { title: "AI Resources", copy: "Curated tools worth your time." },
  { title: "Guides & Prompts", copy: "Step-by-step playbooks you can reuse." },
  { title: "Events", copy: "Live sessions, trainings and workshops." },
];

function Resources() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-20">
          <Reveal>
            <p className="eyebrow">Resources</p>
            <h1 className="mt-5 text-4xl font-extrabold uppercase sm:text-6xl">
              Learn more. Do more.
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Alpha Academy's educational content will be published here as it is released.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page grid gap-6 py-20 sm:grid-cols-2">
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.title} delay={i * 80}>
            <div className="flex h-full flex-col border border-border p-9">
              <h2 className="font-display text-xl font-extrabold tracking-[0.08em] uppercase">
                {c.title}
              </h2>
              <p className="mt-3 text-muted-foreground">{c.copy}</p>
              <p className="mt-8 font-display text-[0.65rem] font-bold tracking-[0.18em] uppercase text-muted-foreground">
                Content coming soon — placeholder
              </p>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-t border-border bg-secondary">
        <Reveal className="container-page py-16">
          <h2 className="text-2xl font-extrabold uppercase">Want a resource sent to you?</h2>
          <p className="mt-3 text-muted-foreground">
            Message Alpha Academy directly and we'll point you to the right material.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground hover:bg-primary/90"
            >
              WhatsApp us <ArrowRight className="size-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-ink px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase hover:bg-ink hover:text-ink-foreground"
            >
              Contact
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}