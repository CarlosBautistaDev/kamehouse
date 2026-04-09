interface PriceCardProps {
  price: string;
  period: string;
  description?: string;
  highlighted?: boolean;
  badge?: string;
}

export function PriceCard({
  price,
  period,
  description,
  highlighted = false,
  badge,
}: PriceCardProps) {
  return (
    <div
      className={`glass relative p-6 text-center transition-all duration-300 hover:scale-[1.02] ${
        highlighted
          ? "border-accent-primary/50 animate-pulse-glow"
          : ""
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-primary text-white text-xs font-bold px-3 py-1 rounded-full">
          {badge}
        </span>
      )}
      <p className="font-heading text-5xl text-white mb-1">{price}</p>
      <p className="text-text-secondary text-lg">/{period}</p>
      {description && (
        <p className="text-text-tertiary text-sm mt-2">{description}</p>
      )}
    </div>
  );
}
