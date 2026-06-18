# App Graph Builder

A small "App Graph Builder" UI for the Frontend Intern take-home task — pick an app, view its service graph on an interactive ReactFlow canvas, and edit node details from a right panel that becomes a mobile drawer.

## Tech Stack

React + Vite · TypeScript (strict) · ReactFlow (`@xyflow/react`) · shadcn/ui (Radix + Tailwind) · TanStack Query · Zustand · MSW

## Setup

```bash
npm install
npm run dev
```

If `npm install` fails with an ERESOLVE error, run `npm install --legacy-peer-deps` instead.

### Scripts

```bash
npm run dev         # dev server
npm run build        # typecheck + build
npm run preview       # preview build
npm run lint            # eslint
npm run typecheck        # tsc --noEmit
```

## Key Decisions

- App selector + Node Inspector share one `RightPanel` component, used both as a fixed desktop sidebar and inside the mobile Sheet drawer.
- ReactFlow node/edge state lives in `useGraphState`, synced from TanStack Query; inspector edits write back through the same `updateNodeData` function.
- Slider and numeric input in the inspector share one handler, so they stay in sync and persist straight to `node.data.capacity`.
- Zustand holds only the four required UI keys: `selectedAppId`, `selectedNodeId`, `isMobilePanelOpen`, `activeInspectorTab`.
- A visible "Sim. error" toggle forces the mock API to fail, so the error/retry UI is easy to demo.
