import { connection } from "next/server";

export async function renderCaseStudyFilesDynamicallyInDevelopment() {
  if (process.env.NODE_ENV !== "production") {
    await connection();
  }
}
