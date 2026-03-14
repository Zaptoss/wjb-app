const PALETTE_ITEMS = [
  {
    type: 'info',
    label: 'Info Page',
    color: 'bg-amber-50 border-amber-200 text-amber-700',
    iconBg: 'bg-amber-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
  },
  {
    type: 'question',
    label: 'Question',
    color: 'bg-blue-50 border-blue-200 text-blue-700',
    iconBg: 'bg-blue-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    type: 'offer',
    label: 'Offer',
    color: 'bg-green-50 border-green-200 text-green-700',
    iconBg: 'bg-green-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
  {
    type: 'end',
    label: 'End Flow',
    color: 'bg-red-50 border-red-200 text-red-700',
    iconBg: 'bg-red-100',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
      </svg>
    ),
  },
];

export function NodePalette() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData('nodeType', nodeType);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="flex w-56 flex-shrink-0 flex-col border-r border-gray-100 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-400">Nodes</h2>
      </div>
      <div className="flex flex-col gap-1.5 p-3">
        {PALETTE_ITEMS.map((item) => (
          <div
            key={item.type}
            draggable
            onDragStart={(e) => onDragStart(e, item.type)}
            className={`flex cursor-grab items-center gap-3 rounded-lg border px-3 py-2.5 transition-all hover:shadow-sm active:cursor-grabbing ${item.color}`}
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded ${item.iconBg}`}>
              {item.icon}
            </div>
            <span className="text-sm font-medium">{item.label}</span>
            <svg className="ml-auto opacity-30" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="5" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="19" r="1" fill="currentColor"/>
              <circle cx="15" cy="5" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="19" r="1" fill="currentColor"/>
            </svg>
          </div>
        ))}
      </div>
      <div className="mt-auto border-t border-gray-100 p-3">
        <p className="text-center text-[11px] text-gray-400">Drag nodes onto canvas</p>
      </div>
    </div>
  );
}
