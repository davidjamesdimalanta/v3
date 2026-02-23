# Font Scale 17px Refactor Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the existing hand-calculated fluid type scale with a mathematically rigorous system based on 17px base, major third (×1.25) on desktop, minor third (×1.2) on mobile, and rename steps to `tiny`, `small`, `p`, `h6`–`h1`.

**Architecture:** All changes are confined to `app/globals.css`. The nine `@utility` blocks for text sizing are replaced in-place. Old names (`text-xs`, `text-sm`, `text-h1`–`text-h6`) are removed — no aliases. `text-button` is kept, mapped to the same clamp as `text-small` + `font-weight: 400`. CLAUDE.md typography table is updated to reflect new names.

**Tech Stack:** CSS `clamp()`, Tailwind CSS v4 `@utility` directives, Next.js 15 (App Router), JavaScript.

---

## Scale Reference

Base: 17px. Viewport range: 375px (mobile) → 1280px (desktop).
All `rem` values use 16px as the html root (browser default).

| Utility | Mobile px | Desktop px | min rem | max rem | Line height |
|---|---|---|---|---|---|
| `text-tiny` | 11.81px | 10.88px | 0.7378rem | 0.68rem | 1.5 |
| `text-small` | 14.17px | 13.6px | 0.8854rem | 0.85rem | 1.5 |
| `text-p` | 17px | 17px | 1.0625rem | 1.0625rem | 1.4 |
| `text-h6` | 20.4px | 21.25px | 1.275rem | 1.3281rem | 1.2 |
| `text-h5` | 24.48px | 26.56px | 1.53rem | 1.6602rem | 1.2 |
| `text-h4` | 29.38px | 33.2px | 1.836rem | 2.0752rem | 1.2 |
| `text-h3` | 35.25px | 41.5px | 2.2032rem | 2.594rem | 1.2 |
| `text-h2` | 42.3px | 51.88px | 2.6438rem | 3.2425rem | 1.1 |
| `text-h1` | 50.76px | 64.85px | 3.1726rem | 4.0531rem | 1.05 |

`text-button`: same clamp as `text-small` + `font-weight: 400`

> Note: `tiny` and `small` have negative fluid slopes — desktop is slightly smaller than mobile. This is intentional: sub-body text is more legible at larger sizes on narrow low-DPI screens.

---

## Task 1: Create git branch

**Files:** none (git operation)

**Step 1: Create and switch to branch**

```bash
git checkout -b refactor/font-scale-17px
```

Expected: `Switched to a new branch 'refactor/font-scale-17px'`

---

## Task 2: Replace text size utilities in globals.css

**Files:**
- Modify: `app/globals.css` (the `RESPONSIVE TEXT UTILITIES (CLAMP)` section, lines ~264–333)

**Step 1: Locate the section to replace**

Find the block between the comment `RESPONSIVE TEXT UTILITIES (CLAMP)` and `RESPONSIVE PADDING`. This contains `text-h1` through `text-button` — all of it gets replaced.

**Step 2: Replace the entire section**

Replace the old utilities block with:

```css
/* ===================================
   RESPONSIVE TEXT UTILITIES (CLAMP)
   =================================== */

/**
 * Fluid type scale: 17px base, minor third (×1.2) mobile, major third (×1.25) desktop.
 * Viewport range: 375px → 1280px. All rem relative to 16px html root.
 */

@utility text-tiny {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(0.7378rem, 0.7618rem + -0.0064vw, 0.68rem);
  line-height: 1.5;
}

@utility text-small {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(0.8854rem, 0.9001rem + -0.0039vw, 0.85rem);
  line-height: 1.5;
}

@utility text-p {
  font-family: var(--font-aspekta), sans-serif;
  font-size: 1.0625rem;
  line-height: 1.4;
}

@utility text-h6 {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(1.275rem, 1.253rem + 0.0059vw, 1.3281rem);
  line-height: 1.2;
}

@utility text-h5 {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(1.53rem, 1.476rem + 0.0144vw, 1.6602rem);
  line-height: 1.2;
}

@utility text-h4 {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(1.836rem, 1.7369rem + 0.0264vw, 2.0752rem);
  line-height: 1.2;
}

@utility text-h3 {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(2.2032rem, 2.0413rem + 0.0432vw, 2.594rem);
  line-height: 1.2;
}

@utility text-h2 {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(2.6438rem, 2.3957rem + 0.0662vw, 3.2425rem);
  line-height: 1.1;
}

@utility text-h1 {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(3.1726rem, 2.8078rem + 0.0973vw, 4.0531rem);
  line-height: 1.05;
}

@utility text-button {
  font-family: var(--font-aspekta), sans-serif;
  font-size: clamp(0.8854rem, 0.9001rem + -0.0039vw, 0.85rem);
  line-height: 1.5;
  font-weight: 400;
}
```

