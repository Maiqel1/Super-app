# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a **microfrontend monorepo** using Vite Module Federation. The `shell` app acts as the host that dynamically loads the other apps as federated remote modules at runtime.

```
apps/
├── shell    (host, port 3000) — sidebar nav, lazy-loads remote apps
├── todo     (remote, port 3001) — exposed as TodoApp
├── notes    (remote, port 3002) — exposed as NotesApp
└── weather  (remote, port 3003) — exposed as WeatherApp
```

**How federation works:** Each remote app exposes its `App` component via `federation()` in `vite.config.js`. The shell's `vite.config.js` defines `remotes` pointing to `http://localhost:{port}/mf-manifest.json`. React and ReactDOM are shared as singletons (`eager: true`) to prevent duplication. Remote components are imported via `import(...remoteAlias...)` and wrapped in `React.lazy()` + `Suspense`.

**Each remote app** has a `bootstrap.jsx` that renders the React root — this indirection is required by Module Federation to allow async chunk loading before initialization.

## Development

All apps must run simultaneously for the shell to load remotes. Start each in a separate terminal:

```bash
# From each app directory
cd apps/shell && pnpm dev    # http://localhost:3000
cd apps/todo  && pnpm dev    # http://localhost:3001
cd apps/notes && pnpm dev    # http://localhost:3002
cd apps/weather && pnpm dev  # http://localhost:3003
```

Each app can also be developed in isolation by opening its port directly.

## Common Commands

Run from within the specific app directory (`apps/shell`, `apps/todo`, etc.):

```bash
pnpm dev        # start dev server with HMR
pnpm build      # production build to dist/
pnpm preview    # preview production build
pnpm lint       # ESLint check
pnpm serve      # build + serve dist with CORS headers
```

There are no tests currently — the root `pnpm test` is a placeholder.

## Key Patterns

- **State:** Each app manages its own state independently. Shell uses `useState` for active-tab switching. Notes uses `localStorage` for persistence. Zustand is installed but not yet wired up.
- **Routing:** No global router. Only the todo app uses `react-router-dom` internally. Shell switches views via state, not URL.
- **ESLint:** Flat config (`eslint.config.js`) in each app. `no-unused-vars` ignores names starting with uppercase or `_`.
- **pnpm workspaces:** Root `package.json` declares workspace; shared tooling goes at root, app deps in each app's `package.json`.
