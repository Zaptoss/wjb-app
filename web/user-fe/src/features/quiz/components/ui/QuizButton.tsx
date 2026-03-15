import { cn } from '@/shared/utils/cn';

interface QuizButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export default function QuizButton({
  children,
  onClick,
  disabled = false,
  loading = false,
}: QuizButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'w-full py-5 rounded-full font-bold text-lg tracking-wide transition-all duration-200',
        'bg-[var(--text-main)] text-[var(--card-bg)]',
        'shadow-[0_8px_20px_rgba(94,76,70,0.2)]',
        'active:scale-[0.97] active:translate-y-0.5 active:shadow-[0_4px_10px_rgba(94,76,70,0.15)]',
        (disabled || loading) && 'opacity-50 pointer-events-none',
      )}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
              className="opacity-25"
            />
            <path
              d="M4 12a8 8 0 018-8"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              className="opacity-75"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
