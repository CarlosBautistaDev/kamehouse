import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { SERVICES } from "@/lib/constants";

const SERVICE_IMAGES: Record<string, string> = {
  box: "/images/box.jpg",
  funcional: "/images/functional.jpg",
  taekwondo: "/images/taekwondo.jpg",
};

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 px-4 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <p className="text-accent-primary font-semibold text-sm tracking-[0.2em] uppercase text-center mb-3">
            Disciplinas
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-center text-text-primary mb-4">
            NUESTROS SERVICIOS
          </h2>
          <p className="text-text-secondary text-center text-lg mb-16 max-w-xl mx-auto">
            Elige tu disciplina y entrena con los mejores profesores
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {SERVICES.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 150}>
              <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                {/* Image */}
                <Image
                  src={SERVICE_IMAGES[service.id]}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Placeholder fallback */}
                <div className="absolute inset-0 img-placeholder -z-10">
                  <span className="text-lg">{service.emoji} {service.title}</span>
                </div>

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <span className="text-4xl mb-3 block">{service.emoji}</span>
                  <h3 className="font-heading text-3xl md:text-4xl text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
