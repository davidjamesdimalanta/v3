import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { z } from "zod";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkMdx from "remark-mdx";
import { visit } from "unist-util-visit";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CONTENT_DIR = path.join(__dirname, "../../../content/case-studies");

const REGISTERED_COMPONENTS = new Set(["ParticipantDemographics"]);
const ALLOWED_MDX_COMPONENTS = new Set([
  "CaseText",
  "CaseMedia",
  "CaseScroll",
  "CaseFixed",
  "CasePersonas",
  "CaseHighlights",
  "CaseGroup",
  "CaseThought",
  "Def",
]);

const tokenColorSchema = z
  .string()
  .regex(/^var\(--[a-zA-Z0-9-]+\)$/, "Use a CSS token, for example var(--bg-color)");

const linkSchema = z.object({
  url: z.string().min(1),
  label: z.string().min(1),
});

const mediaSchema = z
  .object({
    type: z.enum(["image", "video", "lottie"]).default("image"),
    src: z.string().min(1),
    darkSrc: z.string().optional(),
    alt: z.string().optional().default(""),
    decorative: z.boolean().optional().default(false),
    caption: z.string().optional(),
    ariaLabel: z.string().optional(),
    thumbnail: z.string().optional(),
    darkThumbnail: z.string().optional(),
    hevcSrc: z.string().optional(),
    darkHevcSrc: z.string().optional(),
    aspectRatio: z.string().optional(),
    bgColor: tokenColorSchema.optional(),
    fgColor: tokenColorSchema.optional(),
    isFirstVideo: z.boolean().optional(),
    loop: z.boolean().optional(),
    priority: z.boolean().optional(),
    size: z.enum(["small", "medium", "large"]).optional(),
    className: z.string().optional(),
  })
  .strict();

const bentoPreviewSchema = z
  .object({
    enabled: z.boolean(),
    sources: z.record(z.string(), mediaSchema).default({}),
  })
  .strict();

const drawerBlockSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  items: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        media: z.string().optional(),
      })
    )
    .optional(),
});

const definitionSchema = z
  .object({
    content: z.string().optional(),
    component: z.string().optional(),
    caption: z
      .object({
        text: z.string().optional(),
        link: z.string().optional(),
      })
      .optional(),
    image: z
      .object({
        src: z.string(),
        alt: z.string().optional().default(""),
      })
      .optional(),
    side: z.enum(["top", "right", "bottom", "left"]).optional(),
    width: z.string().optional(),
    mobileWidth: z.string().optional(),
    desktopWidth: z.string().optional(),
    sideOffset: z.union([z.string(), z.number()]).optional(),
    shimmerVariant: z.string().optional(),
  })
  .refine((value) => value.content || value.component, {
    message: "Definition needs either content or a registered component",
  });

const personaSchema = z.object({
  id: z.string(),
  name: z.string(),
  avatarSrc: z.string().optional(),
  avatarAlt: z.string().optional(),
  avatarLabel: z.string().optional(),
  traits: z.array(z.string()).default([]),
  designConnection: z.string(),
});

const textStateSchema = z.object({
  sectionHeading: z.string().optional(),
  title: z.string(),
  description: z.union([z.string(), z.array(z.string())]),
});

const caseStudySchema = z
  .object({
    slug: z.string(),
    order: z.number().int(),
    nextProject: z.string().optional(),
    comingSoon: z.boolean().optional().default(false),
    name: z.string(),
    tagline: z.string(),
    links: z.array(linkSchema).default([]),
    coverVideo: z.string().optional(),
    coverVideoHevc: z.string().optional(),
    coverVideoDark: z.string().optional(),
    coverVideoDarkHevc: z.string().optional(),
    coverImage: z.string().optional(),
    coverImageDark: z.string().optional(),
    awards: z.array(z.object({ name: z.string(), url: z.string().optional() })).default([]),
    description: z.array(z.string()).default([]),
    problem: drawerBlockSchema.optional(),
    solutions: drawerBlockSchema.optional(),
    takeaways: drawerBlockSchema.optional(),
    featuredCategory: z.string().optional(),
    details: z.record(z.string(), z.string()).default({}),
    skills: z.array(z.object({ name: z.string(), category: z.string() })).default([]),
    caseStudy: z.object({
      bgColor: tokenColorSchema,
      fgColor: tokenColorSchema,
    }),
    nav: z.array(z.object({ id: z.string(), heading: z.string() })).default([]),
    heroMedia: z.array(mediaSchema).default([]),
    bentoMedia: z.array(mediaSchema).max(6).default([]),
    bentoPreview: bentoPreviewSchema.optional(),
    assets: z.record(z.string(), mediaSchema).default({}),
    definitions: z.record(z.string(), definitionSchema).default({}),
    personas: z.array(personaSchema).default([]),
    personaHint: z.string().optional(),
    scrollBlocks: z
      .record(
        z.string(),
        z.object({
          sectionHeading: z.string().optional(),
          title: z.string().optional(),
          description: z.string().optional(),
          textStates: z.array(textStateSchema).default([]),
          dark: z.boolean().optional().default(false),
        })
      )
      .default({}),
    fixedBlocks: z
      .record(
        z.string(),
        z.object({
          sectionHeading: z.string().optional(),
          title: z.string(),
          description: z.string().optional(),
          dark: z.boolean().optional().default(false),
        })
      )
      .default({}),
    highlights: z
      .record(
        z.string(),
        z.object({
          sectionHeading: z.string().optional(),
          title: z.string(),
          description: z.string().optional(),
          dark: z.boolean().optional().default(false),
          videos: z.array(mediaSchema).default([]),
        })
      )
      .default({}),
    bento: z
      .object({
        thumbnail: z.string().optional(),
      })
      .optional(),
  })
  .strict();

