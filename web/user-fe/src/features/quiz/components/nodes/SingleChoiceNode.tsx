import { useState, useEffect } from 'react';
import type { AnswerValue, SessionNode } from '../../types';
import OptionCard from '../ui/OptionCard';
import NodeImage from '../ui/NodeImage';
import ZenIllustration from '../ui/ZenIllustration';

interface SingleChoiceNodeProps {
  node: SessionNode;
  previousAnswer: AnswerValue | null;
  onSubmit: (answer: AnswerValue) => void;
  isSubmitting: boolean;
}

export default function SingleChoiceNode({
  node,
  previousAnswer,
  onSubmit,
  isSubmitting,
}: SingleChoiceNodeProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Pre-fill from previous answer when revisiting
  useEffect(() => {
    if (previousAnswer?.type === 'single_choice') {
      setSelectedId(previousAnswer.optionId);
    } else {
      setSelectedId(null);
    }
  }, [node.id, previousAnswer]);

  const handleSelect = (optionId: string) => {
    if (isSubmitting) return;
    setSelectedId(optionId);
    // Auto-advance on single choice
    onSubmit({ type: 'single_choice', optionId });
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

      <div className="flex flex-col gap-4">
        {node.options?.map((option) => (
          <OptionCard
            key={option.id}
            label={option.label}
            description={option.description}
            imageUrl={option.imageUrl}
            selected={selectedId === option.id}
            onClick={() => handleSelect(option.id)}
          />
        ))}
      </div>
    </div>
  );
}
