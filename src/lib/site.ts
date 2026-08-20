export const CONTACT = {
  email: "alphaacademy500@gmail.com",
  phoneDisplay: "+234 903 645 2259",
  phoneHref: "tel:+2349036452259",
  whatsapp: "https://wa.me/2349036452259",
  linkedin: "https://www.linkedin.com/in/ebenezer-salifu-30727521b",
  x: "https://x.com/EbenezerSa59039",
  instagram: "https://www.instagram.com/salifuebenezer10",
  facebook: "https://www.facebook.com/ebenezer.salifu.12",
};

export const INTEREST_OPTIONS = [
  "AI FOR STUDENTS",
  "AI FOR PROFESSIONALS",
  "AI FOR ENTREPRENEURS",
] as const;

export type Interest = (typeof INTEREST_OPTIONS)[number];

export type Program = {
  slug: "scale-with-ai" | "your-ai-edge";
  title: string;
  date: string;
  status: "COMPLETED" | "COMING UP";
  summary: string;
};

export const PROGRAMS: Program[] = [
  {
    slug: "scale-with-ai",
    title: "SCALE WITH AI",
    date: "April 2026",
    status: "COMPLETED",
    summary:
      "A free, WhatsApp-delivered training on becoming an expert in AI — 10X your productivity with free AI tools across data analysis, image generation & design, and writing & content creation.",
  },
  {
    slug: "your-ai-edge",
    title: "YOUR AI EDGE",
    date: "September 4, 2026",
    status: "COMING UP",
    summary:
      "Discover how AI can work specifically for your niche—and gain the practical edge to work smarter, create more, and stay ahead.",
  },
];