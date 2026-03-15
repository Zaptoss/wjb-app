import { useMemo, useState } from 'react';
import type { OfferData } from '../../types';
import QuizButton from '../ui/QuizButton';
import NodeImage from '../ui/NodeImage';
import ZenIllustration from '../ui/ZenIllustration';

interface OfferEmailPageProps {
  offer: OfferData;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function OfferEmailPage({ offer }: OfferEmailPageProps) {
  const [email, setEmail] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const contentLength = offer.name.length + offer.description.length;

  const normalizedEmail = email.trim();
  const isValidEmail = useMemo(
    () => EMAIL_PATTERN.test(normalizedEmail),
    [normalizedEmail],
  );

  const handleSubmit = () => {
    setTouched(true);
    if (!isValidEmail) return;
    setSubmittedEmail(normalizedEmail);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="pb-2">
      <div className="mb-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--accent)] mb-3">
          Email Step
        </p>
        <h1 className="text-[28px] font-bold leading-tight tracking-tight mb-3 text-[var(--text-main)]">
          Send {offer.name} to your inbox
        </h1>
        {offer.imageUrl ? (
          <NodeImage
            src={offer.imageUrl}
            alt={offer.name}
            contentLength={contentLength}
          />
        ) : (
          <ZenIllustration />
        )}
        <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5">
          Enter your email and we will deliver the details for this selected offer.
        </p>
      </div>

      <div className="mb-4 rounded-[var(--radius-card)] bg-[var(--card-bg)] p-5 shadow-[var(--shadow-ambient)]">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[var(--accent)] mb-2">
          Selected Offer
        </p>
        <p className="text-lg font-bold text-[var(--text-main)] mb-2">
          {offer.name}
        </p>
        <p className="text-sm font-medium text-[var(--text-sub)] leading-relaxed">
          {offer.description}
        </p>
      </div>

      <div className="px-2 mb-4">
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onBlur={() => setTouched(true)}
          onKeyDown={handleKeyDown}
          placeholder="Enter your email"
          className="w-full rounded-[var(--radius-card)] bg-[var(--card-bg)] border-2 border-transparent px-6 py-5 text-lg font-semibold text-[var(--text-main)] placeholder:text-[var(--text-sub)] placeholder:font-medium shadow-[var(--shadow-ambient)] outline-none focus:border-[var(--accent)] transition-colors duration-200"
          autoFocus
          inputMode="email"
          autoComplete="email"
        />
      </div>

      {touched && !isValidEmail && (
        <p className="mb-4 px-2 text-sm font-semibold text-[#c26060]">
          Please enter a valid email address.
        </p>
      )}

      {submittedEmail && (
        <div className="mb-4 rounded-[var(--radius-card)] bg-white/80 p-4 shadow-[var(--shadow-contact)]">
          <p className="text-base font-bold text-[var(--text-main)] mb-1">
            We are ready to send it
          </p>
          <p className="text-sm font-medium text-[var(--text-sub)]">
            Your selected offer will go to {submittedEmail}.
          </p>
        </div>
      )}

      <QuizButton onClick={handleSubmit} disabled={!normalizedEmail}>
        {submittedEmail ? 'Update Email' : 'Send My Offer'}
      </QuizButton>
    </div>
  );
}
