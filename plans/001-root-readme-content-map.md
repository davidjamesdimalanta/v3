# Plan 001: Replace root README with a content-editing repo map

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report; do not improvise. When done, update the status row for this plan in `plans/README.md` unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat 69936b2..HEAD -- README.md app/project/_template/README.md package.json AGENTS.md`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: docs
- **Planned at**: commit `69936b2`, 2026-06-14

## Why This Matters

The root README is the first repo map a content editor sees, but it still describes a generic create-next-app project. This portfolio's frequent workflow is editing case-study MDX and frontmatter, not editing `app/page.js`. Replacing the README with a short content-first map makes the repo easier for David and future agents to navigate without changing runtime behavior.

## Current State

- `README.md` is generic create-next-app boilerplate:

```text
README.md:1 This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
README.md:19 You can start editing the page by modifying `app/page.js`.
README.md:21 This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
```

- The useful authoring guidance is buried under the case-study template:

```text
app/project/_template/README.md:3 Create a new case study by copying `case-study-template.mdx` into `app/project/_content/{slug}.mdx`.
app/project/_template/README.md:5 Use frontmatter for metadata, reusable media, definitions, personas, and scroll/highlight block data. Use the MDX body for the narrative.
app/project/_template/README.md:9 Run `npm run validate:case-studies` before building to catch missing refs, duplicate ids, non-token colors, and media accessibility gaps.
```

- The repo already has a case-study validation command:

```json
package.json:5 "scripts": {
package.json:6   "dev": "next dev",
package.json:7   "build": "next build",
package.json:9   "lint": "eslint",
package.json:10  "validate:case-studies": "node --no-warnings scripts/validate-case-studies.mjs"
}
```

- Project conventions from `AGENTS.md` that must be reflected accurately:

```text
AGENTS.md:5 Next.js 16 (App Router) portfolio site for David Dimalanta. JavaScript (no TypeScript). Styled with Tailwind CSS v4 via PostCSS.
AGENTS.md:12 app/
AGENTS.md:16   ui/                  shared UI components
AGENTS.md:17   sections/            page-level section components
AGENTS.md:18   project/             case study pages and shared project layout
AGENTS.md:20 components/
AGENTS.md:21   motion-primitives/   third-party animation primitives
```

## Commands You Will Need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Case-study validation | `npm run validate:case-studies` | exit 0; prints `Case study validation passed.` |
| Docs grep | `rg -n "Case Study Editing|app/project/_content|validate:case-studies|Next.js 16|Tailwind CSS v4" README.md` | exit 0; all terms are present |
| Scope check | `git diff --name-only -- README.md app/project/_template/README.md package.json AGENTS.md` | only `README.md` is modified |

Note: `npm run lint` currently exits 1 on pre-existing React hook/static-component lint errors outside this plan. Do not fix lint in this plan.

## Scope

**In scope**:
- `README.md`

**Out of scope**:
- `app/project/_template/README.md`
- `app/project/_content/**`
- `app/project/_lib/caseStudies.js`
- Any source code, package metadata, lockfiles, or formatting-only rewrites

## Git Workflow

- Branch: `codex/readme-content-map`
- Commit message style observed in recent history is short imperative phrases, for example `Update CV link` and `LinkLog case study rewrite`.
- Suggested commit message: `Update repo README`
- Do not push or open a PR unless the operator asks.

## Steps

### Step 1: Replace the generic README

Rewrite `README.md` so it is specific to this portfolio. Keep it concise and practical. Include these sections:

- `# David Dimalanta Portfolio (v3)`
- `## Case Study Editing`
- `## Repo Map`
- `## Commands`
- `## Content Workflow`
- `## Verification Baseline`

The README must state:

- The site is a Next.js 16 App Router portfolio.
- Styling is Tailwind CSS v4 via `app/globals.css`.
- Current case-study content lives in `app/project/_content/*.mdx`.
- The template lives in `app/project/_template/case-study-template.mdx`.
- Run `npm run validate:case-studies` before build or deployment.
- `npm run lint` currently has known pre-existing lint failures, so case-study edits should at minimum pass the validator until lint is separately cleaned up.

Use fenced command examples for:

```bash
npm run dev
npm run validate:case-studies
npm run build
npm run lint
```

**Verify**: `rg -n "Case Study Editing|app/project/_content|app/project/_template/case-study-template.mdx|validate:case-studies|Next.js 16|Tailwind CSS v4" README.md` -> exit 0 with matches for every term.

### Step 2: Preserve the authoring contract

Make sure the README's authoring guidance matches the existing template README:

- Frontmatter stores metadata, media, definitions, personas, and scroll/highlight block data.
- MDX body stores narrative.
- Supported author-facing components include `CaseText`, `CaseMedia`, `CaseScroll`, `CaseFixed`, `CasePersonas`, `CaseHighlights`, `CaseGroup`, and inline `Def`.
- Legacy `:::case-*` directive syntax should not be used.

**Verify**: `rg -n "frontmatter|CaseText|CaseMedia|CaseScroll|CaseFixed|CasePersonas|CaseHighlights|CaseGroup|Def|legacy" README.md` -> exit 0 with matches.

### Step 3: Run the safe validation command

Run the case-study validator.

**Verify**: `npm run validate:case-studies` -> exit 0 and prints `Case study validation passed.`

## Test Plan

No automated tests are required for this docs-only change. The relevant regression check is that the case-study validator still passes and only `README.md` changed.

## Done Criteria

- [ ] `README.md` no longer contains create-next-app boilerplate.
- [ ] `README.md` points content editors to `app/project/_content/*.mdx` and the template file.
- [ ] `README.md` lists the validation command.
- [ ] `npm run validate:case-studies` exits 0.
- [ ] `git diff --name-only -- README.md app/project/_template/README.md package.json AGENTS.md` lists only `README.md`.
- [ ] `plans/README.md` status row updated unless the reviewer maintains the index.

## STOP Conditions

Stop and report back if:

- `README.md` has already been replaced with a portfolio-specific guide.
- The case-study content path is no longer `app/project/_content`.
- `npm run validate:case-studies` fails before you change anything.
- The change appears to require editing source code or package files.

## Maintenance Notes

This README should be updated again if Plan 002 moves case-study content to `content/case-studies`. Reviewers should check that the README remains a working map for a content editor, not a generic Next.js overview.

