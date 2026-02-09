import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  SiJavascript, SiTypescript, SiPython, SiGo,
  SiReact, SiNextdotjs, SiVuedotjs, SiTailwindcss,
  SiNodedotjs, SiExpress, SiPostgresql, SiMongodb,
  SiDocker, SiKubernetes, SiAmazon, SiGooglecloud,
  SiTensorflow, SiPytorch, SiOpenai, SiGit
} from "react-icons/si";

const skillCategories = [
  {
    title: "Core Languages",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Python", icon: SiJavascript, level: 95 },
      { name: "HTML", icon: SiTypescript, level: 90 },
      { name: "CSS", icon: SiPython, level: 85 },
      { name: "Javascript", icon: SiGo, level: 70 },
    ],
  },
  {
    title: "Frameworks",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Django", icon: SiReact, level: 95 },
      { name: "Flask", icon: SiNextdotjs, level: 85 },
      { name: "Express.js", icon: SiTailwindcss, level: 70 },
    ],
  },
  {
    title: "Backend & Database",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, level: 85 },
      { name: "MongoDB", icon: SiMongodb, level: 82 },
    ],
  },
  {
    title: "Cloud & DevOps",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Docker", icon: SiDocker, level: 85 },
      { name: "Jenkins", icon: SiKubernetes, level: 65 },
      { name: "AWS", icon: SiAmazon, level: 70 },
    ],
  },
  {
    title: "AI & Tools",
    color: "from-indigo-500 to-violet-500",
    skills: [
      { name: "TensorFlow", icon: SiTensorflow, level: 70 },
      { name: "PyTorch", icon: SiPytorch, level: 65 },
      { name: "OpenAI", icon: SiOpenai, level: 85 },
      { name: "Git", icon: SiGit, level: 95 },
    ],
  },
];

function SkillCard({ skill, isVisible, delay }: { 
  skill: { name: string; icon: React.ComponentType<{ className?: string }>; level: number };
  isVisible: boolean;
  delay: number;
}) {
  const Icon = skill.icon;

  return (
    <div
      className={`group relative p-4 rounded-lg glass transition-all duration-500 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <span className="font-medium">{skill.name}</span>
      </div>
      
      <div className="relative h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${delay + 200}ms`
          }}
        />
      </div>
      <span className="text-xs text-muted-foreground mt-1 block text-right">
        {skill.level}%
      </span>

      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 neon-glow pointer-events-none" />
    </div>
  );
}

export function SkillsSection() {
  const [visibleCategories, setVisibleCategories] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-category") || "0");
            setVisibleCategories((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.2 }
    );

    const categories = sectionRef.current?.querySelectorAll("[data-category]");
    categories?.forEach((cat) => observer.observe(cat));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      data-testid="section-skills"
    >
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // Technical Skills
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            My <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive toolkit for building modern, scalable applications
          </p>
        </div>

        <div className="space-y-12">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              data-category={categoryIndex}
              className="glass overflow-visible"
              data-testid={`card-skill-category-${categoryIndex}`}
            >
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <h3 className="text-xl font-semibold" data-testid={`text-skill-category-title-${categoryIndex}`}>{category.title}</h3>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {category.skills.length} skills
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      isVisible={visibleCategories.includes(categoryIndex)}
                      delay={skillIndex * 100}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
