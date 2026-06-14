# Plan 004: Document component ownership boundaries

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report; do not improvise. When done, update the status row for this plan in `plans/README.md` unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 69936b2..HEAD -- app/ui app/sections app/project/README.md AGENTS.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/003-project-routing-doc-and-legacy-prune.md`
- **Category**: dx
- **Planned at**: commit `69936b2`, 2026-06-14

## Why This Matters

The repo has several component buckets with overlapping names: `app/ui`, `app/sections`, `app/project/_components`, `app/project/_shared`, `app/project/components`, and `components/motion-primitives`. The code may be valid, but navigation cost is high for a content-heavy portfolio. Documenting ownership boundaries first is lower risk than moving components immediately and gives future refactors a clear target.

## Current State

- `AGENTS.md` gives a high-level component map:

```text
AGENTS.md:16 app/ui/                  Shared UI components (Nav, Footer, Button, etc.)
AGENTS.md:17 app/sections/            Page-level section components
AGENTS.md:18 app/project/             Case study pages and shared project layout
AGENTS.md:20 components/
AGENTS.md:21   motion-primitives/     Third-party animation primitives
```

- `SiteShell` shows `app/ui` owns global site chrome and cross-page behavior:

```js
app/ui/SiteShell.jsx:5 import SiteNav from './SiteNav'
app/ui/SiteShell.jsx:6 import SmoothScroll from './SmoothScroll'
app/ui/SiteShell.jsx:7 import WaveBackground from './WaveBackground'
app/ui/SiteShell.jsx:8 import Footer from './Footer'
app/ui/SiteShell.jsx:9 import PageTransition from './PageTransition'
```

- Home page sections import from `app/sections`:

```js
app/page.js:1 import HomepageHero from "./sections/HomepageHero";
app/page.js:2 import AllProjects from "./sections/AllProjects";
```

- Case-study MDX components compose project renderer internals:

```js
app/project/_components/CaseStudyMdxComponents.jsx:6 import CaseStudyTextBlock from "../components/contentTypes/CaseStudyTextBlock";
app/project/_components/CaseStudyMdxComponents.jsx:7 import CaseStudyMediaBlock from "../components/contentTypes/CaseStudyMediaBlock";
app/project/_components/CaseStudyMdxComponents.jsx:9 import { CaseStudySectionBlock, CaseStudySectionBlockFixed } from "../components/contentTypes/CaseStudySectionBlock";
```

- `components/motion-primitives` is a separate root package-like bucket:

```text
components/motion-primitives/animated-group.tsx
components/motion-primitives/cursor.tsx
components/motion-primitives/morphing-dialog.tsx
components/motion-primitives/text-loop.tsx
components/motion-primitives/text-scramble.tsx
```

## Commands You Will Need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Boundary doc grep | `rg -n "Shared site UI|Page sections|Case-study renderer|motion-primitives|Do not put case-study content here" app/ui/README.md app/sections/README.md app/project/README.md` | exit 0 |
| Case-study validation | `npm run validate:case-studies` | exit 0; prints `Case study validation passed.` |
| Scope check | `git diff --name-only -- app/ui/README.md app/sections/README.md app/project/README.md` | only those README files are modified/created |

Note: `npm run lint` currently exits 1 on pre-existing lint errors outside this plan. Do not fix lint in this plan.

## Scope

**In scope**:
- Create `app/ui/README.md`
- Create `app/sections/README.md`
- Expand the `app/project/README.md` created by Plan 003

**Out of scope**:
- Moving or renaming components
- Deleting duplicate or legacy-looking files such as `app/ui/nav.js`
- Editing `components/motion-primitives/**`
- Editing source JSX/TSX behavior
- Fixing lint errors
- Changing imports

## Git Workflow

- Branch: `codex/component-boundary-docs`
- Suggested commit message: `Document component boundaries`
- Do not push or open a PR unless the operator asks.

## Steps

### Step 1: Confirm Plan 003 landed

Confirm `app/project/README.md` exists and says the project route is dynamic.

**Verify**: `rg -n "Dynamic route|No per-project route folders" app/project/README.md` -> exit 0.

### Step 2: Add `app/ui/README.md`

Create a concise README that says `app/ui` is for shared site UI and cross-page behavior. Include:

- Global chrome: `SiteNav`, `Footer`, `SiteShell`
- Global effects/providers: `SmoothScroll`, `WaveBackground`, `PageTransition`, `ThemeProvider`
- Reusable primitives local to this app: `Button`, `SkillTag`, `AudioPermissionButton`, `ThemeToggle`, `text-shimmer`
- Hooks under `app/ui/hooks`
- Low-level helpers under `app/ui/lib`
- Storybook stories under `app/ui/stories`

Also state:

- Do not put case-study narrative content here.
- Do not add one-off page sections here; those belong in `app/sections` or the relevant route folder.
- Prefer `SiteNav.jsx` for active site navigation; legacy-looking files should not be deleted unless a separate plan verifies imports.

**Verify**: `rg -n "Shared site UI|SiteNav|Footer|SiteShell|hooks|lib|Do not put case-study content here" app/ui/README.md` -> exit 0.

### Step 3: Add `app/sections/README.md`

Create a concise README that says `app/sections` is for page-level composition used by homepage/about/work surfaces. Include:

- Top-level sections such as `HomepageHero`, `AllProjects`, `BentoGrid`, `WorkGrid`, and about sections.
- `app/sections/organisms` is for larger section-owned components such as bento cells and project cards.
- Sections may consume case-study summaries from `app/project/_lib/caseStudies.js`, but they should not own case-study source content.
- Cross-page primitives should stay in `app/ui`.
- Case-study renderer components should stay in `app/project`.

**Verify**: `rg -n "Page sections|HomepageHero|AllProjects|organisms|case-study summaries|app/ui|app/project" app/sections/README.md` -> exit 0.

### Step 4: Expand `app/project/README.md`

Add a `Component Boundaries` section to the existing project README. Include:

- `_components/`: route-level case-study composition, including MDX provider/bridge components.
- `_shared/`: shared case-study layout/navigation/theme context.
- `components/`: project renderer components.
- `components/contentTypes/`: MDX-facing content blocks.
- `_lib/`: filesystem loader, validation, and development rendering helpers.
- `projects.js`: compatibility registry only; do not add new source-of-truth content here.
- `content/case-studies`: author-facing content home after Plan 002.

**Verify**: `rg -n "Component Boundaries|_components|_shared|components/contentTypes|_lib|projects.js|content/case-studies" app/project/README.md` -> exit 0.

### Step 5: Validate no behavior changed

Run the case-study validator.

**Verify**: `npm run validate:case-studies` -> exit 0 and prints `Case study validation passed.`

## Test Plan

No new tests are required. This is documentation only. The validator confirms the documented case-study loader still works after the earlier plans.

## Done Criteria

- [ ] `app/ui/README.md` exists and documents shared site UI ownership.
- [ ] `app/sections/README.md` exists and documents page-section ownership.
- [ ] `app/project/README.md` contains a `Component Boundaries` section.
- [ ] The docs explicitly say case-study content belongs in `content/case-studies`, not component folders.
- [ ] No JSX/TSX/JS source behavior changed.
- [ ] `npm run validate:case-studies` exits 0.
- [ ] `plans/README.md` status row updated unless the reviewer maintains the index.

## STOP Conditions

Stop and report back if:

- `app/project/README.md` does not exist because Plan 003 has not landed.
- The component folders have already been substantially reorganized.
- Writing accurate docs would require moving or deleting source files.
- `npm run validate:case-studies` fails before you make changes.

## Maintenance Notes

These docs are meant to reduce navigation cost before any future component refactor. If later work moves components, update these READMEs in the same PR as the move so they remain trustworthy.

