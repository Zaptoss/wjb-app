import axiosLib from 'axios';
import { getConfig } from '@/config';

/**
 * Singleton axios instance used by all API calls in the application.
 *
 * - baseURL is read from window.__ENV__.API_URL via getConfig() — NOT hard-coded.
 * - Auth token is attached via a request interceptor.
 * - 401 responses trigger a global logout redirect.
 *
 * Features that need to call the API should import this instance,
 * not create their own axios instances.
 */
export const axiosInstance = axiosLib.create({
  // Dynamic getter — re-evaluated on every request.
  // This ensures the correct base URL is used even if window.__ENV__ is
  // set asynchronously (e.g. during testing or hot-reload scenarios).
  get baseURL() {
    return getConfig().apiUrl;
  },
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ── Request interceptor: attach Bearer token ──────────────────────────────
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle 401 globally ────────────────────────────
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axiosLib.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);
