interface Technology {
  name: string;
  description: string;
  icon?: string;
}

interface TechStackProps {
  title?: string;
  technologies: Technology[];
}

export default function TechStack({
  title = "Technologies Used",
  technologies,
}: TechStackProps) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {technologies.map((tech) => (
          <div
            key={tech.name}
            className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-2">
              {tech.icon && <span className="text-xl">{tech.icon}</span>}
              <h3 className="font-medium">{tech.name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{tech.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

