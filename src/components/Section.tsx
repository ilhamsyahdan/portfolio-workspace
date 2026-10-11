interface SectionProps {
  id: string;
  title: string;
  children?: React.ReactNode;
}

export default function Section({ id, title, children }: SectionProps) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl w-full">
        <h2 className="text-4xl font-bold text-text-primary mb-8">{title}</h2>
        {children || (
          <p className="text-text-secondary text-lg">
            Content for {title} section coming soon...
          </p>
        )}
      </div>
    </section>
  );
}