let cachedCaseStudies;

function readCaseStudyFiles() {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(CONTENT_DIR, file));
}

function toProjectData(data) {
  return {
    name: data.name,
    title: data.tagline,
    tagline: data.tagline,
    links: data.links,
    coverVideo: data.coverVideo,
    coverVideoHevc: data.coverVideoHevc,
    coverVideoDark: data.coverVideoDark,
    coverVideoDarkHevc: data.coverVideoDarkHevc,
    coverImage: data.coverImage,
    coverImageDark: data.coverImageDark,
    awards: data.awards,
    description: data.description,
    problem: data.problem,
    solutions: data.solutions,
    takeaways: data.takeaways,
    featuredCategory: data.featuredCategory,
    details: data.details,
    skills: data.skills,
    caseStudy: data.caseStudy,
    heroMedia: data.heroMedia,
  };
}

function toSummary(caseStudy) {
  return {
    slug: caseStudy.slug,
    order: caseStudy.order,
    nextProject: caseStudy.nextProject,
    comingSoon: caseStudy.comingSoon,
    name: caseStudy.name,
    title: caseStudy.tagline,
    tagline: caseStudy.tagline,
    links: caseStudy.links,
    coverVideo: caseStudy.coverVideo,
    coverVideoHevc: caseStudy.coverVideoHevc,
    coverVideoDark: caseStudy.coverVideoDark,
    coverVideoDarkHevc: caseStudy.coverVideoDarkHevc,
    coverImage: caseStudy.coverImage,
    coverImageDark: caseStudy.coverImageDark,
    awards: caseStudy.awards,
    description: caseStudy.description,
    problem: caseStudy.problem,
    solutions: caseStudy.solutions,
    takeaways: caseStudy.takeaways,
    featuredCategory: caseStudy.featuredCategory,
    details: caseStudy.details,
    skills: caseStudy.skills,
    caseStudy: caseStudy.caseStudy,
    bento: caseStudy.bento,
    bentoMedia: caseStudy.bentoMedia,
    bentoPreview: caseStudy.bentoPreview,
  };
}

function parseCaseStudyFile(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);
  const result = caseStudySchema.safeParse(parsed.data);

  if (!result.success) {
    const message = result.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("\n");
    throw new Error(`${path.basename(filePath)} has invalid frontmatter:\n${message}`);
  }

  return {
    ...result.data,
    content: parsed.content.trim(),
    projectData: toProjectData(result.data),
  };
}

function loadCaseStudies() {
  return readCaseStudyFiles()
    .map(parseCaseStudyFile)
    .sort((a, b) => a.order - b.order);
}

export function getAllCaseStudies() {
  if (process.env.NODE_ENV !== "production") {
    return loadCaseStudies();
  }

  if (!cachedCaseStudies) {
    cachedCaseStudies = loadCaseStudies();
  }

  return cachedCaseStudies;
}

export function getAllCaseStudySummaries() {
  return getAllCaseStudies().map(toSummary);
}

export function getCaseStudyBySlug(slug) {
  const caseStudy = getAllCaseStudies().find((project) => project.slug === slug);
  if (!caseStudy) return null;

  return {
    ...caseStudy,
    nextProjectSummary: getNextCaseStudy(slug),
  };
}

export function getNextCaseStudy(currentSlug) {
  const caseStudies = getAllCaseStudies();
  const current = caseStudies.find((project) => project.slug === currentSlug);
  if (!current) return null;

  // Opt out of the auto-forward: "none" sends the reader back to the work list
  // instead of pushing the next case study.
  if (current.nextProject === "none") return null;

  const explicitNext = current.nextProject
    ? caseStudies.find((project) => project.slug === current.nextProject)
    : null;

  if (explicitNext) return toSummary(explicitNext);

  const currentIndex = caseStudies.findIndex((project) => project.slug === currentSlug);
  if (currentIndex === -1) return null;
  return toSummary(caseStudies[(currentIndex + 1) % caseStudies.length]);
}

