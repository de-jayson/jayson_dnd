import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    title: "Python Programmer",
    company: "Codveda Technologies",
    location: "Chandrapur, India - Remote",
    period: "2025",
    description: "Developing robust and scalable applications using Python, with expertise in automation, web development, and data-driven solutions. I focus on writing clean, efficient, and maintainable code that solves real-world problems and enhances productivity.",
    achievements: [
      "Developed web applications with Django, improving user experience and functionality",
      "Automated repetitive tasks, saving teams hours of manual work weekly.",
      "Built data pipelines and analysis scripts, providing actionable insights for decision-making.",
      "Wrote clean, modular, and tested code, ensuring maintainability and scalability.",
    ],
    technologies: ["Python", "Django", "PostgreSQL", "Pygame"],
  },
  {
    title: "Full-Stack Developer",
    company: "GIT Plus Limited",
    location: "Circle, Accra",
    period: "2024",
    description: "Built and scaled core product from MVP to production. Worked closely with founders to define technical roadmap and product strategy.",
    achievements: [
      "Built MVP in 2 months",
      "Ensured high-quality code standards and best practices",
      "User login and authentication integration",
      "Reduced infrastructure costs by 35% through optimization",
    ],
    technologies: ["HTML/CSS", "JavaScript", "PHP", "PostgreSQL"],
  },
  {
    title: "DevOps Engineer",
    company: "KNUST Class Project",
    location: "Kumasi, Ashanti Region",
    period: "2023",
    description: "I ensure seamless CI/CD pipelines, cloud infrastructure management, containerization, and monitoring, enabling teams to deploy faster and scale efficiently." ,
    achievements: [
      "Implemented automated CI/CD pipelines reducing deployment time by 50%",
      "Managed cloud infrastructure (AWS/Azure/GCP) for multiple applications, ensuring high availability and scalability.",
      "Containerized applications using Docker and Kubernetes, improving consistency across environments.",
      "Set up monitoring and alerting systems to proactively detect and resolve issues.",
    ],
    technologies: ["Jenkins", "AWS", "Kubernetes", "Docker"],
  },
  {
    title: "Career Development",
    period: "2022 - 2023",
    description: "Started career building websites and learning modern development practices.",
    achievements: [
      "Completed personal projects",
      "Learned and applied modern styling techniques",
      "Contributed to open-source projects",
      "Participated in tech conferences",
    ],
    technologies: ["HTML/CSS", "JavaScript"],
  },
];

export function ExperienceSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-exp") || "0");
            setVisibleItems((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = sectionRef.current?.querySelectorAll("[data-exp]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="section-experience"
    >
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // Career Path
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            My professional journey in software development
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-neon-purple transform md:-translate-x-1/2" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                data-exp={index}
                className={`relative transition-all duration-700 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={`md:w-[calc(50%-2rem)] ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                  }`}
                >
                  <div
                    className={`absolute top-6 w-4 h-4 rounded-full bg-primary neon-glow hidden md:block ${
                      index % 2 === 0
                        ? "right-[calc(50%-0.5rem)]"
                        : "left-[calc(50%-0.5rem)]"
                    }`}
                  />

                  <div className="absolute left-[-0.5rem] top-6 w-4 h-4 rounded-full bg-primary neon-glow md:hidden" />

                  <Card className="glass ml-6 md:ml-0" data-testid={`card-experience-${index}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <h3 className="text-lg font-semibold" data-testid={`text-exp-title-${index}`}>{exp.title}</h3>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-1">
                            <span className="flex items-center gap-1">
                              <Building2 className="w-4 h-4" />
                              {exp.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {exp.location}
                            </span>
                          </div>
                        </div>
                        <Badge variant="secondary" className="gap-1 shrink-0">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </Badge>
                      </div>

                      <p className="text-muted-foreground text-sm mb-4">
                        {exp.description}
                      </p>

                      <ul className="space-y-2 mb-4">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-2"
                          >
                            <span className="text-primary mt-1.5 text-xs">
                              {">"}
                            </span>
                            {achievement}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