> Note: `text-p` uses a fixed value (not `clamp`) since mobile and desktop are both 17px.

**Step 3: Verify the old utilities are gone**

The following class names must NOT appear anywhere in `globals.css` after the edit:
- `text-xs`
- `text-sm`

Search: `grep -n "text-xs\|text-sm" app/globals.css`
Expected: no matches in `@utility` blocks (only in comments if any).

---

## Task 3: Update CLAUDE.md typography table

**Files:**
- Modify: `CLAUDE.md` (Typography Tokens section)

**Step 1: Replace the Type Scale table**

Find the `### Type Scale (fluid / clamp-based)` section and replace the table with:

```markdown
### Type Scale (fluid / clamp-based)

| Utility class | Mobile size | Desktop size | Line height | Use for |
|---|---|---|---|---|
| `text-h1` | 50.76px (3.17rem) | 64.85px (4.05rem) | 1.05 | Page hero headings |
| `text-h2` | 42.3px (2.64rem) | 51.88px (3.24rem) | 1.1 | Section headings |
| `text-h3` | 35.25px (2.20rem) | 41.5px (2.59rem) | 1.2 | Sub-section headings |
| `text-h4` | 29.38px (1.84rem) | 33.2px (2.08rem) | 1.2 | Card/component headings |
| `text-h5` | 24.48px (1.53rem) | 26.56px (1.66rem) | 1.2 | Nav items, small headings |
| `text-h6` | 20.4px (1.275rem) | 21.25px (1.33rem) | 1.2 | Labels, overlines |
| `text-p` | 17px (1.0625rem) | 17px (1.0625rem) | 1.4 | Body copy |
| `text-small` | 14.17px (0.885rem) | 13.6px (0.85rem) | 1.5 | Secondary text, captions |
| `text-tiny` | 11.81px (0.738rem) | 10.88px (0.68rem) | 1.5 | Micro text, metadata |
| `text-button` | same as `text-small` | same as `text-small` | 1.5 | Button labels (weight 400) |

**Scale:** 17px base · minor third (×1.2) mobile · major third (×1.25) desktop · viewport range 375px–1280px
```

---

## Task 4: Audit component usage

**Files:** read-only audit pass

**Step 1: Find all usages of old utility names in components**

```bash
grep -rn "text-xs\|text-sm\b" app/ components/ --include="*.js" --include="*.jsx" --include="*.tsx" --include="*.ts"
```

**Step 2: For each match, decide the mapping**

| Old name | New name |
|---|---|
| `text-xs` | `text-tiny` |
| `text-sm` | `text-small` |

> `text-h1` through `text-h6`, `text-p`, `text-button` keep the same names — no changes needed in component files for those.

**Step 3: Make replacements**

Replace each occurrence in component files. Use Edit tool per file — do not use global search-replace blindly, read each file to confirm context first.

---

## Task 5: Visual verification

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Check key pages at multiple viewport widths**

Open browser DevTools and resize to:
- 375px (mobile min)
- 768px (mid-point)
- 1280px (desktop max)

Check these pages:
- `/` (home — has `text-h1`, `text-h2`, body copy)
- `/about` (has various heading levels)
- Any case study page (has `text-button`, labels)

**Step 3: Confirm scale feels correct**

At 375px: h1 should be ~50px, body ~17px, small ~14px.
At 1280px: h1 should be ~65px, body ~17px, small ~14px.

---

## Do NOT commit

Per user instruction: do not commit any changes on this branch.
