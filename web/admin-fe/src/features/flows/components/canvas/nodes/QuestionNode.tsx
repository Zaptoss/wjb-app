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
        <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-200 text-blue-700">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
        </div>
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">Question</span>
        <span className="ml-auto rounded-full bg-blue-200 px-2 py-0.5 text-[10px] font-medium text-blue-700">{data.answerType}</span>
      </div>
      <div className="px-3 py-2">
        <p className="text-sm font-medium text-gray-800">{data.title || 'Untitled'}</p>
        {data.text && <p className="mt-1 line-clamp-2 text-xs text-gray-500">{data.text}</p>}
      </div>
      {options.length > 0 && (
        <div className="relative border-t border-blue-100 px-3 pb-2 pt-1">
          {options.map((opt, i) => (
            <div key={opt.id} className="relative my-1 flex items-center">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-300" />
              <span className="ml-2 flex-1 truncate text-xs text-gray-600">{opt.label}</span>
              <Handle
                type="source"
                position={Position.Right}
                id={opt.id}
                style={{ top: `${(i + 0.5) * 24}px`, right: -6 }}
                className="!border-blue-400 !bg-blue-100"
              />
            </div>
          ))}
        </div>
      )}
      {options.length === 0 && (
        <Handle type="source" position={Position.Right} id="default" className="!border-blue-400 !bg-blue-100" />
      )}
      <Handle type="target" position={Position.Left} className="!border-blue-400 !bg-blue-100" />
    </div>
  );
}
