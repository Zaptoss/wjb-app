interface NodeImageFieldProps {
  label: string;
  imageUrl?: string;
  onChange: (value: string) => void;
}

export function NodeImageField({ label, imageUrl, onChange }: NodeImageFieldProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') onChange(reader.result);
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </label>

      {imageUrl && (
        <div
          className="overflow-hidden rounded-xl"
          style={{ border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-surface-secondary)' }}
        >
          <img src={imageUrl} alt="" className="h-36 w-full object-cover" />
        </div>
      )}

      <div className="flex items-center gap-2">
        <label
          className="inline-flex cursor-pointer items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors"
          style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-primary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--bg-muted)';
          }}
        >
          Upload photo
          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </label>

        {imageUrl && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            style={{ color: '#DC2626', backgroundColor: '#FEE2E2' }}
          >
            Remove
          </button>
        )}
      </div>

      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
        Optional. One image per node.
      </p>
    </div>
  );
}
