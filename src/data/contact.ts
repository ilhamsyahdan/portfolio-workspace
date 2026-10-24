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
      display: "github.com/ilhamsyahdan",
      href: "https://github.com/ilhamsyahdan",
      icon: "github",
      external: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      display: "linkedin.com/in/ilham-syahdan",
      href: "https://www.linkedin.com/in/ilham-syahdan/",
      icon: "linkedin",
      external: true,
    },
    {
      id: "email",
      label: "Email",
      display: "ilhamsyahdan123@gmail.com",
      href: "mailto:ilhamsyahdan123@gmail.com",
      icon: "email",
      external: false,
    },
  ],
};
