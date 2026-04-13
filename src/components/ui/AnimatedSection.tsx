"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "blur-up"
  | "slide-right"
  | "slide-left"
  | "scale"
  | "clip-up"
  | "blur-scale";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  animation?: AnimationType;
}

const initialStyles: Record<AnimationType, React.CSSProperties> = {
  "fade-up": { opacity: 0, transform: "translateY(40px)" },
  "fade-down": { opacity: 0, transform: "translateY(-30px)" },
  "blur-up": { opacity: 0, transform: "translateY(30px)", filter: "blur(8px)" },
  "slide-right": { opacity: 0, transform: "translateX(-60px)" },
  "slide-left": { opacity: 0, transform: "translateX(60px)" },
  "scale": { opacity: 0, transform: "scale(0.9)" },
  "clip-up": { opacity: 0, clipPath: "inset(100% 0 0 0)" },
  "blur-scale": { opacity: 0, transform: "scale(0.95)", filter: "blur(10px)" },
};

const visibleStyles: React.CSSProperties = {
  opacity: 1,
  transform: "translateY(0) translateX(0) scale(1)",
  filter: "blur(0px)",
  clipPath: "inset(0 0 0 0)",
};

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
  animation = "blur-up",
}: AnimatedSectionProps) {
  const { ref, isVisible, isMobile } = useScrollAnimation(0.08);

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? visibleStyles : initialStyles[animation]),
        transition: `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, filter 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, clip-path 0.9s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: "opacity, transform, filter",
      }}
    >
      {children}
    </div>
  );
}
