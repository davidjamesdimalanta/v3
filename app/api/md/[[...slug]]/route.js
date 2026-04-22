import { NextResponse } from 'next/server';

const PAGES = {
  '': `# David Dimalanta

I design products. I build them too.

## Currently

MI Candidate @ UofT iSchool, UX/UI @ Innovation Hub, and looking for a 2026 summer co-op!

## Playing Around With

- **Stitch** — Using Google's vibe-design app to get Nothing Phone's design style.
- **Paper** — Trying the new "Figma for Agents" to explore different themes for my portfolio.
- **Figma Make** — Using Figma Make to make a study buddy app and win a make-a-thon challenge.

## Selected Work

- [Unearthing Hidden Barriers in Accessible Washrooms](/project/goable) — GoAble · Product Design · 2025
- [Tailor Your Scholarship Essays with Critical Thinkers](/project/socratic) — Socratic.ai · Product Design, Project Management · 2025
- [Designing and Developing for a Campus Design Agency](/project/ihub) — iHub · Web Developer, Product Designer · 2025
`,

  'about': `# About — David Dimalanta

A bit about me.

The persistent & pragmatic problem solver? The crazy ideas guy? I'm still crafting my narrative, but for now, here's who I am.

David is a product designer with a background in web development, doing his best work at the handoff. He is experienced in interactive prototyping, code-collaborating, and cross-functional workflows.

Outside of work, I love handheld consoles (I'm stuck in 2009), finding cafes around the city, and going to the gym.

## Currently

MI Candidate @ UofT iSchool, UX/UI @ Innovation Hub, and looking for a 2026 summer co-op!
`,

  'project/goable': `# GoAble — Unearthing Hidden Barriers in Accessible Washrooms

**Type:** Concept | **Role:** Product Designer | **Timeline:** 3 months | **Team:** 4 designers | **Year:** 2025

[Figma Prototype](https://www.figma.com/proto/iG4xpMKAf0sGxsGdxL5cOt/INF1611_SECTION0103_A8_DavidDimalanta_-FinalPrototype_2025-12-04)

GoAble informs users about washroom access and amenities in real-time, with a focus on personalization, community engagement, and trustworthiness. I led the development of the design system and the interactive prototypes, using Figma Variables to flesh out interaction insights in our initial designs.

## The Problem

Current washroom listings lack accessibility-related information.

Whether it's Google Maps, or dedicated washroom finding apps like Toilet Finder, washroom listings on the current market lack sufficient Washroom Access — which involves both physical barriers (amenity offerings and reliable availability) and emotional barriers (security & trust) — for users with specific needs.

## The Challenge

How do we make washrooms more accessible, when **access means something different for everyone?**

## Solutions

**Personalized onboarding & search.** Since the accessibility label didn't always cater to people's needs, GoAble asks users about them during onboarding — then filters results to match their profile.

**Community-driven status updates.** Washroom details pages show real-time availability, community sentiment, and granular amenity info so users can make informed decisions before they arrive.

**Three-tap review & verification.** Quick-select, pre-loaded options reduce friction to near zero — making it just as easy to leave a review as it is to skip it.

## Discovery

Secondary research revealed different barriers to washroom access across Toronto, influencing three design goals:

- **Over-generalization** of the accessibility label — the "Accessibility" tag is vague and doesn't communicate which amenities are offered.
- **Limited Information** on washroom listings — basic details like stall count, space for strollers, or door weight are missing.
- **Unreliable Sources** of truth — information could be outdated or inaccurate, with no way to verify its currency.

## Initial Designs

### Personalizing the Search

Since the accessibility label didn't always cater to people's needs, we asked users about them during onboarding, influencing the washroom listings suggested during search. 1 in 4 participants with accessibility needs encountered a washroom labeled "accessible" that did not meet their needs.

### Providing the Granular Details

Washroom details pages show critical information: amenity offering, real-time availability or concerns, and community sentiment to help users make informed decisions. 97% of participants ranked cleanliness as their top washroom feature; 70.6% reported feeling stressed when they couldn't locate a washroom quickly.

### Creating Community to Verify the Truth

A community section acts as a source of truth that users can contribute to. 1 in 2 participants prioritize reviews when looking up washrooms online; 4 out of 5 said they'd trust user-generated accessibility reviews.

## Iterations

### Filter Reduction

Participants froze during onboarding when presented with the full filter list. "I don't know how many of these I should be toggling." So I cut the least-used filters entirely. The ones that remained are the ones that actually differentiate washrooms for our users.

### Progressive Disclosure

Participants didn't know where to look first, and felt some elements were fighting for their attention. "I don't know what I'm supposed to be reading first." So I put the most important stuff at the front. Relevant amenity offerings are displayed first, then community reports sit behind a clearly labeled tab. Removed the rating label as users called it visual noise.

### Frictionless Review

Nobody said it was hard... they just weren't going to do it. "It looks good but I don't really think I would leave a review that often." So I stopped trying to incentivize reviews and focused on reducing the cost of leaving one. Quick-select options and pre-loaded responses lower the bar to report than the bar for ignoring it.

## Final Designs

GoAble filters washrooms by **your needs**, surfaces **granular details** before you arrive, and uses **crowdsourced reviews** to keep information honest and reduce the stress of finding a suitable washroom in public.

## Closing

**Access is Multidimensional** — This project taught me that access doesn't just mean physical, but also emotional and political barriers people face.

**The Power of Restraint** — Instead of maximizing a design through incentives or by providing all options, I learned that people appreciate when designers show restraint — providing exactly what they need, when they need it, while respecting their choice to participate or not.

**Fidelity is a QA Tool, Not Just a Presentation Tool** — I built the mid-fi prototype with Figma Variables specifically to stress-test interactions before committing to high-fidelity. That's where I caught the tag color ambiguity issue where users had no way to distinguish washroom states at a glance, and it would have been expensive to fix later. The mid-fi acted as a diagnostic tool.

**What's Next** — The feature I'd build next is in-building wayfinding. We cut it due to time, but it was the one thing our research surfaced that no existing tool handles at all.

---

Next: [Tailor Your Scholarship Essays with Critical Thinkers](/project/socratic)
`,

  'project/socratic': `# Socratic.ai — Tailor Your Scholarship Essays with Critical Thinkers

**Type:** Hackathon | **Role:** Product Design, Project Management | **Timeline:** 7 days | **Team:** 2 designers, 3 developers | **Year:** 2025

[Try Socratic.ai](https://socraticai.vercel.app/)

Socratic.ai is a platform that helps students draft scholarship essays, revealing hidden criteria behind scholarship essay prompts. The result is a vector canvas-based platform powered by the Claude API for multiple drafts organized visually, insight from scholarship-winning drafts, and AI interaction that feels more like a conversation.

---

Next: [Designing and Developing for a Campus Design Agency](/project/ihub)
`,

  'project/ihub': `# iHub — Designing and Developing for a Campus Design Agency

**Type:** Shipped | **Role:** Web Developer, Product Designer | **Timeline:** 4 months | **Year:** 2025

[Innovation Hub](https://blogs.studentlife.utoronto.ca/innovationhub/) | [FCO Virtual Toolkit](https://familycare.utoronto.ca/supporting-student-parents/)

I use HTML, CSS, Javascript, and WordPress to develop custom designs for the website and other faculty projects across the three UofT campuses. My work results in projects that are 1:1 with the design team's expectations, designer-friendly coding documentation, and a developer-ready design system.

**Skills:** Technical Documentation, Handoff, Design Systems

---

Next: [Unearthing Hidden Barriers in Accessible Washrooms](/project/goable)
`,
};

export async function GET(request, context) {
  const { slug } = await context.params;
  const key = slug ? slug.join('/') : '';

  const content = PAGES[key];

  if (content === undefined) {
    return new NextResponse('Not Found', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
  }

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
    },
  });
}
