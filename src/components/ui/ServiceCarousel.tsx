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
  const touchStartX = useRef(0);
  const touchCurrentX = useRef(0);
  const isDragging = useRef(false);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = services.length;

  const goTo = useCallback(
    (index: number) => {
      // Wrap around for infinite feel
      if (index < 0) {
        setActiveIndex(total - 1);
      } else if (index >= total) {
        setActiveIndex(0);
      } else {
        setActiveIndex(index);
      }
      setDragOffset(0);
    },
    [total]
  );

  const touchStartY = useRef(0);
  const isHorizontalSwipe = useRef<boolean | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isHorizontalSwipe.current = null;
    isDragging.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;

    // Determine swipe direction on first significant move
    if (isHorizontalSwipe.current === null) {
      const dx = Math.abs(currentX - touchStartX.current);
      const dy = Math.abs(currentY - touchStartY.current);
      if (dx + dy > 10) {
        isHorizontalSwipe.current = dx > dy;
      }
    }

    // If vertical scroll, bail out
    if (isHorizontalSwipe.current === false) {
      isDragging.current = false;
      setDragOffset(0);
      return;
    }

    // Horizontal swipe — prevent page scroll
    if (isHorizontalSwipe.current) {
      e.preventDefault();
    }

    touchCurrentX.current = currentX;
    const diff = touchCurrentX.current - touchStartX.current;
    setDragOffset(diff);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchCurrentX.current - touchStartX.current;
    const threshold = 50;

    if (diff < -threshold) {
      goTo(activeIndex + 1);
    } else if (diff > threshold) {
      goTo(activeIndex - 1);
    } else {
      setDragOffset(0);
    }
  }, [activeIndex, goTo]);

  // Mouse support for desktop testing
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    touchCurrentX.current = e.clientX;
    isDragging.current = true;
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchCurrentX.current = e.clientX;
    const diff = touchCurrentX.current - touchStartX.current;
    setDragOffset(diff);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = touchCurrentX.current - touchStartX.current;
    const threshold = 50;

    if (diff < -threshold) {
      goTo(activeIndex + 1);
    } else if (diff > threshold) {
      goTo(activeIndex - 1);
    } else {
      setDragOffset(0);
    }
  }, [activeIndex, goTo]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      setDragOffset(0);
    }
  }, []);

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(activeIndex - 1);
      if (e.key === "ArrowRight") goTo(activeIndex + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, goTo]);

  const getCardStyle = (index: number): React.CSSProperties => {
    let offset = index - activeIndex;

    // Handle wrapping for circular effect
    if (offset > Math.floor(total / 2)) offset -= total;
    if (offset < -Math.floor(total / 2)) offset += total;

    const dragFactor = dragOffset / 300;
    const adjustedOffset = offset - dragFactor;

    const absOffset = Math.abs(adjustedOffset);
    const scale = Math.max(0.75, 1 - absOffset * 0.12);
    const translateX = adjustedOffset * 68;
    const zIndex = 10 - Math.round(absOffset);
    const opacity = absOffset > 1.8 ? 0 : Math.max(0.4, 1 - absOffset * 0.35);
    const rotateY = adjustedOffset * -5;
    const blur = absOffset > 0.5 ? Math.min(absOffset * 2, 4) : 0;

    return {
      position: "absolute" as const,
      left: "50%",
      top: "50%",
      transform: `translate(-50%, -50%) translateX(${translateX}%) scale(${scale}) perspective(800px) rotateY(${rotateY}deg)`,
      zIndex,
      opacity,
      filter: blur > 0 ? `blur(${blur}px)` : "none",
      transition: isDragging.current
        ? "none"
        : "all 0.45s cubic-bezier(0.32, 0.72, 0, 1)",
      willChange: "transform, opacity, filter",
      pointerEvents: (index === activeIndex ? "auto" : "none") as React.CSSProperties["pointerEvents"],
    };
  };

  return (
    <div className="w-full">
      {/* Carousel container */}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden select-none"
        style={{ height: "clamp(420px, 65vh, 520px)", touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {services.map((service, index) => (
          <div
            key={service.id}
            style={getCardStyle(index)}
            className="w-[75vw] max-w-[300px] aspect-[3/4.2] rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Image */}
            <div className="relative w-full h-full">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
                sizes="75vw"
                priority={index === 0}
                draggable={false}
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <span className="text-3xl mb-2 block drop-shadow-lg">
                  {service.emoji}
                </span>
                <h3 className="font-heading text-3xl text-white mb-1.5 drop-shadow-lg">
                  {service.title}
                </h3>
                <p className="text-white/75 text-sm leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => goTo(index)}
            className="relative h-2 rounded-full transition-all duration-400 ease-out"
            style={{
              width: index === activeIndex ? 24 : 8,
              backgroundColor:
                index === activeIndex
                  ? "var(--color-accent-primary)"
                  : "var(--theme-text-tertiary)",
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            aria-label={`Ir a ${services[index].title}`}
          />
        ))}
      </div>
    </div>
  );
}
