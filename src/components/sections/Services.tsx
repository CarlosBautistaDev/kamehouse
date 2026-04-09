import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { GlassCard } from "@/components/ui/GlassCard";
import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="servicios" className="py-20 px-4 bg-bg-secondary">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <h2 className="font-heading text-5xl md:text-6xl text-center text-white mb-4">
            NUESTROS SERVICIOS
          </h2>
          <p className="text-text-secondary text-center text-lg mb-12 max-w-2xl mx-auto">
            Elige tu disciplina y entrena con los mejores
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 150}>
              <GlassCard className="p-8 text-center h-full">
                <span className="text-5xl mb-4 block">{service.emoji}</span>
                <h3 className="font-heading text-3xl text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-text-secondary">{service.description}</p>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
