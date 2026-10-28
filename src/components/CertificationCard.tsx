import type { Certification } from "../data/about";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

function CheckIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3.5 8.5 3 3 6-6.5" />
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

/** Honest status: a result can be "competent" before the document is issued. */
function StatusPill({ pending }: { pending: boolean }) {
  return pending ? (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60 motion-safe:animate-ping" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
      </span>
      Competent · Certificate pending
    </span>
  ) : (
    <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200">
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
      Issued
    </span>
  );
}

export function CertificationCard({ item }: { item: Certification }) {
  const pending = item.status === "pending";
  const units = item.units ?? [];

  return (
    <li className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      {/* shared top highlight: same treatment on every card in this section */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
      />

      <p className="text-[11px] font-semibold uppercase leading-relaxed tracking-[0.14em] text-slate-400">
        {item.issuer}
      </p>
      <h4 className="mt-2 text-xl font-semibold tracking-tight text-white">
        {item.name}
      </h4>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
        <StatusPill pending={pending} />
        <span className="font-mono text-xs text-slate-400">{item.year}</span>
      </div>

      {units.length > 0 && (
        <div className="mt-5 border-t border-white/5 pt-4">
          <p className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
            {units.length} competency units
          </p>
          <ul className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {units.map((unit) => (
              <li
                key={unit.title}
                className="flex gap-2.5 text-sm text-slate-300"
              >
                <CheckIcon />
                <span className="min-w-0">{unit.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.credentialUrl && !pending && (
        <div className="mt-5 border-t border-white/5 pt-4">
          <a
            href={item.credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-cyan-300 transition-colors hover:text-cyan-200 ${focusRing}`}
          >
            Verify credential
            <ExternalIcon />
          </a>
        </div>
      )}
    </li>
  );
}

/* ------------------------- Compact list (course certs) -------------------- */
/* Untuk sertifikat tanpa unit kompetensi: satu baris per item, bukan kartu.   */

export function CompactCertificationList({
  items,
}: {
  items: readonly Certification[];
}) {
  return (
    <li className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
      <p className="px-5 pt-4 font-mono text-[11px] uppercase tracking-wider text-slate-500 sm:px-6">
        Course certificates
      </p>
      <ul className="mt-2 divide-y divide-white/5">
        {items.map((item) => (
          <li
            key={item.name}
            className="flex items-center justify-between gap-4 px-5 py-3 sm:px-6"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-200">{item.name}</p>
              <p className="truncate text-xs text-slate-500">{item.issuer}</p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <span className="font-mono text-xs text-slate-400">
                {item.year}
              </span>
              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View credential for ${item.name}`}
                  className={`rounded-md text-slate-500 transition-colors hover:text-cyan-300 ${focusRing}`}
                >
                  <ExternalIcon />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </li>
  );
}
