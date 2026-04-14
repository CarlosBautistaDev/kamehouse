import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FUNCTIONAL_INCLUDES } from "@/lib/constants";

export function ComingSoon() {
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

        <div className="flex flex-wrap justify-center gap-4">
          {FUNCTIONAL_INCLUDES.map((item, index) => (
            <AnimatedSection key={item.name} delay={index * 80} animation="scale">
              <div className="glass px-6 py-4 flex items-center gap-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-text-primary font-semibold">{item.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
