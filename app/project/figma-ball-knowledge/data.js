export const projectData = {
  name: "Figma Ball Knowledge",

  title: "Supercharging Figma with AI",

  links: [],

  coverVideo: "https://stream.mux.com/WTe01qzytOwy8GNIsTtpYcEzrp01Yjoz4XxDeZX02ZcY9A.m3u8?min_resolution=1080p",
  coverImage: "https://image.mux.com/WTe01qzytOwy8GNIsTtpYcEzrp01Yjoz4XxDeZX02ZcY9A/thumbnail.png?width=1919&height=1080&time=0",

  awards: [],

  description: [
    "Figma's AI tools (MCP) were built for engineers designers who don't write code are an afterthought. I built a custom AI workflow that focuses on the workflows of designers. It asks before it acts, learns your preferences over time, and doesn't require a technical background to get useful output.",
    "The result is an AI assistant that works the way designers actually work in Figma, not the way developers do.",
  ],

  problem: {
    title: "The current market",
    description:
      "AI design tooling currently cater to generating code which is useful for engineers, but not for the designers who spend their days in brownfield Figma files. Out of the box, first-party Figma skills produce frustratingly bad output, requires significant technical knowledge to course-correct, and forgets everything you taught it the moment you start a new session.",
  },

  solutions: {
    title: "My solution",
    items: [
      {
        title: "A claude skill that tells agents how to work within the canvas.",
        description:
          "Before touching anything in the file, the AI clarifies the goal, the target frame, and what a good result looks like. It also comes with tool call references, so that your agent can confidently and accurately work with design systems.",
      },
    ],
  },

  takeaways: {
    title: "Takeaways",
    items: [
      {
        title: "Slowing down at the front saves time overall",
        description:
          "The most valuable thing the workflow does is pause before executing. A few clarifying questions upfront prevents the back-and-forth of fixing output that was confidently wrong from the start.",
      },
      {
        title: "Surfacing designer intent",
        description:
        "Repositioning the skill around designer intent rather than code-deliverable framing was a thoughtful excercise in understanding what product work actually is.",
      },
    ],
  },

  featuredCategory: "AGENTIC WORKFLOWS",

  details: {
    type: "Shipped",
    role: "Skill Designer + Researcher",
    timeline: "2 weeks",
    team: "Solo",
    year: "2026",
  },

  skills: [
    { name: "Agentic Workflows", category: "specialized" },
    { name: "Skill Engineering", category: "tools" },
    { name: "Prompt Engineering", category: "tools" },
    { name: "Claude Code", category: "tools" },
    { name: "Design Systems", category: "design" },
  ],

  caseStudy: {
    bgColor: "#EDECEA",
    fgColor: "#427067",
  },
};
