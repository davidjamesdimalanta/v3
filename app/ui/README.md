# Shared site UI

`app/ui` owns shared site UI and cross-page behavior for this portfolio app.
Use it for components that are reused across routes or that support the global
application shell.

## Ownership

- Global chrome lives here: `SiteNav`, `Footer`, and `SiteShell`.
- Global effects and providers live here: `SmoothScroll`, `WaveBackground`,
  `PageTransition`, and `ThemeProvider`.
- Reusable primitives local to this app live here: `Button`, `SkillTag`,
  `AudioPermissionButton`, `ThemeToggle`, and `text-shimmer`.
- Route-agnostic hooks belong under `app/ui/hooks`.
- Low-level helpers belong under `app/ui/lib`.
- Storybook stories for these shared components belong under `app/ui/stories`.

## Boundaries

- Do not put case-study content here. Case-study source content belongs in
  `content/case-studies`, with renderer code under `app/project`.
- Do not add one-off page sections here. Put page-level composition in
  `app/sections` or in the relevant route folder.
- Reusable motion primitives live under root `components/motion-primitives/`.
  Do not copy them into `app/ui`, `app/sections`, or `app/project`.
- Prefer `SiteNav.jsx` for active site navigation. Legacy-looking files should
  not be deleted unless a separate plan verifies all imports.
