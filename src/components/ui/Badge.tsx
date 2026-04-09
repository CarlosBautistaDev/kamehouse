interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "danger" | "pulse" | "outline";
  className?: string;
}

const variantClasses = {
  default: "bg-black/5 text-text-primary",
  accent: "bg-accent-primary text-white",
  danger: "bg-accent-secondary text-white",
  pulse: "bg-accent-primary/10 text-accent-primary animate-pulse-glow",
  outline: "border border-accent-primary/30 text-accent-primary bg-accent-primary/5",
};

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-semibold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
