# Remove Project Drawer — Implementation Plan

## Goal

Eliminate the project drawer entirely. When a user clicks a bento cell on the **home** page (`BentoGrid`) or the **work** page (`WorkGrid`), they should navigate **directly** to the full case study at `/project/{slug}` — no intermediate drawer/preview step.

This converges the bento grids onto the navigation pattern **already used** by `app/sections/projects.jsx` (wrap card in a `next/link`, fire `playNavigateProject` on click).

---

## Current Architecture (what exists today)

The drawer is wired through a React Context provider mounted at the app root:

```
SiteShell.jsx
  └─ <ProjectDrawerProvider>          ← mounts <ProjectDrawer> + context
       ├─ {children}                   ← pages render here
       │    ├─ BentoGrid  → useProjectDrawer() → openProject(data) on cell click
       │    └─ WorkGrid   → useProjectDrawer() → openProject(data) on cell click
       └─ <ProjectDrawer>              ← vaul bottom-sheet, "Full Case Study" CTA → /project/{slug}
```

- **`BentoCell`** is generic — on click it calls `playNavigateProject()` then `onOpen?.()`. It knows nothing about the drawer.
- The grids pass `onOpen={() => openProject(data)}` and `paused={isDrawerActive}` (pauses the hero video while the drawer covers it).
- The drawer's only navigation exit is its **"Full Case Study"** button → `/project/{slug}`. We are making the cell go there directly and deleting the in-between.

### Files involved

| File | Role | Action |
|---|---|---|
| `app/sections/organisms/ProjectDrawer.jsx` | The drawer component (vaul) | **Delete** |
| `app/ui/ProjectDrawerProvider.jsx` | Context provider + state | **Delete** |
| `app/ui/SiteShell.jsx` | Mounts the provider | **Edit** — remove provider wrapper |
| `app/sections/BentoGrid.jsx` | Home grid | **Edit** — navigate instead of open |
| `app/sections/WorkGrid.jsx` | Work grid | **Edit** — navigate instead of open |
| `app/sections/organisms/BentoCell.jsx` | The clickable cell | **Edit** — render a link, drop `onOpen`/`paused` |
| `package.json` | `vaul` dependency | **Edit** — remove `vaul` (only used by the drawer) |

> **Confirmed by grep:** `vaul` is imported in exactly one file (`ProjectDrawer.jsx`), and `useProjectDrawer` is consumed only by `BentoGrid` and `WorkGrid`. The blast radius is fully contained.

---

## Implementation Steps

### Step 1 — Convert `BentoCell` to navigate directly

`BentoCell` currently renders a `<button>` in three variants (`hero`, `r1`, `r2`) and calls `onOpen` on click. Change it to render a `next/link` to the case study.

**Changes:**
1. Add `import Link from "next/link";` at the top.
2. Replace the `onOpen` prop with an `href` prop (e.g. `href`, built by the parent as `/project/${slug}`). Optionally also accept `comingSoon` to keep the cell non-navigating for unreleased projects.
3. Remove the `paused` prop and all logic that depends on it — see note below.
4. In each of the three `return` branches, swap the `<button type="button" ... onClick={handleClick}>` for:
   ```jsx
   <Link
     href={href}
     className={`${baseClasses} ...existing classes...`}
     onClick={playNavigateProject}
     onMouseEnter={playHover}
     aria-label={`View project: ${title}`}
   >
     ...same children...
   </Link>
   ```
5. Replace `handleClick` (which called `playNavigateProject(); onOpen?.()`) — keep `playNavigateProject` on the link's `onClick` so the sound still fires.

**`paused` decision:** `paused` only existed to stop the hero video while the drawer was open on top of it. With no drawer, there is nothing to pause for — **remove the `paused` prop** and the `useEffect` at lines ~122-125 plus the `paused` guard in the autoplay observer (line ~104). The IntersectionObserver already pauses the video when it scrolls out of view, which is the only behavior still needed.

> **Coming-soon handling:** Check whether any home/work project has `comingSoon: true`. The drawer showed a disabled "Coming Soon" button instead of navigating. If a coming-soon project can appear in these grids, the cell should NOT link (render a `<button>` or a `<div role="button">` that does nothing / shows a toast). If no coming-soon project appears in the bento/work grids, ignore this. **Verify against `app/project/projects.js` before shipping.**

