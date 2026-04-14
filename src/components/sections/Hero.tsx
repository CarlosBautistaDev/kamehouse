"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export function Hero() {
  const [logoVisible, setLogoVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);

    // Fade out logo after 4 seconds
    const timer = setTimeout(() => setLogoVisible(false), 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Re-show logo when user scrolls back to top
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setLogoVisible(true);
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
      {/* Video background — mobile only, wider crop */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover md:hidden"
        style={{
          filter: "grayscale(100%) brightness(0.4)",
          objectPosition: "center center",
          transform: "scale(1.15)",
          transition: "filter 2s ease-in-out",
          ...(mounted && !logoVisible ? { filter: "grayscale(100%) brightness(0.55)" } : {}),
        }}
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

      {/* Gradient overlay — lightens when logo fades */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: mounted && !logoVisible
            ? "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.3) 70%, #0C0C0C 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.5) 70%, #0C0C0C 100%)",
          transition: "background 2.5s ease-in-out",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.4) 100%)",
        }}
      />

      {/* Content — Logo only */}
      <div className="relative z-10 flex items-center justify-center w-full px-4">
        <div
          className="transition-all duration-[2s] ease-out"
          style={{
            opacity: mounted ? (logoVisible ? 1 : 0) : 0,
            transform: mounted
              ? logoVisible
                ? "translateY(0) scale(1)"
                : "translateY(-30px) scale(0.95)"
              : "translateY(30px) scale(0.9)",
            filter: mounted ? "blur(0px)" : "blur(12px)",
            transition: "opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1), transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <Image
            src="/images/kh-logo.png"
            alt="Kame House Training"
            width={500}
            height={500}
            priority
            className="w-52 sm:w-64 md:w-80 lg:w-96 h-auto drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll indicator — appears when logo fades */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700"
        style={{
          opacity: mounted && !logoVisible ? 1 : 0.6,
          transform: mounted && !logoVisible ? "translateY(0)" : "translateY(10px)",
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
