import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";
import { CONTACT } from "@/lib/site";

export const Route = createFileRoute("/terms-of-service")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Alpha Academy" },
      {
        name: "description",
        content:
          "The terms that govern the use of the Alpha Academy website, programs, and educational content.",
      },
      { property: "og:title", content: "Terms of Service — Alpha Academy" },
      { property: "og:description", content: "Terms governing use of Alpha Academy services." },
      { property: "og:url", content: "/terms-of-service" },
    ],
    links: [{ rel: "canonical", href: "/terms-of-service" }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="2026">
      <p>
        These Terms of Service govern your use of the Alpha Academy website, programs and
        educational content.
      </p>

      <h2>1. Acceptance of Terms</h2>
      <p>By accessing or using this website, you agree to these Terms of Service.</p>

      <h2>2. Use of the Website</h2>
      <p>
        You agree to use this website lawfully and not to interfere with its operation, security or
        availability to others.
      </p>

      <h2>3. Programs and Enrolment</h2>
      <p>
        Program details, dates and availability may change. Enrolment is confirmed through the
        channels communicated by Alpha Academy for each program.
      </p>

      <h2>4. Payments and Fees</h2>
      <p>
        Where a program carries a fee, the applicable amount and payment method will be communicated
        before enrolment is completed.
      </p>

      <h2>5. Intellectual Property</h2>
      <p>
        The Alpha Academy name, logo, website content and educational materials belong to Alpha
        Academy and may not be reproduced or redistributed without permission.
      </p>

      <h2>6. User Responsibilities</h2>
      <p>
        You are responsible for the accuracy of the information you provide and for how you apply
        the skills and materials shared through our programs.
      </p>

      <h2>7. Educational Content and Resources</h2>
      <p>
        Content is provided for educational purposes. It does not constitute professional, legal,
        financial or technical advice.
      </p>

      <h2>8. Third-Party Links and Services</h2>
      <p>
        This website may link to third-party tools and platforms. Alpha Academy does not control and
        is not responsible for their content or practices.
      </p>

      <h2>9. Limitation of Liability</h2>
      <p>
        To the extent permitted by law, Alpha Academy is not liable for indirect or consequential
        loss arising from the use of this website or its content.
      </p>

      <h2>10. Changes to These Terms</h2>
      <p>
        Alpha Academy may update these Terms from time to time and will publish revised versions on
        this website.
      </p>

      <h2>11. Contact Information</h2>
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