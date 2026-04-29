export const projectData = {
  // Short project name (used for tab title and card titles)
  name: "GoAble",

  // Main project title (displayed prominently in the hero section)
  title: "Personalizing washroom access with convenience and community",

  // Project links (optional - can be empty array)
  // Example: links: [{ url: "https://example.com", label: "View Project" }]
  links: [
    { url: "https://www.figma.com/proto/iG4xpMKAf0sGxsGdxL5cOt/INF1611_SECTION0103_A8_DavidDimalanta_-FinalPrototype_2025-12-04?node-id=4612-20274&p=f&viewport=334%2C61%2C0.12&t=VkwkgXaU6Dqa2Buz-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=4612%3A20276&show-proto-sidebar=1", label: "Figma Prototype" },
  ],

  // Cover video and thumbnail for project card
  coverVideo: "https://stream.mux.com/FQHn7MDR7pH3xtZIwtP41yEiLAZlAc02xmX3eSR8dY7A.m3u8",
  coverImage: "https://image.mux.com/FQHn7MDR7pH3xtZIwtP41yEiLAZlAc02xmX3eSR8dY7A/thumbnail.png?width=1919&height=1080&time=0",

  // Array of awards and recognition (optional - can be empty array)
  awards: [
    // { name: "Award Name - Category", url: "#" },
    // { name: "Award Name - Category", url: "#" },
    // Add more awards or remove this section entirely
  ],


  description: [
    "GoAble informs users about washroom access and amenities in real-time, with a focus on personalization, community engagement, and trustworthiness.",
    "I led the development of the design system and the interactive prototypes, using Figma Variables to flesh out interaction insights in our initial designs."
  ],

  // ProjectDrawer — Problem / Solutions / Takeaways structure (Figma: drawer 838:536)
  problem: {
    title: "The Problem",
    description:
      "Whether it's Google Maps, or dedicated washroom finding apps like Toilet Finder, washroom listings on the current market lack sufficient washroom access information for people with diverse needs.",
  },

  solutions: {
    title: "The Solution",
    items: [
      {
        title: "Personalized onboarding & search.",
        description:
          "Since the accessibility label didn't always cater to people's needs, GoAble asks users about them during onboarding — then filters results to match their profile.",
      },
      {
        title: "Community-driven status updates.",
        description:
          "Washroom details pages show real-time availability, community sentiment, and granular amenity info so users can make informed decisions before they arrive.",
      },
      {
        title: "Three-tap review & verification.",
        description:
          "Quick-select, pre-loaded options reduce friction to near zero — making it just as easy to leave a review as it is to skip it.",
      },
    ],
  },

  takeaways: {
    title: "Takeaways",
    items: [
      {
        title: "Access is Multidimensional",
        description: "This project taught me that access involves not just physical constraints, but also emotional and political barriers.",
      },
      {
        title: "The Power of Restraint",
        description: "Users appreciate restraint. Providing exactly what they need, while respecting their choice, is better than maximizing options.",
      },
      {
        title: "Fidelity is a QA Tool",
        description: "Building a mid-fi prototype with Figma Variables let me stress-test interactions and catch critical usability issues early.",
      },
    ],
  },

  // Project details displayed in a grid
  featuredCategory: "PRODUCT DESIGN",

  details: {
    type: "Concept",
    role: "Product Designer",
    timeline: "3 months",
    team: "4 designers",
    year: "2025",
  },

  // Skills and technologies used in this project
  skills: [
    { name: "Product Design", category: "design" },
    { name: "Design Systems", category: "design" },
    // { name: "User Testing", category: "design" },
    // { name: "Interactive Prototyping", category: "design" },
    // { name: "Accessibility", category: "tools" },
  ],

  // Case study section theme colors
  caseStudy: {
    bgColor: "#EDECEA",  // Background color for media matting effect
    fgColor: "#799A92",  // Text/caption color
  },
};
