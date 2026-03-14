/**
 * Typed accessor for runtime configuration injected via window.__ENV__.
 *
 * In Docker: window.__ENV__ is populated by docker/entrypoint.sh at startup
 *            (values come from APP_* environment variables on the container).
 *
 * In local dev (vite dev server): falls back to VITE_* build-time variables
 *            from your .env.local file. This avoids needing to run Docker locally.
 *
 * ONLY this file and shared/lib/axios.ts should ever read runtime config.
 * Do NOT import from this file inside api-generated/ — generated code is
 * environment-agnostic.
 */

declare global {
  interface Window {
    __ENV__?: {
      API_URL: string;
      WS_URL: string;
      ENV: 'development' | 'staging' | 'production';
      VERSION: string;
      SENTRY_DSN: string;
      FEATURE_FLAGS: Record<string, boolean>;
    };
  }
}

export interface AppConfig {
  apiUrl: string;
  wsUrl: string;
  env: 'development' | 'staging' | 'production';
  version: string;
  sentryDsn: string;
  featureFlags: Record<string, boolean>;
}

export function getConfig(): AppConfig {
  const env = window.__ENV__;

  return {
    apiUrl:       env?.API_URL       ?? import.meta.env['VITE_API_URL']    ?? '',
    wsUrl:        env?.WS_URL        ?? import.meta.env['VITE_WS_URL']     ?? '',
    env:          (env?.ENV          ?? import.meta.env['VITE_ENV']        ?? 'development') as AppConfig['env'],
    version:      env?.VERSION       ?? import.meta.env['VITE_VERSION']    ?? 'dev',
    sentryDsn:    env?.SENTRY_DSN    ?? import.meta.env['VITE_SENTRY_DSN'] ?? '',
    featureFlags: env?.FEATURE_FLAGS ?? {},
  };
}

// Convenience singleton — evaluated once at module load.
// Use getConfig() directly if you need the latest value after hot-reload.
export const config = getConfig();
