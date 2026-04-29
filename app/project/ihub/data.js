export const projectData = {
    // Short project name (used for tab title and card titles)
    name: "iHub",
  
    // Main project title (displayed prominently in the hero section)
    title: "Designing and developing for a campus design agency.",
  
    // Project links (optional - can be empty array)
    // Example: links: [{ url: "https://example.com", label: "View Project" }]
    links: [
      { url: "https://blogs.studentlife.utoronto.ca/innovationhub/", label: "Innovation Hub" },
      { url: "https://familycare.utoronto.ca/supporting-student-parents/", label: "FCO Virtual Toolkit" }
    ],
  
    // Cover video and thumbnail for project card
    coverVideo: "https://stream.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc.m3u8?min_resolution=1080p",
    coverImage: "https://image.mux.com/bPIec3TV01aK6WZfXShcT02300f1tcio6003DIDC7ZrcTRc/thumbnail.png?width=1919&height=1080&time=0",
  
    // Array of awards and recognition (optional - can be empty array)
    awards: [
      // { name: "Award Name - Category", url: "#" },
      // { name: "Award Name - Category", url: "#" },
      // Add more awards or remove this section entirely
    ],
  
    // Project description (array of paragraphs)
    // First paragraph is used as meta description for SEO
    description: [
      // "Replace this with your project description. Explain the challenge, your role, and the approach you took to solve the problem.",
      // "Add multiple paragraphs to provide context about the project's goals, constraints, and your design process.",
      // "Highlight key insights, decisions, and outcomes that demonstrate your impact on the project.",
      "I use HTML, CSS, Javascript, and Wordpress to develop our custom designs for the website and other faculty projects across the three UofT campuses.",
      "My work results in projects that are 1:1 with the design team's expectations, designer-friendly coding documentation, and a developer-ready design system."
    ],

    // ProjectDrawer — Problem / Solutions / Takeaways structure (Figma: drawer 838:536)
    problem: {
      title: "The Problem",
      description:
        "Faculty teams across UofT's three campuses needed custom web work, but design intent kept getting lost in handoff to developers — leading to drift between Figma and production.",
    },

    solutions: {
      title: "The Solution",
      items: [
        {
          title: "1:1 fidelity from Figma to production",
          description:
            "I implement designs directly so the shipped site matches the design team's spec without translation loss.",
        },
        {
          title: "Designer-friendly documentation",
          description:
            "Each component ships with concise docs designers can read, lowering the cost of future iteration.",
        },
        {
          title: "A developer-ready design system",
          description:
            "Tokens, components, and patterns codified for WordPress so other developers extend the system without breaking it.",
        },
      ],
    },

    takeaways: {
      title: "Takeaways",
      items: [
        {
          title: "Bridging design and dev compounds",
          description: "Owning both sides removed entire categories of handoff bugs and freed cycles for craft.",
        },
        {
          title: "Documentation is a design surface",
          description: "Treating docs as a first-class deliverable changed how the team adopted the system.",
        },
        {
          title: "WordPress can host a real design system",
          description: "With discipline, even legacy stacks support tokenized, scalable component libraries.",
        },
      ],
    },
  
    // Project details displayed in a grid
    featuredCategory: "GAME DESIGN",

    details: {
      type: "Shipped",
      role: "Web Developer, Product Designer",
      timeline: "4 months",
      year: "2025"
    },

    // Skills and technologies used in this project
    skills: [
      // { name: "Web Development", category: "dev" },
      { name: "Technical Documentation", category: "dev" },
      { name: "Handoff", category: "dev" },
      { name: "Design Systems", category: "design" },
      // { name: "Responsive Design", category: "design" },

    ],

    // Case study section theme colors
    caseStudy: {
      bgColor: "#1a1a1a",  // Background color for media matting effect
      fgColor: "#799A92",  // Text/caption color
    },
  };
  