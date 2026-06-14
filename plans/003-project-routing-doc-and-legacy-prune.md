# Plan 003: Document dynamic project routing and prune empty legacy folders

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report; do not improvise. When done, update the status row for this plan in `plans/README.md` unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 69936b2..HEAD -- app/project README.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: `plans/002-content-case-studies-home.md`
- **Category**: dx
- **Planned at**: commit `69936b2`, 2026-06-14

## Why This Matters

The project route system is dynamic, but the local tree currently shows empty per-project route folders like `app/project/goable` and `app/project/socratic`. That makes `app/project` look like two systems at once. A small renderer README plus pruning empty local folders makes the actual architecture obvious: URLs come from MDX slugs, and `app/project/[slug]/page.js` renders every case study.

## Current State

- Dynamic route is the real project route:

```js
app/project/[slug]/page.js:8 export function generateStaticParams() {
app/project/[slug]/page.js:9   return getAllCaseStudySummaries().map((project) => ({
app/project/[slug]/page.js:10     slug: project.slug,
app/project/[slug]/page.js:11   }));
app/project/[slug]/page.js:12 }
```

- Compatibility registry delegates to the same case-study loader:

```js
app/project/projects.js:1 import { getAllCaseStudySummaries, getCaseStudyBySlug, getNextCaseStudy } from "./_lib/caseStudies";
app/project/projects.js:3 export const projectsRegistry = getAllCaseStudySummaries().map((project) => ({
app/project/projects.js:9 export function getProjectBySlug(slug) {
app/project/projects.js:10   return getCaseStudyBySlug(slug);
```

- Local empty folders seen during audit:

```text
app/project/figma-ball-knowledge
app/project/goable
app/project/ihub
app/project/linklog
app/project/socratic
```

- `git ls-files` showed those empty folders are not tracked, so pruning them is a local workspace cleanup unless files appear later.

## Commands You Will Need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Empty folder preflight | `for d in app/project/figma-ball-knowledge app/project/goable app/project/ihub app/project/linklog app/project/socratic; do [ ! -d "$d" ] || find "$d" -mindepth 1 -print; done` | no output |
| Route doc grep | `rg -n "Dynamic route|No per-project route folders|content/case-studies|app/project/\\[slug\\]/page.js" app/project/README.md` | exit 0 |
| Case-study validation | `npm run validate:case-studies` | exit 0; prints `Case study validation passed.` |

Note: `npm run lint` currently exits 1 on pre-existing lint errors outside this plan. Do not fix lint in this plan.

## Scope

**In scope**:
- Create `app/project/README.md`
- Remove the local empty directories `app/project/figma-ball-knowledge`, `app/project/goable`, `app/project/ihub`, `app/project/linklog`, and `app/project/socratic` only if they are empty

**Out of scope**:
- Changing `app/project/[slug]/page.js`
- Changing `app/project/projects.js`
- Changing case-study content
- Editing ignored historical docs under `docs/`
- Deleting any non-empty directory
- Renaming routes or slugs

## Git Workflow

- Branch: `codex/project-routing-doc`
- Suggested commit message: `Document project routing`
- Do not push or open a PR unless the operator asks.

## Steps

### Step 1: Confirm Plan 002 landed

Confirm that case-study content now lives in `content/case-studies` and not under `app/project/_content`.

**Verify**: `test -d content/case-studies && test ! -d app/project/_content` -> exit 0.

### Step 2: Add `app/project/README.md`

Create `app/project/README.md` with a concise map of the project renderer:

- `app/project/[slug]/page.js` is the dynamic route for all case studies.
- Case-study slugs and metadata are loaded from `content/case-studies/*.mdx`.
- There should be no per-project route folders for individual case studies.
- `_lib/` contains loader, validation, and development rendering helpers.
- `_components/` contains route-level case-study composition.
- `_shared/` contains shared case-study layout/navigation/theme pieces.
- `components/contentTypes/` contains MDX-facing blocks used by `CaseText`, `CaseMedia`, `CaseScroll`, `CaseFixed`, and related components.
- `projects.js` is a compatibility registry and should not become a second source of truth.

**Verify**: `rg -n "Dynamic route|No per-project route folders|content/case-studies|app/project/\\[slug\\]/page.js|projects.js" app/project/README.md` -> exit 0.

### Step 3: Prune empty local legacy route folders

Run this preflight:

```bash
for d in app/project/figma-ball-knowledge app/project/goable app/project/ihub app/project/linklog app/project/socratic; do
  [ ! -d "$d" ] || find "$d" -mindepth 1 -print
done
```

If it prints anything, stop and report. If it prints nothing, remove only those empty directories:

```bash
rmdir app/project/figma-ball-knowledge app/project/goable app/project/ihub app/project/linklog app/project/socratic 2>/dev/null || true
```

**Verify**: `find app/project -maxdepth 1 -type d \( -name figma-ball-knowledge -o -name goable -o -name ihub -o -name linklog -o -name socratic \) -print` -> no output.

### Step 4: Validate content still loads

Run the case-study validator.

**Verify**: `npm run validate:case-studies` -> exit 0 and prints `Case study validation passed.`

## Test Plan

No new tests are required. This is a documentation and local empty-folder cleanup. The validator confirms the project loader still reads case studies after Plan 002.

## Done Criteria

- [ ] `app/project/README.md` exists and documents the dynamic route architecture.
- [ ] `app/project/README.md` says there should be no per-project route folders.
- [ ] Empty local legacy route directories are absent, or the executor stopped because they were not empty.
- [ ] `npm run validate:case-studies` exits 0.
- [ ] No route, renderer, or content source files changed.
- [ ] `plans/README.md` status row updated unless the reviewer maintains the index.

## STOP Conditions

Stop and report back if:

- Plan 002 has not landed.
- Any legacy per-project route folder contains files.
- The dynamic route no longer lives at `app/project/[slug]/page.js`.
- The fix appears to require changing runtime route code.

## Maintenance Notes

If project-specific route folders reappear later, reviewers should ask why the dynamic route and MDX slug system are insufficient. Historical ignored docs may still mention old per-project files; do not update ignored backlog docs unless specifically asked.

