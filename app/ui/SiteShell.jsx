'use client'

import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <WaveBackground />
      </motion.div>
      <Nav />
      {children}
      <Footer />
    </>
  )
}
