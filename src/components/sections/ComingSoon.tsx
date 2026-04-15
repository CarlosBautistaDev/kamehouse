import Image from "next/image";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { FUNCTIONAL_INCLUDES } from "@/lib/constants";

const FUNCTIONAL_IMAGES = [
  { src: "/images/functional1.jpeg", alt: "Entrenamiento funcional — ejercicio 1", rotate: -8, translateX: 20, z: 1 },
  { src: "/images/functional3.jpeg", alt: "Entrenamiento funcional — ejercicio 2", rotate: 0, translateX: 0, z: 3 },
  { src: "/images/functional4.jpeg", alt: "Entrenamiento funcional — ejercicio 3", rotate: 8, translateX: -20, z: 1 },
];

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

        {/* Card fan — poker-style stacked images */}
        <AnimatedSection animation="scale">
          <div className="relative flex items-center justify-center h-[340px] md:h-[420px] mb-14">
            {FUNCTIONAL_IMAGES.map((img, index) => (
              <div
                key={img.src}
                className="absolute w-[200px] h-[280px] md:w-[260px] md:h-[360px] rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-105"
                style={{
                  transform: `rotate(${img.rotate}deg) translateX(${img.translateX}px)`,
                  zIndex: img.z,
                  boxShadow:
                    index === 1
                      ? "0 25px 60px rgba(0,0,0,0.4), 0 0 20px rgba(255,107,53,0.15)"
                      : "0 15px 40px rgba(0,0,0,0.3)",
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 200px, 260px"
                />
                {/* Subtle border glow */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/10" />
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Tags list */}
        <div className="flex flex-wrap justify-center gap-3">
          {FUNCTIONAL_INCLUDES.map((item, index) => (
            <AnimatedSection key={item.name} delay={index * 80} animation="scale">
              <div className="glass px-5 py-3 flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <span className="text-xl">{item.emoji}</span>
                <span className="text-text-primary font-semibold text-sm">{item.name}</span>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
