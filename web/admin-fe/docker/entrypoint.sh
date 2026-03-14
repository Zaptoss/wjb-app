#!/bin/sh
# Runs before nginx starts; generates /usr/share/nginx/html/config.js
# from the template at /etc/nginx/config.js.template.
#
# All APP_* variables are passed by the container orchestrator
# (docker run -e, docker-compose environment:, Kubernetes env/secretRef).
# NEVER hardcode secrets here.

set -eu

# Provide safe empty defaults so the app can load even if vars are missing.
export APP_API_URL="${APP_API_URL:-}"
export APP_WS_URL="${APP_WS_URL:-}"
export APP_ENV="${APP_ENV:-production}"
export APP_VERSION="${APP_VERSION:-unknown}"
export APP_SENTRY_DSN="${APP_SENTRY_DSN:-}"
# Must be valid JSON: e.g. '{"newDashboard":true}'
export APP_FEATURE_FLAGS="${APP_FEATURE_FLAGS:-{}}"

# Prevent envsubst from replacing nginx variables like $uri or $host.
envsubst \
  '${APP_API_URL} ${APP_WS_URL} ${APP_ENV} ${APP_VERSION} ${APP_SENTRY_DSN} ${APP_FEATURE_FLAGS}' \
  < /etc/nginx/config.js.template \
  > /usr/share/nginx/html/config.js

echo "[entrypoint] config.js written:"
cat /usr/share/nginx/html/config.js

# Hand control to nginx as the main process (PID managed by tini)
exec nginx -g "daemon off;"
