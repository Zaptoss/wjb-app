import type { ReactNode } from 'react';
import QuizHeader from './QuizHeader';

interface QuizLayoutProps {
  progress: number;
  canGoBack: boolean;
  onBack: () => void;
  children: ReactNode;
}

export default function QuizLayout({
  progress,
  canGoBack,
  onBack,
  children,
}: QuizLayoutProps) {
  return (
    <div className="flex justify-center w-full min-h-screen min-h-[100dvh]">
      <div className="w-full max-w-[480px] h-screen h-[100dvh] relative flex flex-col bg-gradient-to-br from-[var(--bg-top)] to-[var(--bg-bottom)] shadow-[0_0_50px_rgba(0,0,0,0.05)]">
        <QuizHeader
          progress={progress}
          canGoBack={canGoBack}
          onBack={onBack}
        />

        <main className="flex-1 overflow-y-auto px-6 pb-8 hide-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
