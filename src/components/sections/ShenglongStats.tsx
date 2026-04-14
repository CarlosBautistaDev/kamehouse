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

  // Shenlong body: parallax — scale grows + moves up
  const shenglongScale = 2.6 + progress * 0.6;
  const shenglongY = -progress * 80;
  // Brazo: faster parallax — moves up more + slight scale
  const brazoScale = 1.0 + progress * 0.3;
  const brazoY = -progress * 150;

  return (
    <section
      ref={sectionRef}
      className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Shenlong full — massive, parallax scale + translate */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        style={{
          transform: `translateY(${shenglongY}px) scale(${shenglongScale})`,
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src="/images/shenglongfull.png"
          alt=""
          className="h-full w-auto object-contain opacity-15 md:opacity-20 max-w-none"
        />
      </div>

      {/* Brazo — RIGHT side, bigger, parallax scale + translate */}
      <div
        className="absolute right-0 top-0 bottom-0 pointer-events-none z-20 flex items-center justify-end"
        style={{
          transform: `translateY(${brazoY}px) scale(${brazoScale})`,
          transformOrigin: "right center",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src="/images/brazo-izq.png"
          alt=""
          className="h-[90%] md:h-[110%] w-auto object-contain opacity-50 md:opacity-60 translate-x-[15%]"
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
