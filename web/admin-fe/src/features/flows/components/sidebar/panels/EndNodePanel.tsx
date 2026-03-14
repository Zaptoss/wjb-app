export function EndNodePanel() {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center">
      <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
        </svg>
      </div>
      <p className="text-sm font-medium text-red-700">Terminal Node</p>
      <p className="mt-1 text-xs text-red-500">This node ends the user flow. No output connections.</p>
    </div>
  );
}
