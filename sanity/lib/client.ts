import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2025-02-12',
  useCdn: true, // Set to false if you need to ensure fresh data
  token: process.env.SANITY_API_TOKEN,
})
