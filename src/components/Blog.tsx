import { BlogList } from "./BlogList";
import { SectionHeader } from "./SectionHeader";

interface BlogProps {
  onPostSelect: (slug: string) => void;
}

/** Blog section: consistent header + post list. Replaces the inline section in App.tsx. */
export function Blog({ onPostSelect }: BlogProps) {
  return (
    <section
      id="blog"
      className="relative isolate scroll-mt-24 overflow-hidden bg-slate-950 px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute -right-40 top-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-600/10 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        <SectionHeader
          badge="Writing"
          title="Blog"
          description="Notes on code, design, and the things I learn while shipping."
        />
        <div className="mt-12">
          <BlogList onPostSelect={onPostSelect} />
        </div>
      </div>
    </section>
  );
}
