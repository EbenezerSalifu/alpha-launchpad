import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import aboutImg from "@/assets/about.jpg";
import founder from "@/assets/founder.jpg.asset.json";
import { Reveal } from "@/components/site/Reveal";
import { PROGRAMS } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Alpha Academy — From Learning to Leading" },
      {
        name: "description",
        content:
          "Alpha Academy equips individuals with practical AI skills relevant to their fields — for students, professionals and entrepreneurs.",
      },
      { property: "og:title", content: "Alpha Academy — From Learning to Leading" },
      {
        property: "og:description",
        content: "Practical AI skills. Real-world application. Meaningful impact.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "EducationalOrganization",
          name: "Alpha Academy",
          slogan: "From Learning to Leading",
          email: "salifuebenezer10@gmail.com",
          telephone: "+2349036452259",
        }),
      },
    ],
  }),
  component: Home,
});

const AUDIENCES = [
  {
    title: "Students",
    copy: "Leverage AI to study smarter and unlock the A student in you.",
    hash: "students",
  },
  {
    title: "Professionals",
    copy: "10X your productivity and future-proof your career with AI literacy.",
    hash: "professionals",
  },
  {
    title: "Entrepreneurs",
    copy: "Run your business/brand like a team of 10 with AI as an assistant.",
    hash: "entrepreneurs",
  },
];

const STATS = [
  { value: "300+", label: "Learners Equipped" },
  { value: "2", label: "Programs & Trainings" },
  { value: "30+", label: "Resources Delivered" },
  { value: "92%", label: "Positive Feedback" },
];

const PRINCIPLES = [
  { title: "Practical", copy: "Learn skills you can actually use." },
  { title: "Relevant", copy: "AI applied to your field, career, or business." },
  { title: "Current", copy: "Stay equipped for a rapidly changing world." },
  { title: "Impactful", copy: "Move beyond knowing AI to creating value with it." },
];

