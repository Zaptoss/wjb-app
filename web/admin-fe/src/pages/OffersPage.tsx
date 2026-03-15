import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NodePalette } from '../features/flows/components/sidebar/NodePalette';
import { createOffer, deleteOffer, fetchOffers, updateOffer } from '../features/offers/api/offersApi';

const PAGE_SIZE = 8;

interface OfferDto {
  id: string;
  name: string;
  description: string;
  digitalPlanDetails: string;
  wellnessKitDetails: string;
  why: string;
  updatedAt: string;
}

type OfferFieldKey = keyof Omit<OfferDto, 'id' | 'updatedAt'>;
type SortKey = 'name' | 'updatedAt';

const OFFER_FIELDS: Array<{
  key: OfferFieldKey;
  label: string;
  placeholder: string;
  multiline?: boolean;
}> = [
  { key: 'name', label: 'Name', placeholder: 'e.g. Premium Wellness Program' },
  {
    key: 'description',
    label: 'Description',
    placeholder: 'Short overview of the offer',
    multiline: true,
  },
  {
    key: 'digitalPlanDetails',
    label: 'Digital Plan',
    placeholder: 'What is included in the digital plan',
    multiline: true,
  },
  {
    key: 'wellnessKitDetails',
    label: 'Wellness Kit',
    placeholder: 'What is included in the wellness kit',
    multiline: true,
  },
  {
    key: 'why',
    label: 'Why',
    placeholder: 'Why this offer matters',
    multiline: true,
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

interface OfferModalProps {
  offer?: OfferDto | null;
  onClose: () => void;
  onSave: (offer: OfferDto) => void | Promise<void>;
}

function OfferModal({ offer, onClose, onSave }: OfferModalProps) {
  const [form, setForm] = useState<OfferDto>(() => ({
    id: offer?.id ?? crypto.randomUUID(),
    name: offer?.name ?? '',
    description: offer?.description ?? '',
    digitalPlanDetails: offer?.digitalPlanDetails ?? '',
    wellnessKitDetails: offer?.wellnessKitDetails ?? '',
    why: offer?.why ?? '',
    updatedAt: offer?.updatedAt ?? new Date().toISOString(),
  }));
  const backdropRef = useRef<HTMLDivElement>(null);

  const updateField = (key: OfferFieldKey, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nextOffer: OfferDto = {
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      digitalPlanDetails: form.digitalPlanDetails.trim(),
      wellnessKitDetails: form.wellnessKitDetails.trim(),
      why: form.why.trim(),
      updatedAt: new Date().toISOString(),
    };

    if (!nextOffer.name) return;
    await onSave(nextOffer);
  };

  return (
    <div
      ref={backdropRef}
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', backdropFilter: 'blur(2px)' }}
    >
      <div
        className="max-h-full w-full max-w-3xl overflow-y-auto rounded-xl p-6"
        style={{
          backgroundColor: 'var(--bg-surface)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        }}
      >
        <h2 className="mb-5 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>
          {offer ? 'Edit Offer' : 'Create Offer'}
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {OFFER_FIELDS.map(({ key, label, placeholder, multiline }) => (
            <div key={key}>
              <label
                className="mb-1.5 block text-xs font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                {label}
              </label>
              {multiline ? (
                <textarea
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={placeholder}
                  rows={4}
                  className="w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
                  style={{
                    borderColor: 'var(--border-default)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-tertiary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-default)';
                  }}
                />
              ) : (
                <input
                  type="text"
                  value={form[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  placeholder={placeholder}
                  autoFocus={key === 'name'}
                  className="w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors"
                  style={{
                    borderColor: 'var(--border-default)',
                    backgroundColor: 'var(--bg-surface)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = 'var(--text-tertiary)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-default)';
                  }}
                />
              )}
            </div>
          ))}
          <div className="mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
              style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: 'var(--accent-primary)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
              }}
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
  const [pos, setPos] = useState<{ top?: number; bottom?: number; right: number }>({ right: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const handler = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const right = window.innerWidth - rect.right;

      if (spaceBelow < 140) setPos({ bottom: window.innerHeight - rect.top + 4, right });
      else setPos({ top: rect.bottom + 4, right });
    }

    setOpen((prev) => !prev);
  };

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
          e.currentTarget.style.color = 'var(--text-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = 'var(--text-tertiary)';
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      {open && (
        <div
          ref={menuRef}
          className="fixed z-[9999] min-w-[160px] rounded-lg py-1"
          style={{
            top: pos.top != null ? pos.top : undefined,
            bottom: pos.bottom != null ? pos.bottom : undefined,
            right: pos.right,
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
          }}
        >
          <button
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '4px 0' }} />
          <button
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

function getPreview(value: string) {
  return value.trim() || '—';
}

function SortIcon({ active, direction }: { active: boolean; direction: 'asc' | 'desc' }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="ml-1 inline-block"
      style={{ opacity: active ? 1 : 0.3 }}
    >
      {active && direction === 'asc' ? (
        <polyline points="18 15 12 9 6 15" />
      ) : (
        <polyline points="6 9 12 15 18 9" />
      )}
    </svg>
  );
}

export default function OffersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [modal, setModal] = useState<{ open: boolean; offer?: OfferDto | null }>({ open: false });
  const queryClient = useQueryClient();
  const offersQuery = useQuery({
    queryKey: ['offers'],
    queryFn: fetchOffers,
  });

  const createOfferMutation = useMutation({
    mutationFn: (offer: OfferDto) => createOffer({
      name: offer.name,
      description: offer.description,
      digitalPlanDetails: offer.digitalPlanDetails,
      wellnessKitDetails: offer.wellnessKitDetails,
      why: offer.why,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const updateOfferMutation = useMutation({
    mutationFn: (offer: OfferDto) => updateOffer(offer.id, {
      name: offer.name,
      description: offer.description,
      digitalPlanDetails: offer.digitalPlanDetails,
      wellnessKitDetails: offer.wellnessKitDetails,
      why: offer.why,
    }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const deleteOfferMutation = useMutation({
    mutationFn: deleteOffer,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
  });

  const offers = offersQuery.data ?? [];

  const handleSave = async (offer: OfferDto) => {
    if (modal.offer) {
      await updateOfferMutation.mutateAsync(offer);
    } else {
      await createOfferMutation.mutateAsync(offer);
    }
    setModal({ open: false });
  };

  const handleDelete = async (id: string) => {
    await deleteOfferMutation.mutateAsync(id);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDir(key === 'name' ? 'asc' : 'desc');
    }
    setPage(1);
  };

  const query = search.trim().toLowerCase();
  const filtered = offers
    .filter((offer) => {
      if (!query) return true;
      return OFFER_FIELDS.some(({ key }) => offer[key].toLowerCase().includes(query));
    })
    .sort((a, b) => {
      const left = sortKey === 'name' ? a.name.toLowerCase() : a.updatedAt;
      const right = sortKey === 'name' ? b.name.toLowerCase() : b.updatedAt;

      if (left < right) return sortDir === 'asc' ? -1 : 1;
      if (left > right) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--bg-body)' }}>
      <NodePalette />

      <div className="flex flex-1 flex-col overflow-hidden">
        <div
          className="flex flex-shrink-0 items-center justify-between px-8"
          style={{
            height: 60,
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-surface)',
          }}
        >
          <div className="flex items-center gap-3">
            <h1 style={{ color: 'var(--text-primary)' }} className="text-base font-semibold">
              Offers
            </h1>
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
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Offer
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <svg
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-tertiary)' }}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search offers..."
                className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition-colors"
                style={{
                  borderColor: 'var(--border-default)',
                  backgroundColor: 'var(--bg-surface)',
                  color: 'var(--text-primary)',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'var(--text-tertiary)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-default)';
                }}
              />
            </div>
          </div>

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
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                No offers found
              </p>
              <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {search ? 'Try adjusting your search' : 'Create your first offer to get started'}
              </p>
              {!search && (
                <button
                  onClick={() => setModal({ open: true, offer: null })}
                  className="mt-5 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Create offer
                </button>
              )}
            </div>
          ) : (
            <div
              className="overflow-x-auto rounded-xl"
              style={{ border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-surface)' }}
            >
              <table className="w-full min-w-[1120px] border-collapse text-sm">
                <thead>
                  <tr
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: 'var(--bg-surface-secondary)',
                    }}
                  >
                    <th
                      className="cursor-pointer px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                      onClick={() => handleSort('name')}
                    >
                      Name <SortIcon active={sortKey === 'name'} direction={sortDir} />
                    </th>
                    <th
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Description
                    </th>
                    <th
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Digital Plan
                    </th>
                    <th
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Wellness Kit
                    </th>
                    <th
                      className="cursor-pointer px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                      onClick={() => handleSort('updatedAt')}
                    >
                      Plan updated <SortIcon active={sortKey === 'updatedAt'} direction={sortDir} />
                    </th>
                    <th
                      className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                    >
                      Why
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {paged.map((offer, index) => (
                    <tr
                      key={offer.id}
                      onClick={() => setModal({ open: true, offer })}
                      className="cursor-pointer transition-colors"
                      style={{ borderTop: index > 0 ? '1px solid var(--border-subtle)' : 'none' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'var(--bg-surface-secondary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: '#DBEAFE' }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5">
                              <path d="M4 6h16M4 12h16M4 18h10" />
                            </svg>
                          </div>
                          <p className="truncate font-medium" style={{ color: 'var(--text-primary)' }} title={offer.name}>
                            {offer.name}
                          </p>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <p className="truncate" title={offer.description}>
                          {getPreview(offer.description)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <p className="truncate" title={offer.digitalPlanDetails}>
                          {getPreview(offer.digitalPlanDetails)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <p className="truncate" title={offer.wellnessKitDetails}>
                          {getPreview(offer.wellnessKitDetails)}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {formatDate(offer.updatedAt)}
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-secondary)' }}>
                        <p className="truncate" title={offer.why}>
                          {getPreview(offer.why)}
                        </p>
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <OfferMenu
                          onEdit={() => setModal({ open: true, offer })}
                          onDelete={() => handleDelete(offer.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}-{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((value) => (
                  <button
                    key={value}
                    onClick={() => setPage(value)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors"
                    style={
                      value === currentPage
                        ? { backgroundColor: 'var(--accent-primary)', color: '#fff' }
                        : {
                            backgroundColor: 'transparent',
                            color: 'var(--text-secondary)',
                            border: '1px solid var(--border-default)',
                          }
                    }
                  >
                    {value}
                  </button>
                ))}
                <button
                  onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
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
