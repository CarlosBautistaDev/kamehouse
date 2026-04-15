"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";

interface ServiceCard {
  id: string;
  title: string;
  emoji: string;
  description: string;
  image: string;
}

interface ServiceCarouselProps {
  services: ServiceCard[];
}

export function ServiceCarousel({ services }: ServiceCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);
  const direction = useRef<"h" | "v" | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = services.length;

  const goTo = useCallback(
    (index: number) => {
      let next = index;
      if (next < 0) next = total - 1;
      if (next >= total) next = 0;
      setActiveIndex(next);
      setDragDelta(0);
    },
    [total]
  );

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    currentX.current = e.touches[0].clientX;
    dragging.current = true;
    direction.current = null;
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!dragging.current) return;
    const x = e.touches[0].clientX;
    const y = e.touches[0].clientY;

    if (direction.current === null) {
      const dx = Math.abs(x - startX.current);
      const dy = Math.abs(y - startY.current);
      if (dx + dy > 8) {
        direction.current = dx > dy ? "h" : "v";
      }
    }

    if (direction.current === "v") {
      dragging.current = false;
      setDragDelta(0);
      return;
    }

    if (direction.current === "h") {
      e.preventDefault();
      currentX.current = x;
      setDragDelta(x - startX.current);
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = currentX.current - startX.current;
    if (diff < -60) goTo(activeIndex + 1);
    else if (diff > 60) goTo(activeIndex - 1);
    else setDragDelta(0);
  }, [activeIndex, goTo]);

  // Mouse handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    startX.current = e.clientX;
    currentX.current = e.clientX;
    dragging.current = true;
    direction.current = "h";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!dragging.current) return;
    currentX.current = e.clientX;
    setDragDelta(e.clientX - startX.current);
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    const diff = currentX.current - startX.current;
    if (diff < -60) goTo(activeIndex + 1);
    else if (diff > 60) goTo(activeIndex - 1);
    else setDragDelta(0);
  }, [activeIndex, goTo]);

  const onMouseLeave = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      setDragDelta(0);
    }
  }, []);

  // Keyboard
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, goTo]);

  const CARD_W = 315;
  const CARD_H = CARD_W * 1.75;
  const SIDE_OFFSET = CARD_W * 0.7;

  const getStyle = (index: number): React.CSSProperties => {
    let offset = index - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const isActive = offset === 0;
    const dragShift = isActive ? dragDelta * 0.25 : 0;

    const tx = offset * SIDE_OFFSET + dragShift;
    const sc = isActive ? 1 : 0.78;
    const op = Math.abs(offset) > 1 ? 0 : isActive ? 1 : 0.5;
    const ry = offset * 12;
    const z = isActive ? 3 : 1;
    const blurPx = isActive ? 0 : 3;

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: CARD_W,
      marginLeft: -CARD_W / 2,
      marginTop: -CARD_H / 2,
      height: CARD_H,
      transform: `translateX(${tx}px) scale(${sc}) perspective(600px) rotateY(${ry}deg)`,
      zIndex: z,
      opacity: op,
      filter: blurPx > 0 ? `blur(${blurPx}px)` : "none",
      animation: isActive && !dragging.current ? "breathe 4s ease-in-out infinite" : "none",
      transition: dragging.current ? "none" : "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      willChange: "transform, opacity, filter",
      pointerEvents: isActive ? "auto" : "none",
    };
  };

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={containerRef}
        className="relative w-full select-none overflow-visible py-6"
        style={{ height: CARD_H + 40, touchAction: "pan-y" }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            style={getStyle(index)}
            className="rounded-3xl overflow-hidden ring-1 ring-white/20"
          >
            <div className="relative w-full h-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="315px"
                priority={index === 0}
                draggable={false}
              />
              {/* Liquid glass footer panel — multi-layer */}
              <div className="absolute inset-x-0 bottom-0 h-[28%] rounded-t-2xl overflow-hidden">
                {/* Layer 1: Blur filter */}
                <div className="absolute inset-0 backdrop-blur-[10px] [-webkit-backdrop-filter:blur(10px)]" />
                {/* Layer 2: Tinted overlay */}
                <div className="absolute inset-0 bg-white/[0.02]" />
                {/* Layer 3: Specular highlight */}
                <div
                  className="absolute inset-0 rounded-t-2xl"
                  style={{
                    boxShadow: "inset 1px 1px 0 rgba(255,255,255,0.75), inset 0 0 5px rgba(255,255,255,0.75)",
                  }}
                />
                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-center px-5">
                  <span className="text-2xl mb-1 block">{service.emoji}</span>
                  <h3 className="font-heading text-2xl text-white mb-0.5" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}>
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-xs leading-relaxed line-clamp-2" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.25)" }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="h-2 rounded-full transition-all duration-400 ease-out"
            style={{
              width: index === activeIndex ? 24 : 8,
              backgroundColor: index === activeIndex ? "var(--color-accent-primary)" : "var(--theme-text-tertiary)",
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            aria-label={`Ir a ${services[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}
