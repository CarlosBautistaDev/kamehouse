import { AnimatedSection } from "@/components/ui/AnimatedSection";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedSection>
          <h2 className="font-heading text-4xl text-white mb-2">
            KAME HOUSE
          </h2>
          <p className="font-heading text-xl text-accent-primary tracking-[0.2em] mb-6">
            TRAINING
          </p>
          <p className="text-text-tertiary text-sm">
            Kame House Training &copy; {new Date().getFullYear()}
          </p>
          <p className="text-text-tertiary text-xs mt-2">
            Hecho con 🔥
          </p>
        </AnimatedSection>
      </div>
    </footer>
  );
}
