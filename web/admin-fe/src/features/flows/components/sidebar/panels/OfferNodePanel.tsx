import { useNavigate } from 'react-router-dom';
import { useFlowStore } from '../../../store/flowStore';
import type { OfferNodeData } from '../../../types';
import { useStoredOffers } from '../../../../offers/storage';

export function OfferNodePanel({ nodeId, data }: { nodeId: string; data: OfferNodeData }) {
  const navigate = useNavigate();
  const updateNodeData = useFlowStore((s) => s.updateNodeData);
  const offers = useStoredOffers();
  const selectedOffer = offers.find((offer) => offer.id === data.offerId);

  if (offers.length === 0) {
    return (
      <div
        className="rounded-xl p-4"
        style={{ border: '1px solid var(--border-default)', backgroundColor: 'var(--bg-surface-secondary)' }}
      >
        <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
          No offers yet
        </p>
        <p className="mt-1 text-xs leading-5" style={{ color: 'var(--text-tertiary)' }}>
          Create an offer first, then come back here and select it by name.
        </p>
        <button
          type="button"
          onClick={() => navigate('/offers')}
          className="mt-4 w-full rounded-lg px-3 py-2 text-sm font-medium text-white transition-colors"
          style={{ backgroundColor: 'var(--accent-primary)' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary-hover)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--accent-primary)';
          }}
        >
          Create offer
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-500">Select Offer</label>
        <select
          value={data.offerId}
          onChange={(e) => updateNodeData(nodeId, { offerId: e.target.value })}
          className="w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-gray-400"
        >
          <option value="">— choose an offer —</option>
          {offers.map((o) => (
            <option key={o.id} value={o.id}>
              {o.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="button"
        onClick={() => navigate('/offers')}
        className="rounded-lg border px-3 py-2 text-sm font-medium transition-colors"
        style={{ borderColor: 'var(--border-default)', color: 'var(--text-secondary)' }}
      >
        Manage offers
      </button>
      {selectedOffer && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-sm font-semibold text-green-800">{selectedOffer.name}</p>
          <p className="mt-1 text-xs leading-5 text-green-700">
            {selectedOffer.description || selectedOffer.why || 'Offer selected'}
          </p>
        </div>
      )}
      {data.offerId && !selectedOffer && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
          <p className="text-sm font-semibold text-amber-800">Offer not found</p>
          <p className="mt-1 text-xs leading-5 text-amber-700">
            The linked offer was removed. Choose another one or create it again.
          </p>
        </div>
      )}
    </div>
  );
}
