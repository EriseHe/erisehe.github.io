'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import styles from '../../styles/iPadCursor.module.css'

export default function IPadCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<'default' | 'text'>('default')
  const lastUpdateTime = useRef(0)
  const rafId = useRef<number>()

  // Throttled cursor update for better performance
  const throttledCursorUpdate = useCallback((x: number, y: number) => {
    const now = Date.now()
    if (now - lastUpdateTime.current < 8) return // Limit to ~120fps max

    lastUpdateTime.current = now
    
    if (rafId.current) cancelAnimationFrame(rafId.current)
    
    rafId.current = requestAnimationFrame(() => {
      if (cursorRef.current) {
        // Use transform for better performance
        cursorRef.current.style.transform = `translate3d(${x - 10}px, ${y - 10}px, 0)`
      }
    })
  }, [])

  // Simplified element detection - only text vs default
  const detectCursorState = useCallback((element: Element): 'default' | 'text' => {
    const tagName = element.tagName.toLowerCase()
    const computedStyle = window.getComputedStyle(element)
    
    // Check for text cursor only
    if (computedStyle.cursor === 'text' || 
        element.getAttribute('contenteditable') === 'true' ||
        ['input', 'textarea'].includes(tagName) ||
        (['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName) && element.textContent?.trim())) {
      return 'text'
    }
    
    return 'default'
  }, [])

  // Force cursor hiding on all elements
  const enforceCursorHiding = useCallback(() => {
    // Add comprehensive styles to override any cursor declarations
    const style = document.createElement('style')
    style.textContent = `
      *, *:hover, *:active, *:focus, 
      a, a:hover, a:active, a:visited,
      button, button:hover, button:active,
      [role="button"], [role="button"]:hover,
      input, textarea, select,
      [onclick], [onclick]:hover,
      .clickable, .cursor-pointer {
        cursor: none !important;
      }
      
      /* Override any inline styles */
      [style*="cursor"] {
        cursor: none !important;
      }
    `
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

    let currentElement: Element | null = null

    const updateCursor = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      
      // Throttled position update
      throttledCursorUpdate(x, y)

      // Optimized element detection - only check if element changed
      const elementUnderCursor = document.elementFromPoint(x, y)
      if (elementUnderCursor && elementUnderCursor !== currentElement) {
        currentElement = elementUnderCursor
        
        // Force cursor none on the current element (cast to HTMLElement for style access)
        if (elementUnderCursor instanceof HTMLElement) {
          elementUnderCursor.style.cursor = 'none'
        }
        
        const newState = detectCursorState(elementUnderCursor)
        if (newState !== cursorState) {
          setCursorState(newState)
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