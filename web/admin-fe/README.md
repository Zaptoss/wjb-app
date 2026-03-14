# Web



## Stack

| | |
|---|---|
| Build | Vite 6 |
| UI | React 18 + Tailwind CSS |
| Data fetching | TanStack Query v5 |
| HTTP | axios |
| State | Zustand |
| Routing | React Router v6 |
| API client | `@hey-api/openapi-ts` (auto-generated) |


## Local dev

```bash
npm install
npm run dev        # http://localhost:5173
```

`/api/*` запити проксюються на `http://localhost:8000` (налаштовується в [vite.config.ts](vite.config.ts)).

---


## Структура src/

```
src/
├── config.ts              # читає window.__ENV__ (runtime) або VITE_* (dev)
├── router.tsx             # маршрути
├── features/              # вертикальні слайси — один на домен
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── store/
│       ├── api/           # обгортки над згенерованим клієнтом
│       └── index.ts       # публічне API фічі
├── pages/                 # тонкі компоненти-маршрути, лише компонують features/
├── shared/
│   ├── components/        # ui/ та layout/ — перевикористовувані компоненти
│   ├── hooks/
│   ├── lib/
│   │   ├── axios.ts       # єдиний axios instance, baseURL з config.ts
│   │   └── queryClient.ts
│   ├── types/
│   └── utils/
│       └── cn.ts          # clsx + tailwind-merge
└── api-generated/         # НЕ редагувати — перегенеровувати через generate:api
```

**Правило:** `pages/` імпортує з `features/`, `features/` імпортує з `shared/`. Зворотній напрямок заборонений.

---

## Змінні середовища
Env-змінні підставляються при старті контейнера через `docker/entrypoint.sh`, який генерує `/usr/share/nginx/html/config.js` з шаблону `docker/config.js.template`.

`index.html` підключає `config.js`, який створює window.\_\_ENV__. React читає ці значення через `src/config.ts`.

| Змінна | Опис |
|---|---|
| `APP_API_URL` | Base URL бекенду |
| `APP_WS_URL` | WebSocket URL |
| `APP_ENV` | `development` / `staging` / `production` |
| `APP_VERSION` | Версія для логів / Sentry |
| `APP_SENTRY_DSN` | Sentry DSN |
| `APP_FEATURE_FLAGS` | JSON об'єкт: `'{"newDashboard":true}'` |

Для локальної розробки без Docker — відредагуй [public/config.js](public/config.js).

---

## Docker

```bash
# Build
docker build -t web:local .

# Запуск із змінними середовища
docker run -p 3000:80 \
  -e APP_API_URL=http://localhost:8000 \
  -e APP_ENV=staging \
  web:local
```



## API клієнт

Клієнт генерується з OpenAPI spec:

```bash
# З локального файлу (docs/openapi.json за замовчуванням)
npm run generate:api

# З URL
OPENAPI_SPEC_URL=http://localhost:8000/openapi.json npm run generate:api
```

Файли пишуться в `src/api-generated/`. В CI генерація запускається перед збіркою.
