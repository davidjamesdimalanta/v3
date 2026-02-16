import { client } from '@/sanity/lib/client'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { urlFor } from '@/sanity/lib/image'

/**
 * Fetch a project asset by slug
 */
export async function getAssetBySlug(slug: string) {
  const query = `*[_type == "projectAsset" && slug.current == $slug][0] {
    _id,
    title,
    image,
    project,
    category,
    "slug": slug.current
  }`

  return await client.fetch(query, { slug })
}

/**
 * Fetch all assets for a specific project
 */
export async function getAssetsByProject(project: string) {
  const query = `*[_type == "projectAsset" && project == $project] | order(_createdAt desc) {
    _id,
    title,
    image,
    project,
    category,
    "slug": slug.current
  }`

  return await client.fetch(query, { project })
}

/**
 * Fetch assets by project and category
 */
export async function getAssetByProjectAndCategory(project: string, category: string) {
  const query = `*[_type == "projectAsset" && project == $project && category == $category] | order(_createdAt desc) {
    _id,
    title,
    image,
    project,
    category,
    "slug": slug.current
  }`

  return await client.fetch(query, { project, category })
}

/**
 * Get a Sanity image URL with optional transformations
 *
 * @example
 * ```tsx
 * const imageUrl = getSanityImageUrl(asset.image, { width: 1920, quality: 90 })
 * ```
 */
export function getSanityImageUrl(
  source: SanityImageSource,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'webp' | 'jpg' | 'png'
    fit?: 'clip' | 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min'
  }
) {
  let builder = urlFor(source)

  if (options?.width) builder = builder.width(options.width)
  if (options?.height) builder = builder.height(options.height)
  if (options?.quality) builder = builder.quality(options.quality)
  if (options?.format) builder = builder.format(options.format)
  if (options?.fit) builder = builder.fit(options.fit)

  return builder.url()
}
