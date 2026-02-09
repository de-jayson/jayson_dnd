import { useState, useEffect, useCallback } from "react";
import { Navigation } from "@/components/navigation";
import { ParticleCanvas } from "@/components/particle-canvas";
import { CustomCursor } from "@/components/custom-cursor";
import { TerminalOverlay } from "@/components/terminal-overlay";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/footer";

export default function Portfolio() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "`" || e.key === "~") {
      e.preventDefault();
      setIsTerminalOpen((prev) => !prev);
    }
    if (e.key === "Escape") {
      setIsTerminalOpen(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="min-h-screen bg-background text-foreground" data-testid="portfolio-page">
      <ParticleCanvas />
      <CustomCursor />
      <Navigation onTerminalOpen={() => setIsTerminalOpen(true)} />
      <TerminalOverlay
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