const RESOURCES = [
  { title: "Articles", copy: "Perspectives on applying AI to real work." },
  { title: "AI Resources", copy: "Curated tools worth your time." },
  { title: "Guides & Prompts", copy: "Step-by-step playbooks you can reuse." },
  { title: "Events", copy: "Live sessions, trainings and workshops." },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid items-center gap-14 py-20 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <Reveal>
            <p className="eyebrow">Alpha Academy</p>
            <h1 className="mt-6 text-5xl leading-[0.95] font-extrabold uppercase sm:text-6xl lg:text-7xl">
              From Learning<br />
              to <span className="text-primary">Leading</span>
            </h1>
            <h2 className="mt-6 max-w-xl text-xl font-semibold text-foreground/80">
              Equipping you with the AI skills to thrive in your field.
            </h2>
            <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
              Alpha Academy equips individuals with practical AI skills relevant to their fields,
              empowering them to leverage AI, work smarter, create value, and thrive in an AI-driven
              world.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 rounded-sm bg-primary px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Explore Programs <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-sm border border-ink px-8 py-4 font-display text-xs font-semibold tracking-[0.16em] uppercase transition-colors hover:bg-ink hover:text-ink-foreground"
              >
                About Alpha
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative">
              <img
                src={heroImg}
                alt="Learners collaborating on laptops during an Alpha Academy session"
                width={1600}
                height={1200}
                className="w-full rounded-sm object-cover"
              />
              <div className="absolute -bottom-6 -left-6 hidden bg-primary px-6 py-5 text-primary-foreground sm:block">
                <p className="font-display text-3xl font-extrabold">300+</p>
                <p className="text-[0.7rem] font-semibold tracking-[0.16em] uppercase">
                  Learners Equipped
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section className="bg-background">
        <div className="container-page grid items-center gap-14 py-24 lg:grid-cols-2">
          <Reveal>
            <img
              src={aboutImg}
              alt="A professional applying AI tools to everyday work"
              width={1200}
              height={1408}
              loading="lazy"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">About Alpha Academy</p>
            <h2 className="mt-5 text-4xl leading-tight font-extrabold uppercase sm:text-5xl">
              AI skills. Real-world application.
            </h2>
            <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
              Alpha Academy is a modern learning institution dedicated to equipping individuals with
              practical AI skills that are relevant to what they do. We bridge the gap between
              learning about AI and applying it meaningfully in education, careers, business, and
              everyday work.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] text-primary uppercase hover:gap-3 hover:underline"
            >
              Learn More <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* AUDIENCES */}
      <section className="border-y border-border bg-secondary">
        <div className="container-page py-24">
          <Reveal>
            <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">AI for what you do</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {AUDIENCES.map((a, i) => (
              <Reveal as="article" key={a.title} delay={i * 90}>
                <Link
                  to="/programs"
                  hash={a.hash}
                  className="group flex h-full flex-col justify-between rounded-sm border border-border bg-background p-9 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-[0_18px_40px_-24px_rgba(0,102,255,0.55)]"
                >
                  <div>
                    <span className="font-display text-xs font-semibold tracking-[0.22em] text-primary uppercase">
                      0{i + 1}
                    </span>
                    <h3 className="mt-5 text-2xl font-extrabold uppercase">{a.title}</h3>
                    <p className="mt-4 leading-relaxed text-muted-foreground">{a.copy}</p>
                  </div>
                  <span className="mt-10 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] uppercase group-hover:text-primary">
                    Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="bg-background">
        <div className="container-page py-24">
          <Reveal>
            <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">Programs & Experiences</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {PROGRAMS.map((p, i) => (
              <Reveal as="article" key={p.slug} delay={i * 90}>
                <div className="flex h-full flex-col border border-border bg-background p-9 transition-shadow hover:shadow-[0_18px_40px_-28px_rgba(5,5,5,0.4)]">
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
                  <h3 className="mt-6 text-3xl font-extrabold uppercase">{p.title}</h3>
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
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="bg-ink text-ink-foreground">
        <div className="container-page grid gap-12 py-24 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <p className="font-display text-6xl font-extrabold text-primary lg:text-7xl">
                {s.value}
              </p>
              <p className="mt-4 font-display text-xs font-semibold tracking-[0.2em] uppercase text-ink-foreground/70">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY ALPHA */}
      <section className="bg-background">
        <div className="container-page py-24">
          <Reveal>
            <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">Why Alpha?</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full border-t-2 border-primary bg-secondary p-8">
                  <h3 className="font-display text-lg font-extrabold tracking-[0.1em] uppercase">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />

      {/* RESOURCES */}
      <section className="bg-background">
        <div className="container-page py-24">
          <Reveal>
            <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">Learn more. Do more.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {RESOURCES.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <Link
                  to="/resources"
                  className="flex h-full flex-col border border-border p-8 transition-colors hover:border-primary"
                >
                  <h3 className="font-display text-lg font-extrabold tracking-[0.08em] uppercase">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.copy}</p>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal delay={120}>
            <Link
              to="/resources"
              className="mt-10 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] text-primary uppercase hover:underline"
            >
              Explore Resources <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="border-y border-border bg-secondary">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <img
              src={founder.url}
              alt="Ebenezer Salifu, Founder of Alpha Academy"
              width={1456}
              height={1941}
              loading="lazy"
              className="aspect-[3/4] w-full max-w-sm rounded-sm object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Meet the Founder</p>
            <h2 className="mt-5 text-4xl font-extrabold">Ebenezer Salifu</h2>
            <p className="mt-2 font-display text-xs font-semibold tracking-[0.18em] uppercase text-muted-foreground">
              Founder, Alpha Academy
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Ebenezer Salifu is a tech enthusiast, educator, student leader, and writer passionate
              about equipping people with the knowledge and skills needed to thrive in a rapidly
              changing world. Through technology, education, leadership, and writing, he has worked
              to help students, professionals, and entrepreneurs learn, grow, and create meaningful
              impact. He has earned multiple certifications from Claspedia, Anthropic, HP LIFE, and
              the HP Foundation, reflecting his commitment to continuous learning and practical
              technology education. He founded Alpha Academy with a vision to bridge the gap between
              learning AI and applying it meaningfully within one's field—helping people move from
              learning to leading.
            </p>
            <Link
              to="/about"
              hash="founder"
              className="mt-8 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] text-primary uppercase hover:underline"
            >
              Read More <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-primary text-primary-foreground">
        <Reveal className="container-page py-24 text-center">
          <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">
            Ready to build your AI edge?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/85">
            Start building the practical AI skills you need to thrive in your field.
          </p>
          <Link
            to="/programs"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-background px-9 py-4 font-display text-xs font-semibold tracking-[0.16em] text-foreground uppercase transition-transform hover:-translate-y-0.5"
          >
            Explore Alpha Academy <ArrowRight className="size-4" />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

function Testimonials() {
  const placeholders = [1, 2, 3];
  return (
    <section className="bg-ink text-ink-foreground">
      <div className="container-page py-24">
        <Reveal>
          <h2 className="text-4xl font-extrabold uppercase sm:text-5xl">
            Learning that leads to impact
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink-foreground/60">
            Placeholder cards — real learner testimonials will replace these once collected.
          </p>
        </Reveal>
        <ul className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6">
          {placeholders.map((n) => (
            <li
              key={n}
              className="w-[85%] shrink-0 snap-start border border-ink-foreground/15 p-9 sm:w-[420px]"
            >
              <p className="font-display text-[0.65rem] font-bold tracking-[0.2em] text-primary uppercase">
                Placeholder testimonial {n}
              </p>
              <p className="mt-5 leading-relaxed text-ink-foreground/80">
                “Testimonial text pending — this card is reserved for a verified learner story.”
              </p>
              <div className="mt-8 border-t border-ink-foreground/15 pt-5 text-sm">
                <p className="font-semibold">Learner name pending</p>
                <p className="text-ink-foreground/50">Program · Field / profession</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}