function parseMdxTree(content) {
  return unified().use(remarkParse).use(remarkMdx).parse(content);
}

function getMdxAttribute(node, name) {
  const attribute = node.attributes?.find((attr) => attr.type === "mdxJsxAttribute" && attr.name === name);
  if (!attribute) return undefined;
  if (attribute.value === null) return true;
  if (typeof attribute.value === "string") return attribute.value;
  return attribute.value?.value;
}

function getMdxReference(node, names) {
  for (const name of names) {
    const value = getMdxAttribute(node, name);
    if (value !== undefined) return value;
  }
  return undefined;
}

function validateMedia(media, location, issues) {
  if (media.type === "image" && !media.decorative && !media.alt?.trim()) {
    issues.push(`${location}: content images need meaningful alt text or decorative: true`);
  }

  if (media.type === "video" && !media.caption?.trim() && !media.ariaLabel?.trim()) {
    issues.push(`${location}: videos need either caption or ariaLabel`);
  }
}

export function validateCaseStudy(caseStudy) {
  const issues = [];
  const ids = new Set();
  const duplicateIds = new Set();

  caseStudy.heroMedia.forEach((media, index) => validateMedia(media, `heroMedia[${index}]`, issues));
  Object.entries(caseStudy.assets).forEach(([key, media]) => validateMedia(media, `assets.${key}`, issues));
  Object.entries(caseStudy.highlights).forEach(([key, block]) => {
    block.videos.forEach((media, index) => validateMedia(media, `highlights.${key}.videos[${index}]`, issues));
  });

  Object.entries(caseStudy.definitions).forEach(([key, definition]) => {
    if (definition.component && !REGISTERED_COMPONENTS.has(definition.component)) {
      issues.push(`definitions.${key}: unregistered component "${definition.component}"`);
    }
  });

  if (/(^|\n)\s*:{2,5}case-|:def\[/.test(caseStudy.content)) {
    issues.push("Legacy case-study directive syntax is not supported in MDX content");
  }

  let tree;
  try {
    tree = parseMdxTree(caseStudy.content);
  } catch (error) {
    issues.push(`MDX parse error: ${error.message}`);
    return issues;
  }

  visit(tree, (node) => {
    if (!["mdxJsxFlowElement", "mdxJsxTextElement"].includes(node.type)) return;

    if (!ALLOWED_MDX_COMPONENTS.has(node.name)) {
      issues.push(`Unsupported MDX component "${node.name}"`);
      return;
    }

    const id = getMdxAttribute(node, "id");
    if (id && node.name !== "Def") {
      if (ids.has(id)) duplicateIds.add(id);
      ids.add(id);
    }

    if (node.name === "Def") {
      const ref = getMdxReference(node, ["definition"]);
      if (!ref || !caseStudy.definitions[ref]) {
        issues.push(`Def is missing a valid definition: ${ref || "(none)"}`);
      }
    }

    if (node.name === "CaseMedia") {
      const ref = getMdxReference(node, ["asset"]);
      if (!ref || !caseStudy.assets[ref]) {
        issues.push(`CaseMedia is missing a valid asset: ${ref || "(none)"}`);
      }
    }

    if (node.name === "CaseScroll") {
      const ref = getMdxReference(node, ["block"]);
      if (!ref || !caseStudy.scrollBlocks[ref]) {
        issues.push(`CaseScroll is missing a valid block: ${ref || "(none)"}`);
      }
    }

    if (node.name === "CaseFixed") {
      const ref = getMdxReference(node, ["block"]);
      if (ref && !caseStudy.fixedBlocks[ref]) {
        issues.push(`CaseFixed is missing a valid block: ${ref}`);
      }
    }

    if (node.name === "CaseHighlights") {
      const ref = getMdxReference(node, ["block"]);
      if (!ref || !caseStudy.highlights[ref]) {
        issues.push(`CaseHighlights is missing a valid block: ${ref || "(none)"}`);
      }
    }
  });

  duplicateIds.forEach((id) => issues.push(`Duplicate case-study id: ${id}`));

  caseStudy.nav.forEach(({ id }) => {
    if (!ids.has(id)) {
      issues.push(`nav id "${id}" does not match any MDX component id`);
    }
  });

  return issues;
}

export function validateAllCaseStudies() {
  return getAllCaseStudies().flatMap((caseStudy) =>
    validateCaseStudy(caseStudy).map((issue) => `${caseStudy.slug}: ${issue}`)
  );
}
