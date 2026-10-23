/**
 * Contact-section content. Replace the placeholder links with your own.
 */

export type SocialIcon = "github" | "linkedin" | "email";

export interface SocialLink {
  readonly id: string;
  readonly label: string;
  /** Text shown under the label. */
  readonly display: string;
  readonly href: string;
  readonly icon: SocialIcon;
  /** true → opens in a new tab with rel="noopener noreferrer". */
  readonly external: boolean;
}

export interface ContactContent {
  readonly intro: string;
  readonly socials: readonly SocialLink[];
}

export const contactContent: ContactContent = {
  intro:
    "Have a project in mind, a question, or just want to say hi? Send a message or reach out directly. I usually reply within a couple of days.",
  socials: [
    {
      id: "github",
      label: "GitHub",
      display: "github.com/username",
      href: "https://github.com/username",
      icon: "github",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      display: "linkedin.com/in/username",
      href: "https://www.linkedin.com/in/username",
      icon: "linkedin",
      external: true,
    },
    {
      id: "email",
      label: "Email",
      display: "you@example.com",
      href: "mailto:you@example.com",
      icon: "email",
      external: false,
    },
  ],
};
