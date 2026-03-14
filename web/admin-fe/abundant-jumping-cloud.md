# BetterMe Admin FE — Flow Builder

## Context

Реалізуємо **тільки `web/admin-fe`** — візуальний редактор DAG-флоу для wellness-опитувальника. Бекенд не чіпаємо. "Збереження на сервер" реалізується як заглушка (mock/localStorage), але UI-кнопка присутня і зберігає до IndexedDB як основного сховища.

Поточний стан `web/admin-fe`: порожня заглушка "ADMIN" на `HomePage.tsx`, налаштований React 18 + TypeScript + Tailwind + Zustand + React Query + Vite.

---

## Technology Decisions

| Concern | Decision |
|---|---|
| Graph editor | ReactFlow (`@xyflow/react` v12) |
| Local storage | Dexie.js (IndexedDB wrapper) |
| Global state | Zustand (вже в package.json) |
| Undo/redo | Власний Zustand history middleware |
| Styling | Tailwind CSS (вже в проекті) |
| "Save to server" | Mock — зберігає до IndexedDB, показує success toast |

---

## Що будуємо

### Сторінки
- `/` → redirect до `/flows`
- `/flows` — FlowListPage: список збережених флоу + кнопка "Новий флоу" + Є пагінація можливість дублювати flows або видалити, зробити актимним . Показувати який зараз активний  flows
- `/flows/:id` — FlowEditorPage: повноекранний редактор

### Функціонал FlowEditorPage
1. **Ліва панель** — NodePalette: 4 типи нод (Info Page, Question, Offer), drag-and-drop на канвас
2. **Канвас** (ReactFlow) — drag nodes, pan/zoom, з'єднання портів, dot-grid фон
3. **Права панель** — PropertyPanel: редагування властивостей виділеної ноди
4. **Тулбар** — назва флоу (inline edit), undo/redo кнопки + клавіші, кнопка "Save"
5. **Контекстне меню** (правий клік) — кастомне, залежить від контексту
6. **Undo/redo** — Ctrl+Z / Ctrl+Shift+Z, кнопки в тулбарі
7. **IndexedDB** — авто-збереження drafts після кожної мутації (debounced 300ms)

---

## Структура файлів (тільки нові/змінені)

```
web/admin-fe/src/
  features/
    flows/
      components/
        canvas/
          FlowCanvas.tsx           # ReactFlow root: drop zone, sync to Zustand
          ContextMenu.tsx          # Portal-rendered right-click menu
          nodes/
            InfoNode.tsx           # Yellow — Info Page node
            QuestionNode.tsx       # Blue — Question node (per-option handles)
            OfferNode.tsx          # Green — Offer node
            EndNode.tsx            # Red — terminal node
            index.ts               # nodeTypes map for ReactFlow
          edges/
            ConditionEdge.tsx      # Custom edge with optional condition label
            index.ts               # edgeTypes map
        sidebar/
          NodePalette.tsx          # Left sidebar — draggable tiles
          PropertyPanel.tsx        # Right sidebar — type-switched editor
          panels/
            InfoNodePanel.tsx
            QuestionNodePanel.tsx
            OfferNodePanel.tsx
        toolbar/
          FlowToolbar.tsx          # Name, undo, redo, save button
      hooks/
        useUndoRedo.ts             # Keyboard shortcut bindings
        useFlowPersistence.ts      # Dexie load/save with isDirty tracking
      store/
        flowStore.ts               # Zustand: nodes, edges, selectedId, history
        historyMiddleware.ts       # past/future snapshot stack
      db/
        flowDb.ts                  # Dexie DB definition (flowDrafts + undoHistory)
      types.ts                     # NodeData union, EdgeData, Condition types
    offers/
      data.ts                      # Static catalog of 7 offers (no API needed)
  pages/
    HomePage.tsx                   # Redirect to /flows
    FlowListPage.tsx               # List + create new
    FlowEditorPage.tsx             # Full-screen editor
  router.tsx                       # Add /flows, /flows/:id routes
```

---

## Типи нод

