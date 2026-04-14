"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const STATS = [
  { value: "4", label: "Disciplinas", accent: false },
  { value: "10+", label: "Horarios semanales", accent: true },
  { value: "$100", label: "Desde / día", accent: false },
  { value: "L-S", label: "Lunes a Sábado", accent: true },
];

export function ShenglongStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current) { ticking = false; return; }
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setProgress(p);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Shenlong body: slow parallax (moves up slightly)
  const shenglongY = -progress * 80;
  // Left arm: faster parallax (moves up more) + slight horizontal
  const brazoY = -progress * 140;
  const brazoX = progress * 15;

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Shenlong full — center/right bg */}
      <div
        className="absolute inset-0 pointer-events-none flex justify-center md:justify-end"
        style={{
          transform: `translateY(${shenglongY}px)`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src="/images/shenglongfull.png"
          alt=""
          className="h-[120%] w-auto object-contain opacity-20 md:opacity-25 max-w-none"
          style={{ marginRight: "-5%" }}
        />
      </div>

      {/* Brazo izquierdo — left side, overlapping, faster parallax */}
      <div
        className="absolute left-0 top-0 bottom-0 pointer-events-none z-20"
        style={{
          transform: `translateY(${brazoY}px) translateX(${brazoX}px)`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src="/images/brazo-izq.png"
          alt=""
          className="h-[80%] md:h-[90%] w-auto object-contain opacity-40 md:opacity-50 -translate-x-[15%] mt-[10%]"
        />
      </div>

      {/* Dark gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10" />

      {/* Stats content */}
      <div className="relative z-30 w-full px-4">
        <AnimatedSection animation="blur-scale">
          <div className="max-w-4xl mx-auto text-center">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {STATS.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center">
                  <p
                    className={`font-heading text-5xl md:text-7xl lg:text-8xl ${
                      stat.accent ? "text-accent-primary" : "text-white"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs md:text-sm mt-2 tracking-wider uppercase">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
