# Sanity CDN Migration Guide

## Setup Complete ✓

The following has been configured in your Next.js application:

- ✓ Sanity packages installed
- ✓ Sanity configuration files created
- ✓ Project asset schema defined
- ✓ Embedded Studio route at `/studio`
- ✓ Next.js image config updated for Sanity CDN
- ✓ Helper utilities for image URLs

## Next Steps

### 1. Configure Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your Sanity credentials:

```bash
cp .env.local.example .env.local
```

Then edit `.env.local` with your actual values:

- **NEXT_PUBLIC_SANITY_PROJECT_ID**: Get from https://www.sanity.io/manage
- **NEXT_PUBLIC_SANITY_DATASET**: Usually "production"
- **SANITY_API_TOKEN**: Create in Settings → API (needs "Editor" permissions)

### 2. Start Your Development Server

```bash
npm run dev
```

### 3. Access Sanity Studio

Navigate to: **http://localhost:3000/studio**

You'll see the Sanity Studio interface embedded in your app.

### 4. Upload Your Images

You need to upload 25 images organized by project:

#### GoAble Project (14 images)
**Cover & Spreads:**
- `/public/assets/images/goAble/Spread_semitransparent.png` → Title: "GoAble Cover", Category: "Cover"
- `/public/assets/images/goAble/Spread2.webp` → Title: "GoAble Spread 2", Category: "Spread"
- `/public/assets/images/goAble/Spread_transparent.png` → Title: "GoAble Spread Transparent", Category: "Spread"

**Case Study Images:** (in `/public/assets/images/goAble/caseStudy/`)
- `before-after-1.png` → Title: "GoAble Before/After 1", Category: "Case Study"
- `before-after-2.png` → Title: "GoAble Before/After 2", Category: "Case Study"
- `before-after-3.png` → Title: "GoAble Before/After 3", Category: "Case Study"
- `problem-space-1.png` → Title: "GoAble Problem Space 1", Category: "Case Study"
- `problem-space-2.png` → Title: "GoAble Problem Space 2", Category: "Case Study"
- `problem-space-3.png` → Title: "GoAble Problem Space 3", Category: "Case Study"
- `critical-issue-1.png` → Title: "GoAble Critical Issue 1", Category: "Case Study"
- `critical-issue-2.png` → Title: "GoAble Critical Issue 2", Category: "Case Study"
- `screens-mockup.png` → Title: "GoAble Screens Mockup", Category: "Mockup"
- `style-tile.png` → Title: "GoAble Style Tile", Category: "Design System"

#### iHub Project (7 images)
- `/public/assets/images/ihub/ihub_spread.png` → Title: "iHub Cover", Category: "Cover"
- `/public/assets/images/ihub/design-system-doc-1.png` → Title: "iHub Design System 1", Category: "Design System"
- `/public/assets/images/ihub/design-system-doc-2.png` → Title: "iHub Design System 2", Category: "Design System"
- `/public/assets/images/ihub/design-system-doc-3.png` → Title: "iHub Design System 3", Category: "Design System"
- `/public/assets/images/ihub/mobile-mockup.png` → Title: "iHub Mobile Mockup", Category: "Mockup"
- `/public/assets/images/ihub/spread-2.png` → Title: "iHub Spread 2", Category: "Spread"
- `/public/assets/images/ihub/spread-3.png` → Title: "iHub Spread 3", Category: "Spread"

#### Socratic Project (3 images)
- `/public/assets/images/socratic/socratic_splash.png` → Title: "Socratic Cover", Category: "Cover"
- `/public/assets/images/socratic/socratic-example-cropped.png` → Title: "Socratic UI Example", Category: "Mockup"
- `/public/assets/images/socratic/leadership.png` → Title: "Socratic Leadership", Category: "Other"

#### General Assets (1 image)
- `/public/assets/images/web-preview/preview_.png` → Title: "Website Preview", Category: "Web Preview", Project: "General"

**Upload Process:**
1. Click "Create" in Studio
2. Select "Project Asset"
3. Fill in Title, Project, and Category
4. Upload the image file
5. Click "Generate" next to Slug field
6. Click "Publish"

### 5. Get Asset Slugs for Migration

After uploading all images, you'll need to query Sanity to get the asset references. In Studio:

1. Go to the "Vision" tab
2. Run this query to see all your assets:

```groq
*[_type == "projectAsset"] {
  "slug": slug.current,
  title,
  project,
  category,
  "imageUrl": image.asset->url
} | order(project asc, category asc)
```

3. Copy the output - you'll need the slugs to update your code

### 6. Migrate Local Videos to MUX

Upload these 5 videos directly to your MUX dashboard:

- `/public/assets/videos/goAble/onboarding-prototype.webm`
- `/public/assets/videos/goAble/amenities-prototype.webm`
- `/public/assets/videos/goAble/review-prototype.webm`
- `/public/assets/videos/ihub/contained-logic.mp4`

Generate playback IDs and thumbnail URLs for each.

### 7. Update Your Code

Once you have asset slugs and MUX video IDs, I can help you:

1. Update project data files with Sanity asset references
2. Update components to use Sanity images
3. Replace local video paths with MUX URLs
4. Update metadata/OG images in `layout.js`

### 8. Test & Cleanup

After migration:

```bash
# Test that all images load
npm run build

# If successful, remove old assets
rm -rf /public/assets/images
rm -rf /public/assets/videos
```

## Helper Functions Available

### Fetch Assets in Your Code

```typescript
import { getAssetBySlug, getSanityImageUrl } from '@/lib/sanity-helpers'

// Get a specific asset
const asset = await getAssetBySlug('goable-cover')

// Generate optimized image URL
const imageUrl = getSanityImageUrl(asset.image, {
  width: 1920,
  quality: 90,
  format: 'webp'
})
```

### Use in Next.js Image Component

```tsx
import Image from 'next/image'
import { getSanityImageUrl } from '@/lib/sanity-helpers'

<Image
  src={getSanityImageUrl(asset.image, { width: 1920 })}
  alt={asset.title}
  fill
  className="object-cover"
/>
```

## Questions?

Let me know when you've:
1. ✓ Set up your `.env.local` file
2. ✓ Uploaded all images to Studio
3. ✓ Retrieved asset slugs via Vision query

Then I can help you update the components to use your Sanity assets!
