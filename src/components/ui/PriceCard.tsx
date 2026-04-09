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
  if (highlighted) {
    return (
      <div className="relative p-8 text-center rounded-3xl transition-all duration-300 hover:-translate-y-1 bg-accent-primary text-white shadow-xl shadow-accent-primary/20 scale-[1.02]">
        {badge && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full bg-bg-primary text-accent-primary">
            {badge}
          </span>
        )}
        <p className="font-heading text-5xl mb-1 text-white">{price}</p>
        <p className="text-lg text-white/80">/{period}</p>
        {description && (
          <p className="text-sm mt-2 text-white/60">{description}</p>
        )}
      </div>
    );
  }

  return (
    <div className="liquid-glass transition-all duration-300 hover:-translate-y-1">
      <div className="lg-filter" />
      <div className="lg-overlay" />
      <div className="lg-specular" />
      <div className="lg-content p-8 text-center">
        {badge && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full bg-accent-primary text-white z-10">
            {badge}
          </span>
        )}
        <p className="font-heading text-5xl mb-1 text-text-primary">{price}</p>
        <p className="text-lg text-text-secondary">/{period}</p>
        {description && (
          <p className="text-sm mt-2 text-text-tertiary">{description}</p>
        )}
      </div>
    </div>
  );
}
