import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NAV_SECTIONS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-bg-dark py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-10">
            <h2 className="font-heading text-4xl text-white mb-1">
              KAME HOUSE
            </h2>
            <p className="font-heading text-xl text-accent-primary tracking-[0.2em]">
              TRAINING
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-6 mb-10">
            {NAV_SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-white/50 hover:text-accent-primary transition-colors text-sm"
              >
                {section.label}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-white/30 text-sm text-center">
              Kame House Training &copy; {new Date().getFullYear()} — Todos los derechos reservados
            </p>
          </div>
        </AnimatedSection>
      </div>
    </footer>
  );
}
