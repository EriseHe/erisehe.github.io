'use client'

import { useEffect, useRef, ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'

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
        smooth: 0.8,
        effects: true
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