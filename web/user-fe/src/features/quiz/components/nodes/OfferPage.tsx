import type { OfferData } from '../../types';
import QuizButton from '../ui/QuizButton';

interface OfferPageProps {
  offers: OfferData[];
  onSelectOffer: (offer: OfferData) => void;
}

function OfferCard({
  offer,
  onSelect,
}: {
  offer: OfferData;
  onSelect: () => void;
}) {
  return (
    <article className="rounded-[32px] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-ambient)]">
      {offer.imageUrl && (
        <div className="flex items-center justify-center mb-6">
          <div className="w-full rounded-3xl overflow-hidden shadow-[var(--shadow-contact)]">
            <img
              src={offer.imageUrl}
              alt={offer.name}
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>
      )}

      <div className="mb-6 text-center">
        <h2 className="text-[28px] font-bold leading-tight tracking-tight mb-3 text-[var(--text-main)]">
          {offer.name}
        </h2>
        {offer.reason && (
          <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5 mb-4">
            {offer.reason}
          </p>
        )}
        <p className="text-base font-medium text-[var(--text-main)] leading-relaxed px-2.5">
          {offer.description}
        </p>
      </div>

      <div className="mb-4 rounded-[var(--radius-card)] bg-white/70 p-5 shadow-[var(--shadow-contact)]">
        <h3 className="text-sm font-bold text-[var(--accent)] uppercase tracking-wider mb-2">
          Your Digital Plan
        </h3>
        <p className="text-[15px] font-semibold text-[var(--text-main)]">
          {offer.digitalPlan}
        </p>
      </div>

      <div className="mb-6 rounded-[var(--radius-card)] bg-white/70 p-5 shadow-[var(--shadow-contact)]">
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

      <QuizButton onClick={onSelect}>
        {offer.ctaLabel ?? 'Continue With This Offer'}
      </QuizButton>
    </article>
  );
}

export default function OfferPage({ offers, onSelectOffer }: OfferPageProps) {
  return (
    <div className="pb-2">
      <div className="mb-6 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--accent)] mb-3">
          Your Results
        </p>
        <h1 className="text-[30px] font-bold leading-tight tracking-tight text-[var(--text-main)] mb-3">
          Choose the offer that fits you best
        </h1>
        <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5">
          We can show more than one match. Each option below has its own next step.
        </p>
      </div>

      <div className="space-y-6">
        {offers.map((offer) => (
          <OfferCard
            key={offer.id}
            offer={offer}
            onSelect={() => onSelectOffer(offer)}
          />
        ))}
      </div>
    </div>
  );
}
