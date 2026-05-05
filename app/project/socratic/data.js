export const projectData = {
  // Short project name (used for tab title and card titles)
  name: "Socratic.ai",

  // Main project title (displayed prominently in the hero section)
  title: "Tailor Your Scholarship Essays with Critical Thinkers",

  // Project links (optional - can be empty array)
  // Example: links: [{ url: "https://example.com", label: "View Project" }]
  links: [{ url: "https://socraticai.vercel.app/", label: "Try Socratic.ai" }],

  // Cover video and thumbnail for project card
  coverVideo: "https://stream.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo.m3u8?min_resolution=1080p",
  coverImage: "https://image.mux.com/PDr5r6Fw2mYePBA9MtNNP02nkfb3mqSz3bOYFjEQDjwo/thumbnail.png?width=1919&height=1080&time=0",

  // Array of awards and recognition (optional - can be empty array)
  awards: [
    // { name: "Award Name - Category", url: "#" },
    // { name: "Award Name - Category", url: "#" },
    // Add more awards or remove this section entirely
  ],

  // Project description (array of paragraphs)
  // First paragraph is used as meta description for SEO
  description: [
    "Socratic.ai is a platform that helps students draft scholarship essays, revealing hidden criteria behind scholarship essay prompts.",
    "The result is a vector canvas-based platform powered by the claude API for multiple drafts organized visually, insight from scholarship winning drafts, and AI interaction that feels more like a conversation.",
],

  // ProjectDrawer — Problem / Solutions / Takeaways structure (Figma: drawer 838:536)
  problem: {
    title: "The Problem",
    description:
      "Scholarship essays are scored against criteria students can't see. Most AI writing tools optimize for fluency, not the rubric — leaving applicants polishing the wrong things.",
  },

  solutions: {
    title: "The Solution",
    items: [
      {
        title: "Vector canvas for parallel drafts",
        description:
          "A spatial canvas lets writers compare multiple drafts side-by-side instead of editing a single doc into the ground.",
      },
      {
        title: "Rubric-aware AI conversations",
        description:
          "The Claude-powered assistant references winning essay patterns and surfaces hidden judging criteria as the writer drafts.",
      },
      {
        title: "Built in 7 days as a hackathon team",
        description:
          "Tight scope and a shared design system let two designers and three developers ship a working prototype in a week.",
      },
    ],
  },

  takeaways: {
    title: "Takeaways",
    items: [
      {
        title: "Spatial UX changed the writing flow",
        description: "Comparing drafts visually surfaced structural decisions that linear editors hide.",
      },
      {
        title: "AI as critic, not author",
        description: "Framing the model as a Socratic interlocutor produced sharper essays than autocomplete-style suggestions.",
      },
      {
        title: "Constraint-driven scope shipping",
        description: "Designing to a 7-day window forced ruthless prioritization and a tighter MVP than a longer runway would have.",
      },
    ],
  },

  // Project details displayed in a grid
  featuredCategory: "HACKATHON",

  details: {
    type: "Hackathon",
    role: "Product Design, Project Management",
    timeline: "7 days",
    team: "2 designers, 3 developers",
    year: "2025",
  },

  // Skills and technologies used in this project
  skills: [
    { name: "Project Management", category: "tools" },
    // { name: "AI/ML", category: "tools" },
    { name: "Human-AI Interaction", category: "tools" },
    // { name: "Interactive Prototyping", category: "design" },
    // { name: "Product Development", category: "dev" },
  ],

  // Case study section theme colors
  caseStudy: {
    bgColor: "#FFF9F0",  // Background color for media matting effect
    fgColor: "#799A92",  // Text/caption color
  },
};
