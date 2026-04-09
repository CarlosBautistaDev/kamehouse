"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible, isMobile } = useScrollAnimation(0.1);

  // Mobile: sin animaciones, todo visible directo
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible ? "animate-fade-in-up" : ""
      }`}
      style={{
        opacity: isVisible ? undefined : 0,
        animationDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