```typescript
// types.ts
type NodeType = 'info' | 'question' | 'offer'
type InfoNodeData = {
  type: 'info'
  title: string
  body: string
}

type QuestionNodeData = {
  type: 'question'
  title: string
  text: string
  answerType: 'single' | 'multi' | 'input'
  dataAttribute: string          // e.g. 'goal', 'activity_level'
  options: {
    id: string
    label: string
  }[]
}

type OfferNodeData = {
  type: 'offer'
  offerId: string
}


type NodeData = InfoNodeData | QuestionNodeData | OfferNodeData | EndNodeData

type EdgeData = {
  conditions: Condition[]
  label?: string
}

type Condition = {
  attribute: string
  operator: 'eq' | 'neq' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains'
  value: string
}
```

---

## Custom Node Design (ReactFlow)

Кожна нода — ReactFlow custom node (`NodeProps<NodeData>`).

| Node | Color | Input handle | Output handle(s) |
|---|---|---|---|
| InfoNode | Yellow `#FEF3C7` | Left (target) | Right, 1 output (source) |
| QuestionNode | Blue `#DBEAFE` | Left (target) | Right, 1 handle per option |
| OfferNode | Green `#D1FAE5` | Left (target) | None (terminal-ish) |


QuestionNode: handles для кожного answer option розташовані вертикально з правого боку, підписані текстом опції.

---

## Zustand Store

```typescript
interface FlowState {
  flowId: string
  flowName: string
  nodes: Node<NodeData>[]
  edges: Edge<EdgeData>[]
  selectedNodeId: string | null
  past: FlowSnapshot[]      // max 50
  future: FlowSnapshot[]

  // Actions (all push snapshot to history before mutating)
  setNodes(nodes: Node[]): void
  setEdges(edges: Edge[]): void
  addNode(node: Node): void
  deleteNode(id: string): void
  updateNodeData(id: string, patch: Partial<NodeData>): void
  addEdge(edge: Edge): void
  deleteEdge(id: string): void
  setSelectedNodeId(id: string | null): void
  setFlowName(name: string): void
  undo(): void
  redo(): void
  loadFlow(draft: FlowDraft): void
}
```

---

## History Middleware

```
Before addNode / deleteNode / updateNodeData / addEdge / deleteEdge:
  snapshot = deepClone({ nodes, edges })
  past     = [...past.slice(-49), snapshot]
  future   = []

undo():
  future = [deepClone(current), ...future]
  restore(past.pop())

redo():
  past = [...past, deepClone(current)]
  restore(future.shift())
```

Keyboard: `useUndoRedo.ts` слухає `keydown` на `document`:
- `Ctrl+Z` → `store.undo()`
- `Ctrl+Shift+Z` або `Ctrl+Y` → `store.redo()`

---

## IndexedDB (Dexie)

```typescript
// Database: "wjb-admin" version 1
interface FlowDraft {
  id: string           // UUID
  name: string
  nodes: SerializedNode[]
  edges: SerializedEdge[]
  updatedAt: string
  isDirty: boolean     // true = local changes, кнопка Save показує dot
}

// Таблиці:
flowDrafts:   { id, name, updatedAt, isDirty }
// undoHistory зберігається в пам'яті (не персистується між сесіями)
```

**Стратегія:**
- Кожна мутація Zustand → debounced 300ms write до `flowDrafts` з `isDirty=true`
- На mount `FlowEditorPage` → зчитати з Dexie; якщо `isDirty=true` — показати banner "Є незбережені зміни"
- "Save" натискання → `isDirty=false` у Dexie (mock save, без реального API)
- `FlowListPage` читає список флоу з Dexie

---

## Right-Click Context Menu

Portal (`createPortal`) в `document.body`, позиція = mouse coords. Закривається на `Escape`, click outside, blur.

**На порожньому канвасі:**
- Add Info Page
- Add Question
- Add Offer
- ─────
- Paste (якщо є в clipboard-стані)

**На ноді (right-click на ноді):**
- Edit Properties → відкриває PropertyPanel для цієї ноди
- Duplicate Node
- Delete Node
- ─────
- Copy Flow → копіює весь флоу у Zustand clipboard

**На ребрі:**
- Delete Edge
- Edit Conditions → відкриває умови переходу в PropertyPanel

---

## PropertyPanel (права сторінка)

Відображається коли вибрана нода (`selectedNodeId !== null`). Перемикається по `type`:

**InfoNodePanel**: поля — `title` (input), `body` (textarea)

**QuestionNodePanel**: поля — `title`, `text`, `answerType` (radio: single/multi/input), `dataAttribute` (input з підказкою), динамічний список `options` (кожен — label input + кнопка видалити), кнопка "Add Option"

**OfferNodePanel**: `<select>` з 7 оферів із `offers/data.ts`

