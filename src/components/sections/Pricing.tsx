"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PriceCard } from "@/components/ui/PriceCard";
import { PRICING, PAYMENT_NOTICE } from "@/lib/constants";

export function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current) { ticking = false; return; }
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height)));
        setProgress(p);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile: 0.4x → 3.5x, Desktop: 0.6x → 3x
  const esferasScale = isMobile ? 0.4 + progress * 3.1 : 0.6 + progress * 2.4;
  const esferasY = -progress * 60;

  return (
    <section ref={sectionRef} id="precios" className="relative py-24 md:py-32 px-4 bg-bg-primary overflow-hidden">
      {/* Dragon Balls parallax background — zoom on scroll */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url(/images/esferas-dragon.png)",
          backgroundSize: "clamp(280px, 50vw, 500px)",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          transform: `scale(${esferasScale}) translateY(${esferasY}px)`,
          willChange: "transform",
        }}
        aria-hidden="true"
      />
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection animation="blur-scale">
          <p className="text-accent-primary font-semibold text-sm tracking-[0.2em] uppercase text-center mb-3">
            Planes
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-center text-text-primary mb-4">
            PRECIOS
          </h2>
          <p className="text-text-secondary text-center text-lg mb-16">
            Planes accesibles para todos los niveles
          </p>
        </AnimatedSection>

        {/* Individual */}
        <AnimatedSection delay={100} animation="fade-up">
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-8">
            ACTIVIDAD INDIVIDUAL
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-16">
          {PRICING.individual.map((plan, index) => (
            <AnimatedSection key={plan.period} delay={150 + index * 120} animation="scale">
              <PriceCard
                price={plan.price}
                period={plan.period}
                highlighted={plan.highlighted}
                badge={"badge" in plan ? plan.badge : undefined}
                description={"description" in plan ? plan.description : undefined}
              />
            </AnimatedSection>
          ))}
        </div>

        {/* Combo */}
        <AnimatedSection delay={200} animation="fade-up">
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-8">
            COMBO — {PRICING.combo.title}
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-16">
          {PRICING.combo.plans.map((plan, index) => (
            <AnimatedSection key={plan.period} delay={250 + index * 120} animation="scale">
              <PriceCard price={plan.price} period={plan.period} />
            </AnimatedSection>
          ))}
        </div>

        {/* Taekwondo */}
        <AnimatedSection delay={300} animation="blur-up">
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-8">
            TAEKWONDO
          </h3>
          <div className="max-w-[180px] mx-auto mb-16">
            <PriceCard
              price={PRICING.taekwondo.price}
              period={PRICING.taekwondo.period}
              description="Mensualidad"
            />
          </div>
        </AnimatedSection>

        {/* Payment Notice */}
        <AnimatedSection delay={400} animation="blur-up">
          <div className="rounded-2xl border border-accent-secondary/20 bg-accent-secondary/5 p-6 md:p-8 max-w-2xl mx-auto">
            <h4 className="font-heading text-xl text-accent-secondary mb-4">
              ⚠️ AVISO IMPORTANTE
            </h4>
            <ul className="space-y-2 mb-4">
              {PAYMENT_NOTICE.rules.map((rule) => (
                <li key={rule} className="text-text-secondary text-sm flex gap-2">
                  <span className="text-accent-secondary mt-0.5">•</span>
                  {rule}
                </li>
              ))}
            </ul>
            <p className="text-accent-secondary text-sm font-semibold">
              {PAYMENT_NOTICE.warning}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
