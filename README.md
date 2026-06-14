# David Dimalanta Portfolio (v3)

This is David Dimalanta's portfolio site, built with Next.js 16 App Router and JavaScript. Styling uses Tailwind CSS v4 via PostCSS, with project tokens and custom utilities defined in `app/globals.css`.

## Case Study Editing

Current case-study content lives in `content/case-studies/*.mdx`. To create a new case study, copy `content/case-studies/_template/case-study-template.mdx` into `content/case-studies/{slug}.mdx`, then edit the copied file.

Use frontmatter for metadata, reusable media, definitions, personas, and scroll/highlight block data. Use the MDX body for the narrative.

Supported author-facing components include `CaseText`, `CaseMedia`, `CaseScroll`, `CaseFixed`, `CasePersonas`, `CaseHighlights`, `CaseGroup`, and inline `Def`. Use regular Markdown for prose inside MDX components, and use `<Def definition="key-term">key term</Def>` for inline definition popovers. Do not use legacy `:::case-*` directive syntax.

## Repo Map

- `app/globals.css`: Tailwind CSS v4 theme tokens, CSS variables, and custom utilities.
- `app/fonts.js`: Aspekta and Inter font definitions.
- `app/layout.js`: Root layout and global font variable wiring.
- `app/ui/`: Shared UI components such as navigation, footer, buttons, tags, and wave background.
- `app/sections/`: Page-level sections used by the main portfolio pages.
- `app/project/`: Case-study routes, shared layout, components, and route helpers.
- `content/case-studies/`: Published case-study MDX files and authoring notes.
- `content/case-studies/_template/`: Case-study template.
- `components/motion-primitives/`: Existing animation primitives used by the site.
- `public/assets/`: Static images, icons, audio, and video assets.

## Commands

Start the local development server:

```bash
npm run dev
```

Validate case-study content before build or deployment:

```bash
npm run validate:case-studies
```

Build the production app:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Content Workflow

1. Copy `content/case-studies/_template/case-study-template.mdx` into `content/case-studies/{slug}.mdx`.
2. Update frontmatter first: title, summary, dates, roles, media references, definitions, personas, and scroll/highlight data.
3. Write the narrative in the MDX body using the supported case-study components.
4. Keep media references accessible and token-based where validation requires it.
5. Run `npm run validate:case-studies` before build or deployment.

## Verification Baseline

For case-study edits, `npm run validate:case-studies` should exit 0 and print `Case study validation passed.`

`npm run lint` currently has known pre-existing lint failures, so content-only case-study edits should at minimum pass the validator until lint is separately cleaned up.
