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
        .select("id, name, role, program, quote")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  if (!data || data.length === 0) return null;

  return (
    <section id="success-stories" className="border-t border-border bg-secondary">
      <div className="container-page py-24">
        <Reveal>
          <p className="eyebrow">Success stories</p>
          <h2 className="mt-5 max-w-3xl text-3xl font-extrabold uppercase sm:text-5xl">
            From learning to application to impact
          </h2>
        </Reveal>

        <ul className="mt-16 grid gap-8 lg:grid-cols-3">
          {data.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 100}>
              <figure className="flex h-full flex-col border border-border bg-background p-9">
                <Quote className="size-7 text-primary" aria-hidden="true" />
                <blockquote className="mt-6 flex-1 leading-relaxed text-muted-foreground">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-border pt-6">
                  <p className="font-display text-sm font-extrabold tracking-[0.12em] uppercase">
                    {t.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{t.role}</p>
                  <p className="mt-2 font-display text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-primary">
                    {t.program}
                  </p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
