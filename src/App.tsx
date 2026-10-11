import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import { Projects } from "./components/Projects";
import { BlogList } from "./components/BlogList";
import { BlogPost } from "./components/BlogPost";
import Section from "./components/Section";

type View = "home" | "blog-post";

function App() {
  const [view, setView] = useState<View>("home");
  const [selectedSlug, setSelectedSlug] = useState<string>("");

  const handleBlogPostSelect = (slug: string) => {
    setSelectedSlug(slug);
    setView("blog-post");
    // Scroll to top when viewing a blog post
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlog = () => {
    setView("home");
    // Scroll to blog section
    const blogSection = document.getElementById("blog");
    if (blogSection) {
      blogSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (view === "blog-post" && selectedSlug) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16">
          <BlogPost slug={selectedSlug} onBack={handleBackToBlog} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <Hero />

      {/* Main content with padding to account for fixed header */}
      <main className="pt-16">
        <Projects />

        {/* Blog Section */}
        <section
          id="blog"
          className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-20"
        >
          <div className="max-w-7xl w-full">
            <h2 className="text-4xl font-bold text-text-primary mb-8">Blog</h2>
            <BlogList onPostSelect={handleBlogPostSelect} />
          </div>
        </section>

        <Section id="about" title="About" />
        <Section id="contact" title="Contact" />
      </main>
    </div>
  );
}

export default App;
