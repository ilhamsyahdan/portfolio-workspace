import { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { Reveal } from "./Reveal";
import { aboutContent } from "../data/about";
import type { AboutContent, ProfilePhotoData } from "../data/about";
import { TechStack } from "./TechStack";
import { AchievementCard } from "./AchievementCard";
import {
  CertificationCard,
  CompactCertificationList,
} from "./CertificationCard";
import { MedalIcon, SealIcon } from "./Medal";

interface AboutProps {
  content?: AboutContent;
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

/* --------------------------------- About ---------------------------------- */

export function About({ content = aboutContent }: AboutProps) {
  const { name, photo, bio, skills, techStack, achievements, certifications } =
    content;

  // Sertifikasi utama (punya unit kompetensi / belum terbit) tampil sebagai kartu;
  // sisanya diringkas dalam satu daftar agar kolom tidak memanjang.
  const featuredCerts = certifications.filter(
    (c) => (c.units?.length ?? 0) > 0 || c.status === "pending",
  );
  const otherCerts = certifications.filter((c) => !featuredCerts.includes(c));

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

        {/* Achievements + certifications: no wrapper cards, so no card-in-card */}
        <div className="mt-20 grid items-start gap-14 lg:grid-cols-2 lg:gap-10">
          {achievements.length > 0 && (
            <Reveal>
              <div>
                <div className="flex items-center gap-3">
                  <MedalIcon />
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    Achievements
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {achievements.map((item) => (
                    <AchievementCard key={item.title} item={item} />
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {certifications.length > 0 && (
            <Reveal delay={0.1}>
              <div>
                <div className="flex items-center gap-3">
                  <SealIcon />
                  <h3 className="text-2xl font-semibold tracking-tight text-white">
                    Certifications
                  </h3>
                </div>
                <ul className="mt-6 space-y-4">
                  {featuredCerts.map((item) => (
                    <CertificationCard key={item.name} item={item} />
                  ))}
                  {otherCerts.length > 0 && (
                    <CompactCertificationList items={otherCerts} />
                  )}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
