import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, GraduationCap, Award, Rocket } from "lucide-react";

const stats = [
  { label: "Projects Completed", value: 5, suffix: "+" },
  { label: "Years Experience", value: 2, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Coffee Cups", value: 70, suffix: "+" },
];

const timeline = [
  {
    year: "Currently",
    title: "Backend Developer",
    description: "Building robust and scalable backend systems for web applications and APIs",
    icon: Rocket,
  },
  {
    year: "2025",
    title: "Python Programmer",
    description: "Specializing in Python development for efficient code and reliable performance",
    icon: Briefcase,
  },
  {
    year: "2024",
    title: "Full-Stack Developer",
    description: "Creating responsive and interactive user interfaces",
    icon: Award,
  },
  {
    year: "2023",
    title: "Bachelor's in Computer Science",
    description: "Began my computer science journey with a focus on software development at Kwame Nkrumah University of Science and Technology",
    icon: GraduationCap,
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const interval = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [isVisible, value]);

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold gradient-text">
      {count}
      {suffix}
    </span>
  );
}

export function AboutSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleItems((prev) => Array.from(new Set([...prev, index])));
          }
        });
      },
      { threshold: 0.3 }
    );

    const items = timelineRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      className="relative py-24 md:py-32"
      data-testid="section-about"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-primary font-mono text-sm tracking-wider mb-4 block">
            // About Me
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Who I <span className="gradient-text">Am</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A passionate developer with a love for creating impactful digital experiences
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">
              Engineering, <span className="text-primary">the Invisible</span>
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a backend developer based in Accra with 2+ years of experience 
                in building robust and scalable backend systems. My journey in tech started with a 
                curiosity about how things work, which evolved into a passion for creating 
                elegant solutions to complex problems.
              </p>
              <p>
                I specialize in Python, Django, and cloud technologies, with a strong focus 
                on user experience and performance optimization. When I'm not coding, you'll 
                find me exploring new technologies, contributing to open-source projects, 
                or mentoring aspiring developers.
              </p>
              <p>
                I believe in writing clean, maintainable code that scales. My approach combines 
                technical expertise with a keen eye for design, ensuring every project I work 
                on is both functional and seamless.
              </p>
            </div>
          </div>

          <div ref={timelineRef} className="relative">
            <div className="absolute left-4 md:left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-neon-purple" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  data-index={index}
                  className={`relative pl-12 md:pl-16 transition-all duration-700 ${
                    visibleItems.includes(index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="absolute left-0 w-8 md:w-12 h-8 md:h-12 rounded-full bg-card border-2 border-primary flex items-center justify-center neon-glow">
                    <item.icon className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                  </div>
                  
                  <Card className="glass" data-testid={`card-timeline-${index}`}>
                    <CardContent className="p-4 md:p-6">
                      <span className="text-primary font-mono text-sm" data-testid={`text-timeline-year-${index}`}>{item.year}</span>
                      <h4 className="text-lg font-semibold mt-1" data-testid={`text-timeline-title-${index}`}>{item.title}</h4>
                      <p className="text-muted-foreground text-sm mt-2">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="glass text-center hover-lift" data-testid={`card-stat-${index}`}>
              <CardContent className="p-6">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                <p className="text-muted-foreground text-sm mt-2" data-testid={`text-stat-label-${index}`}>{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
