import { useState, useEffect } from "react";
import { Download, ChevronDown, Code2, Database, Globe, Cpu, Cloud, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

const roles = [
  "Backend Developer",  
  "Python Programmer",
  "Problem Solver",
  "Tech Enthusiast",
];

const floatingIcons = [
  { Icon: Code2, delay: 0 },
  { Icon: Database, delay: 0.5 },
  { Icon: Globe, delay: 1 },
  { Icon: Cpu, delay: 1.5 },
  { Icon: Cloud, delay: 2 },
  { Icon: Palette, delay: 2.5 },
];

export function HeroSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && displayText === role) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayText === "") {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayText(role.substring(0, displayText.length - 1));
      } else {
        setDisplayText(role.substring(0, displayText.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-testid="section-hero"
    >
      <div className="absolute inset-0 grid-pattern" />
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="relative inline-block mb-8">
          {floatingIcons.map(({ Icon, delay }, index) => (
            <div
              key={index}
              className="absolute hidden xl:block animate-float opacity-15"
              style={{ 
                animationDelay: `${delay}s`,
                left: index % 2 === 0 ? `-${150 + (index * 20)}px` : 'auto',
                right: index % 2 === 1 ? `-${150 + (index * 20)}px` : 'auto',
                top: `${-80 + (index * 50)}px`,
              }}
            >
              <Icon className="w-6 h-6 text-primary" />
            </div>
          ))}
          
          <span className="inline-block text-sm md:text-base font-mono text-primary mb-4 tracking-wider">
            Hello, World! I'm
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight">
          <span className="gradient-text">Daniel Developer</span>
        </h1>

        <div className="h-12 md:h-16 flex items-center justify-center mb-8">
          <span className="text-xl md:text-3xl font-medium text-muted-foreground">
            I'm a{" "}
            <span className="text-primary neon-text typing-cursor">
              {displayText}
            </span>
          </span>
        </div>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Crafting exceptional digital experiences with clean code and creative design.
          Turning complex problems into elegant solutions.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/my_resume.pdf" download="Daniel's resume">
            <Button
              size="lg"
              className="gap-2 neon-glow pulse-glow"
              data-testid="button-download-cv"
            >
              <Download className="w-5 h-5" />
              Download CV
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToAbout}
            className="gap-2"
            data-testid="button-explore"
          >
            Explore My Work
          </Button>
        </div>
      </div>

      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground"
        data-testid="button-scroll-down"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
}
