import PageHeader from "../components/about/PageHeader";
import TechStack from "../components/about/TechStack";
import ProjectGoals from "../components/about/ProjectGoals";
import AuthorCard from "../components/about/AuthorCard";
import { withBaseUrl } from "../utils/pathUtils";

const technologies = [
  {
    name: "React",
    description:
      "Component-based UI library for building interactive user interfaces with declarative syntax.",
    icon: "⚛️",
  },
  {
    name: "Vite",
    description:
      "Next-generation build tool with instant hot module replacement and optimized production builds.",
    icon: "⚡",
  },
  {
    name: "Tailwind CSS",
    description:
      "Utility-first CSS framework for rapid UI development with consistent design tokens.",
    icon: "🎨",
  },
  {
    name: "React Router",
    description:
      "Client-side routing for seamless navigation without full page reloads.",
    icon: "🧭",
  },
  {
    name: "Model-Viewer",
    description:
      "Google's web component for rendering interactive 3D models directly in the browser.",
    icon: "📦",
  },
  {
    name: "Node.js + Express",
    description:
      "Backend runtime and framework for REST API endpoints and data management.",
    icon: "🖥️",
  },
  {
    name: "Prisma",
    description:
      "Type-safe ORM for database access with auto-generated queries and migrations.",
    icon: "🗄️",
  },
  {
    name: "TypeScript",
    description:
      "Typed superset of JavaScript enabling better tooling, refactoring, and error detection.",
    icon: "📘",
  },
];

const projectGoals = [
  {
    title: "Interactive Product Visualization",
    description:
      "Allow users to view furniture and decor items as 3D models they can rotate, zoom, and inspect from any angle before making a decision.",
  },
  {
    title: "Web-Based Accessibility",
    description:
      "Deliver the 3D showroom experience through a standard web browser without requiring plugins, app downloads, or specialized hardware.",
  },
  {
    title: "Real-Time Customization",
    description:
      "Enable dynamic color and variant switching so users can see different configurations of a product instantly.",
  },
  {
    title: "Modern Development Practices",
    description:
      "Demonstrate a full-stack architecture using current industry tools: React for the frontend, Node.js for the backend, and a relational database with Prisma ORM.",
  },
  {
    title: "Performance and Responsiveness",
    description:
      "Ensure fast load times and smooth interactions across desktop and mobile devices through optimized assets and lazy loading.",
  },
];

export default function About() {
  return (
    <>
      <PageHeader
        title="About This Project"
        subtitle="An interactive web-based showroom built as an engineering diploma thesis."
      />

      <main className="container mx-auto px-4 py-8">
        {/* Project Overview */}
        <section className="py-6">
          <h2 className="text-2xl font-semibold mb-4">What is VistaLoom?</h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-4">
              VistaLoom is a proof-of-concept web application that demonstrates
              how 3D model visualization can be integrated into an e-commerce
              experience. Instead of relying solely on static product images,
              this showroom lets visitors interact with furniture and decor
              items in three dimensions—rotating, zooming, and switching between
              color variants.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The project uses Google's{" "}
              <code className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">
                &lt;model-viewer&gt;
              </code>{" "}
              web component to render glTF/GLB models directly in the browser.
              No plugins are required—modern browsers handle everything
              natively. The backend serves product data and variant information
              through a REST API, while the React frontend presents an intuitive
              catalog and detail view.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-6 border-t border-border">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg bg-muted/30 border">
              <span className="text-2xl mb-3 block">1️⃣</span>
              <h3 className="font-medium mb-2">Browse the Catalog</h3>
              <p className="text-sm text-muted-foreground">
                Products are fetched from the backend API and displayed in a
                filterable grid. Each item shows a thumbnail and basic details.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-muted/30 border">
              <span className="text-2xl mb-3 block">2️⃣</span>
              <h3 className="font-medium mb-2">View in 3D</h3>
              <p className="text-sm text-muted-foreground">
                Clicking a product loads its dedicated page where the 3D model
                is rendered. Drag to rotate, scroll to zoom, and pinch on
                mobile.
              </p>
            </div>
            <div className="p-5 rounded-lg bg-muted/30 border">
              <span className="text-2xl mb-3 block">3️⃣</span>
              <h3 className="font-medium mb-2">Switch Variants</h3>
              <p className="text-sm text-muted-foreground">
                If a product has multiple color variants, select one to see the
                model update in real time without reloading.
              </p>
            </div>
          </div>
        </section>

        <div className="border-t border-border">
          <TechStack technologies={technologies} />
        </div>

        <div className="border-t border-border">
          <ProjectGoals goals={projectGoals} />
        </div>

        <div className="border-t border-border">
          <AuthorCard
            name="Gia Minh Hàn"
            role="Engineering Student"
            bio={
              <>
                I study engineering at{" "}
                <a
                  href="https://prz.edu.pl/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Politechnika Rzeszowska
                </a>
                , Rzeszów, Poland; with a focus on web development and
                interactive media. This project was developed as part of my
                diploma thesis to explore how modern web technologies can
                deliver immersive product experiences without native
                applications. My interests include frontend architecture, 3D
                graphics on the web, and building tools that are both functional
                and pleasant to use.
              </>
            }
            imageUrl={withBaseUrl("images/author.webp")}
          />
        </div>
      </main>
    </>
  );
}
