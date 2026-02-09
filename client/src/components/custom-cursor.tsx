import { useEffect, useRef, useState } from "react";

interface Trail {
  x: number;
  y: number;
  id: number;
}

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [trails, setTrails] = useState<Trail[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const trailIdRef = useRef(0);

  useEffect(() => {
    const touchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(touchDevice);
    if (touchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }

      trailIdRef.current += 1;
      const newTrail: Trail = {
        x: e.clientX,
        y: e.clientY,
        id: trailIdRef.current,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const interval = setInterval(() => {
      setTrails((prev) => prev.slice(1));
    }, 50);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      clearInterval(interval);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed w-2 h-2 rounded-full bg-primary/30 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
          style={{
            left: trail.x,
            top: trail.y,
            opacity: (index + 1) / trails.length * 0.5,
            transform: `translate(-50%, -50%) scale(${(index + 1) / trails.length})`,
          }}
        />
      ))}
      <div
        ref={cursorRef}
        className={`fixed w-5 h-5 rounded-full border-2 border-primary pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ mixBlendMode: "difference" }}
      />
    </>
  );
}
