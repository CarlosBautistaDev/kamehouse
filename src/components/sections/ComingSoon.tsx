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
    if (diff < -40) goTo(activeIndex + 1);
    else if (diff > 40) goTo(activeIndex - 1);
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
    if (diff < -40) goTo(activeIndex + 1);
    else if (diff > 40) goTo(activeIndex - 1);
    else setDragDelta(0);
  }, [activeIndex, goTo]);

  const onMouseLeave = useCallback(() => {
    if (dragging.current) {
      dragging.current = false;
      setDragDelta(0);
    }
  }, []);

  const CARD_W = 280;
  const GAP = 16;

  const getStyle = (index: number): React.CSSProperties => {
    let offset = index - activeIndex;
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const dragFraction = dragDelta / (CARD_W + GAP);
    const pos = offset - dragFraction;
    const absPos = Math.abs(pos);

    const tx = pos * (CARD_W * 0.48 + GAP);
    const sc = Math.max(0.82, 1 - absPos * 0.08);
    const z = 10 - Math.round(absPos);
    const op = absPos > 1.6 ? 0 : Math.max(0.5, 1 - absPos * 0.25);
    const ry = pos * -3;

    return {
      position: "absolute",
      left: "50%",
      top: "50%",
      width: CARD_W,
      marginLeft: -CARD_W / 2,
      marginTop: -(CARD_W * 1.35) / 2,
      height: CARD_W * 1.35,
      transform: `translateX(${tx}px) scale(${sc}) perspective(1000px) rotateY(${ry}deg)`,
      zIndex: z,
      opacity: op,
      transition: dragging.current ? "none" : "all 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
      willChange: "transform, opacity",
      pointerEvents: index === activeIndex ? "auto" : "none",
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
          className="relative w-full select-none overflow-hidden"
          style={{ height: CARD_W * 1.35 + 40, touchAction: "pan-y" }}
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
                style={{
                  boxShadow:
                    index === activeIndex
                      ? "0 25px 60px rgba(0,0,0,0.5), 0 0 30px rgba(255,107,53,0.15)"
                      : "0 15px 40px rgba(0,0,0,0.35)",
                }}
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
