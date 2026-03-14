import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../features/flows/db/flowDb';
import type { FlowDraft } from '../features/flows/types';
import { NodePalette } from '../features/flows/components/sidebar/NodePalette';
import { useFlowStore } from '../features/flows/store/flowStore';

const PAGE_SIZE = 8;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

type SortKey = 'name' | 'updatedAt' | 'nodes';

interface FlowMenuProps {
  flow: FlowDraft;
  onDelete: () => void;
  onDuplicate: () => void;
  onToggleActive: () => void;
}

function FlowMenu({ flow, onDelete, onDuplicate, onToggleActive }: FlowMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top?: number; bottom?: number; right: number }>({ right: 0 });
  const ref = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node) && menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const handleToggle = () => {
    if (!open && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const right = window.innerWidth - rect.right;
      if (spaceBelow < 180) {
        setPos({ bottom: window.innerHeight - rect.top + 4, right });
      } else {
        setPos({ top: rect.bottom + 4, right });
      }
    }
    setOpen((v) => !v);
  };

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        ref={btnRef}
        onClick={handleToggle}
        className="flex h-8 w-8 items-center justify-center rounded-md transition-colors"
        style={{ color: 'var(--text-tertiary)' }}
        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-tertiary)'; }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/>
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
            onClick={() => { onToggleActive(); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {flow.isActive
                ? <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>
                : <><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>
              }
            </svg>
            {flow.isActive ? 'Set Inactive' : 'Set Active'}
          </button>
          <button
            onClick={() => { onDuplicate(); setOpen(false); }}
            className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            Duplicate
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

export default function FlowListPage() {
  const [allFlows, setAllFlows] = useState<FlowDraft[]>([]);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'unsaved'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('updatedAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const resetFlow = useFlowStore((s) => s.resetFlow);

  const loadFlows = async () => {
    const all = await db.flowDrafts.toArray();
    setAllFlows(all);
  };

  useEffect(() => {
    resetFlow();
    loadFlows();
  }, []);

  const createFlow = async () => {
    const id = crypto.randomUUID();
    await db.flowDrafts.put({
      id,
      name: 'Untitled Flow',
      nodes: [],
      edges: [],
      updatedAt: new Date().toISOString(),
      isDirty: false,
      isActive: false,
    });
    navigate(`/flows/${id}`);
  };

  const deleteFlow = async (id: string) => {
    await db.flowDrafts.delete(id);
    loadFlows();
  };

  const duplicateFlow = async (flow: FlowDraft) => {
    const newId = crypto.randomUUID();
    await db.flowDrafts.put({
      ...flow,
      id: newId,
      name: `${flow.name} (copy)`,
      updatedAt: new Date().toISOString(),
      isDirty: true,
      isActive: false,
    });
    loadFlows();
  };

  const toggleActive = async (flow: FlowDraft) => {
    await db.flowDrafts.put({ ...flow, isActive: !flow.isActive });
    loadFlows();
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  // Filter + search
  const filtered = allFlows
    .filter((f) => {
      if (search && !f.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterStatus === 'active' && !f.isActive) return false;
      if (filterStatus === 'inactive' && f.isActive) return false;
      if (filterStatus === 'unsaved' && !f.isDirty) return false;
      return true;
    })
    .sort((a, b) => {
      let va: string | number = '';
      let vb: string | number = '';
      if (sortKey === 'name') { va = a.name; vb = b.name; }
      else if (sortKey === 'updatedAt') { va = a.updatedAt; vb = b.updatedAt; }
      else if (sortKey === 'nodes') { va = a.nodes.length; vb = b.nodes.length; }
      if (va < vb) return sortDir === 'asc' ? -1 : 1;
      if (va > vb) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const SortIcon = ({ col }: { col: SortKey }) => (
    <svg
      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      className="ml-1 inline-block"
      style={{ opacity: sortKey === col ? 1 : 0.3 }}
    >
      {sortKey === col && sortDir === 'asc'
        ? <polyline points="18 15 12 9 6 15"/>
        : <polyline points="6 9 12 15 18 9"/>
      }
    </svg>
  );

  const STATUS_FILTERS: { value: typeof filterStatus; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'unsaved', label: 'Unsaved' },
  ];

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
            <h1 style={{ color: 'var(--text-primary)' }} className="text-base font-semibold">My Flows</h1>
            <span
              className="rounded-full px-2 py-0.5 text-[11px] font-medium"
              style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
            >
              {allFlows.length}
            </span>
          </div>
          <button
            onClick={createFlow}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: 'var(--accent-primary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-primary)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            New Flow
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-8 py-6">
          {/* Search + filters */}
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
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search flows..."
                className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm outline-none transition-colors"
                style={{ borderColor: 'var(--border-default)', backgroundColor: 'var(--bg-surface)', color: 'var(--text-primary)' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--text-tertiary)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-default)')}
              />
            </div>
            {/* Status filter tabs */}
            <div
              className="flex items-center rounded-lg p-1"
              style={{ backgroundColor: 'var(--bg-muted)' }}
            >
              {STATUS_FILTERS.map(({ value, label }) => (
                <button
                  key={value}
                  onClick={() => { setFilterStatus(value); setPage(1); }}
                  className="rounded-md px-3 py-1.5 text-xs font-medium transition-all"
                  style={{
                    backgroundColor: filterStatus === value ? 'var(--bg-surface)' : 'transparent',
                    color: filterStatus === value ? 'var(--text-primary)' : 'var(--text-tertiary)',
                    boxShadow: filterStatus === value ? '0 1px 2px rgba(0,0,0,0.06)' : 'none',
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
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
                  <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>
                </svg>
              </div>
              <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>No flows found</p>
              <p className="mt-1 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                {search || filterStatus !== 'all' ? 'Try adjusting your filters' : 'Create your first wellness quiz flow'}
              </p>
              {!search && filterStatus === 'all' && (
                <button
                  onClick={createFlow}
                  className="mt-5 flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  Create flow
                </button>
              )}
            </div>
          ) : (
            <div
              className="overflow-hidden rounded-xl"
              style={{ border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-surface)' }}
            >
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-subtle)', backgroundColor: 'var(--bg-surface-secondary)' }}>
                    <th
                      className="cursor-pointer px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                      onClick={() => handleSort('name')}
                    >
                      Name <SortIcon col="name" />
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>
                      Status
                    </th>
                    <th
                      className="cursor-pointer px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                      onClick={() => handleSort('nodes')}
                    >
                      Nodes <SortIcon col="nodes" />
                    </th>
                    <th
                      className="cursor-pointer px-5 py-3 text-left text-xs font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-tertiary)' }}
                      onClick={() => handleSort('updatedAt')}
                    >
                      Last updated <SortIcon col="updatedAt" />
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {paged.map((flow, i) => (
                    <tr
                      key={flow.id}
                      onClick={() => navigate(`/flows/${flow.id}`)}
                      className="cursor-pointer transition-colors"
                      style={{ borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-secondary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg"
                            style={{ backgroundColor: '#EEF2FF' }}
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.5">
                              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{flow.name}</p>
                            {flow.isDirty && (
                              <p className="text-[11px] text-amber-600">Unsaved changes</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium"
                          style={
                            flow.isActive
                              ? { backgroundColor: '#D1FAE5', color: '#065F46' }
                              : { backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }
                          }
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full"
                            style={{ backgroundColor: flow.isActive ? '#10B981' : 'var(--text-tertiary)' }}
                          />
                          {flow.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-5 py-3.5" style={{ color: 'var(--text-secondary)' }}>
                        {flow.nodes.length} nodes · {flow.edges.length} edges
                      </td>
                      <td className="px-5 py-3.5 text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {formatDate(flow.updatedAt)}
                      </td>
                      <td className="px-4 py-3.5 text-right">
                        <FlowMenu
                          flow={flow}
                          onDelete={() => deleteFlow(flow.id)}
                          onDuplicate={() => duplicateFlow(flow)}
                          onToggleActive={() => toggleActive(flow)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                Showing {(currentPage - 1) * PAGE_SIZE + 1}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6"/>
                  </svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-sm font-medium transition-colors"
                    style={
                      p === currentPage
                        ? { backgroundColor: 'var(--accent-primary)', color: '#fff' }
                        : { backgroundColor: 'transparent', color: 'var(--text-secondary)', border: '1px solid var(--border-default)' }
                    }
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors disabled:cursor-not-allowed disabled:opacity-30"
                  style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
