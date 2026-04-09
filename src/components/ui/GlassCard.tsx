interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "light" | "dark";
}

export function GlassCard({
  children,
  className = "",
  hover = true,
  variant = "light",
}: GlassCardProps) {
  const base = variant === "dark" ? "glass-dark" : "glass";
  return (
    <div
      className={`${base} transition-all duration-300 ${
        hover ? "hover:scale-[1.01] hover:-translate-y-1" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
