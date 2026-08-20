import { useQuery } from "@tanstack/react-query";
import { Quote } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";
import { supabase } from "@/integrations/supabase/client";

export function Testimonials() {
  const { data } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("id, name, role, program, quote, photo_url")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (!data || data.length === 0) return null;

  return (
    <section id="success-stories" className="scroll-mt-24 bg-ink text-ink-foreground">
      <div className="container-page py-24">
        <Reveal>
          <p className="eyebrow">Success stories</p>
          <h2 className="mt-5 max-w-3xl text-4xl font-extrabold uppercase sm:text-5xl">
            Learning that leads to impact
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-ink-foreground/60">
            Real learners who applied what they were taught in Alpha Academy programs.
          </p>
        </Reveal>

        <ul className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 lg:grid lg:grid-cols-3 lg:overflow-visible">
          {data.map((t, i) => (
            <Reveal
              as="li"
              key={t.id}
              delay={i * 100}
              className="w-[85%] shrink-0 snap-start sm:w-[420px] lg:w-auto"
            >
              <figure className="flex h-full flex-col border border-ink-foreground/15 p-9">
                <Quote className="size-7 text-primary" aria-hidden="true" />
                <blockquote className="mt-6 flex-1 leading-relaxed text-ink-foreground/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4 border-t border-ink-foreground/15 pt-6">
                  {t.photo_url && (
                    <img
                      src={t.photo_url}
                      alt={t.name}
                      loading="lazy"
                      className="size-12 shrink-0 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-display text-sm font-extrabold tracking-[0.12em] uppercase">
                      {t.name}
                    </p>
                    <p className="mt-1 text-sm text-ink-foreground/60">{t.role}</p>
                    <p className="mt-2 font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-primary">
                      {t.program}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
