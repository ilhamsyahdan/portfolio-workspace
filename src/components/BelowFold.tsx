import { useEffect } from "react";
import { About } from "./About";
import { Projects } from "./Projects";
import { Blog } from "./Blog";
import { Contact } from "./Contact";

interface BelowFoldProps {
  onPostSelect: (slug: string) => void;
  onReady: () => void;
}

export default function BelowFold({ onPostSelect, onReady }: BelowFoldProps) {
  useEffect(() => {
    onReady();
  }, [onReady]);

  return (
    <>
      <About />
      <Projects />
      <Blog onPostSelect={onPostSelect} />
      <Contact />
    </>
  );
}