**EndNodePanel**: read-only повідомлення "Terminal node"

Всі зміни → dispatch до Zustand одразу (controlled inputs).

---

## FlowListPage

- Читає всі `flowDrafts` з Dexie
- Показує картки: назва флоу, дата оновлення, бейдж "Unsaved" якщо `isDirty`
- Кнопка "New Flow" → створює новий draft у Dexie + navigates to `/flows/:id`
- Клік на картку → `/flows/:id`
- Видалення флоу з контекстного меню картки

---

## Каталог оферів (статичні дані)

```typescript
// features/offers/data.ts
export const OFFERS = [
  { id: 'offer_1', name: 'Weight Loss Starter',    category: 'weight',   tagline: '4-week home plan' },
  { id: 'offer_2', name: 'Lean Strength Builder',  category: 'strength', tagline: 'Gym progression program' },
  { id: 'offer_3', name: 'Low-Impact Fat Burn',    category: 'joint',    tagline: 'Knee & back friendly' },
  { id: 'offer_4', name: 'Run Your First 5K',      category: 'cardio',   tagline: 'Outdoor running plan' },
  { id: 'offer_5', name: 'Yoga & Mobility',        category: 'yoga',     tagline: 'Flexibility + posture' },
  { id: 'offer_6', name: 'Stress Reset Program',   category: 'stress',   tagline: 'Breathing & mindfulness' },
  { id: 'offer_7', name: 'Quick Fit Micro-Workouts', category: 'micro',  tagline: '10-15 min daily' },
]
```

---

## Packages to Install

```bash
npm install @xyflow/react dexie
# (zustand, tailwind, react-router-dom вже є в package.json)
```

---

## Implementation Phases

### Phase 1 — Foundation
1. Install `@xyflow/react` та `dexie`
2. Створити `types.ts`
3. Створити `flowDb.ts` (Dexie schema)
4. Створити `flowStore.ts` + `historyMiddleware.ts` (Zustand)
5. Оновити `router.tsx` (додати `/flows`, `/flows/:id`)

### Phase 2 — Flow List
6. Створити `FlowListPage.tsx` (читає Dexie, create new flow)
7. Оновити `HomePage.tsx` (redirect to `/flows`)

### Phase 3 — Canvas & Nodes
8. Створити 4 custom node components (`InfoNode`, `QuestionNode`, `OfferNode`, `EndNode`)
9. Створити `ConditionEdge.tsx`
10. Створити `FlowCanvas.tsx` (ReactFlow + drop handler + connect handler)

### Phase 4 — Sidebar & Toolbar
11. Створити `NodePalette.tsx` (drag tiles)
12. Створити `PropertyPanel.tsx` + 4 sub-panels
13. Створити `FlowToolbar.tsx` (name edit + undo/redo + save button)

### Phase 5 — Context Menu & UX
14. Створити `ContextMenu.tsx` (right-click portal)
15. Створити `useUndoRedo.ts` (keyboard shortcuts)
16. Створити `useFlowPersistence.ts` (debounced Dexie writes + dirty banner)
17. Зібрати `FlowEditorPage.tsx` (combine всі компоненти)

### Phase 6 — Polish
18. Responsive layout (sidebar collapse on small screens)
19. Toast notifications (save success, error)
20. Empty state на FlowListPage
21. Демо-флоу (seed при першому запуску)

---

## Critical Files

- `web/admin-fe/src/features/flows/store/flowStore.ts` — ядро стану
- `web/admin-fe/src/features/flows/components/canvas/FlowCanvas.tsx` — ReactFlow root
- `web/admin-fe/src/features/flows/db/flowDb.ts` — IndexedDB persistence
- `web/admin-fe/src/features/flows/types.ts` — всі типи нод/ребер

---

## Verification

1. `npm run dev` в `web/admin-fe`
2. Відкрити `http://localhost:5173` → редирект на `/flows`
3. Натиснути "New Flow" → перехід до `/flows/:uuid`
4. Drag node з палітри → нода з'являється на канвасі
5. З'єднати два вузли → ребро з'являється
6. Редагувати властивості у правій панелі → нода оновлюється
7. Ctrl+Z → відміна останньої дії
8. Правий клік → контекстне меню
9. Закрити вкладку → перевідкрити → draft відновлено з IndexedDB
10. Натиснути "Save" → `isDirty=false`, dot зникає
