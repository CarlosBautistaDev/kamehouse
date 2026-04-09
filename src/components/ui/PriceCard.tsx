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
      className={`relative p-8 text-center rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        highlighted
          ? "bg-accent-primary text-white shadow-xl shadow-accent-primary/20 scale-[1.02]"
          : "glass"
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-4 py-1 rounded-full ${
            highlighted
              ? "bg-white text-accent-primary"
              : "bg-accent-primary text-white"
          }`}
        >
          {badge}
        </span>
      )}
      <p
        className={`font-heading text-5xl mb-1 ${
          highlighted ? "text-white" : "text-text-primary"
        }`}
      >
        {price}
      </p>
      <p
        className={`text-lg ${
          highlighted ? "text-white/80" : "text-text-secondary"
        }`}
      >
        /{period}
      </p>
      {description && (
        <p
          className={`text-sm mt-2 ${
            highlighted ? "text-white/60" : "text-text-tertiary"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
