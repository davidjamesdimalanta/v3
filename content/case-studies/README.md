# Case Study Authoring

Create a new case study by copying `content/case-studies/_template/case-study-template.mdx` into `content/case-studies/{slug}.mdx`.

Use frontmatter for metadata, reusable media, definitions, personas, and scroll/highlight block data. Use the MDX body for the narrative. Supported components are `CaseText`, `CaseMedia`, `CaseScroll`, `CaseFixed`, `CasePersonas`, `CaseHighlights`, `CaseGroup`, and inline `Def`.

Use regular Markdown for prose inside MDX components. Use `<Def definition="key-term">key term</Def>` for inline definition popovers. Avoid legacy `:::case-*` directive syntax.

Run `npm run validate:case-studies` before building to catch missing refs, duplicate ids, non-token colors, and media accessibility gaps.
