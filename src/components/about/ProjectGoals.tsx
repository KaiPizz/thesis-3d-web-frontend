interface Goal {
  title: string;
  description: string;
}

interface ProjectGoalsProps {
  title?: string;
  goals: Goal[];
}

export default function ProjectGoals({
  title = "Project Goals",
  goals,
}: ProjectGoalsProps) {
  return (
    <section className="py-10">
      <h2 className="text-2xl font-semibold mb-6">{title}</h2>
      <ul className="space-y-4">
        {goals.map((goal, index) => (
          <li
            key={index}
            className="flex gap-4 p-4 rounded-lg border bg-card"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
              {index + 1}
            </span>
            <div>
              <h3 className="font-medium mb-1">{goal.title}</h3>
              <p className="text-sm text-muted-foreground">{goal.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

