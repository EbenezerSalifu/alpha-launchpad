import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import founder from "@/assets/founder.jpg";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Alpha Academy" },
      {
        name: "description",
        content:
          "Alpha Academy is a modern learning institution equipping people with practical AI skills relevant to their fields.",
      },
      { property: "og:title", content: "About — Alpha Academy" },
      {
        property: "og:description",
        content: "Bridging the gap between learning about AI and applying it meaningfully.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-20">
          <Reveal>
            <p className="eyebrow">About Alpha Academy</p>
            <h1 className="mt-5 max-w-3xl text-4xl leading-tight font-extrabold uppercase sm:text-6xl">
              AI skills. Real-world application.
            </h1>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted-foreground">
              Alpha Academy is a modern learning institution dedicated to equipping individuals with
              practical AI skills that are relevant to what they do. We bridge the gap between
              learning about AI and applying it meaningfully in education, careers, business, and
              everyday work.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-20">
        <Reveal>
          <h2 className="text-3xl font-extrabold uppercase">What we stand for</h2>
          <dl className="mt-8 grid gap-7 sm:grid-cols-2">
            {[
              ["Practical", "Learn skills you can actually use."],
              ["Relevant", "AI applied to your field, career, or business."],
              ["Current", "Stay equipped for a rapidly changing world."],
              ["Impactful", "Move beyond knowing AI to creating value with it."],
            ].map(([t, c]) => (
              <div key={t} className="border-l-2 border-primary pl-5">
                <dt className="font-display text-sm font-extrabold tracking-[0.16em] uppercase">
                  {t}
                </dt>
                <dd className="mt-1 text-muted-foreground">{c}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>

      <section id="founder" className="border-y border-border bg-secondary scroll-mt-24">
        <div className="container-page grid items-center gap-12 py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <img
              src={founder}
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
            <p className="mt-6 leading-relaxed text-muted-foreground">
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
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 font-display text-xs font-semibold tracking-[0.16em] text-primary uppercase hover:underline"
            >
              Get in touch <ArrowRight className="size-4" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}

