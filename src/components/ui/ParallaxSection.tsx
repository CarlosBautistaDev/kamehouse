import { AnimatedSection } from "@/components/ui/AnimatedSection";

interface ParallaxSectionProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  height?: string;
  overlay?: "light" | "dark" | "gradient";
  className?: string;
}

export function ParallaxSection({
  imageSrc,
  imageAlt,
  children,
  height = "h-[50vh] md:h-[60vh]",
  overlay = "dark",
  className = "",
}: ParallaxSectionProps) {
  const overlayClasses = {
    light: "bg-white/40",
    dark: "bg-black/50",
    gradient:
      "bg-gradient-to-b from-black/60 via-black/30 to-black/60",
  };

  return (
    <section
      className={`parallax-section ${height} flex items-center justify-center ${className}`}
      style={{ backgroundImage: `url(${imageSrc})` }}
      role="img"
      aria-label={imageAlt}
    >
      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Content */}
      {children && (
        <div className="relative z-10 w-full px-4">
          <AnimatedSection>{children}</AnimatedSection>
        </div>
      )}

      {/* Placeholder when no image */}
      {!imageSrc && (
        <div className="absolute inset-0 img-placeholder-dark">
          <span>Imagen: {imageAlt}</span>
        </div>
      )}
    </section>
  );
}
