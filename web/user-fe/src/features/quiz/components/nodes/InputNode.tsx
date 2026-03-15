import { useState, useEffect } from 'react';
import type { AnswerValue, SessionNode } from '../../types';
import QuizButton from '../ui/QuizButton';
import NodeImage from '../ui/NodeImage';

interface InputNodeProps {
  node: SessionNode;
  previousAnswer: AnswerValue | null;
  onSubmit: (answer: AnswerValue) => void;
  isSubmitting: boolean;
}

export default function InputNode({
  node,
  previousAnswer,
  onSubmit,
  isSubmitting,
}: InputNodeProps) {
  const [value, setValue] = useState('');
  const contentLength = node.title.length + (node.description?.length ?? 0);

  useEffect(() => {
    if (previousAnswer?.type === 'input') {
      setValue(previousAnswer.value);
    } else {
      setValue('');
    }
  }, [node.id, previousAnswer]);

  const handleContinue = () => {
    if (!value.trim() || isSubmitting) return;
    onSubmit({ type: 'input', value: value.trim() });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleContinue();
  };

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight mb-3 text-[var(--text-main)]">
          {node.title}
        </h1>
        {node.imageUrl && (
          <NodeImage
            src={node.imageUrl}
            alt={node.title}
            contentLength={contentLength}
          />
        )}
        {node.description && (
          <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5">
            {node.description}
          </p>
        )}
      </div>

      <div className="px-2 mb-8">
        <input
          type={node.inputType === 'number' ? 'number' : 'text'}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={node.inputPlaceholder ?? 'Type your answer...'}
          className="w-full rounded-[var(--radius-card)] bg-[var(--card-bg)] border-2 border-transparent px-6 py-5 text-lg font-semibold text-[var(--text-main)] placeholder:text-[var(--text-sub)] placeholder:font-medium shadow-[var(--shadow-ambient)] outline-none focus:border-[var(--accent)] transition-colors duration-200"
          inputMode={node.inputType === 'number' ? 'numeric' : 'text'}
          autoFocus
        />
      </div>

      <QuizButton
        onClick={handleContinue}
        disabled={!value.trim()}
        loading={isSubmitting}
      >
        Continue
      </QuizButton>
    </div>
  );
}
