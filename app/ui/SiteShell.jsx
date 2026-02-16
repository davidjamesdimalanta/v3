'use client'

import { usePathname } from 'next/navigation'
import Nav from './nav'
import SmoothScroll from './SmoothScroll'
import WaveBackground from './WaveBackground'
import Footer from './Footer'

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return children
  }

  return (
    <>
      <SmoothScroll />
      <WaveBackground />
      <Nav />
      {children}
      <Footer />
    </>
  )
}
