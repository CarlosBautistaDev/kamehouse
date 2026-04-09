import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { COMING_SOON } from "@/lib/constants";

export function ComingSoon() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Subtle different gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,107,53,0.06)_0%,transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-heading text-5xl md:text-6xl text-white mb-4">
            ¿QUÉ VIENE NUEVO? 🔥
          </h2>
          <p className="text-text-secondary text-lg mb-12">
            Próximamente en Kame House Training
          </p>
        </AnimatedSection>

        <div className="flex flex-wrap justify-center gap-4">
          {COMING_SOON.map((item, index) => (
            <AnimatedSection key={item.name} delay={index * 100}>
              <div className="glass px-6 py-4 flex items-center gap-3 hover:border-accent-primary/30 transition-all duration-300 hover:scale-105">
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white font-semibold">{item.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
