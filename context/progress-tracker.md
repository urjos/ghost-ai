# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 1: Foundation & Design System

## Current Goal

- Feature 07 completed. Next: Feature 08: Editor Workspace Shell (`context/feature-specs/08-editor-workspace-shell.md`).

## Completed

- Clean Next.js boilerplate.
- Feature 01: Design System and UI Primitives (`context/feature-specs/01-design-system.md`)
  - Configured `shadcn/ui` and installed `lucide-react`, `clsx`, `tailwind-merge`, and `@base-ui/react`.
  - Added UI primitive components: `Button`, `Card`, `Dialog`, `Input`, `Tabs`, `Textarea`, `ScrollArea` under `components/ui/`.
  - Implemented reusable `cn()` helper in `lib/utils.ts`.
  - Configured dark-only workspace tokens in `app/globals.css` per `context/ui-context.md`.
  - Verified no type errors and zero light mode fallback.
- Feature 02: Editor Chrome (`context/feature-specs/02-editor-chrome.md`)
  - Implemented `components/editor/editor-navbar.tsx` with fixed-height layout, left/center/right sections, sidebar toggle button using `PanelLeftOpen` / `PanelLeftClose` icons, dark surface background, and subtle bottom border.
  - Implemented `components/editor/project-sidebar.tsx` with floating slide-in positioning, `isOpen` prop, header with `Projects` title and close button, shadcn `Tabs` ("My Projects" and "Shared") with empty placeholder states, and full-width "New Project" button with `Plus` icon.
  - Implemented `components/editor/editor-dialog.tsx` standardizing the dialog pattern using `globals.css` tokens (`bg-elevated`, `border-surface-border`, `text-copy-primary`, `rounded-3xl`) supporting title, description, and footer actions.
  - Verified clean TypeScript compilation, zero ESLint errors, and successful Next.js production build.
- Feature 03: Authentication (`context/feature-specs/03-auth.md`)
  - Installed `@clerk/ui` dependency and wired Clerk `dark` theme from `@clerk/ui/themes` with full token overrides using app CSS custom variables (`--accent-primary`, `--bg-surface`, `--bg-elevated`, etc.) with zero hardcoded colors.
  - Wrapped root layout `app/layout.tsx` with `ClerkProvider`.
  - Implemented Next.js 16 `proxy.ts` at project root with `clerkMiddleware` protecting all routes by default except public routes configured via existing Clerk sign-in and sign-up env vars (`/sign-in(.*)` and `/sign-up(.*)`).
  - Aligned Auth UI with visual design specifications in `components/auth/auth-layout.tsx`: 50/50 split layout on large screens, distinct left surface tone (`bg-surface` with `border-surface-border`), solid brand turquoise logo mark, exact headline and copy, 3 feature rows with rounded icon badges (`Sparkles`, `Share2`, `FileText`), and centered Clerk form on the base dark canvas.
  - Wired typography tokens (`--font-sans`, `--font-heading`, `--font-mono`) from `ui-context.md` into `:root`, `html`, `body`, and Clerk appearance configuration.
  - Created `/sign-in/[[...sign-in]]` and `/sign-up/[[...sign-up]]` catch-all pages using Clerk components.
  - Updated `/` route in `app/page.tsx` to redirect authenticated users to `/editor` and unauthenticated users to `/sign-in`.
  - Added Clerk built-in `UserButton` to `components/editor/editor-navbar.tsx` right section while maintaining intact user menu and profile flows.
  - Verified clean TypeScript checks, zero ESLint errors, and successful Next.js 16 production build (`npm run build`).
- Feature 04: Project Dialogs (`context/feature-specs/04-project-dialogs.md`)
  - Implemented Create Project dialog with project name input and live slug preview.
  - Implemented Rename Project dialog with prefilled name, auto-focus, Enter submission, and current name in description.
  - Implemented Delete Project dialog with destructive confirmation only.
  - Implemented custom project dialogs hook and wired project sidebar actions.
  - Verified clean TypeScript checks and production build.
- Feature 05: Prisma Schema And Data Layer (`context/feature-specs/05-prisma.md`)
  - Created `prisma/models/project.prisma` containing `Project` and `ProjectCollaborator` models with `ProjectStatus` enum (`DRAFT`, `ARCHIVED`), cascade delete relation, unique constraints, and indexes on owner ID, creation date, email, and project date.
  - Implemented `lib/prisma.ts` cached singleton client on `globalThis` with connection branching based on `DATABASE_URL` (`prisma+postgres://` using Accelerate, otherwise direct `@prisma/adapter-pg` via `pg.Pool`).
  - Created and applied first migration `20261012174442_init` to the database and generated Prisma Client.
  - Verified clean TypeScript checks and production Next.js build.
- Feature 06: Project APIs (`context/feature-specs/06-project-apis.md`)
  - Created backend REST endpoints: `GET /api/projects`, `POST /api/projects`, `GET /api/projects/[projectId]`, `PATCH /api/projects/[projectId]`, and `DELETE /api/projects/[projectId]`.
  - Implemented shared data helpers in `lib/projects.ts` (`getUserProjects`, `getProjectById`, `createProject`, `renameProject`, `deleteProject`).
  - Enforced Clerk authentication with `401` status on unauthenticated requests in both `proxy.ts` middleware and API handlers.
  - Enforced project owner authorization checks on mutations with `403` status for non-owners.
  - Implemented default project naming fallback to `Untitled Project` and preserved Prisma CUID ID generation strategy.
  - Verified clean TypeScript compilation, zero ESLint errors, and successful Next.js 16 production build (`npm run build`).
- Feature 07: Editor Home Wiring (`context/feature-specs/07-wire-editor-home.md`)
  - Converted `app/editor/page.tsx` to a server component. Fetches owned and shared projects server-side via `getUserProjects` and `getSharedProjects` helpers, passing both lists to the client view.
  - Added `getSharedProjects(emails)` helper to `lib/projects.ts` querying collaborator membership.
  - Created `hooks/use-project-actions.ts` managing create/rename/delete dialog state, short unique suffix + slugify for room ID generation, `POST /api/projects` create with navigation to new workspace, `PATCH /api/projects/[id]` rename with refresh, and `DELETE /api/projects/[id]` delete with redirect to `/editor` if deleting active workspace.
  - Created `components/editor/editor-home-view.tsx` client component wiring `useProjectActions` to `ProjectSidebar` and all three dialogs.
  - Updated `CreateProjectDialog` to accept `roomId` prop and show "Room ID preview" instead of slug preview.
  - Updated `ProjectSidebar` to accept explicit `ownedProjects` and `sharedProjects` props alongside the legacy `projects` fallback.
  - Fixed pg SSL deprecation warning by switching `sslmode=require` → `sslmode=verify-full` in `.env.local`.
  - Verified zero TypeScript errors, zero ESLint errors, and successful Next.js 16 production build (`npm run build`).

## In Progress

- None (Feature 07 completed).

## Next Up

- Feature 08: Liveblocks / Canvas integration.

## Open Questions

- Add unresolved product or implementation questions here.

## Architecture Decisions

- Add decisions that affect the system design or data model.

## Session Notes

- Add context needed to resume work in the next session.
