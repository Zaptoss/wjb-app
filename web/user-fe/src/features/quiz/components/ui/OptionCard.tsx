import { cn } from '@/shared/utils/cn';

interface OptionCardProps {
  label: string;
  description?: string;
  imageUrl?: string;
  icon?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  label,
  description,
  imageUrl,
  icon,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'relative flex items-center gap-4 w-full rounded-[var(--radius-card)] p-5 text-left transition-all duration-300 cursor-pointer',
        'bg-[var(--card-bg)] shadow-[var(--shadow-ambient)]',
        'border-2',
        'active:scale-[0.96] active:shadow-[var(--shadow-contact)]',
        selected
          ? 'border-[var(--accent)] shadow-[var(--shadow-card-active)]'
          : 'border-transparent',
      )}
    >
      {/* Glass overlay */}
      <div className="absolute inset-0 rounded-[var(--radius-card)] bg-gradient-to-b from-white/80 to-transparent opacity-50 pointer-events-none" />

      {/* Selected tint */}
      {selected && (
        <div className="absolute inset-0 bg-[var(--accent)] opacity-[0.04] pointer-events-none rounded-[var(--radius-card)]" />
      )}

      {/* Icon / Image */}
      {(icon || imageUrl) && (
        <div
          className={cn(
            'relative z-[1] w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0',
            'shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_2px_6px_rgba(0,0,0,0.02)]',
            selected
              ? 'bg-[var(--accent)] text-white'
              : 'bg-[var(--bg-top)] text-[var(--accent)]',
          )}
        >
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="w-6 h-6 object-contain"
              loading="lazy"
            />
          ) : (
            icon
          )}
        </div>
      )}

      {/* Text content */}
      <div className="relative z-[1] flex-1">
        <span className="block text-[17px] font-semibold text-[var(--text-main)] mb-0.5">
          {label}
        </span>
        {description && (
          <span className="block text-[13px] font-medium text-[var(--text-sub)]">
            {description}
          </span>
        )}
      </div>

      {/* Radio indicator */}
      <div
        className={cn(
          'relative z-[1] w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300',
          selected ? 'border-[var(--accent)] bg-[var(--accent)]' : 'border-[var(--pill-bg)]',
        )}
      >
        <div
          className={cn(
            'w-2.5 h-2.5 rounded-full bg-white transition-all duration-300',
            selected ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
          )}
          style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />
      </div>
    </button>
  );
}
