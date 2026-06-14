# Plan 002: Move case-study authoring files to `content/case-studies`

> **Executor instructions**: Follow this plan step by step. Run every verification command and confirm the expected result before moving to the next step. If anything in the "STOP conditions" section occurs, stop and report; do not improvise. When done, update the status row for this plan in `plans/README.md` unless a reviewer dispatched you and told you they maintain the index.
>
> **Drift check (run first)**: `git diff --stat eb5cbbf..HEAD -- README.md app/project/_content app/project/_template app/project/_lib/caseStudies.js app/project/[slug]/page.js`
> If any in-scope file changed since this plan was written, compare the "Current state" excerpts against the live code before proceeding; on a mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: M
- **Risk**: MED
- **Depends on**: `plans/001-root-readme-content-map.md`
- **Category**: tech-debt
- **Planned at**: commit `eb5cbbf`, 2026-06-14

## Why This Matters

The case-study system is logically structured, but the author-facing MDX files are nested inside `app/project` beside route code, renderer components, and private libraries. Public Next.js portfolio repos commonly keep content in a simpler top-level content/data area while keeping route/rendering code under `app` or `pages`. Moving only the authoring files to `content/case-studies` makes the repo easier for content editing without changing the rendered URLs.

## Current State

- Case-study files are currently read from `app/project/_content`:

```js
app/project/_lib/caseStudies.js:11 const __filename = fileURLToPath(import.meta.url);
app/project/_lib/caseStudies.js:12 const __dirname = path.dirname(__filename);
app/project/_lib/caseStudies.js:13 const CONTENT_DIR = path.join(__dirname, "../_content");
```

- The dynamic project route imports MDX from the nested `_content` folder:

```js
app/project/[slug]/page.js:48 const MdxContent = caseStudy.content && !caseStudy.comingSoon
app/project/[slug]/page.js:49   ? (await import(`../_content/${slug}.mdx`)).default
app/project/[slug]/page.js:50   : null;
```

- The template README points authors into the nested folder:

```text
app/project/_template/README.md:3 Create a new case study by copying `case-study-template.mdx` into `app/project/_content/{slug}.mdx`.
```

- Current top-level case-study files:

```text
app/project/_content/figma-ball-knowledge.mdx
app/project/_content/goable.mdx
app/project/_content/ihub.mdx
app/project/_content/linklog.mdx
app/project/_content/socratic.mdx
app/project/_content/yfga.mdx
```

- Current URL behavior must not change. Routes are generated from slugs:

```js
app/project/[slug]/page.js:8 export function generateStaticParams() {
app/project/[slug]/page.js:9   return getAllCaseStudySummaries().map((project) => ({
app/project/[slug]/page.js:10     slug: project.slug,
app/project/[slug]/page.js:11   }));
app/project/[slug]/page.js:12 }
```

## Commands You Will Need

| Purpose | Command | Expected on success |
|---------|---------|---------------------|
| Case-study validation | `npm run validate:case-studies` | exit 0; prints `Case study validation passed.` |
| Slug load check | `node --input-type=module -e "import('./app/project/_lib/caseStudies.js').then((m) => console.log(m.getAllCaseStudySummaries().map((p) => p.slug).sort().join(',')))"` | exit 0; prints `figma-ball-knowledge,goable,ihub,linklog,socratic,yfga` |
| Old path check | `find app/project -maxdepth 2 \( -name _content -o -name _template \) -print` | no output |
| Active reference check | `rg -n "app/project/_content|app/project/_template|../_content" README.md app scripts mdx-components.js next.config.mjs` | no output |

Note: `npm run lint` currently exits 1 on pre-existing lint errors outside this plan. Do not fix lint in this plan.

## Scope

**In scope**:
- Move `app/project/_content/*.mdx` to `content/case-studies/*.mdx`
- Move `app/project/_template/README.md` to `content/case-studies/README.md`
- Move `app/project/_template/case-study-template.mdx` to `content/case-studies/_template/case-study-template.mdx`
- `app/project/_lib/caseStudies.js`
- `app/project/[slug]/page.js`
- `README.md`

**Out of scope**:
- Changing MDX frontmatter content
- Changing project slugs or URLs
- Changing case-study renderer components
- Changing assets or media URLs
- Fixing lint errors
- Moving `mdx-components.js`
- Moving `app/project/components/**`, `_components/**`, `_shared/**`, or `_lib/**`

## Git Workflow

- Branch: `codex/content-case-studies-home`
- Suggested commit message: `Move case study content`
- Do not push or open a PR unless the operator asks.

## Steps

### Step 1: Preflight and preserve existing dirty in-scope files

Run both commands:

