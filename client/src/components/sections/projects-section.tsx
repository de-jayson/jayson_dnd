import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Layers } from "lucide-react";
import { 
  SiReact, SiNextdotjs, SiNodedotjs, SiPostgresql,
  SiTypescript, SiTailwindcss, SiPython, SiTensorflow,
  SiStripe, SiRedis, SiGraphql, SiAmazon
} from "react-icons/si";

const techIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  PostgreSQL: SiPostgresql,
  TypeScript: SiTypescript,
  Tailwind: SiTailwindcss,
  Python: SiPython,
  TensorFlow: SiTensorflow,
  Stripe: SiStripe,
  Redis: SiRedis,
  GraphQL: SiGraphql,
  AWS: SiAmazon,
};

const projects = [
 
  {
    title: "AI Lane and Curve Detection",
    description: "Advanced lane detection with curve recognition, lane departure warnings, and real-time feedback. Perfect for autonomous driving assistance.",
    tech: ["Python", "TensorFlow", "PostgreSQL"],
    gradient: "from-green-500/20 via-emerald-500/20 to-cyan-500/20",
    video: "/lane_detection.mp4",
    githubUrl: "https://github.com/de-jayson/Curve-laneDetection",
    featured: false,
  },
  {
    title: "Social Media App",
    description: "Mobile-first social platform with real-time messaging, media sharing, and engagement features. Focus on performance and user experience.",
    tech: ["React", "Node.js", "GraphQL", "Redis", "AWS"],
    gradient: "from-pink-500/20 via-rose-500/20 to-red-500/20",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "DevTools Suite",
    description: "A collection of developer productivity tools including code formatters, API testers, and documentation generators.",
    tech: ["TypeScript", "React", "Node.js", "Tailwind"],
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Task Management System",
    description: "Collaborative project management tool with kanban boards, team assignments, time tracking, and integrations.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    gradient: "from-amber-500/20 via-orange-500/20 to-yellow-500/20",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "Finance Tracker",
    description: "Personal finance management app with expense categorization, budget planning, and visual reports for financial health.",
    tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
    gradient: "from-teal-500/20 via-cyan-500/20 to-sky-500/20",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

function ProjectCard({ project, index, isVisible }: { 
  project: typeof projects[0];
  index: number;
  isVisible: boolean;
}) {
  const animationClass = index % 3 === 0 
    ? "translate-x-[-50px]" 
    : index % 3 === 1 
      ? "translate-y-[30px]" 
      : "translate-x-[50px]";

  return (
    <Card
      className={`group glass overflow-hidden transition-all duration-700 hover-lift ${
        isVisible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${animationClass}`
      } ${project.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      data-testid={`card-project-${index}`}
    >
      <div className="relative overflow-hidden">
        <div className="relative w-full h-48 overflow-hidden">
            {project.video ? (
              <video
                src={project.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className={`w-full h-full bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                <div className="text-4xl font-bold text-foreground/20">
                  {project.title.charAt(0)}
                </div>
              </div>
            )}

            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/40" />
          </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-60" />
        
        {project.featured && (
          <Badge className="absolute top-3 left-3 gap-1" data-testid={`badge-featured-${index}`}>
            <Layers className="w-3 h-3" />
            Featured
          </Badge>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">

          <Button
            asChild
            size="sm"
            variant="outline"
            className="gap-1 flex-1"
          >
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          </Button>
        </div>
      </div>

      <CardContent className="p-5">
        <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors" data-testid={`text-project-title-${index}`}>
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`text-project-desc-${index}`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => {
            const Icon = techIcons[tech];
            return (
              <Badge
                key={tech}
                variant="secondary"
                className="gap-1 text-xs"
              >
                {Icon && <Icon className="w-3 h-3" />}
                {tech}
              </Badge>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

export function ProjectsSection() {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-project") || "0");
            setVisibleProjects((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.1 }
    );

    const projectCards = sectionRef.current?.querySelectorAll("[data-project]");
    projectCards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      data-testid="section-projects"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // My Work
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for building
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div key={index} data-project={index}>
              <ProjectCard
                project={project}
                index={index}
                isVisible={visibleProjects.includes(index)}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-all-projects">
            <Github className="w-5 h-5" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
}
