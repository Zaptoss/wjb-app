import ProgressBar from './ProgressBar';

interface QuizHeaderProps {
  progress: number;
  canGoBack: boolean;
  onBack: () => void;
}

export default function QuizHeader({
  progress,
  canGoBack,
  onBack,
}: QuizHeaderProps) {
  return (
    <header className="flex items-center justify-between px-6 pt-6 pb-3 z-10">
      {canGoBack ? (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--pill-bg)] transition-transform duration-200 active:scale-[0.92] active:bg-[#e0ccbf]"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      ) : (
        <div className="w-10 h-10" />
      )}

      <ProgressBar progress={progress} />

      {/* Empty spacer to balance header */}
      <div className="w-10 h-10" />
    </header>
  );
}
