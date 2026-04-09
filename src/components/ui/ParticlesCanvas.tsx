"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  opacity: number;
  targetOpacity: number;
  color: string;
  blinkTimer: number;
  blinkDuration: number;
}

interface ParticlesCanvasProps {
  className?: string;
  colors?: string[];
  particleCount?: number;
  connectionDistance?: number;
  speed?: number;
}

const DEFAULT_COLORS = [
  "255, 107, 53",   // naranja (accent)
  "230, 57, 70",    // rojo
  "34, 197, 94",    // verde
  "56, 189, 248",   // azul cielo
  "99, 102, 241",   // azul índigo
];

export function ParticlesCanvas({
  className = "",
  colors = DEFAULT_COLORS,
  particleCount = 80,
  connectionDistance = 120,
  speed = 0.3,
}: ParticlesCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const initParticles = useCallback(
    (width: number, height: number) => {
      const isMobile = width < 768;
      const count = isMobile ? Math.floor(particleCount * 0.4) : particleCount;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const baseRadius = Math.random() < 0.85
          ? Math.random() * 1.5 + 0.3   // 85% pequeños: 0.3 - 1.8
          : Math.random() * 2.5 + 2;     // 15% grandes: 2 - 4.5
        const blinkDuration = Math.random() * 300 + 100; // frames hasta cambiar
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          baseRadius,
          radius: baseRadius,
          opacity: Math.random() * 0.6 + 0.2,
          targetOpacity: Math.random() * 0.7 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
          blinkTimer: Math.floor(Math.random() * blinkDuration),
          blinkDuration,
        });
      }

      particlesRef.current = particles;
    },
    [particleCount, speed, colors]
  );

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.clearRect(0, 0, width, height);
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Strong mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200) {
          const force = (200 - dist) / 200;
          p.vx += (dx / dist) * force * 0.8;
          p.vy += (dy / dist) * force * 0.8;
        }

        // Speed limit (higher to allow burst from mouse)
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > speed * 4) {
          p.vx = (p.vx / spd) * speed * 4;
          p.vy = (p.vy / spd) * speed * 4;
        }
        // Friction to settle back
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Random burst: occasionally a particle darts in a random direction
        if (Math.random() < 0.002) {
          const angle = Math.random() * Math.PI * 2;
          const burst = speed * 6;
          p.vx += Math.cos(angle) * burst;
          p.vy += Math.sin(angle) * burst;
        }

        // Blink: fade toward targetOpacity, then pick new target
        p.blinkTimer--;
        if (p.blinkTimer <= 0) {
          p.targetOpacity = Math.random() < 0.15 ? 0 : Math.random() * 0.7 + 0.1;
          p.blinkDuration = Math.random() * 300 + 60;
          p.blinkTimer = p.blinkDuration;
        }
        p.opacity += (p.targetOpacity - p.opacity) * 0.05;

        // Pulse radius near mouse
        if (dist < 200) {
          p.radius = p.baseRadius * (1 + (200 - dist) / 200 * 0.8);
        } else {
          p.radius += (p.baseRadius - p.radius) * 0.05;
        }
      }

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * 0.15 * Math.min(particles[i].opacity, particles[j].opacity);
            if (opacity < 0.005) continue;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particles[i].color}, ${opacity})`;
            ctx.lineWidth = 2.4;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        if (p.opacity < 0.01) continue; // invisible, skip
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.opacity})`;
        ctx.fill();
      }
    },
    [connectionDistance, speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);

      initParticles(rect.width, rect.height);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        draw(ctx, rect.width, rect.height);
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [initParticles, draw]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-auto ${className}`}
      style={{ position: "absolute", inset: 0 }}
    />
  );
}
