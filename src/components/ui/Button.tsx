interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "ghost" | "white";
  size?: "sm" | "md" | "lg";
  href?: string;
  onClick?: () => void;
  className?: string;
}

const sizeClasses = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-base",
  lg: "px-9 py-4.5 text-lg",
};

const variantClasses = {
  primary:
    "bg-accent-primary text-white shadow-lg shadow-accent-primary/25 hover:shadow-xl hover:shadow-accent-primary/30 hover:brightness-110 active:scale-[0.97]",
  outline:
    "border-2 border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-black/5",
  white:
    "bg-white text-text-primary shadow-lg hover:shadow-xl active:scale-[0.97]",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  className = "",
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-300 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
