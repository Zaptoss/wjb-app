import { useFlowStore } from '../../../store/flowStore';
import type { QuestionNodeData, AnswerType } from '../../../types';
import { NodeImageField } from './NodeImageField';

export function QuestionNodePanel({ nodeId, data }: { nodeId: string; data: QuestionNodeData }) {
  const updateNodeData = useFlowStore((s) => s.updateNodeData);

  const updateOption = (optId: string, label: string) => {
    updateNodeData(nodeId, {
      options: data.options.map((o) => (o.id === optId ? { ...o, label } : o)),
    });
  };

  const addOption = () => {
    updateNodeData(nodeId, {
      options: [...data.options, { id: crypto.randomUUID(), label: '' }],
    });
  };

  const removeOption = (optId: string) => {
    updateNodeData(nodeId, { options: data.options.filter((o) => o.id !== optId) });
  };

  const ANSWER_TYPES: { value: AnswerType; label: string }[] = [
    { value: 'single', label: 'Single choice' },
    { value: 'multi', label: 'Multiple choice' },
    { value: 'input', label: 'Text / Number' },
  ];

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Title (internal)</label>
        <input
          type="text"
          value={data.title}
          onChange={(e) => updateNodeData(nodeId, { title: e.target.value })}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Question Text</label>
        <textarea
          value={data.text}
          onChange={(e) => updateNodeData(nodeId, { text: e.target.value })}
          placeholder="What is your main goal?"
          rows={2}
          className="w-full resize-y rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>
      <NodeImageField
        label="Photo"
        imageUrl={data.imageUrl}
        onChange={(imageUrl) => updateNodeData(nodeId, { imageUrl })}
      />
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Answer Type</label>
        <div className="flex gap-2">
          {ANSWER_TYPES.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => updateNodeData(nodeId, { answerType: value })}
              className={`flex-1 rounded-md border px-2 py-1.5 text-xs font-medium transition-colors ${
                data.answerType === value
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">
          Data Attribute <span className="font-normal text-gray-400">(e.g. "goal", "age")</span>
        </label>
        <input
          type="text"
          value={data.dataAttribute}
          onChange={(e) => updateNodeData(nodeId, { dataAttribute: e.target.value })}
          placeholder="goal"
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        />
      </div>
      {data.answerType !== 'input' && (
        <div>
          <label className="mb-2 block text-xs font-medium text-gray-500">Answer Options</label>
          <div className="flex flex-col gap-2">
            {data.options.map((opt) => (
              <div key={opt.id} className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-300" />
                <input
                  type="text"
                  value={opt.label}
                  onChange={(e) => updateOption(opt.id, e.target.value)}
                  placeholder="Option label"
                  className="flex-1 rounded-md border border-gray-200 bg-gray-50 px-2 py-1.5 text-sm outline-none focus:border-gray-400"
                />
                <button
                  onClick={() => removeOption(opt.id)}
                  className="text-gray-300 hover:text-red-500"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            ))}
            <button
              onClick={addOption}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Add option
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
