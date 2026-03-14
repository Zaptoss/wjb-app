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
      className={`min-w-[220px] max-w-[280px] rounded-xl border-2 bg-blue-50 ${selected ? 'border-blue-500 shadow-lg' : 'border-blue-200'} cursor-pointer shadow-sm transition-all`}
    >
      <div className="flex items-center gap-2 border-b border-blue-200 px-3 py-2">
        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-700 text-white">
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
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">Question</span>
        <span className="ml-auto rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-medium text-blue-700">{data.answerType}</span>
      </div>
      <div className="px-3 py-2">
        {data.imageUrl && (
          <img
            src={data.imageUrl}
            alt=""
            className="mb-3 h-24 w-full rounded-lg object-cover"
          />
        )}
        <p className="text-sm font-medium text-gray-800">{data.title || 'Untitled'}</p>
        {data.text && <p className="mt-1 line-clamp-2 text-xs text-gray-500">{data.text}</p>}
      </div>
      {options.length > 0 && (
        <div className="border-t border-blue-100 px-3 pb-2 pt-1">
          {options.map((opt) => (
            <div key={opt.id} className="relative my-1 flex items-center" style={{ minHeight: 24 }}>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              <span className="ml-2 flex-1 truncate text-xs text-gray-600">{opt.label}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={opt.id}
                className="!border-blue-400 !bg-blue-100 !top-1/2 !-translate-y-1/2 !right-[-13px]"
              />
            </div>
          ))}
        </div>
      )}
      {options.length === 0 && (
        <Handle type="source" position={Position.Right} id="default" className="!border-blue-400 !bg-blue-100" />
      )}
      <Handle type="target" position={Position.Left} className="!border-blue-400 !bg-blue-100 !left-[-6px]" />
    </div>
  );
}
