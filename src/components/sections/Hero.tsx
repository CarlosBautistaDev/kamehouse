"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />
      {/* Fallback gradient when no image */}
      <div className="absolute inset-0 bg-bg-dark" />
      {/* Gradient overlay: dark top → white bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 via-60% to-white z-[1]" />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full" style={{ padding: '10px' }}>
        {/* Clip wrapper */}
        <div className="relative" style={{ isolation: 'isolate' }}>
          {/* Palm tree — behind text, faded at edges */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/palm.png"
            alt=""
            className="hidden md:block absolute right-[2%] lg:right-[-2%] top-1/2 -translate-y-1/2 pointer-events-none w-[500px] lg:w-[700px] h-auto select-none"
            style={{
              zIndex: 0,
              maskImage: 'radial-gradient(ellipse 60% 60% at 70% 50%, black 30%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 70% 50%, black 30%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative text-center" style={{ zIndex: 1 }}>
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
              <a
                href="#contacto"
                className="liquid-glass inline-flex items-center justify-center px-9 py-4.5 text-lg font-semibold text-white rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.97]"
              >
                <span className="lg-filter" />
                <span className="lg-overlay" />
                <span className="lg-specular" />
                <span className="lg-content">Contáctanos</span>
              </a>
            </div>
          </AnimatedSection>
        </div>
        </div>
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
