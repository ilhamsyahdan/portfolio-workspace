import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { aboutContent } from "../data/about";
import type {
  AboutContent,
  Achievement,
  Certification,
  ProfilePhotoData,
} from "../data/about";
import { TechStack } from "./TechStack";

interface AboutProps {
  content?: AboutContent;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

const cardClass =
  "rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-sm md:p-8";

/* ------------------------------ Helpers ----------------------------------- */

function TrophyIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12L12 4M6 4h6v6" />
    </svg>
  );
}

/* ---------------------------- Profile photo ------------------------------- */

interface ProfilePhotoProps {
  photo: ProfilePhotoData;
  name: string;
}

function ProfilePhoto({ photo, name }: ProfilePhotoProps) {
  const [failed, setFailed] = useState<boolean>(false);

  return (
    <div className="relative mx-auto w-full max-w-xs lg:max-w-none">
      <div
        aria-hidden
        className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-cyan-500/15 blur-3xl"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-[0_32px_80px_-24px_rgba(6,182,212,0.35)]">
        {failed ? (
          <div
            role="img"
            aria-label={photo.alt}
            className="grid h-full w-full place-items-center bg-gradient-to-br from-slate-800 to-slate-950 text-7xl font-semibold text-cyan-400/50"
          >
            {name.charAt(0).toUpperCase()}
          </div>
        ) : (
          <img
            src={photo.src}
            alt={photo.alt}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent"
        />
      </div>
    </div>
  );
}

/* ------------------------ Achievements / certificates ---------------------- */

function AchievementItem({ item }: { item: Achievement }) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
          {item.placement}
        </span>
        <span className="text-sm text-slate-500">
          {item.event} · {item.year}
        </span>
      </div>
      <h4 className="mt-3 text-lg font-semibold tracking-tight text-white">
        {item.title}
      </h4>
      <p className="mt-2 text-sm leading-relaxed text-slate-400">
        {item.description}
      </p>
      {item.href && (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 ${focusRing}`}
        >
          Read more
          <ExternalIcon />
        </a>
      )}
    </li>
  );
}

function CertificationItem({ item }: { item: Certification }) {
  return (
    <li className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <span
        aria-hidden
        className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
      >
        <AwardIcon />
      </span>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-white">{item.name}</h4>
        <p className="mt-0.5 text-sm text-slate-400">
          {item.issuer} · {item.year}
        </p>
      </div>
      {item.credentialUrl && (
        <a
          href={item.credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View credential for ${item.name}`}
          className={`mt-1 shrink-0 rounded-md text-slate-500 transition-colors hover:text-cyan-300 ${focusRing}`}
        >
          <ExternalIcon />
        </a>
      )}
    </li>
  );
}

/* --------------------------------- About ---------------------------------- */

export function About({ content = aboutContent }: AboutProps) {
  const { name, photo, bio, skills, techStack, achievements, certifications } =
    content;

  return (
    <section
      id="about"
      className="relative isolate scroll-mt-24 overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -left-40 top-1/2 h-[28rem] w-[28rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="About me"
          title="About"
          description="A bit about who I am, what I work with, and what I've achieved along the way."
        />

        {/* Photo + bio */}
        <div
          className={`mt-12 grid gap-12 lg:gap-16 ${
            photo ? "lg:grid-cols-[20rem_1fr]" : ""
          }`}
        >
          {photo && (
            <Reveal>
              <ProfilePhoto photo={photo} name={name} />
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <div className="max-w-3xl space-y-5 text-lg leading-relaxed text-slate-300">
              {bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <h3 className="mt-10 text-lg font-semibold text-white">
              What I do
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Tech stack */}
        <div className="mt-20">
          <Reveal>
            <h3 className="text-2xl font-semibold tracking-tight text-white">
              Tech stack
            </h3>
          </Reveal>
          <Reveal delay={0.1}>
            <TechStack categories={techStack} />
          </Reveal>
        </div>

        {/* Achievements + certifications */}
        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          {achievements.length > 0 && (
            <Reveal>
              <div className={`${cardClass} h-full`}>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-xl border border-amber-400/20 bg-amber-400/10 text-amber-300"
                  >
                    <TrophyIcon />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    Achievements
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {achievements.map((item) => (
                    <AchievementItem key={item.title} item={item} />
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {certifications.length > 0 && (
            <Reveal delay={0.1}>
              <div className={`${cardClass} h-full`}>
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 place-items-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                  >
                    <AwardIcon />
                  </span>
                  <h3 className="text-xl font-semibold tracking-tight text-white">
                    Certifications
                  </h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {certifications.map((item) => (
                    <CertificationItem key={item.name} item={item} />
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
