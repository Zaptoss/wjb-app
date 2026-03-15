# User-FE: Wellness Quiz Funnel

## Context
Build the user-facing frontend for a personalized wellness journey funnel. Users click ads on Instagram/Facebook, land in an in-app browser, answer a series of branching questions, and receive a personalized offer. The app must be mobile-first and support back navigation with answer changes.

## User API (from provided OpenAPI spec)
- `POST /api/sessions` → `CreateSessionResponse` (sessionId + first node)
- `POST /api/sessions/{sessionId}/answers` → `SessionStepResponse` (next node or final offer)
  - Body: `AnswerRequest` (nodeId + answer values)

## Architecture

### Routing (single-page flow, state-driven)
Update `src/router.tsx`: `/` → `QuizPage` (replaces HomePage)

### State Management — Zustand Store
`src/features/quiz/store/quizStore.ts`

**State shape:**
- `sessionId` — from POST /api/sessions
- `currentNode` — the node being displayed
- `history: HistoryEntry[]` — ordered list of {nodeId, node, answer}
- `currentIndex` — pointer into history (for back nav)
- `isOffer` / `offer` — final offer state
- `isSubmitting` / `error` — loading states

**Back navigation logic:**
1. `goBack()` — decrement `currentIndex`, show historical node with pre-filled answer
2. Same answer → skip API call, increment `currentIndex`
3. Changed answer → truncate history after current index, POST new answer to server, push new response

### API Layer
`src/features/quiz/api/quizApi.ts` — raw functions using existing `axiosInstance`
`src/features/quiz/api/useQuizMutations.ts` — React Query `useMutation` hooks:
- `useCreateSession()` — auto-triggered on QuizPage mount
- `useSubmitAnswer()` — triggered on "Next"/"Continue"

### Components

**Layout** (`src/features/quiz/components/layout/`):
- `QuizLayout.tsx` — full-screen mobile shell, safe-area insets, `max-w-md mx-auto` on desktop, flex column: header | scrollable content | sticky bottom bar
- `QuizHeader.tsx` — back button + progress bar
- `ProgressBar.tsx` — animated width bar

**Node Renderers** (`src/features/quiz/components/nodes/`):
- `NodeRenderer.tsx` — switch on `node.type` + `node.questionType`, handles slide transitions
- `SingleChoiceNode.tsx` — vertical list of tappable OptionCards, pre-fills on revisit
- `MultiChoiceNode.tsx` — toggle cards with checkboxes, min 1 required
- `InputNode.tsx` — text/number input field
- `InfoPageNode.tsx` — title + description + optional image + "Continue"
- `OfferPage.tsx` — personalized plan, wellness kit, CTA button (no back, progress 100%)

**Shared UI** (`src/features/quiz/components/ui/`):
- `OptionCard.tsx` — tappable card (label + optional image), selected state highlight, min 48px touch target
- `QuizButton.tsx` — full-width primary action, sticky bottom
- `NodeImage.tsx` — optional image with aspect-ratio, lazy loading

### Types
`src/features/quiz/types.ts`:
- `NodeType`: `'question' | 'info_page'`
- `QuestionInputType`: `'single_choice' | 'multi_choice' | 'input'`
- `SessionNode`: id, type, title, description?, imageUrl?, questionType?, options?, inputPlaceholder?
- `NodeOption`: id, label, value, imageUrl?
- `OfferData`: id, title, description, planDetails, kitDetails, ctaUrl, ctaLabel
- `AnswerValue`: discriminated union (single_choice | multi_choice | input)
- `HistoryEntry`: nodeId, node, answer
- API types: `CreateSessionResponse`, `SessionStepResponse`, `AnswerRequest`

## File Structure
```
src/features/quiz/
  index.ts
  types.ts
  store/
    quizStore.ts
  api/
    quizApi.ts
    useQuizMutations.ts
  components/
    layout/
      QuizLayout.tsx
      QuizHeader.tsx
      ProgressBar.tsx
    nodes/
      NodeRenderer.tsx
      SingleChoiceNode.tsx
      MultiChoiceNode.tsx
      InputNode.tsx
      InfoPageNode.tsx
      OfferPage.tsx
    ui/
      OptionCard.tsx
      QuizButton.tsx
      NodeImage.tsx
src/pages/QuizPage.tsx          # replaces HomePage
src/router.tsx                  # update "/" route
```

## Implementation Order
1. Types (`types.ts`)
2. Zustand store (`quizStore.ts`)
3. API layer (`quizApi.ts`, `useQuizMutations.ts`)
4. Layout components (`QuizLayout`, `QuizHeader`, `ProgressBar`)
5. `QuizPage.tsx` + router update
6. Node renderers (SingleChoice → MultiChoice → Input → InfoPage → Offer)
7. Slide transitions between steps
8. Mobile polish: safe-area CSS, `100dvh`, sticky bottom fixes for in-app browsers

## Mobile/In-App Browser Considerations
- Use `position: sticky` (not fixed) for bottom button — safer in iOS WebViews
- Use `100dvh` for viewport height (dynamic viewport, handles browser chrome)
- Safe-area insets via `env(safe-area-inset-*)` in `index.css`
- All touch targets min 48px
- Lazy-load images with explicit aspect-ratio to prevent layout shift
- No auth needed — session API is public; existing axios 401 interceptor won't interfere

## Verification
1. `npm run dev` — app loads, session created automatically, first node renders
2. Answer questions — each answer POSTs to server, next node appears
3. Back button — navigates to previous node with pre-filled answer
4. Change answer — truncates history, re-submits, new branch loads
5. Reach offer page — renders plan + kit + CTA
6. Test on mobile viewport (Chrome DevTools device mode) for responsive behavior
