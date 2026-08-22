import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/programs", label: "Programs" },
  { to: "/resources", label: "Resources" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/90 backdrop-blur transition-shadow",
        scrolled ? "border-border shadow-[0_1px_20px_rgba(5,5,5,0.07)]" : "border-transparent",
      )}
    >
      <div className="container-page flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" aria-label="Alpha Academy home">
          <img
            src={logo}
            alt="Alpha Academy logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-sm object-contain"
          />
          <span className="font-display text-sm font-bold tracking-[0.2em] uppercase">
            Alpha Academy
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="font-display text-xs font-semibold tracking-[0.18em] uppercase text-foreground/70 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="hidden rounded-sm bg-primary px-6 py-3 font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:inline-flex"
          >
            Enrol Now
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background md:hidden">
          <nav aria-label="Mobile" className="container-page flex flex-col py-4">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-border py-4 font-display text-sm font-semibold tracking-[0.16em] uppercase"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-5 rounded-sm bg-primary px-6 py-4 text-center font-display text-xs font-semibold tracking-[0.16em] uppercase text-primary-foreground"
            >
              Enrol Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}