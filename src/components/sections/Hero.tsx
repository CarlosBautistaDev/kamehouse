"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const [isDark, setIsDark] = useState(true);
  const [textVisible, setTextVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Fade out text after 4 seconds
    const timer = setTimeout(() => setTextVisible(false), 4000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // Re-show text when user scrolls back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setTextVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Video background — mobile only */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        style={{ filter: "grayscale(100%) brightness(0.4)" }}
      >
        <source src="/images/bg-video-web.mp4" type="video/mp4" />
      </video>

      {/* Background image — desktop only */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: "url(/images/hero-bg.jpg)" }}
      />

      {/* Fallback dark bg */}
      <div className="absolute inset-0 bg-bg-dark -z-10" />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1] transition-all duration-700"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.5) 70%, #0C0C0C 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, white 100%)",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4">
        <div className="relative" style={{ isolation: "isolate" }}>
          {/* Palm tree — desktop only */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/palm.png"
            alt=""
            className="absolute right-[-5%] md:right-[2%] lg:right-[-2%] top-1/2 -translate-y-1/2 pointer-events-none hidden md:block md:w-[500px] lg:w-[700px] h-auto select-none"
            style={{
              zIndex: 0,
              maskImage: "radial-gradient(ellipse 60% 60% at 70% 50%, black 30%, transparent 70%)",
              WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 70% 50%, black 30%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          <div
            className="relative text-center transition-all duration-1000 ease-out"
            style={{
              zIndex: 1,
              opacity: mounted ? (textVisible ? 1 : 0) : 0,
              transform: mounted
                ? textVisible
                  ? "translateY(0)"
                  : "translateY(-20px)"
                : "translateY(30px)",
              filter: mounted ? "blur(0px)" : "blur(8px)",
            }}
          >
            {/* Category tag */}
            <p
              className="text-accent-primary font-semibold tracking-[0.25em] uppercase text-sm md:text-base mb-4"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
              }}
            >
              Entrenamiento Funcional &bull; Box &bull; Taekwondo
            </p>

            {/* Main title */}
            <h1
              className="font-heading text-7xl sm:text-8xl md:text-[10rem] leading-[0.85] tracking-wider text-white mb-2"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.4s",
              }}
            >
              KAME HOUSE
            </h1>
            <p
              className="font-heading text-4xl sm:text-5xl md:text-7xl tracking-[0.3em] text-accent-primary"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(30px)",
                transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.6s",
              }}
            >
              TRAINING
            </p>

            {/* Description */}
            <p
              className="text-white/60 text-base md:text-lg mt-8 mb-10 max-w-xl mx-auto"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                filter: mounted ? "blur(0px)" : "blur(4px)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
              }}
            >
              Transforma tu cuerpo y mente con nuestros programas de
              entrenamiento. Horarios flexibles, profesores experimentados.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 1s",
              }}
            >
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
          </div>
        </div>
      </div>

      {/* Scroll indicator — appears when text fades */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700"
        style={{
          opacity: mounted && !textVisible ? 1 : 0.6,
          transform: mounted && !textVisible ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <div className="animate-scroll-hint">
          <svg
            className="w-6 h-6 text-white/40"
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
