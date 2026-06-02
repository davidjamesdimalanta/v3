'use client'

import { Component, ViewTransition } from 'react'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import Nav from './nav'
import SmoothScroll from './SmoothScroll'
import WaveBackground from './WaveBackground'
import Footer from './Footer'
import { ProjectDrawerProvider } from './ProjectDrawerProvider'

class WaveErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WaveBackground error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) return null
    return this.props.children
  }
}

export default function SiteShell({ children }) {
  const pathname = usePathname()
  const isStudio = pathname.startsWith('/studio')

  if (isStudio) {
    return children
  }

  return (
    <ProjectDrawerProvider>
      <SmoothScroll />
      <WaveErrorBoundary>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <WaveBackground />
        </motion.div>
      </WaveErrorBoundary>
      <Nav />
      <ViewTransition
        key={pathname}
        default="page-transition"
        enter="page-transition"
        exit="page-transition"
      >
        {children}
      </ViewTransition>
      <Footer />
    </ProjectDrawerProvider>
  )
}
