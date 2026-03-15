interface ProgressBarProps {
  progress: number; // 0 to 1
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  const pct = Math.min(Math.max(progress, 0), 1) * 100;

  return (
    <div className="flex-1 mx-6 h-1.5 rounded-full overflow-hidden bg-[var(--pill-bg)]">
      <div
        className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-600"
        style={{
          width: `${pct}%`,
          transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />
    </div>
  );
}
