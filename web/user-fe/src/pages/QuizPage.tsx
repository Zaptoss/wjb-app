import { useEffect } from 'react';
import { NodeRenderer, useQuizStore, useCreateSession } from '@/features/quiz';

export default function QuizPage() {
  const sessionId = useQuizStore((s) => s.sessionId);
  const currentNode = useQuizStore((s) => s.currentNode);
  const isOffer = useQuizStore((s) => s.isOffer);
  const createSession = useCreateSession();

  // Auto-create session on mount
  useEffect(() => {
    if (!sessionId) {
      createSession.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Loading state
  if (!sessionId || (!currentNode && !isOffer)) {
    return (
      <div className="flex justify-center w-full min-h-screen min-h-[100dvh]">
        <div className="w-full max-w-[480px] h-screen h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-br from-[var(--bg-top)] to-[var(--bg-bottom)]">
          {createSession.isError ? (
            <div className="px-8 text-center">
              <p className="text-lg font-semibold text-[var(--text-main)] mb-4">
                Could not start your session
              </p>
              <button
                onClick={() => createSession.mutate()}
                className="px-8 py-3 rounded-full font-bold text-base bg-[var(--text-main)] text-[var(--card-bg)] shadow-[0_8px_20px_rgba(94,76,70,0.2)] active:scale-[0.97] transition-transform"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 rounded-full border-3 border-[var(--accent)] border-t-transparent animate-spin" />
              <p className="text-base font-semibold text-[var(--text-sub)]">
                Preparing your journey...
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <NodeRenderer />;
}
