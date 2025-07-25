'use client'

import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ReactNode, useEffect, useRef } from 'react'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
}

interface ScrollWrapperProps {
  children: ReactNode
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    let smoother: ScrollSmoother | null = null

    // Initialize ScrollSmoother
    if (wrapperRef.current && contentRef.current) {
      smoother = ScrollSmoother.create({
        wrapper: wrapperRef.current,
        content: contentRef.current,
        smooth: 0.8, // Restored smooth scrolling you love
        effects: true // Restored scroll effects
      })
    }

    return () => {
      if (smoother) {
        smoother.kill()
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={wrapperRef} className="scroll-wrapper">
      <div ref={contentRef} className="scroll-content">
        {children}
      </div>
    </div>
  )
} 