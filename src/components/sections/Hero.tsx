"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const [logoVisible, setLogoVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));

    // Logo stays 2s after appearing (~1.2s intro + 2s visible), then fades out
    const timer = setTimeout(() => setLogoVisible(false), 3200);

    return () => clearTimeout(timer);
  }, []);

  // Re-show logo when user scrolls back to top
  useEffect(() => {
    if (logoVisible) return;
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setLogoVisible(true);
        setTimeout(() => setLogoVisible(false), 3200);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [logoVisible]);

  const revealed = mounted && !logoVisible;

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
        style={{
          filter: revealed
            ? "grayscale(100%) brightness(0.55)"
            : "grayscale(100%) brightness(0.25)",
          objectPosition: "center center",
          transform: "scale(1.15)",
          transition: "filter 2.5s ease-in-out",
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
          background: revealed
            ? "linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 40%, rgba(0,0,0,0.3) 75%, #0C0C0C 100%)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.6) 75%, #0C0C0C 100%)",
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

      {/* Logo — blur in, stay, fade out in place */}
      <div
        className="relative z-10 flex items-center justify-center w-full px-4"
        style={{
          opacity: !mounted ? 0 : logoVisible ? 1 : 0,
          transform: !mounted
            ? "translateY(30px) scale(0.9)"
            : "translateY(0) scale(1)",
          filter: !mounted
            ? "blur(12px)"
            : logoVisible
              ? "blur(0px)"
              : "blur(12px)",
          transition: !mounted
            ? "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
            : logoVisible
              ? "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), filter 1.2s cubic-bezier(0.16, 1, 0.3, 1)"
              : "opacity 2.5s ease-in-out, filter 2.5s ease-in-out",
        }}
      >
        <Image
          src="/images/favicon_io/kh-logo-removedbg.png"
          alt="Kame House Training"
          width={500}
          height={500}
          priority
          className="w-52 sm:w-64 md:w-80 lg:w-96 h-auto"
        />
      </div>

      {/* Scroll indicator — appears after logo fades */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{
          opacity: revealed ? 1 : 0,
          transform: revealed ? "translateY(0)" : "translateY(10px)",
          transition: "all 1s ease-out 0.5s",
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
