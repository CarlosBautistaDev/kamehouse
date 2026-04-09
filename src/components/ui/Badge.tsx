interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "danger" | "pulse";
  className?: string;
}

const variantClasses = {
  default: "bg-white/10 text-white",
  accent: "bg-accent-primary text-white",
  danger: "bg-accent-secondary text-white",
  pulse: "bg-accent-primary/20 text-accent-primary animate-pulse-glow",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
