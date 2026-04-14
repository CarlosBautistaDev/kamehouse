interface PriceCardProps {
  price: string;
  period: string;
  description?: string;
  highlighted?: boolean;
  badge?: string;
  features?: readonly string[];
  variant?: "default" | "light";
}

export function PriceCard({
  price,
  period,
  description,
  highlighted = false,
  badge,
  features,
  variant = "default",
}: PriceCardProps) {
  const isLight = variant === "light";

  const cardClass = highlighted
    ? "relative py-8 px-5 text-center rounded-3xl transition-all duration-300 hover:-translate-y-1 bg-accent-primary text-white shadow-xl shadow-accent-primary/20 scale-[1.02]"
    : isLight
      ? "relative py-8 px-5 text-center rounded-3xl transition-all duration-300 hover:-translate-y-1 bg-white shadow-lg"
      : "relative py-8 px-5 text-center rounded-3xl transition-all duration-300 hover:-translate-y-1 bg-white/[0.08] backdrop-blur-xl border border-white/[0.12]";

  const priceColor = highlighted ? "text-white" : isLight ? "text-gray-900" : "text-text-primary";
  const periodColor = highlighted ? "text-white/80" : isLight ? "text-gray-500" : "text-text-secondary";
  const descColor = highlighted ? "text-white/60" : isLight ? "text-gray-400" : "text-text-tertiary";
  const checkColor = highlighted ? "text-white" : isLight ? "text-accent-primary" : "text-accent-primary";
  const featureColor = highlighted ? "text-white/80" : isLight ? "text-gray-600" : "text-text-secondary";

  return (
    <div className={cardClass}>
      {badge && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ${
          highlighted ? "bg-bg-primary text-accent-primary" : "bg-accent-primary text-white"
        }`}>
          {badge}
        </span>
      )}
      <p className={`font-heading text-4xl mb-1 ${priceColor}`}>{price}</p>
      <p className={`text-sm ${periodColor}`}>/{period}</p>
      {description && (
        <p className={`text-xs mt-1 ${descColor}`}>{description}</p>
      )}
      {features && features.length > 0 && (
        <ul className="mt-4 space-y-1.5 text-left">
          {features.map((feature) => (
            <li key={feature} className={`flex items-start gap-1.5 text-xs ${featureColor}`}>
              <svg className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${checkColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
