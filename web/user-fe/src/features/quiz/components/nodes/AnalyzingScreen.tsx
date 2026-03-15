import { useEffect, useState, useRef } from 'react';

const ANALYSIS_STEPS = [
  { emoji: '📊', text: 'Analyzing your goals...' },
  { emoji: '🧬', text: 'Matching fitness profile...' },
  { emoji: '🏋️', text: 'Selecting optimal exercises...' },
  { emoji: '🧘', text: 'Calibrating recovery plan...' },
  { emoji: '📦', text: 'Preparing your wellness kit...' },
  { emoji: '✨', text: 'Finalizing your personal plan...' },
];

const TOTAL_DURATION = 3500; // ms
const STEP_INTERVAL = TOTAL_DURATION / ANALYSIS_STEPS.length;

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export default function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);

  // Step through analysis items
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= ANALYSIS_STEPS.length - 1) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, STEP_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  // Smooth progress bar
  useEffect(() => {
    const start = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / TOTAL_DURATION, 1);
      // Ease-out curve for more satisfying feel
      const eased = 1 - Math.pow(1 - pct, 2.5);
      setProgress(eased);

      if (pct < 1) {
        raf = requestAnimationFrame(tick);
      } else if (!completedRef.current) {
        completedRef.current = true;
        setTimeout(onComplete, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div className="flex justify-center w-full min-h-screen min-h-[100dvh]">
      <div className="w-full max-w-[480px] h-screen h-[100dvh] relative flex flex-col items-center justify-center bg-gradient-to-br from-[var(--bg-top)] to-[var(--bg-bottom)] px-8">

        {/* Pulsing orb */}
        <div className="relative mb-10">
          {/* Outer glow rings */}
          <div
            className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-10"
            style={{
              width: 140,
              height: 140,
              left: -22,
              top: -22,
              animation: 'analyzing-ring 2s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-5"
            style={{
              width: 180,
              height: 180,
              left: -42,
              top: -42,
              animation: 'analyzing-ring 2s ease-in-out 0.3s infinite',
            }}
          />

          {/* Core orb */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #f2c7b8 100%)',
              boxShadow: '0 8px 32px rgba(237, 155, 155, 0.35)',
              animation: 'analyzing-pulse 1.5s ease-in-out infinite',
            }}
          >
            <span
              className="text-4xl"
              style={{
                animation: 'analyzing-emoji-swap 0.3s ease-out',
              }}
              key={currentStep}
            >
              {ANALYSIS_STEPS[currentStep]?.emoji}
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-[var(--text-main)] mb-2 text-center">
          Building Your Plan
        </h2>
        <p className="text-sm font-medium text-[var(--text-sub)] mb-8 text-center">
          Hang tight, we&apos;re personalizing everything for you
        </p>

        {/* Progress bar */}
        <div className="w-full max-w-[280px] mb-6">
          <div className="h-2 rounded-full bg-[var(--pill-bg)] overflow-hidden">
            <div
              className="h-full rounded-full transition-[width] duration-200 ease-out"
              style={{
                width: `${progress * 100}%`,
                background: 'linear-gradient(90deg, var(--accent) 0%, #f2c7b8 50%, var(--accent) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s linear infinite',
              }}
            />
          </div>
          <p className="text-xs font-semibold text-[var(--text-sub)] mt-2 text-center">
            {Math.round(progress * 100)}%
          </p>
        </div>

        {/* Analysis steps log */}
        <div className="w-full max-w-[300px] space-y-2">
          {ANALYSIS_STEPS.map((step, i) => {
            const isDone = i < currentStep;
            const isActive = i === currentStep;

            return (
              <div
                key={i}
                className="flex items-center gap-3 transition-all duration-300"
                style={{
                  opacity: i <= currentStep ? 1 : 0.3,
                  transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                {/* Status indicator */}
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {isDone ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ animation: 'check-circle-fill 0.3s ease-out forwards' }}
                    >
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  ) : isActive ? (
                    <div
                      className="w-3 h-3 rounded-full bg-[var(--accent)]"
                      style={{ animation: 'analyzing-dot 1s ease-in-out infinite' }}
                    />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-[var(--pill-bg)]" />
                  )}
                </div>

                <span
                  className={`text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-[var(--text-main)]'
                      : isDone
                        ? 'text-[var(--text-sub)]'
                        : 'text-[var(--pill-bg)]'
                  }`}
                >
                  {step.text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
