import { useState, useEffect, useRef } from 'react';
import { NodePalette } from '../features/flows/components/sidebar/NodePalette';
import { type Offer, OFFER_CATEGORIES } from '../features/offers/data';

const STORAGE_KEY = 'wjb-admin-offers';

function loadOffers(): Offer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveOffers(offers: Offer[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  weight: { bg: '#FEF3C7', text: '#92400E' },
  strength: { bg: '#E0E7FF', text: '#3730A3' },
  joint: { bg: '#D1FAE5', text: '#065F46' },
  cardio: { bg: '#FCE7F3', text: '#9D174D' },
  yoga: { bg: '#EDE9FE', text: '#5B21B6' },
  stress: { bg: '#DBEAFE', text: '#1E40AF' },
  micro: { bg: '#FFEDD5', text: '#9A3412' },
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? { bg: 'var(--bg-muted)', text: 'var(--text-secondary)' };
}

function getCategoryLabel(cat: string) {
  return OFFER_CATEGORIES.find((c) => c.value === cat)?.label ?? cat;
}

interface OfferModalProps {
  offer?: Offer | null;
  onClose: () => void;
  onSave: (offer: Offer) => void;
}

function OfferModal({ offer, onClose, onSave }: OfferModalProps) {
  const [name, setName] = useState(offer?.name ?? '');
  const [tagline, setTagline] = useState(offer?.tagline ?? '');
  const [category, setCategory] = useState(offer?.category ?? (OFFER_CATEGORIES[0]?.value ?? 'weight'));
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({
      id: offer?.id ?? `offer_${crypto.randomUUID().slice(0, 8)}`,
      name: name.trim(),
      tagline: tagline.trim(),
      category,
    });
  };

  return (
    <div
      ref={backdropRef}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(2px)' }}
    >
      <div
        className="w-full max-w-md rounded-xl p-6"
        style={{ backgroundColor: 'var(--bg-surface)', boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
      >
        <h2 className="mb-5 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {offer ? 'Edit Offer' : 'Create Offer'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Weight Loss Starter"
              autoFocus
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--text-tertiary)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. 4-week home plan"
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--text-tertiary)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            >
              {OFFER_CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--accent-primary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
            >
              {offer ? 'Save Changes' : 'Create Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface OfferMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

function OfferMenu({ onEdit, onDelete }: OfferMenuProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex h-7 w-7 items-center justify-center rounded-md transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
        </svg>
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-lg py-1"
          style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-default)', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
        >
          <button
            onClick={() => { onEdit(); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Edit
          </button>
          <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />
          <button
            onClick={() => { onDelete(); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"/>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>(loadOffers);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [modal, setModal] = useState<{ open: boolean; offer?: Offer | null }>({ open: false });

  useEffect(() => {
    saveOffers(offers);
  }, [offers]);

  const handleSave = (offer: Offer) => {
    setOffers((prev) => {
      const idx = prev.findIndex((o) => o.id === offer.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = offer;
        return next;
      }
      return [...prev, offer];
    });
    setModal({ open: false });
  };

  const handleDelete = (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
  };

  const filtered = offers.filter((o) => {
    if (search && !o.name.toLowerCase().includes(search.toLowerCase()) && !o.tagline.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterCategory !== 'all' && o.category !== filterCategory) return false;
    return true;
  });

  const categoryOptions = [{ value: 'all', label: 'All Categories' }, ...OFFER_CATEGORIES];

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-body)' }}>
      <NodePalette />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top header */}
        <div
          className="flex flex-shrink-0 items-center justify-between px-8"
          style={{ height: 60, borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface)' }}
        >
          <div className="flex items-center gap-3">
            <h1 style={{ color: 'var(--text-primary)' }} className="text-base font-semibold">Offers</h1>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
            >
              {offers.length}
            </span>
          </div>
          <button
            onClick={() => setModal({ open: true, offer: null })}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: 'var(--accent-primary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Offer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Search + filter */}
          <div className="mb-5 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-tertiary)' }}
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search offers..."
                className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition-colors"
                style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--text-tertiary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
              style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
            >
              {categoryOptions.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          {/* Offers grid */}
          {filtered.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center rounded-xl py-20"
              style={{ border: '2px dashed var(--border-default)', backgroundColor: 'var(--bg-surface)' }}
            >
              <div
                className="mb-4 flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: 'var(--bg-muted)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5">
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                  <line x1="7" y1="7" x2="7.01" y2="7"/>
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No offers found</p>
              <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {search || filterCategory !== 'all' ? 'Try adjusting your filters' : 'Create your first offer to get started'}
              </p>
              {!search && filterCategory === 'all' && (
                <button
                  onClick={() => setModal({ open: true, offer: null })}
                  className="mt-5 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Create offer
                </button>
              )}
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((offer) => {
                const catColor = getCategoryColor(offer.category);
                return (
                  <div
                    key={offer.id}
                    className="group relative flex flex-col rounded-xl p-5 transition-shadow"
                    style={{
                      backgroundColor: 'var(--bg-surface)',
                      border: '1px solid var(--border-default)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.boxShadow = 'none')}
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-lg"
                        style={{ backgroundColor: catColor.bg }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={catColor.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                          <line x1="7" y1="7" x2="7.01" y2="7"/>
                        </svg>
                      </div>
                      <OfferMenu
                        onEdit={() => setModal({ open: true, offer })}
                        onDelete={() => handleDelete(offer.id)}
                      />
                    </div>
                    <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>{offer.name}</p>
                    <p className="text-xs mb-3" style={{ color: 'var(--text-tertiary)' }}>{offer.tagline}</p>
                    <span
                      className="mt-auto inline-flex w-fit items-center rounded-full px-2.5 py-1 text-[11px] font-medium"
                      style={{ backgroundColor: catColor.bg, color: catColor.text }}
                    >
                      {getCategoryLabel(offer.category)}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {modal.open && (
        <OfferModal
          offer={modal.offer}
          onClose={() => setModal({ open: false })}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
