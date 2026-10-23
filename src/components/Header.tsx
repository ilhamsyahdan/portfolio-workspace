import { useCallback, useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface NavItem {
  readonly name: string;
  readonly href: `#${string}`;
}

interface HeaderProps {
  /**
   * Called when a nav link points to a section that isn't on the current
   * page (e.g. while reading a blog post). Lets the parent switch views.
   */
  onMissingSection?: (sectionId: string) => void;
  sectionsReady?: boolean;
}

const NAV_ITEMS: readonly NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Blog", href: "#blog" },
  { name: "Contact", href: "#contact" },
];

/** Every section id the scroll-spy observes (hero resets the active state). */
const OBSERVED_IDS: readonly string[] = [
  "hero",
  ...NAV_ITEMS.map((item) => item.href.slice(1)),
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

function Header({ onMissingSection, sectionsReady }: HeaderProps) {
  const reduceMotion = useReducedMotion();
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const rootRef = useRef<HTMLElement>(null);

  // Scroll-spy: the section crossing the middle of the viewport is "active".
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id === "hero" ? "" : entry.target.id);
          }
        });
      },
      { root: null, rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    OBSERVED_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionsReady]);

  // Slightly denser glass once the page is scrolled.
  useEffect(() => {
    const onScroll = (): void => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on Escape or when clicking outside.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    const onPointerDown = (e: PointerEvent): void => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: ReactMouseEvent<HTMLAnchorElement>, href: string): void => {
      e.preventDefault();
      const sectionId = href.replace("#", "");
      const section = document.getElementById(sectionId);
      if (!section) {
        onMissingSection?.(sectionId);
        setMobileOpen(false);
        return;
      }

      section.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      setMobileOpen(false);
      window.history.pushState(null, "", href);
    },
    [reduceMotion, onMissingSection],
  );

  const indicatorTransition = reduceMotion
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32 };

  // Mobile pill shows where you are, falling back to "Menu".
  const activeLabel =
    NAV_ITEMS.find((item) => item.href.slice(1) === activeSection)?.name ??
    "Menu";

  return (
    <header
      ref={rootRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5"
    >
      <div className="pointer-events-auto relative w-full max-w-md md:w-auto md:max-w-none">
        <nav
          aria-label="Main navigation"
          className={`flex w-full items-center justify-between rounded-full border border-white/10 py-1.5 pl-5 pr-1.5 backdrop-blur-xl transition-[background-color,box-shadow] duration-300 md:w-auto md:justify-center md:p-1.5 ${
            scrolled
              ? "bg-slate-950/70 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
              : "bg-white/[0.04] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]"
          }`}
        >
          {/* Mobile: current section label */}
          <span className="flex items-center gap-2.5 text-sm font-medium text-slate-200 md:hidden">
            <span
              aria-hidden
              className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            />
            {activeLabel}
          </span>

          {/* Desktop links (centered) */}
          <ul className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return (
                <li key={item.name}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    aria-current={isActive ? "location" : undefined}
                    className={`relative block rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${focusRing} ${
                      isActive
                        ? "text-white"
                        : "text-slate-400 hover:text-slate-100"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navbar-active-pill"
                        transition={indicatorTransition}
                        className="absolute inset-0 rounded-full border border-white/10 bg-white/10"
                      />
                    )}
                    <span className="relative">{item.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className={`relative grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition-colors hover:bg-white/10 md:hidden ${focusRing}`}
          >
            <span aria-hidden className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-4 rounded-full bg-current transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded-full bg-current transition-all duration-300 ${
                  mobileOpen ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </nav>

        {/* Mobile panel */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              id="mobile-menu"
              initial={
                reduceMotion ? false : { opacity: 0, y: -8, scale: 0.98 }
              }
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -8, scale: 0.98 }
              }
              transition={{ duration: reduceMotion ? 0 : 0.2, ease: "easeOut" }}
              className="absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-white/10 bg-slate-950/80 p-2 backdrop-blur-xl shadow-[0_16px_48px_-12px_rgba(0,0,0,0.7)] md:hidden"
            >
              <ul className="flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        aria-current={isActive ? "location" : undefined}
                        className={`block rounded-2xl px-4 py-3 text-base font-medium transition-colors ${focusRing} ${
                          isActive
                            ? "bg-white/10 text-cyan-300"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Header;
