"use client";

import { useEffect, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";
import { ParticlesCanvas } from "@/components/ui/ParticlesCanvas";

export function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Gradient shifts as you scroll: starts dark, white creeps up
  const gradientStop = Math.min(60 + scrollY * 0.05, 95);

  return (
    <section
      id="inicio"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />
      {/* Fallback gradient when no image */}
      <div className="absolute inset-0 bg-bg-dark" />
      {/* Gradient overlay: moves with scroll */}
      <div
        className="absolute inset-0 transition-none"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) ${gradientStop - 20}%, white ${gradientStop}%)`,
        }}
      />

      {/* Particles */}
      <div className="absolute inset-0">
        <ParticlesCanvas
          colors={[
            "255, 107, 53",   // naranja
            "230, 57, 70",    // rojo
            "34, 197, 94",    // verde
            "56, 189, 248",   // azul cielo
          ]}
          particleCount={450}
          connectionDistance={110}
          speed={0.1}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <p className="text-accent-primary font-semibold tracking-[0.25em] uppercase text-sm md:text-base mb-4">
            Entrenamiento Funcional &bull; Box &bull; Taekwondo
          </p>
        </AnimatedSection>

        <AnimatedSection delay={150}>
          <h1 className="font-heading text-7xl sm:text-8xl md:text-[10rem] leading-[0.85] tracking-wider text-white mb-2">
            KAME HOUSE
          </h1>
          <p className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-[0.3em] text-accent-primary">
            TRAINING
          </p>
        </AnimatedSection>

        <AnimatedSection delay={350}>
          <p className="text-white/60 text-base md:text-lg mt-8 mb-10 max-w-xl mx-auto">
            Transforma tu cuerpo y mente con nuestros programas de
            entrenamiento. Horarios flexibles, profesores experimentados.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={500}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="#horarios" size="lg">
              Ver Horarios
            </Button>
            <Button href="#contacto" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-text-primary">
              Contáctanos
            </Button>
          </div>
        </AnimatedSection>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-scroll-hint">
          <svg
            className="w-6 h-6 text-text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
