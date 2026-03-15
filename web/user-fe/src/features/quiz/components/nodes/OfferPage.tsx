import type { OfferData } from '../../types';

interface OfferPageProps {
  offer: OfferData;
}

export default function OfferPage({ offer }: OfferPageProps) {
  return (
    <>
      <div>
        {/* Hero image */}
        {offer.imageUrl && (
          <div className="flex items-center justify-center mb-6">
            <div className="w-full rounded-3xl overflow-hidden shadow-[var(--shadow-ambient)]">
              <img
                src={offer.imageUrl}
                alt={offer.name}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Title */}
        <div className="mb-6 text-center">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight mb-3 text-[var(--text-main)]">
            {offer.name}
          </h1>
          {offer.reason && (
            <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5 mb-4">
              {offer.reason}
            </p>
          )}
          <p className="text-base font-medium text-[var(--text-main)] leading-relaxed px-2.5">
            {offer.description}
          </p>
        </div>

        {/* Digital plan */}
        <div className="mb-4 rounded-[var(--radius-card)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-ambient)]">
          <div className="absolute inset-0 rounded-[var(--radius-card)] bg-gradient-to-b from-white/80 to-transparent opacity-50 pointer-events-none" />
          <h3 className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
            Your Digital Plan
          </h3>
          <p className="text-[15px] font-semibold text-[var(--text-main)]">
            {offer.digitalPlan}
          </p>
        </div>

        {/* Physical wellness kit */}
        <div className="mb-6 rounded-[var(--radius-card)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-ambient)]">
          <h3 className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
            {offer.kit.name}
          </h3>
          <p className="text-[13px] font-medium text-[var(--text-sub)] mb-3">
            {offer.kit.description}
          </p>
          {offer.kit.items.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {offer.kit.items.map((item) => (
                <span
                  key={item}
                  className="inline-block px-3 py-1.5 rounded-full bg-[var(--accent-bg)] text-[13px] font-semibold text-[var(--text-main)]"
                >
                  {item}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      {offer.ctaUrl && (
        <a
          href={offer.ctaUrl}
          className="block w-full py-5 rounded-full font-bold text-lg tracking-wide text-center bg-[var(--text-main)] text-[var(--card-bg)] shadow-[0_8px_20px_rgba(94,76,70,0.2)] active:scale-[0.97] active:translate-y-0.5 transition-all duration-200"
        >
          {offer.ctaLabel ?? 'Get Started'}
        </a>
      )}
    </>
  );
}
