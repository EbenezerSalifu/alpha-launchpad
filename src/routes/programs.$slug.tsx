import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Check, MessageCircle } from "lucide-react";
import flyer from "@/assets/scale-with-ai.png";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/site";

type Detail = {
  title: string;
  date: string;
  status: string;
  theme: string;
  intro: string;
  tracks: { title: string; items: string[] }[];
  audience: string;
  registration: string;
  showFlyer: boolean;
};

const DETAILS: Record<string, Detail> = {
  "scale-with-ai": {
    title: "SCALE WITH AI",
    date: "April 18th, 2026",
    status: "COMPLETED",
    theme: "You're not too late to become an expert in AI",
    intro:
      "A free training on using AI to 10X your productivity with free AI tools, delivered on WhatsApp by Alpha Academy — your trusted AI tutor.",
    tracks: [
      {
        title: "Data Analysis with AI",
        items: [
          "Understanding and analyzing data easily",
          "Turning raw data into insights",
          "Real-world examples and reports",
          "Summarizing large information into simple points",
        ],
      },
      {
        title: "Image Generation & Design",
        items: [
          "Comic book creation",
          "Portrait generation",
          "PowerPoint slides",
          "HD graphics",
          "Social media content design",
        ],
      },
      {
        title: "Writing & Content Creation",
        items: [
          "Article writing",
          "Research papers",
          "Academic projects",
          "Content creation and speech writing",
        ],
      },
    ],
    audience:
      "Anyone who wants to create like a pro with free AI tools — the tools covered included ChatGPT, Claude, Gemini, Copilot and NotebookLM.",
    registration:
      "Registration was free, and the program was delivered via WhatsApp on April 18th 2026. This program has ended.",
    showFlyer: true,
  },
  "your-ai-edge": {
    title: "YOUR AI EDGE",
    date: "September 4, 2026",
    status: "COMING UP",
    theme: "How can AI work specifically for what YOU do?",
    intro:
      "Discover how AI can work specifically for your niche—and gain the practical edge to work smarter, create more, and stay ahead.",
    tracks: [
      {
        title: "Not generic AI training",
        items: [
          "AI applied to your own field and daily work",
          "Practical workflows you can reuse immediately",
          "A clear edge: work smarter, create more, stay ahead",
        ],
      },
    ],
    audience: "Students, professionals and entrepreneurs who want AI applied to their own niche.",
    registration:
      "Full program details and registration will be published ahead of September 4, 2026. Reach out to be notified.",
    showFlyer: false,
  },
};

export const Route = createFileRoute("/programs/$slug")({
  loader: ({ params }) => {
    const detail = DETAILS[params.slug];
    if (!detail) throw notFound();
    return { detail };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Program unavailable — Alpha Academy" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.detail.title} — Alpha Academy`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.detail.intro },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.detail.intro },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/programs/${params.slug}` },
      ],
      links: [{ rel: "canonical", href: `/programs/${params.slug}` }],
    };
  },
  component: ProgramDetail,
});

function ProgramDetail() {
  const { detail } = Route.useLoaderData();

  return (
    <>
      <section className="bg-ink text-ink-foreground">
        <div className="container-page py-20">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink-foreground/60 hover:text-primary"
          >
            <ArrowLeft className="size-4" /> All Programs
          </Link>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase text-ink-foreground/70">
              <Calendar className="size-4 text-primary" /> {detail.date}
            </span>
            <span className="bg-primary px-3 py-1 font-display text-[0.65rem] font-bold tracking-[0.16em] text-primary-foreground uppercase">
              {detail.status}
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-extrabold uppercase sm:text-7xl">{detail.title}</h1>
          <p className="mt-5 max-w-2xl text-xl font-semibold text-primary">{detail.theme}</p>
          <p className="mt-4 max-w-2xl leading-relaxed text-ink-foreground/70">{detail.intro}</p>
        </div>
      </section>

      <section className="container-page grid gap-12 py-20 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-3xl font-extrabold uppercase">What it covers</h2>
          <div className="mt-10 space-y-10">
            {detail.tracks.map((track) => (
              <Reveal key={track.title}>
                <h3 className="font-display text-sm font-extrabold tracking-[0.16em] text-primary uppercase">
                  {track.title}
                </h3>
                <ul className="mt-4 space-y-3">
                  {track.items.map((item) => (
                    <li key={item} className="flex gap-3 text-muted-foreground">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 space-y-8 border-t border-border pt-10">
            <div>
              <h3 className="font-display text-sm font-extrabold tracking-[0.16em] uppercase">
                Who it's for
              </h3>
              <p className="mt-3 text-muted-foreground">{detail.audience}</p>
            </div>
            <div>
              <h3 className="font-display text-sm font-extrabold tracking-[0.16em] uppercase">
                Registration
              </h3>
              <p className="mt-3 text-muted-foreground">{detail.registration}</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground hover:bg-primary/90"
            >
              <MessageCircle className="size-4" /> Ask about this program
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-sm border border-ink px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase hover:bg-ink hover:text-ink-foreground"
            >
              Contact Alpha <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>

        {detail.showFlyer && (
          <aside>
            <img
              src={flyer}
              alt="SCALE WITH AI official program flyer"
              width={1000}
              height={1250}
              loading="lazy"
              className="w-full rounded-sm border border-border object-contain"
            />
            <p className="mt-3 text-xs text-muted-foreground">Official SCALE WITH AI flyer.</p>
          </aside>
        )}
      </section>
    </>
  );
}