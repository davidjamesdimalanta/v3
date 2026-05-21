export const projectData = {
  name: "LinkLog",
  title: "Closing the circle of care by digitizing the Link Worker workflow",

  links: [
    { url: "http://linklog-demo-alb-1724749606.ca-central-1.elb.amazonaws.com/", label: "Live Demo" },
    { url: "https://tinyurl.com/LinkLogV3byTeam2", label: "Figma Prototype" },
  ],

  coverVideo: "https://cdn.sanity.io/files/iy4m4myd/production/b30859fdbdb4365cafaec627955ad7c418b3c95a.mov",
  coverVideoDark: "https://cdn.sanity.io/files/iy4m4myd/production/4826feb31bdd4450dc19a62f19deadbf451998ae.mov",
  coverImage: "https://cdn.sanity.io/images/iy4m4myd/production/43ba809e70315133281b75a5d5ac9d2661b12d90-2880x1620.png",

  awards: [],

  description: [
    "LinkLog digitizes the Link Worker workflow — turning a three-day reporting marathon into a few clicks, and giving Social Prescribing programmes a usable record of the care they deliver.",
    "I led the service design and live-platform build, pairing co-design with Link Workers and OACAO with an AI-assisted engineering workflow to ship a working product in six days, not just a prototype.",
  ],

  problem: {
    title: "The Problem",
    description:
      "Across 10 SALCs we interviewed, every single one compiled their year-end Common Tracking Tool report by hand — cross-referencing paper binders, Excel sheets, and SurveyMonkey forms. The work that actually defines Social Prescribing — calling clients, following up, building trust — gets squeezed by the work of proving that work happened.",
  },

  solutions: {
    title: "Our Solution",
    items: [
      {
        title: "One source of truth for client data",
        description:
          "LinkLog imports the spreadsheets Link Workers already keep into a standardized Client Directory, ending the duplicate entry across local files, appendix forms, and SurveyMonkey.",
      },
      {
        title: "Auto-populated year-end reports",
        description:
          "The Common Tracking Tool fields fill themselves from the Client Directory. Link Workers go from reconstructing a year of work to reviewing it.",
      },
      {
        title: "An OACAO reporting dashboard",
        description:
          "OACAO sees aggregated outcomes across every SALC on the platform — exportable as CSV, viewable as interactive charts, and ready to use in funding renewals.",
      },
    ],
  },

  takeaways: {
    title: "Takeaways",
    items: [
      {
        title: "Service Blueprints Show You Where to Cut",
        description:
          "Mapping the current state surfaced where the workflow leaked time. The intervention point wasn't a screen — it was the boundary between daily client work and annual reporting.",
      },
      {
        title: "80% Is Good Enough To Validate",
        description:
          "We could have spent the six days polishing one beautiful flow. We chose to ship a working end-to-end demo at lower fidelity instead, because the riskier question was whether the whole loop could close, not whether one screen looked perfect.",
      },
      {
        title: "AI Doesn't Replace Design Rigor — It Removes Excuses",
        description:
          "Codex wrote the backend, Claude reviewed the PRs, Gemini drafted the privacy and policy brief. None of that mattered until we'd done the service blueprint, the interviews, and the co-design sessions. AI shortened the path from a decided design to a live product — it didn't shorten the path to the decided design.",
      },
    ],
  },

  featuredCategory: "SERVICE DESIGN",

  details: {
    type: "Concept",
    role: "Service Designer + Builder",
    timeline: "6 days",
    team: "4 designers",
    year: "2026",
  },

  skills: [
    { name: "Service Design", category: "design" },
    { name: "Service Blueprinting", category: "design" },
    { name: "Co-Design", category: "design" },
    { name: "Primary Research", category: "design" },
    { name: "AI-Assisted Development", category: "specialized" },
    { name: "Codex", category: "tools" },
    { name: "Claude Code", category: "tools" },
    { name: "Figma", category: "tools" },
    { name: "AWS", category: "dev" },
  ],

  caseStudy: {
    bgColor: "var(--bg-color)",
    fgColor: "var(--schemes-tertiary)",
  },
};
