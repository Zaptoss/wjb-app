# ─── Stage 1: Build ──────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package.json package-lock.json ./

# Reproducible install — fails if lockfile is outdated
RUN npm ci --frozen-lockfile

# Copy source (after npm ci so dependency layer is cached independently)
COPY . .

# Vite production build
# Only VITE_APP_VERSION and similar build-time-only vars should be set here.
# Runtime config (API_URL, feature flags, etc.) must NOT be baked in.
RUN npm run build

# ─── Stage 2: Runtime ────────────────────────────────────────────────────────
FROM nginx:1.25-alpine AS runtime

# tini: proper PID 1 — forwards signals, reaps zombies
# gettext: provides envsubst for runtime variable substitution
RUN apk add --no-cache tini gettext

# Nginx configuration
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Built static assets from Stage 1
COPY --from=builder /app/dist /usr/share/nginx/html

# Runtime entrypoint that generates config.js from APP_* environment variables
COPY docker/entrypoint.sh /docker-entrypoint-custom.sh
RUN chmod +x /docker-entrypoint-custom.sh

# Template for window.__ENV__ — envsubst fills in APP_* placeholders at startup
COPY docker/config.js.template /etc/nginx/config.js.template

# Ensure nginx can write its temp/pid files
RUN mkdir -p /var/cache/nginx/client_temp \
             /var/cache/nginx/proxy_temp \
             /var/run \
  && chown -R nginx:nginx /var/cache/nginx /var/run /usr/share/nginx/html

EXPOSE 80

# tini as PID 1, then our entrypoint script which execs nginx
ENTRYPOINT ["/sbin/tini", "--", "/docker-entrypoint-custom.sh"]
