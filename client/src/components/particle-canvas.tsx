import { useEffect, useRef } from "react";
import { useTheme } from "./theme-provider";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  char: string;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const codeChars = ["0", "1", "{", "}", "<", ">", "/", ";", "=", "(", ")", "+", "-", "*"];
    const particleCount = Math.min(80, Math.floor(window.innerWidth / 20));

    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 14 + 10,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
          char: codeChars[Math.floor(Math.random() * codeChars.length)],
        });
      }
    };

    initParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const primaryColor = theme === "dark" ? "0, 255, 255" : "0, 180, 200";

      particlesRef.current.forEach((particle, index) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.x -= (dx / distance) * force * 0.5;
          particle.y -= (dy / distance) * force * 0.5;
        }

        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.font = `${particle.size}px "JetBrains Mono", monospace`;
        ctx.fillStyle = `rgba(${primaryColor}, ${particle.opacity})`;
        ctx.fillText(particle.char, particle.x, particle.y);

        particlesRef.current.forEach((other, otherIndex) => {
          if (index === otherIndex) return;
          const dx2 = particle.x - other.x;
          const dy2 = particle.y - other.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${primaryColor}, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = undefined;
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      data-testid="particle-canvas"
    />
  );
}
