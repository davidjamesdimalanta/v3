import { validateAllCaseStudies } from "../app/project/_lib/caseStudies.js";

const issues = validateAllCaseStudies();

if (issues.length > 0) {
  console.error("Case study validation failed:\n");
  for (const issue of issues) {
    console.error(`- ${issue}`);
  }
  process.exit(1);
}

console.log("Case study validation passed.");
