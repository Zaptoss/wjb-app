import { Handle, Position, type NodeProps, type Node } from '@xyflow/react';
import type { QuestionNodeData } from '../../../types';
import { useFlowStore } from '../../../store/flowStore';

type QuestionNodeType = Node<QuestionNodeData, 'question'>;

export function QuestionNode({ id, data, selected }: NodeProps<QuestionNodeType>) {
  const setSelectedNodeId = useFlowStore((s) => s.setSelectedNodeId);
  const options = data.options ?? [];

  return (
    <div
      onClick={() => setSelectedNodeId(id)}
      className="min-w-[220px] max-w-[280px] cursor-pointer rounded-xl border-2 shadow-sm transition-all"
      style={{
        backgroundColor: 'var(--node-question-bg)',
        borderColor: selected ? 'var(--node-question-border-selected)' : 'var(--node-question-border)',
        boxShadow: selected ? '0 10px 28px rgba(0, 0, 0, 0.22)' : undefined,
      }}
    >
      <div
        className="flex items-center gap-2 border-b px-3 py-2"
        style={{ borderBottomColor: 'var(--node-question-divider)' }}
      >
        <div
          className="flex h-5 w-5 items-center justify-center rounded"
          style={{ backgroundColor: 'var(--node-question-icon-bg)', color: 'var(--node-question-icon-text)' }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9.35 9.25a2.65 2.65 0 1 1 4.8 1.5c-.9.6-1.65 1.15-1.65 2.35" />
            <circle cx="12" cy="17.4" r="0.9" fill="currentColor" stroke="none" />
          </svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: 'var(--node-question-label)' }}>
          Question
        </span>
        <span
          className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-medium"
          style={{ backgroundColor: 'var(--node-question-badge-bg)', color: 'var(--node-question-badge-text)' }}
        >
          {data.answerType}
        </span>
      </div>
      <div className="px-3 py-2">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt=""
            className="mb-3 h-24 w-full rounded-lg object-cover"
          />
        )}
        <p className="text-sm font-medium" style={{ color: 'var(--node-question-title)' }}>
          {data.title || 'Untitled'}
        </p>
        {data.text && (
          <p className="mt-1 line-clamp-2 text-xs" style={{ color: 'var(--node-question-body)' }}>
            {data.text}
          </p>
        )}
      </div>
      {options.length > 0 && (
        <div className="border-t px-3 pb-2 pt-1" style={{ borderTopColor: 'var(--node-question-divider)' }}>
          {options.map((opt) => (
            <div key={opt.id} className="relative my-1 flex items-center" style={{ minHeight: 24 }}>
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--node-question-option-dot)' }} />
              <span className="ml-2 flex-1 truncate text-xs" style={{ color: 'var(--node-question-option-text)' }}>
                {opt.label}
              </span>
              <Handle
                type="source"
                position={Position.Right}
                id={opt.id}
                className="!right-[-13px] !top-1/2 !-translate-y-1/2"
                style={{
                  borderColor: 'var(--node-question-handle-border)',
                  backgroundColor: 'var(--node-question-handle-bg)',
                }}
              />
            </div>
          ))}
        </div>
      )}
      {options.length === 0 && (
        <Handle
          type="source"
          position={Position.Right}
          id="default"
          style={{
            borderColor: 'var(--node-question-handle-border)',
            backgroundColor: 'var(--node-question-handle-bg)',
          }}
        />
      )}
      <Handle
        type="target"
        position={Position.Left}
        className="!left-[-6px]"
        style={{
          borderColor: 'var(--node-question-handle-border)',
          backgroundColor: 'var(--node-question-handle-bg)',
        }}
      />
    </div>
  );
}
