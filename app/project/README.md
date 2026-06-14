# Project Route Renderer

## Dynamic route

`app/project/[slug]/page.js` is the route renderer for every case study. It
builds static params from the case-study loader, then renders each project by
slug through the shared route components.

Case-study slugs, metadata, and page content are loaded from
`content/case-studies/*.mdx`. Add or edit projects there instead of adding route
files under `app/project`.

## No per-project route folders

There should be no per-project route folders for individual case studies. Local
folders such as `app/project/goable` or `app/project/socratic` make the tree
look like it has a second routing system, but the URL source of truth is the MDX
slug rendered by `app/project/[slug]/page.js`.

## Directory map

- `_lib/` contains the loader, validation, and development rendering helpers.
- `_components/` contains route-level case-study composition.
- `_shared/` contains shared case-study layout, navigation, and theme pieces.
- `components/contentTypes/` contains MDX-facing blocks used by `CaseText`,
  `CaseMedia`, `CaseScroll`, `CaseFixed`, and related components.
- `projects.js` is a compatibility registry backed by the same case-study
  loader. It should not become a second source of truth.
