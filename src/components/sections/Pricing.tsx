import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { PriceCard } from "@/components/ui/PriceCard";
import { PRICING, PAYMENT_NOTICE } from "@/lib/constants";

export function Pricing() {
  return (
    <section id="precios" className="py-20 px-4 bg-bg-secondary">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-5xl md:text-6xl text-center text-white mb-4">
            PRECIOS
          </h2>
          <p className="text-text-secondary text-center text-lg mb-12">
            Planes accesibles para todos
          </p>
        </AnimatedSection>

        {/* Individual */}
        <AnimatedSection delay={100}>
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-6">
            ACTIVIDAD INDIVIDUAL
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {PRICING.individual.map((plan, index) => (
            <AnimatedSection key={plan.period} delay={150 + index * 100}>
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
        <AnimatedSection delay={200}>
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-6">
            COMBO — {PRICING.combo.title}
          </h3>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
          {PRICING.combo.plans.map((plan, index) => (
            <AnimatedSection key={plan.period} delay={250 + index * 100}>
              <PriceCard price={plan.price} period={plan.period} />
            </AnimatedSection>
          ))}
        </div>

        {/* Taekwondo */}
        <AnimatedSection delay={300}>
          <h3 className="font-heading text-2xl text-text-secondary text-center mb-6">
            TAEKWONDO
          </h3>
          <div className="max-w-xs mx-auto mb-12">
            <PriceCard
              price={PRICING.taekwondo.price}
              period={PRICING.taekwondo.period}
              description="Mensualidad"
            />
          </div>
        </AnimatedSection>

        {/* Payment Notice */}
        <AnimatedSection delay={400}>
          <div className="glass border-accent-secondary/50 p-6 max-w-2xl mx-auto">
            <h4 className="font-heading text-xl text-accent-secondary mb-3">
              ⚠️ AVISO IMPORTANTE
            </h4>
            <ul className="space-y-2 mb-3">
              {PAYMENT_NOTICE.rules.map((rule) => (
                <li key={rule} className="text-text-secondary text-sm flex gap-2">
                  <span className="text-accent-secondary">•</span>
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
