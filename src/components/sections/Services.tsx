import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { ServiceCarousel } from "@/components/ui/ServiceCarousel";
import { SERVICES } from "@/lib/constants";

const SERVICE_IMAGES: Record<string, string> = {
  box: "/images/box1.jpeg",
  funcional: "/images/functional2.jpeg",
  taekwondo: "/images/tae1.jpeg",
};

const servicesWithImages = SERVICES.map((service) => ({
  ...service,
  image: SERVICE_IMAGES[service.id],
}));

export function Services() {
  return (
    <section id="servicios" className="py-24 md:py-32 bg-bg-primary overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <AnimatedSection animation="blur-scale">
          <p className="text-accent-primary font-semibold text-sm tracking-[0.2em] uppercase text-center mb-3">
            Disciplinas
          </p>
          <h2 className="font-heading text-5xl md:text-7xl text-center text-text-primary mb-4">
            NUESTROS SERVICIOS
          </h2>
          <p className="text-text-secondary text-center text-lg mb-12 md:mb-16 max-w-xl mx-auto">
            Elige tu disciplina y entrena con los mejores profesores
          </p>
        </AnimatedSection>
      </div>

      {/* Mobile: Swipeable carousel */}
      <div className="md:hidden">
        <ServiceCarousel services={servicesWithImages} />
      </div>

      {/* Desktop: Grid */}
      <div className="hidden md:block max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-3 gap-8">
          {servicesWithImages.map((service, index) => (
            <AnimatedSection key={service.id} delay={index * 150} animation="scale">
              <div className="group relative overflow-hidden rounded-2xl aspect-[3/4] cursor-pointer">
                {/* Image */}
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Content */}
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="text-4xl mb-3 block">{service.emoji}</span>
                  <h3 className="font-heading text-4xl text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-white/70 text-base leading-relaxed">
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
