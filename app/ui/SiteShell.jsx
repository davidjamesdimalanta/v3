'use client'

import { Component } from 'react'
import { usePathname } from 'next/navigation'
import SiteNav from './SiteNav'
import SmoothScroll from './SmoothScroll'
import WaveBackground from './WaveBackground'
import Footer from './Footer'
import PageTransition from './PageTransition'

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
    <>
      <SmoothScroll />
      <WaveErrorBoundary>
        <div className="animate-in fade-in-0 motion-reduce:animate-none" style={{ animationDuration: '1.2s' }}>
          <WaveBackground />
        </div>
      </WaveErrorBoundary>
      <SiteNav />
      <PageTransition>{children}</PageTransition>
      <Footer />
    </>
  )
}
