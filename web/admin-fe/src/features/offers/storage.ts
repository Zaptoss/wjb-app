import { useEffect, useState } from 'react';

export const OFFERS_STORAGE_KEY = 'wjb-admin-offers';

export interface StoredOffer {
  id: string;
  name: string;
  description: string;
  digitalPlanDetails: string;
  wellnessKitDetails: string;
  why: string;
  updatedAt: string;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readString(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function normalizeStoredOffer(value: unknown): StoredOffer | null {
  if (!isRecord(value)) return null;

  const name = readString(value.name).trim();
  if (!name) return null;

  return {
    id: readString(value.id) || crypto.randomUUID(),
    name,
    description: readString(value.description) || readString(value.tagline),
    digitalPlanDetails: readString(value.digitalPlanDetails),
    wellnessKitDetails: readString(value.wellnessKitDetails),
    why: readString(value.why) || readString(value.category),
    updatedAt: readString(value.updatedAt) || new Date().toISOString(),
  };
}

export function loadStoredOffers(): StoredOffer[] {
  try {
    const raw = localStorage.getItem(OFFERS_STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(normalizeStoredOffer)
      .filter((offer): offer is StoredOffer => offer !== null);
  } catch {
    return [];
  }
}

export function useStoredOffers() {
  const [offers, setOffers] = useState<StoredOffer[]>(() => loadStoredOffers());

  useEffect(() => {
    const reload = () => {
      setOffers(loadStoredOffers());
    };

    reload();
    window.addEventListener('storage', reload);
    window.addEventListener('focus', reload);

    return () => {
      window.removeEventListener('storage', reload);
      window.removeEventListener('focus', reload);
    };
  }, []);

  return offers;
}
