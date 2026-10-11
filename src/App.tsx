import Header from "./components/Header";
import Section from "./components/Section";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Main content with padding to account for fixed header */}
      <main className="pt-16">
        <Section id="projects" title="Projects" />
        <Section id="blog" title="Blog" />
        <Section id="about" title="About" />
        <Section id="contact" title="Contact" />
      </main>
    </div>
  );
}

export default App;
