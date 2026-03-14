import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getStoredTheme, setTheme as persistTheme, type AdminTheme } from '@/shared/theme/theme';

const CONTENT_NODES = [
  {
    type: 'info',
    label: 'Info Page',
    iconBg: '#FEF3C7',
    iconColor: '#92400E',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
        <polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
  },
  {
    type: 'question',
    label: 'Question',
    iconBg: '#E0E7FF',
    iconColor: '#3730A3',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
  },
  {
    type: 'offer',
    label: 'Offer',
    iconBg: '#D1FAE5',
    iconColor: '#065F46',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
        <line x1="7" y1="7" x2="7.01" y2="7"/>
      </svg>
    ),
  },
];


const DragHandle = () => (
  <svg
    className="drag-handle ml-auto opacity-0 transition-opacity group-hover:opacity-100"
    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round"
  >
    <circle cx="9" cy="5" r="1" fill="currentColor"/>
    <circle cx="9" cy="12" r="1" fill="currentColor"/>
    <circle cx="9" cy="19" r="1" fill="currentColor"/>
    <circle cx="15" cy="5" r="1" fill="currentColor"/>
    <circle cx="15" cy="12" r="1" fill="currentColor"/>
    <circle cx="15" cy="19" r="1" fill="currentColor"/>
  </svg>
);

interface PaletteItemProps {
  type: string;
  label: string;
  iconBg: string;
  iconColor: string;
  icon: React.ReactNode;
}

function PaletteItem({ type, label, iconBg, iconColor, icon }: PaletteItemProps) {
  const onDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('nodeType', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="group flex cursor-grab items-center gap-3 rounded-lg px-2 py-2 transition-colors active:cursor-grabbing"
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
    >
      <div
        className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <span className="flex-1 text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{label}</span>
      <DragHandle />
    </div>
  );
}

interface NavItemProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

function NavItem({ label, icon, active, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors"
      style={{
        color: active ? 'var(--text-primary)' : 'var(--text-tertiary)',
        backgroundColor: active ? 'var(--bg-muted)' : 'transparent',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.backgroundColor = 'transparent'; }}
    >
      {icon}
      {label}
    </button>
  );
}

export function NodePalette() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFlowsPage = location.pathname === '/flows' || location.pathname === '/';
  const isOffersPage = location.pathname === '/offers';
  const isEditorPage = !isFlowsPage && !isOffersPage;
  const [theme, setTheme] = useState<AdminTheme>(() => getStoredTheme());
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    persistTheme(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div
      className="flex flex-shrink-0 flex-col self-stretch"
      style={{
        width: 240,
        borderRight: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-surface)',
      }}
    >
      {/* Navigation */}
      <div style={{ padding: '20px 16px 8px' }}>
        <p className="mb-3 pl-2 text-[11px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Navigation</p>
        <div className="flex flex-col gap-0.5">
          <NavItem
            label="My Flows"
            active={isFlowsPage}
            onClick={() => navigate('/flows')}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
            }
          />
          <NavItem
            label="Offers"
            active={isOffersPage}
            onClick={() => navigate('/offers')}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            }
          />
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '0 16px' }} />

      {/* Content Nodes — only on editor page */}
      {isEditorPage && (
        <div style={{ padding: '16px 16px 8px' }}>
          <p className="mb-2 pl-2 text-[11px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Content Nodes</p>
          {CONTENT_NODES.map((item) => (
            <PaletteItem key={item.type} {...item} />
          ))}
        </div>
      )}

      {/* Footer with user profile */}
      <div className="mt-auto" style={{ borderTop: '1px solid var(--border-subtle)', padding: 16 }}>
        <button
          type="button"
          onClick={handleThemeToggle}
          className="flex w-full items-center justify-between rounded-lg p-2 transition-colors"
          style={{ color: 'var(--text-primary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          aria-label="Toggle dark theme"
          aria-pressed={isDarkTheme}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: 'var(--bg-muted)', color: 'var(--text-secondary)' }}
            >
              {isDarkTheme ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              )}
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold">Dark Theme</p>
              <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>
                {isDarkTheme ? 'On' : 'Off'}
              </p>
            </div>
          </div>
          <span
            className="relative inline-flex h-5 w-9 items-center rounded-full transition-colors"
            style={{ backgroundColor: isDarkTheme ? 'var(--accent-primary)' : 'var(--bg-muted)' }}
          >
            <span
              className="inline-block h-4 w-4 transform rounded-full shadow-sm transition-transform"
              style={{
                transform: isDarkTheme ? 'translateX(18px)' : 'translateX(2px)',
                backgroundColor: isDarkTheme ? 'var(--bg-body)' : 'var(--bg-surface)',
              }}
            />
          </span>
        </button>

        <div style={{ height: 1, backgroundColor: 'var(--border-subtle)', margin: '12px 0' }} />

        <div
          className="flex cursor-pointer items-center gap-2.5 rounded-lg p-2 transition-colors"
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--bg-surface-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
        >
          <div
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold"
            style={{ backgroundColor: '#F3E8FF', color: '#6B21A8' }}
          >
            AD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold" style={{ color: 'var(--text-primary)' }}>Alex Designer</p>
            <p className="text-[11px]" style={{ color: 'var(--text-tertiary)' }}>Personal Account</p>
          </div>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
