import type { SessionNode } from '../../types';
import QuizButton from '../ui/QuizButton';
import NodeImage from '../ui/NodeImage';
import ZenIllustration from '../ui/ZenIllustration';

interface InfoPageNodeProps {
  node: SessionNode;
  onContinue: () => void;
  isSubmitting: boolean;
}

export default function InfoPageNode({
  node,
  onContinue,
  isSubmitting,
}: InfoPageNodeProps) {
  const contentLength = node.title.length + (node.description?.length ?? 0);

  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-[28px] font-bold leading-tight tracking-tight mb-3 text-[var(--text-main)]">
          {node.title}
        </h1>
        {node.imageUrl ? (
          <NodeImage
            src={node.imageUrl}
            alt={node.title}
            contentLength={contentLength}
          />
        ) : (
          <ZenIllustration />
        )}
        {node.description && (
          <p className="text-base font-medium text-[var(--text-sub)] leading-relaxed px-2.5">
            {node.description}
          </p>
        )}
      </div>

      <QuizButton onClick={onContinue} loading={isSubmitting}>
        Continue
      </QuizButton>
    </div>
  );
}
