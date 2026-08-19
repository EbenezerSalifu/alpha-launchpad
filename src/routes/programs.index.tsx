import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { PROGRAMS } from "@/lib/site";

export const Route = createFileRoute("/programs/")({
  head: () => ({
    meta: [
      { title: "Programs & Experiences — Alpha Academy" },
      {
        name: "description",
        content:
          "Explore Alpha Academy programs: SCALE WITH AI and YOUR AI EDGE — practical AI training for students, professionals and entrepreneurs.",
      },
      { property: "og:title", content: "Programs & Experiences — Alpha Academy" },
      {
        property: "og:description",
        content: "Practical AI programs built around what you already do.",
      },
      { property: "og:url", content: "/programs" },
    ],
    links: [{ rel: "canonical", href: "/programs" }],
  }),
  component: Programs,
});

const AUDIENCES = [
  {
    id: "students",
    title: "Students",
    copy: "Leverage AI to study smarter and unlock the A student in you.",
  },
  {
    id: "professionals",
    title: "Professionals",
    copy: "10X your productivity and future-proof your career with AI literacy.",
  },
  {
    id: "entrepreneurs",
    title: "Entrepreneurs",
    copy: "Run your business/brand like a team of 10 with AI as an assistant.",
  },
  {
    id: "organizations",
    title: "Organizations",
    copy: "Equip your team with practical AI skills applied to your actual work.",
  },
];

function Programs() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-20">
          <Reveal>
            <p className="eyebrow">Programs</p>
            <h1 className="mt-5 text-4xl font-extrabold uppercase sm:text-6xl">
              Programs & Experiences
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Focused trainings that turn AI awareness into applied skill.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page grid gap-6 py-20 md:grid-cols-2">
        {PROGRAMS.map((p, i) => (
          <Reveal as="article" key={p.slug} delay={i * 90}>
            <div className="flex h-full flex-col border border-border p-9 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(5,5,5,0.4)]">
              <div className="flex items-center justify-between gap-4">
                <p className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  {p.date}
                </p>
                <span
                  className={
                    p.status === "COMING UP"
                      ? "bg-primary px-3 py-1 font-display text-[0.65rem] font-bold tracking-[0.16em] text-primary-foreground uppercase"
                      : "border border-border px-3 py-1 font-display text-[0.65rem] font-bold tracking-[0.16em] text-muted-foreground uppercase"
                  }
                >
                  {p.status}
                </span>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold uppercase">{p.title}</h2>
              <p className="mt-4 flex-1 leading-relaxed text-muted-foreground">{p.summary}</p>
              <Link
                to="/programs/$slug"
                params={{ slug: p.slug }}
                className="mt-8 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] text-primary uppercase hover:underline"
              >
                View Program <ArrowRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        ))}
      </section>

      <section className="border-y border-border bg-secondary">
        <div className="container-page py-20">
          <Reveal>
            <h2 className="text-3xl font-extrabold uppercase sm:text-4xl">Who we equip</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {AUDIENCES.map((a, i) => (
              <Reveal key={a.id} delay={i * 80}>
                <div id={a.id} className="h-full scroll-mt-28 border-t-2 border-primary bg-background p-8">
                  <h3 className="font-display text-lg font-extrabold tracking-[0.08em] uppercase">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <Link
              to="/contact"
              className="mt-10 inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground hover:bg-primary/90"
            >
              Enrol Now <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}