### Step 2 — Update `BentoGrid` (home)

1. Remove `import { useProjectDrawer } from "../ui/ProjectDrawerProvider";`.
2. Remove `const { openProject, isDrawerActive } = useProjectDrawer();`.
3. For every `<BentoCell>` (there are 6 — 3 in the `prefersReducedMotion` branch, 3 in the motion branch):
   - Replace `onOpen={() => openProject(cell.data)}` with `href={`/project/${cell.data.slug}`}`.
   - Remove `paused={isDrawerActive}` from the two hero cells.
4. The `CELL_CONFIG` already carries `slug` per cell, and each `cell.data` has a `slug` field — use `cell.data.slug` (or the config `slug`, they match).

### Step 3 — Update `WorkGrid` (work)

1. Remove `import { useProjectDrawer } from "../ui/ProjectDrawerProvider";`.
2. Remove `const { openProject, isDrawerActive } = useProjectDrawer();`.
3. In the single `<BentoCell>`:
   - Replace `onOpen={() => openProject(project)}` with `href={`/project/${project.slug}`}`.
   - Remove `paused={isDrawerActive}`.

### Step 4 — Remove the provider from `SiteShell`

1. Remove `import { ProjectDrawerProvider } from './ProjectDrawerProvider'`.
2. Unwrap the children — replace `<ProjectDrawerProvider> ... </ProjectDrawerProvider>` with a `<>...</>` fragment (or just return the existing tree without the wrapper).

```jsx
return (
  <>
    <SmoothScroll />
    <WaveErrorBoundary> ... </WaveErrorBoundary>
    <Nav />
    <ViewTransition ...>{children}</ViewTransition>
    <Footer />
  </>
)
```

### Step 5 — Delete the dead files

```
rm app/sections/organisms/ProjectDrawer.jsx
rm app/ui/ProjectDrawerProvider.jsx
```

### Step 6 — Remove the `vaul` dependency

`vaul` is used **only** by `ProjectDrawer.jsx`. After deleting that file:

```bash
npm uninstall vaul
```

This updates `package.json` and `package-lock.json`. (Note: `package.json`/`package-lock.json` already show as modified in git status — coordinate so this change lands cleanly.)

---

## Verification Checklist

After the edits, run the dev server and confirm:

- [ ] **Home page** — clicking the hero, r1, and r2 bento cells navigates straight to `/project/{slug}` (linklog, figma-ball-knowledge, goable respectively). No drawer appears.
- [ ] **Work page** — clicking any card navigates straight to its `/project/{slug}`.
- [ ] **Navigate sound** (`playNavigateProject`) still fires on click; **hover sound** (`playHover`) still fires on mouse-enter.
- [ ] **Hero video** still autoplays when in view and pauses when scrolled out (IntersectionObserver path), with no `paused` prop.
- [ ] **Keyboard / a11y** — cells are focusable links, Enter activates them, `aria-label` preserved.
- [ ] **`prefers-reduced-motion`** branch of `BentoGrid` works (it has its own copy of the 3 cells).
- [ ] **Build is clean** — no leftover imports of `useProjectDrawer`, `ProjectDrawerProvider`, `ProjectDrawer`, or `vaul`. Confirm with:
  ```bash
  grep -rn "useProjectDrawer\|ProjectDrawerProvider\|ProjectDrawer\|vaul\|isDrawerActive\|openProject\|onOpen" app components
  ```
  Should return **zero** results.
- [ ] `next build` / lint passes.

---

## Notes & Edge Cases

- **`ViewTransition` page transitions** stay intact — navigating cell → case study now uses the same route transition as every other internal link (see `[[project_page_transitions]]` memory).
- **Sound on coming-soon:** `projects.jsx` uses `handleComingSoon` instead of `playNavigateProject` for unreleased projects. Mirror that only if a coming-soon project actually surfaces in the bento/work grids.
- **No new dependencies.** This is a pure removal; the project's "do not install new libraries" rule is honored (and `vaul` is removed).
- **Lenis scroll lock** (`useDrawerBodyLock` inside `ProjectDrawer.jsx`) and the `DrawerVideo` HLS-downscale logic die with the file — they were drawer-only and are not referenced elsewhere.
