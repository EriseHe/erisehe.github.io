'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import styles from '../../styles/iPadCursor.module.css'

export default function IPadCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'text'>('default')
  const lastUpdateTime = useRef(0)
  const rafId = useRef<number>()

  // Heavily optimized cursor update - 30fps max for better performance
  const throttledCursorUpdate = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastUpdateTime.current < 33) return // Limit to 30fps for better performance

    lastUpdateTime.current = now
    
    // Direct style update - no RAF needed for simple transforms
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
    }
  }, [])

  // Ultra-fast element detection - minimal checks
  const detectCursorState = useCallback((element: Element): 'default' | 'text' => {
    const tagName = element.tagName.toLowerCase()
    
    // Fast text element detection - only check common text elements
    if (['input', 'textarea'].includes(tagName) || 
        element.getAttribute('contenteditable') === 'true') {
      return 'text'
    }
    
    return 'default'
  }, [])

  // Simplified cursor hiding - minimal CSS injection
  const enforceCursorHiding = useCallback(() => {
    // Lightweight style injection
    const style = document.createElement('style')
    style.textContent = `* { cursor: none !important; }`
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const cursor = cursorRef.current
    if (!cursor) return

    // Hide default cursor immediately and comprehensively
    document.body.style.cursor = 'none'
    document.documentElement.style.cursor = 'none'
    
    // Add iPad cursor class and enforce hiding
    document.body.classList.add('ipad-cursor-active')
    const cleanupStyles = enforceCursorHiding()

    let elementCheckCounter = 0

    const updateCursor = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      
      // Always update position (lightweight)
      throttledCursorUpdate(x, y)

      // Check element type much less frequently (every 10th call)
      elementCheckCounter++
      if (elementCheckCounter % 10 === 0) {
        const elementUnderCursor = document.elementFromPoint(x, y)
        if (elementUnderCursor) {
          const newState = detectCursorState(elementUnderCursor)
          if (newState !== cursorState) {
            setCursorState(newState)
          }
        }
      }
    }

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.opacity = '0'
      }
    }

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = '1'
      }
    }

    // Use passive listeners for better performance
    document.addEventListener('mousemove', updateCursor, { passive: true })
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true })

    return () => {
      document.body.style.cursor = 'auto'
      document.documentElement.style.cursor = 'auto'
      document.body.classList.remove('ipad-cursor-active')
      cleanupStyles()
      if (rafId.current) cancelAnimationFrame(rafId.current)
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [cursorState, throttledCursorUpdate, detectCursorState, enforceCursorHiding])

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${styles[cursorState]}`}
      style={{ pointerEvents: 'none' }}
    />
  )
} 