```bash
git status --short
git status --short -- README.md app/project/_content app/project/_template app/project/_lib/caseStudies.js 'app/project/[slug]/page.js'
```

This checkout should be clean at the start of the plan. If unrelated uncommitted edits appear, do not revert them. Record both command outputs in your final report and do not touch out-of-scope dirty files. If the tree is clean and all verification passes, create the plan commit.

**Verify**: both commands exit 0. The full status may show unrelated dirty files; keep them out of your edits.

### Step 2: Move the authoring files

Create the new top-level content home and move files:

```bash
mkdir -p content/case-studies/_template
git mv app/project/_content/*.mdx content/case-studies/
git mv app/project/_template/README.md content/case-studies/README.md
git mv app/project/_template/case-study-template.mdx content/case-studies/_template/case-study-template.mdx
rmdir app/project/_content app/project/_template
```

If `rmdir` fails because the folders contain unexpected files, stop and report rather than deleting them.

**Verify**: `find content/case-studies -maxdepth 2 -type f | sort` includes the six case-study MDX files, `README.md`, and `_template/case-study-template.mdx`.

### Step 3: Update the content loader path

In `app/project/_lib/caseStudies.js`, change `CONTENT_DIR` so it points to the new top-level content folder:

```js
const CONTENT_DIR = path.join(__dirname, "../../../content/case-studies");
```

Do not change schemas, validation behavior, or summary mapping.

**Verify**: `rg -n "CONTENT_DIR|content/case-studies|../_content" app/project/_lib/caseStudies.js` shows `content/case-studies` and no `../_content`.

### Step 4: Update the dynamic MDX import

In `app/project/[slug]/page.js`, change the MDX import to the new content location:

```js
const MdxContent = caseStudy.content && !caseStudy.comingSoon
  ? (await import(`../../../content/case-studies/${slug}.mdx`)).default
  : null;
```

Do not change route paths, metadata, or `generateStaticParams`.

**Verify**: `rg -n "content/case-studies|../_content" 'app/project/[slug]/page.js'` shows `content/case-studies` and no `../_content`.

### Step 5: Update author-facing docs

Update `README.md` and `content/case-studies/README.md` so authors are pointed to the new paths:

- Case-study files: `content/case-studies/*.mdx`
- Template: `content/case-studies/_template/case-study-template.mdx`
- Validator: `npm run validate:case-studies`

Keep the existing authoring contract: frontmatter holds structured metadata and reusable blocks; MDX body holds narrative.

**Verify**: `rg -n "content/case-studies|_template/case-study-template.mdx|validate:case-studies" README.md content/case-studies/README.md` -> exit 0 with matches.

### Step 6: Validate behavior

Run the case-study validator and slug load check.

**Verify**: `npm run validate:case-studies` -> exit 0 and prints `Case study validation passed.`

**Verify**:

```bash
node --input-type=module -e "import('./app/project/_lib/caseStudies.js').then((m) => console.log(m.getAllCaseStudySummaries().map((p) => p.slug).sort().join(',')))"
```

Expected output:

```text
figma-ball-knowledge,goable,ihub,linklog,socratic,yfga
```

## Test Plan

No new unit tests are required. This is a file-layout refactor covered by the existing validator plus a direct module import check.

## Done Criteria

- [ ] The six case-study MDX files live under `content/case-studies/`.
- [ ] The template lives under `content/case-studies/_template/`.
- [ ] `app/project/_content` and `app/project/_template` no longer exist.
- [ ] `app/project/_lib/caseStudies.js` reads from `content/case-studies`.
- [ ] `app/project/[slug]/page.js` imports MDX from `content/case-studies`.
- [ ] `README.md` and `content/case-studies/README.md` reference the new paths.
- [ ] `npm run validate:case-studies` exits 0.
- [ ] The slug load check prints `figma-ball-knowledge,goable,ihub,linklog,socratic,yfga`.
- [ ] `rg -n "app/project/_content|app/project/_template|../_content" README.md app scripts mdx-components.js next.config.mjs` returns no matches.
- [ ] `plans/README.md` status row updated unless the reviewer maintains the index.

## STOP Conditions

Stop and report back if:

- You cannot distinguish pre-existing out-of-scope dirty files from files your plan would need to edit.
- The content loader no longer uses `CONTENT_DIR`.
- The dynamic route no longer imports MDX in `app/project/[slug]/page.js`.
- Moving the content files changes route slugs or validation output.
- `rmdir app/project/_content app/project/_template` fails because unexpected files remain.
- The fix appears to require changing renderer components or MDX frontmatter.

## Maintenance Notes

After this lands, future case-study edits should start in `content/case-studies`, while `app/project` should be treated as the route and renderer implementation. If a future CMS migration happens, this folder becomes the clean seam for import/export scripts.
