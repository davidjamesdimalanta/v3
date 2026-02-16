import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { projectAsset } from './sanity/schemas/projectAsset'

export default defineConfig({
  name: 'default',
  title: 'Portfolio Assets',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,

  basePath: '/studio',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: [projectAsset],
  },
})
