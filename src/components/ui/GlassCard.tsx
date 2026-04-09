interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({
  children,
  className = "",
  hover = true,
}: GlassCardProps) {
  return (
    <div
      className={`glass transition-all duration-300 ${
        hover ? "hover:scale-[1.02] hover:border-accent-primary/30" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
