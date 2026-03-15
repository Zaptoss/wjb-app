import { useEffect, useRef, useState } from 'react';
import type { ComponentType, SVGProps } from 'react';

type StepIcon = ComponentType<SVGProps<SVGSVGElement>>;

function TargetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <circle cx="12" cy="12" r="7" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" strokeWidth="1.8" />
      <path d="M15.5 8.5 19 5m0 0v3.6M19 5h-3.6" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SlidersIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M5 6h14M5 12h14M5 18h14" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="9" cy="6" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12" r="2.2" fill="currentColor" stroke="none" />
      <circle cx="11" cy="18" r="2.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

function DumbbellIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="M3 10v4M6 9v6M18 9v6M21 10v4M8 12h8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 12h2M16 12h2" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path
        d="M18.5 5.5c-4.4 0-8.2 2-10.3 5.4-1.4 2.3-1.8 4.8-1.7 7.6 2.8.1 5.3-.3 7.6-1.7 3.4-2.1 5.4-5.9 5.4-10.3Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8.5 15.5c2.2-2.2 4.7-3.9 8-5.5" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function PackageIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M12 12 4 7.5M12 12l8-4.5M12 12v9" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="m18.5 14.5.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2ZM5.5 14l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6.6-1.6Z" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const ANALYSIS_STEPS: Array<{ Icon: StepIcon; text: string }> = [
  { Icon: TargetIcon, text: 'Analyzing your goals...' },
  { Icon: SlidersIcon, text: 'Matching fitness profile...' },
  { Icon: DumbbellIcon, text: 'Selecting optimal exercises...' },
  { Icon: LeafIcon, text: 'Calibrating recovery plan...' },
  { Icon: PackageIcon, text: 'Preparing your wellness kit...' },
  { Icon: SparkIcon, text: 'Finalizing your personal plan...' },
];

const TOTAL_DURATION = 3500;
const STEP_INTERVAL = TOTAL_DURATION / ANALYSIS_STEPS.length;

interface AnalyzingScreenProps {
  onComplete: () => void;
}

export default function AnalyzingScreen({ onComplete }: AnalyzingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const CurrentIcon = ANALYSIS_STEPS[currentStep]?.Icon ?? SparkIcon;
  const progressPercent = Math.round(progress * 100);

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

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(elapsed / TOTAL_DURATION, 1);
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
      <div className="relative flex h-screen h-[100dvh] w-full max-w-[480px] flex-col items-center justify-center bg-gradient-to-br from-[var(--bg-top)] to-[var(--bg-bottom)] px-8">
        <div className="relative mb-12">
          <div
            className="absolute inset-0 rounded-full bg-[var(--accent)]"
            style={{
              width: 200,
              height: 200,
              left: -28,
              top: -28,
              opacity: 0.1,
              animation: 'analyzing-ring 2.6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute inset-0 rounded-full border border-white/40"
            style={{
              width: 252,
              height: 252,
              left: -54,
              top: -54,
              animation: 'analyzing-ring 3.2s ease-in-out 0.4s infinite',
            }}
          />

          <div
            className="relative flex h-36 w-36 items-center justify-center rounded-full"
            style={{
              background:
                'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.92) 0%, rgba(255,248,243,0.96) 42%, rgba(237,155,155,0.34) 100%)',
              boxShadow:
                '0 24px 70px rgba(94, 76, 70, 0.12), inset 0 1px 0 rgba(255,255,255,0.7)',
              animation: 'analyzing-pulse 2.2s ease-in-out infinite',
            }}
          >
            <div className="absolute inset-[14px] rounded-full border border-white/60" />
            <CurrentIcon
              key={currentStep}
              className="relative h-16 w-16 text-[var(--text-main)]"
              style={{ animation: 'analyzing-icon-fade 0.28s ease-out' }}
            />
          </div>
        </div>

        <h2 className="mb-2 text-center text-xl font-bold text-[var(--text-main)]">
          Building Your Plan
        </h2>
        <p className="mb-8 text-center text-sm font-medium text-[var(--text-sub)]">
          Hang tight, we&apos;re personalizing everything for you
        </p>

        <div className="mb-6 w-full max-w-[280px]">
          <div className="h-2 rounded-full bg-[var(--pill-bg)] overflow-hidden">
            <div
              className="h-full w-full origin-left rounded-full will-change-transform"
              style={{
                transform: `scaleX(${progress})`,
                background: 'linear-gradient(90deg, var(--accent) 0%, #f2c7b8 50%, var(--accent) 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s linear infinite',
              }}
            />
          </div>
          <p className="mt-2 text-center text-xs font-semibold text-[var(--text-sub)]">
            {progressPercent}%
          </p>
        </div>

        <div className="w-full max-w-[300px] space-y-2">
          {ANALYSIS_STEPS.map((step, index) => {
            const isDone = index < currentStep;
            const isActive = index === currentStep;

            return (
              <div
                key={step.text}
                className="flex items-center gap-3 transition-all duration-300"
                style={{
                  opacity: index <= currentStep ? 1 : 0.32,
                  transform: isActive ? 'translateX(4px)' : 'translateX(0)',
                }}
              >
                <div className="flex h-5 w-5 shrink-0 items-center justify-center">
                  {isDone ? (
                    <svg
                      viewBox="0 0 24 24"
                      className="h-4 w-4 text-[var(--accent)]"
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
                      className="h-3 w-3 rounded-full bg-[var(--accent)]"
                      style={{ animation: 'analyzing-dot 1.2s ease-in-out infinite' }}
                    />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-[var(--pill-bg)]" />
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
