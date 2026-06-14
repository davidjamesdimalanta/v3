# Page sections

`app/sections` owns page-level composition used by homepage, about, and work
surfaces. Sections can combine shared primitives and route data into complete
bands of a page.

## Ownership

- Top-level sections live here, including `HomepageHero`, `AllProjects`,
  `BentoGrid`, `WorkGrid`, and about sections.
- `app/sections/organisms` is for larger section-owned pieces such as bento
  cells and project cards.
- Sections may consume case-study summaries from
  `app/project/_lib/caseStudies.js`, but they should not own case-study source
  content.

## Boundaries

- Cross-page primitives should stay in `app/ui`.
- Case-study renderer components should stay in `app/project`.
- Author-facing case-study content belongs in `content/case-studies`, not in
  component folders.
- Reusable motion primitives live under root `components/motion-primitives/`.
  Do not copy them into `app/ui`, `app/sections`, or `app/project`.
