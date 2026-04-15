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

  // Esferas izquierda: arriba, detrás de las primeras cards, crece mucho
  const esferasIzqScale = 0.6 + progress * 4.0;
  const esferasIzqY = -progress * 40;

  // Esferas derecha: centro, más pequeña 0.5→2.3x
  const esferasDerScale = 0.4 + progress * 1.8;
  const esferasDerY = -progress * 20;

  return (
    <section ref={sectionRef} id="precios" className="relative py-24 px-4 bg-bg-primary overflow-hidden">
      {/* Esferas izquierda — top-left, behind first 3 cards */}
      <div
        className="absolute -left-[10%] top-[5%] w-[60%] pointer-events-none"
        style={{
          transform: `scale(${esferasIzqScale}) translateY(${esferasIzqY}px)`,
          transformOrigin: "left top",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src="/images/esferasizquierda.png"
          alt=""
          className="w-full h-auto object-contain opacity-50"
        />
      </div>

      {/* Esferas derecha — center-right, smaller */}
      <div
        className="absolute -right-[5%] top-[38%] w-[50%] pointer-events-none"
        style={{
          transform: `scale(${esferasDerScale}) translateY(${esferasDerY}px)`,
          transformOrigin: "right center",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        <img
          src="/images/esferasderecha.png"
          alt=""
          className="w-full h-auto object-contain opacity-50"
        />
      </div>
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection animation="blur-scale">
          <p className="text-accent-primary font-semibold text-sm tracking-[0.2em] uppercase text-center mb-3">
            Planes
          </p>
          <h2 className="font-heading text-5xl text-center text-text-primary mb-4">
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
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-16">
          {PRICING.individual.map((plan, index) => (
            <AnimatedSection key={plan.period} delay={150 + index * 120} animation="scale">
              <PriceCard
                price={plan.price}
                period={plan.period}
                highlighted={plan.highlighted}
                badge={"badge" in plan ? plan.badge : undefined}
                description={"description" in plan ? plan.description : undefined}
                features={plan.features}
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
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-16">
          {PRICING.combo.plans.map((plan, index) => (
            <AnimatedSection key={plan.period} delay={250 + index * 120} animation="scale">
              <PriceCard price={plan.price} period={plan.period} features={plan.features} />
            </AnimatedSection>
          ))}
        </div>

        {/* Taekwondo */}
        <AnimatedSection delay={300} animation="blur-up">
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-8">
            TAEKWONDO
          </h3>
          <div className="max-w-[220px] mx-auto mb-16">
            <PriceCard
              price={PRICING.taekwondo.price}
              period={PRICING.taekwondo.period}
              description="Mensualidad"
              features={PRICING.taekwondo.features}
              variant="light"
            />
          </div>
        </AnimatedSection>

        {/* Payment Notice */}
        <AnimatedSection delay={400} animation="blur-up">
          <div className="rounded-2xl border border-accent-secondary/20 bg-accent-secondary/5 p-6 max-w-2xl mx-auto">
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
