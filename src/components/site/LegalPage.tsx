import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-page py-16">
          <p className="eyebrow">Alpha Academy</p>
          <h1 className="mt-5 text-4xl font-extrabold uppercase sm:text-5xl">{title}</h1>
          <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
        </div>
      </section>
      <article className="container-page max-w-3xl py-16 [&_h2]:mt-12 [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-extrabold [&_h2]:uppercase [&_li]:mt-2 [&_p]:mt-4 [&_p]:leading-relaxed [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground">
        {children}
      </article>
    </>
  );
}