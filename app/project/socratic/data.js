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
    "Socratic.ai is a platform that helps students draft scholarship essays. It reveals hidden criteria behind scholarship essay prompts, and engages with users critically. We reimagine human-AI interaction as less of a black box and more of a collaborative experience that leads to quality responses and a reflection of one's scholarship identity.",
    "As the team's product designer and lead, I led stand-ups daily, and in 7 days we resolved issues around visual feedback of the AI thinking and current mental models of chat interfaces.",
    "The result is a vector canvas-based platform powered by the claude API for multiple drafts organized visually, insight from scholarship winning drafts, and AI interaction that feels more like a conversation.",
],

  // Project details displayed in a grid
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
