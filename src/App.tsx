import Header from "./components/Header";
import Hero from "./components/Hero";
import { Projects } from "./components/Projects";
import { BlogList } from "./components/BlogList";
import Section from "./components/Section";

function App() {
  const handleBlogPostSelect = (slug: string) => {
    // For now, just log - full post viewer will be implemented in ticket 09
    console.log("Selected blog post:", slug);
  };

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
