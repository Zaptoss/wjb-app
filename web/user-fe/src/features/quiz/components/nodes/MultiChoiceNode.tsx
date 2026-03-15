import { useState, useEffect, useCallback } from 'react';
import type { AnswerValue, SessionNode } from '../../types';
import CheckboxCard from '../ui/CheckboxCard';
import QuizButton from '../ui/QuizButton';
import NodeImage from '../ui/NodeImage';
import ZenIllustration from '../ui/ZenIllustration';

interface MultiChoiceNodeProps {
  node: SessionNode;
  previousAnswer: AnswerValue | null;
  onSubmit: (answer: AnswerValue) => void;
  isSubmitting: boolean;
}

export default function MultiChoiceNode({
  node,
  previousAnswer,
  onSubmit,
  isSubmitting,
}: MultiChoiceNodeProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (previousAnswer?.type === 'multi_choice') {
      setSelectedIds(new Set(previousAnswer.optionIds));
    } else {
      setSelectedIds(new Set());
    }
  }, [node.id, previousAnswer]);

  const toggleOption = useCallback((optionId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(optionId)) {
        next.delete(optionId);
      } else {
        next.add(optionId);
      }
      return next;
    });
  }, []);

  const handleContinue = () => {
    if (selectedIds.size === 0 || isSubmitting) return;
    onSubmit({ type: 'multi_choice', optionIds: Array.from(selectedIds) });
  };

  return (
    <div>
      {node.imageUrl ? (
        <NodeImage src={node.imageUrl} />
      ) : (
        <ZenIllustration />
      )}

      <div className="mb-8 text-center">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight mb-3 text-[var(--text-main)]">
          {node.title}
        </h1>
        {node.description && (
          <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5">
            {node.description}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-4 mb-8">
        {node.options?.map((option) => (
          <CheckboxCard
            key={option.id}
            label={option.label}
            description={option.description}
            imageUrl={option.imageUrl}
            selected={selectedIds.has(option.id)}
            onClick={() => toggleOption(option.id)}
          />
        ))}
      </div>

      <QuizButton
        onClick={handleContinue}
        disabled={selectedIds.size === 0}
        loading={isSubmitting}
      >
        Continue
      </QuizButton>
    </div>
  );
}
