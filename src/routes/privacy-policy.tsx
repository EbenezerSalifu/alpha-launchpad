import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Alpha Academy" },
      {
        name: "description",
        content:
          "How Alpha Academy collects, uses, protects and retains personal information provided through this website.",
      },
      { property: "og:title", content: "Privacy Policy — Alpha Academy" },
      { property: "og:description", content: "Alpha Academy's privacy practices." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="2026">
      <p>
        This Privacy Policy explains how Alpha Academy handles information in connection with this
        website and our programs.
      </p>

      <h2>1. Information We Collect</h2>
      <p>
        We collect information you voluntarily provide — for example when you contact us, enrol in a
        program, subscribe to resources, or interact with forms and messaging links on this website.
        This may include your name, email address, phone number, and the content of your message.
      </p>

      <h2>2. How We Use Your Information</h2>
      <p>We may use the information provided to:</p>
      <ul>
        <li>Respond to enquiries and communicate with you</li>
        <li>Deliver programs, trainings and resources you request</li>
        <li>Process enrolments and related administration</li>
        <li>Improve our programs, content and website experience</li>
        <li>Operate and maintain the website</li>
      </ul>

      <h2>3. How We Protect Your Information</h2>
      <p>
        We take reasonable measures to protect personal information from unauthorized access,
        alteration, disclosure or misuse. No method of transmission or storage is completely secure,
        so we cannot guarantee absolute security.
      </p>

      <h2>4. Your Rights</h2>
      <p>
        You may request access to, correction of, or deletion of the personal information you have
        provided, and you may ask us to stop contacting you. To exercise these rights, contact us
        using the details below.
      </p>

      <h2>5. Data Retention</h2>
      <p>
        We retain information only for as long as reasonably necessary for legitimate operational,
        legal or service-related purposes.
      </p>

      <h2>6. Cookies and Similar Technologies</h2>
      <p>
        Where applicable, this website may use cookies or similar technologies to support basic
        functionality and understand how the site is used. You can control cookies through your
        browser settings.
      </p>

      <h2>7. Third-Party Services</h2>
      <p>
        We may rely on trusted third-party services for functions such as analytics, forms,
        communications, payments or embedded content. Those services handle information in line with
        their own policies.
      </p>

      <h2>8. Changes to This Privacy Policy</h2>
      <p>
        Alpha Academy may periodically update this Privacy Policy and will publish revised versions
        on this website.
      </p>

      <h2>9. Contact Us</h2>
      <p>
        Email:{" "}
        <a className="text-primary hover:underline" href={`mailto:${CONTACT.email}`}>
          {CONTACT.email}
        </a>
        <br />
        Phone / WhatsApp:{" "}
        <a className="text-primary hover:underline" href={CONTACT.phoneHref}>
          {CONTACT.phoneDisplay}
        </a>
      </p>
    </LegalPage>
  );
}