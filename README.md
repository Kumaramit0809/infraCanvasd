# InfraCanvas

A production-quality infrastructure visualization dashboard built with React, ReactFlow, and a fully mocked API layer. Browse applications, explore their service topology on an interactive canvas, and inspect/edit individual node configuration and runtime settings.

## Tech Stack

- **React 19 + Vite** — build tooling and dev server
- **TypeScript (strict mode)** — full type safety, no `any`
- **@xyflow/react (ReactFlow v12)** — interactive node/edge canvas
- **Zustand** — minimal global UI state (selection, panels, tabs)
- **TanStack Query** — data fetching, caching, loading states
- **shadcn/ui (Radix primitives) + Tailwind CSS** — UI components and design system
- **Mock Service Worker (MSW)** — simulated REST API with latency

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

### Other scripts

```bash
npm run build      # type-check + production build
npm run preview    # preview the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

## Architecture

```
src/
├── app/                  # (reserved for app-level providers/config)
├── components/
│   ├── layout/           # TopNav, SideRail — global chrome
│   ├── canvas/            # ReactFlow canvas + custom ServiceNode
│   ├── inspector/         # Right-side node inspector (config/runtime tabs)
│   ├── app-selector/       # Floating "Application" panel + search/list
│   └── ui/                 # Low-level shadcn-style primitives (Sheet, icons)
├── hooks/
│   └── useGraphState.ts    # Wraps useGraph query + ReactFlow node/edge state
├── store/
│   └── useAppStore.ts      # Zustand store: selection + UI state
├── services/
│   └── api.ts               # TanStack Query hooks (useApps, useGraph)
├── mocks/
│   ├── handlers.ts          # MSW request handlers (GET /apps, GET /apps/:id/graph)
│   └── browser.ts            # MSW worker setup
├── types/
│   └── index.ts               # Shared TS types (App, ServiceNodeData, Graph, etc.)
├── pages/
│   └── DashboardPage.tsx       # Top-level page composing all panels
└── lib/
    └── utils.ts                  # `cn` class-merging helper
```

### Data flow

1. `useApps()` fetches the list of applications (`GET /api/apps`), rendered in the floating **Application** panel.
2. Selecting an app updates `selectedAppId` in the Zustand store.
3. `useGraphState(appId)` calls `useGraph(appId)` (`GET /api/apps/:id/graph`) and syncs the result into ReactFlow's `useNodesState` / `useEdgesState`. Re-fetches automatically whenever `appId` changes (TanStack Query key includes `appId`).
4. Clicking a node sets `selectedNodeId`; the **Inspector** (desktop sidebar or mobile Sheet) reads that node's data.
5. Editing a field in the Inspector (name, description, status, slider/numeric capacity) calls `updateNodeData`, which patches the corresponding node's `data` directly in ReactFlow state — so the canvas card and inspector stay in sync instantly.

## Key Design Decisions

- **Controlled ReactFlow state lives in `useGraphState`**, not inside the `Canvas` component, so the Inspector and Canvas can share/mutate the same node data without prop-drilling callbacks through multiple layers.
- **Slider ↔ numeric input sync**: both controls in the Runtime tab write to the same `sliderValue` field on the node's data via `updateNodeData`, guaranteeing they always agree.
- **Responsive inspector**: a `resize` listener toggles between a fixed right-hand panel (desktop, ≥1024px) and a Radix `Sheet` drawer (mobile/tablet), both driven by the same `selectedNodeId` state.
- **Node deletion**: `Delete`/`Backspace` removes the selected node and any edges attached to it, then clears selection.
- **Mock API** simulates realistic network latency (600–700ms) and is wired through MSW's service worker so the app behaves like it's talking to a real backend, including TanStack Query's loading/cache/refetch behavior.
- **Theme tokens** (`bg`, `panel`, `card`, `border`, `muted`, `success`, `error`, `accent`) are defined once in `tailwind.config.js` and reused everywhere for consistency with the source screenshot.

## Limitations

- Random error simulation in MSW handlers is stubbed out (latency-only) to keep the demo deterministic; it can be re-enabled by adding a probabilistic `HttpResponse.json(..., { status: 500 })` branch in `mocks/handlers.ts`.
- Node edits (name, description, status, capacity) are held in ReactFlow's in-memory state only — there's no persistence/mutation endpoint, since the spec only required mock `GET` endpoints.
- The MiniMap and Controls are included as ReactFlow conveniences; they're not explicitly in the screenshot but don't conflict with the layout and are commonly expected in canvas UIs.
- Only one graph dataset is defined (cloned across all 5 apps) since the spec didn't require per-app unique topologies.
