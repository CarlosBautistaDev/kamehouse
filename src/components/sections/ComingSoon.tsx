"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";

const FUNCTIONAL_IMAGES = [
  { src: "/images/functional1.jpeg", alt: "Entrenamiento funcional — ejercicio 1" },
  { src: "/images/functional3.jpeg", alt: "Entrenamiento funcional — ejercicio 2" },
  { src: "/images/functional4.jpeg", alt: "Entrenamiento funcional — ejercicio 3" },
];

export function ComingSoon() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const startX = useRef(0);
  const startY = useRef(0);
  const currentX = useRef(0);
  const dragging = useRef(false);
  const direction = useRef<"h" | "v" | null>(null);
  const total = FUNCTIONAL_IMAGES.length;

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
      if (dx + dy > 8) direction.current = dx > dy ? "h" : "v";
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

  const CARD_W = 300;
  const CARD_H = CARD_W * 1.75;
  const SIDE_OFFSET = CARD_W * 0.7;

  const getStyle = (index: number): React.CSSProperties => {
    let offset = index - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const isActive = offset === 0;
    const dragShift = isActive ? dragDelta * 0.25 : 0;

    const tx = offset * SIDE_OFFSET + dragShift;
    const sc = isActive ? 1.05 : 0.78;
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
      transition: dragging.current ? "none" : "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      willChange: "transform, opacity, filter",
      pointerEvents: isActive ? "auto" : "none",
    };
  };

  return (
    <section className="py-24 md:py-32 px-4 bg-bg-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection animation="blur-scale">
          <p className="text-accent-primary font-semibold text-sm tracking-[0.2em] uppercase mb-3">
            Entrenamiento Funcional
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-text-primary mb-4">
            ¿QUÉ INCLUYE?
          </h2>
          <p className="text-text-secondary text-lg mb-14">
            Nuestro espacio permite trabajar diversas disciplinas dentro del entrenamiento funcional
          </p>
        </AnimatedSection>

        {/* Swipeable image carousel */}
        <div
          className="relative w-full select-none overflow-hidden py-6"
          style={{ height: CARD_H + 40, touchAction: "pan-y" }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {FUNCTIONAL_IMAGES.map((img, index) => (
            <div
              key={img.src}
              style={getStyle(index)}
              className="rounded-2xl overflow-hidden"
            >
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden ring-1 ring-white/10"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="280px"
                  priority={index === 0}
                  draggable={false}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {FUNCTIONAL_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className="h-2 rounded-full transition-all duration-400 ease-out"
              style={{
                width: index === activeIndex ? 24 : 8,
                backgroundColor:
                  index === activeIndex
                    ? "var(--color-accent-primary)"
                    : "var(--theme-text-tertiary)",
                opacity: index === activeIndex ? 1 : 0.4,
              }}
              aria-label={`Imagen funcional ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
