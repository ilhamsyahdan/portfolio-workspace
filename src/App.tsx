import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";

const BelowFold = lazy(() => import("./components/BelowFold"));
const BlogPost = lazy(() =>
  import("./components/BlogPost").then((mod) => ({ default: mod.BlogPost })),
);

type View = "home" | "blog-post";

function App() {
  const [view, setView] = useState<View>("home");
  const [selectedSlug, setSelectedSlug] = useState<string>("");
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [sectionsReady, setSectionsReady] = useState<boolean>(false);

  const handleBlogPostSelect = (slug: string): void => {
    setSelectedSlug(slug);
    setView("blog-post");
    window.scrollTo({ top: 0 });
  };

  const goToSection = (sectionId: string): void => {
    setView("home");
    setPendingSection(sectionId);
  };

  const handleReady = useCallback((): void => setSectionsReady(true), []);

  useEffect(() => {
    if (view !== "home" || !pendingSection) return;
    document
      .getElementById(pendingSection)
      ?.scrollIntoView({ behavior: "auto", block: "start" });
    setPendingSection(null);
  }, [view, pendingSection]);

  const showPost = view === "blog-post" && selectedSlug;

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-slate-950">
        <Header
          key={view}
          sectionsReady={sectionsReady}
          onMissingSection={goToSection}
        />

        {showPost ? (
          <Suspense fallback={<div className="min-h-screen" />}>
            <BlogPost slug={selectedSlug} onBack={() => goToSection("blog")} />
          </Suspense>
        ) : (
          <main>
            <Hero />
            <Suspense fallback={<div className="min-h-screen" />}>
              <BelowFold
                onPostSelect={handleBlogPostSelect}
                onReady={handleReady}
              />
            </Suspense>
          </main>
        )}
      </div>
    </LazyMotion>
  );
}

export default App;
