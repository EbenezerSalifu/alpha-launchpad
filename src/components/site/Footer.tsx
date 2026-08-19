import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Phone } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { CONTACT } from "@/lib/site";

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.3l-4.9-6.4L6.1 22H3l7.3-8.3L2 2h6.4l4.4 5.9L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    </svg>
  );
}

const SOCIALS = [
  { href: CONTACT.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: CONTACT.x, label: "X", Icon: XIcon },
  { href: CONTACT.instagram, label: "Instagram", Icon: Instagram },
  { href: CONTACT.facebook, label: "Facebook", Icon: Facebook },
];

export function Footer() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-page grid gap-14 py-20 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src={logo.url}
            alt="Alpha Academy logo"
            width={72}
            height={72}
            loading="lazy"
            className="h-18 w-18 rounded-sm object-contain"
          />
          <h2 className="mt-6 font-display text-xl font-bold tracking-[0.16em] uppercase">
            Alpha Academy
          </h2>
          <p className="mt-2 text-sm font-semibold text-primary">From Learning to Leading</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-foreground/70">
            Equipping individuals with practical AI skills relevant to their fields, empowering them
            to thrive in an AI-driven world.
          </p>
        </div>

        <nav aria-label="Academy">
          <h3 className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-ink-foreground/50">
            Academy
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            <li>
              <Link to="/about" className="hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/programs" className="hover:text-primary">
                Programs
              </Link>
            </li>
            <li>
              <Link to="/resources" className="hover:text-primary">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Programs">
          <h3 className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-ink-foreground/50">
            Programs
          </h3>
          <ul className="mt-6 space-y-3 text-sm">
            {["students", "professionals", "entrepreneurs", "organizations"].map((a) => (
              <li key={a}>
                <Link to="/programs" hash={a} className="capitalize hover:text-primary">
                  {a}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-xs font-semibold tracking-[0.22em] uppercase text-ink-foreground/50">
            Connect
          </h3>
          <ul className="mt-6 space-y-4 text-sm">
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

          <p className="mt-8 font-display text-xs font-semibold tracking-[0.22em] uppercase text-ink-foreground/50">
            Follow Alpha Academy
          </p>
          <ul className="mt-4 flex gap-3">
            {SOCIALS.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="inline-flex size-10 items-center justify-center rounded-sm border border-ink-foreground/20 transition-colors hover:border-primary hover:bg-primary"
                >
                  <Icon className="size-4" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-foreground/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-ink-foreground/60 sm:flex-row">
          <p>© 2026 Alpha Academy. All Rights Reserved.</p>
          <p className="flex items-center gap-3">
            <Link to="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="/terms-of-service" className="hover:text-primary">
              Terms of Service
            </Link>
            <span aria-hidden="true">|</span>
            <Link to="/contact" className="hover:text-primary">
              Contact
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}