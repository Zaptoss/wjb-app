import { create } from 'zustand';
import { queryClient } from '@/shared/lib/queryClient';
import type { AuthState, User } from '../types';

const ACCESS_TOKEN_KEY = 'access_token';

interface AuthStore extends AuthState {
  setSession: (token: string) => void;
  clearSession: () => void;
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  const parts = token.split('.');
  const payload = parts[1];
  if (!payload) return null;

  try {
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/');
    const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');
    return JSON.parse(window.atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function buildUser(token: string | null): User | null {
  if (!token) return null;

  const payload = decodeJwtPayload(token);
  const emailClaims = [
    payload?.['email'],
    payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'],
  ];
  const idClaims = [
    payload?.['sub'],
    payload?.['nameid'],
    payload?.['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
  ];

  const email = emailClaims.find((value) => typeof value === 'string');
  const id = idClaims.find((value) => typeof value === 'string');

  return {
    id: typeof id === 'string' ? id : null,
    email: typeof email === 'string' ? email : 'admin',
    name: typeof email === 'string' ? email : 'Admin',
  };
}

function readStoredToken() {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(ACCESS_TOKEN_KEY);
}

function buildState(token: string | null): AuthState {
  return {
    token,
    user: buildUser(token),
    isAuthenticated: Boolean(token),
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  ...buildState(readStoredToken()),
  setSession: (token) => set(buildState(token)),
  clearSession: () => set(buildState(null)),
}));

export function getAccessToken() {
  return useAuthStore.getState().token;
}

export function saveAccessToken(token: string) {
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
  useAuthStore.getState().setSession(token);
}

export function clearAuthState() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  queryClient.clear();
  useAuthStore.getState().clearSession();
}

function normalizeRedirectTarget(redirect: string | null | undefined, fallback = '/flows') {
  if (!redirect) return fallback;
  if (!redirect.startsWith('/') || redirect.startsWith('//')) return fallback;
  if (redirect === '/login') return fallback;
  return redirect;
}

export function getPostLoginRedirect(search: string, fallback = '/flows') {
  const params = new URLSearchParams(search);
  return normalizeRedirectTarget(params.get('redirect'), fallback);
}

function buildLoginUrl(redirect?: string) {
  const normalizedRedirect = normalizeRedirectTarget(redirect, '');
  return normalizedRedirect
    ? `/login?redirect=${encodeURIComponent(normalizedRedirect)}`
    : '/login';
}

export function redirectToLogin(redirect?: string) {
  clearAuthState();
  const fallbackRedirect =
    redirect ??
    `${window.location.pathname}${window.location.search}${window.location.hash}`;

  window.location.assign(buildLoginUrl(fallbackRedirect));
}

export function logout() {
  redirectToLogin();
}
