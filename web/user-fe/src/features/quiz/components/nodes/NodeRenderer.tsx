import { useCallback } from 'react';
import type { AnswerValue } from '../../types';
import SingleChoiceNode from './SingleChoiceNode';
import MultiChoiceNode from './MultiChoiceNode';
import InputNode from './InputNode';
import InfoPageNode from './InfoPageNode';
import OfferPage from './OfferPage';
import QuizLayout from '../layout/QuizLayout';
import { useQuizStore } from '../../store/quizStore';
import { useSubmitAnswer } from '../../api/useQuizMutations';

export default function NodeRenderer() {
  const {
    currentNode,
    isOffer,
    offer,
    progress,
    currentIndex,
    history,
    direction,
    isSubmitting,
    error,
    goBack,
    getCurrentAnswer,
    isAtEdge,
    truncateFromCurrent,
    sessionId,
  } = useQuizStore();

  const submitAnswerMutation = useSubmitAnswer();

  const canGoBack = currentIndex > 0 || isOffer;
  const previousAnswer = getCurrentAnswer();

  const handleSubmit = useCallback(
    (answer: AnswerValue) => {
      if (!currentNode || !sessionId) return;

      // If not at edge and answer unchanged, navigate forward without API call
      if (!isAtEdge()) {
        const currentEntry = history[currentIndex];
        if (currentEntry) {
          const prevAnswer = currentEntry.answer;
          if (prevAnswer && JSON.stringify(prevAnswer) === JSON.stringify(answer)) {
            const store = useQuizStore.getState();
            const nextIndex = currentIndex + 1;
            const nextEntry = store.history[nextIndex];
            if (nextEntry) {
              useQuizStore.setState({
                currentIndex: nextIndex,
                currentNode: nextEntry.node,
                direction: 'forward',
              });
              return;
            }
          }
        }
        truncateFromCurrent();
      }

      // Update current entry's answer
      const historyClone = [...useQuizStore.getState().history];
      const cloneEntry = historyClone[currentIndex];
      if (currentIndex >= 0 && cloneEntry) {
        historyClone[currentIndex] = { ...cloneEntry, answer };
        useQuizStore.setState({ history: historyClone });
      }

      submitAnswerMutation.mutate({ nodeId: currentNode.id, answer });
    },
    [currentNode, sessionId, isAtEdge, history, currentIndex, truncateFromCurrent, submitAnswerMutation],
  );

  const handleInfoContinue = useCallback(() => {
    if (!currentNode || !sessionId) return;

    if (!isAtEdge()) {
      const store = useQuizStore.getState();
      const nextIndex = currentIndex + 1;
      const nextEntry = store.history[nextIndex];
      if (nextEntry) {
        useQuizStore.setState({
          currentIndex: nextIndex,
          currentNode: nextEntry.node,
          direction: 'forward',
        });
        return;
      }
    }

    submitAnswerMutation.mutate({
      nodeId: currentNode.id,
      answer: { type: 'single_choice', optionId: '__info_continue__' },
    });
  }, [currentNode, sessionId, isAtEdge, currentIndex, submitAnswerMutation]);

  const animClass =
    direction === 'forward'
      ? 'animate-[slide-in-right_0.3s_ease-out]'
      : 'animate-[slide-in-left_0.3s_ease-out]';

  // Offer page
  if (isOffer && offer) {
    return (
      <QuizLayout progress={1} canGoBack={canGoBack} onBack={goBack}>
        <div key="offer" className={animClass}>
          <OfferPage offer={offer} />
        </div>
      </QuizLayout>
    );
  }

  if (!currentNode) return null;

  const renderNodeContent = () => {
    if (currentNode.type === 'info_page') {
      return (
        <InfoPageNode
          node={currentNode}
          onContinue={handleInfoContinue}
          isSubmitting={isSubmitting}
        />
      );
    }

    // Question nodes
    switch (currentNode.questionType) {
      case 'multi_choice':
        return (
          <MultiChoiceNode
            node={currentNode}
            previousAnswer={previousAnswer}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 'input':
        return (
          <InputNode
            node={currentNode}
            previousAnswer={previousAnswer}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 'single_choice':
      default:
        return (
          <SingleChoiceNode
            node={currentNode}
            previousAnswer={previousAnswer}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
    }
  };

  return (
    <QuizLayout progress={progress} canGoBack={canGoBack} onBack={goBack}>
      <div key={`${currentNode.id}-${currentIndex}`} className={animClass}>
        {error && (
          <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-600 text-sm font-medium text-center">
            {error}
          </div>
        )}
        {renderNodeContent()}
      </div>
    </QuizLayout>
  );
}
