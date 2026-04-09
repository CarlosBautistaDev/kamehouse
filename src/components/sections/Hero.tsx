import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,107,53,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(230,57,70,0.05)_0%,transparent_50%)]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <AnimatedSection>
          {/* Logo text */}
          <h1 className="font-heading text-7xl md:text-9xl tracking-wider text-white mb-2">
            KAME HOUSE
          </h1>
          <p className="font-heading text-3xl md:text-5xl tracking-[0.3em] text-accent-primary mb-6">
            TRAINING
          </p>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <p className="text-text-secondary text-lg md:text-xl mb-8 font-body">
            Entrenamiento Funcional &bull; Box &bull; Taekwondo
          </p>
        </AnimatedSection>

        <AnimatedSection delay={400}>
          <Badge variant="pulse" className="mb-8 text-base">
            🔥 INAUGURACIÓN
          </Badge>
        </AnimatedSection>

        <AnimatedSection delay={600}>
          <Button href="#horarios" size="lg">
            Ver Horarios ↓
          </Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
