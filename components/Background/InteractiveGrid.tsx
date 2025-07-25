'use client'

import { gsap } from 'gsap'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/InteractiveGrid.module.css'

export default function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const cellsRef = useRef<HTMLDivElement[]>([])
  const animationFrameRef = useRef<number>()
  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 })

  // Proximity reaction constants (based on optimized system)
  const IMPACT_RADIUS = 280             // Expanded gravitational field range for larger effect
  const gap = 60                        // Match CSS --gap value

  // Performance optimization with physics-like smoothing
  const lastMousePos = useRef({ x: -1000, y: -1000 })
  const targetMousePos = useRef({ x: -1000, y: -1000 })
  const isAnimating = useRef(false)
  const lastUpdateTime = useRef(0)
  const updateThreshold = 20            // Slightly reduced frequency for more natural movement

  const calculateGridSize = () => {
    if (typeof window === 'undefined') return { cols: 0, rows: 0 }
    
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight
    
    const cols = Math.ceil(viewportWidth / gap) + 2
    const rows = Math.ceil(viewportHeight / gap) + 2
    
    return { cols, rows }
  }

  const updateCellPositions = () => {
    cellsRef.current.forEach((cell) => {
      if (cell && gridContainerRef.current) {
        const cellRect = cell.getBoundingClientRect()
        const containerRect = gridContainerRef.current.getBoundingClientRect()
        
        const centerX = cellRect.left + cellRect.width / 2 - containerRect.left
        const centerY = cellRect.top + cellRect.height / 2 - containerRect.top
        
        ;(cell as any).center_position = { x: centerX, y: centerY }
        // Initialize proximity reaction properties  
        ;(cell as any).originalPosition = { x: centerX, y: centerY }
      }
    })
  }

  // Animate grid in sync with hero section
  const animateGridIn = () => {
    if (!gridRef.current) return
    
    gsap.to(gridRef.current, {
      opacity: 0.4,
      duration: 1,
      delay: 0.5,
      ease: 'power3.out'
    })
  }

    // Optimized proximity attraction system (inspired by Oliviero Spinelli)
  const updateProximityReactions = () => {
    if (!gridContainerRef.current) return

    const now = Date.now()
    if (now - lastUpdateTime.current < updateThreshold) {
      if (isAnimating.current) {
        animationFrameRef.current = requestAnimationFrame(updateProximityReactions)
      }
      return
    }
    lastUpdateTime.current = now

    // Smooth mouse position interpolation for physics-like feel
    const targetX = targetMousePos.current.x
    const targetY = targetMousePos.current.y
    const lerpFactor = 0.12 // Smooth following factor (lower = more lag/realistic)
    
    lastMousePos.current.x += (targetX - lastMousePos.current.x) * lerpFactor
    lastMousePos.current.y += (targetY - lastMousePos.current.y) * lerpFactor

    const mouseX = lastMousePos.current.x
    const mouseY = lastMousePos.current.y

    // Check if mouse is off-screen
    const isMouseOffScreen = targetX < -500 || targetY < -500
    let hasActiveReactions = false

    for (let i = 0; i < cellsRef.current.length; i++) {
      const cell = cellsRef.current[i]
      if (!cell || !(cell as any).center_position) continue

      const cellX = (cell as any).center_position.x
      const cellY = (cell as any).center_position.y
      
      if (isMouseOffScreen) {
        // Reset to original position
        cell.style.setProperty('--dist-factor', '0')
        cell.style.transform = 'translate3d(0px, 0px, 0)'
      } else {
        // Calculate distance from mouse to cell
        const dx = cellX - mouseX
        const dy = cellY - mouseY
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < IMPACT_RADIUS) {
          hasActiveReactions = true
          
          // Calculate distance factor (1 = at mouse, 0 = at edge of radius)
          const distFactor = (IMPACT_RADIUS - Math.min(distance, IMPACT_RADIUS)) / IMPACT_RADIUS
          
          // Calculate angle from cell to mouse (for attraction direction)
          const angle = Math.atan2(-dy, -dx) // Inverted for attraction force
          
          // Apply displacement with smoother scaling for more realistic physics
          const smoothDistFactor = distFactor * distFactor // Quadratic scaling for gentler effect
          const displacement = smoothDistFactor * 50 // Increased max displacement for dramatic visual effect
          const translateX = Math.cos(angle) * displacement
          const translateY = Math.sin(angle) * displacement
          
          // Use CSS custom properties for styling
          cell.style.setProperty('--dist-factor', smoothDistFactor.toString())
          cell.style.setProperty('--angle', angle.toString())
          
          // Apply transform (CSS transition will handle the smoothing)
          cell.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`
        } else {
          // Outside impact radius - reset
          cell.style.setProperty('--dist-factor', '0')
          cell.style.transform = 'translate3d(0px, 0px, 0)'
        }
      }
    }

    // Continue animation only if there are active reactions or returning to rest
    if (hasActiveReactions || isMouseOffScreen) {
    if (isAnimating.current) {
        animationFrameRef.current = requestAnimationFrame(updateProximityReactions)
      }
    } else {
      isAnimating.current = false
    }
  }

  const handlePointerMove = (e?: MouseEvent) => {
    if (!gridContainerRef.current) return

    const containerRect = gridContainerRef.current.getBoundingClientRect()
    
    if (e) {
      const newX = e.clientX - containerRect.left
      const newY = e.clientY - containerRect.top
      
      // Update target position for smooth following
      targetMousePos.current = { x: newX, y: newY }
    } else {
      // Mouse left - set to off-screen position for return animation
      targetMousePos.current = { x: -1000, y: -1000 }
    }

    // Start animation loop if not running
    if (!isAnimating.current) {
      isAnimating.current = true
      updateProximityReactions()
    }
  }

  const handlePointerLeave = () => {
    // Set mouse to off-screen position to trigger return animation
    lastMousePos.current = { x: -1000, y: -1000 }
    
    // Ensure animation loop continues for return animation
    if (!isAnimating.current) {
      isAnimating.current = true
      updateProximityReactions()
    }
  }

  const handleResize = () => {
    const newDimensions = calculateGridSize()
    setGridDimensions(newDimensions)
    cellsRef.current = []
    setTimeout(updateCellPositions, 100)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return

    const initialDimensions = calculateGridSize()
    setGridDimensions(initialDimensions)

    const updatePositions = () => updateCellPositions()
    const handleMove = (e: MouseEvent) => handlePointerMove(e)

    setTimeout(updatePositions, 100)

    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handleMove)
    document.body.addEventListener('pointerleave', handlePointerLeave)

    return () => {
      isAnimating.current = false
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handleMove)
      document.body.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [])

  useEffect(() => {
    if (gridDimensions.cols > 0 && gridDimensions.rows > 0) {
      setTimeout(() => {
        updateCellPositions()
        animateGridIn()
      }, 100)
    }
  }, [gridDimensions])

  // Generate dynamic grid cells - no click handlers
  const cells = []
  for (let x = 0; x < gridDimensions.rows; x++) {
    const row = []
    for (let y = 0; y < gridDimensions.cols; y++) {
      const index = x * gridDimensions.cols + y
      row.push(
        <div
          key={`${x}-${y}`}
          ref={(el) => {
            if (el) cellsRef.current[index] = el
          }}
          className={`${styles.cell} grid-cell`}
          data-x={x}
          data-y={y}
        />
      )
    }
    cells.push(
      <div key={x} className={styles.row}>
        {row}
      </div>
    )
  }

  return (
    <div ref={gridContainerRef} className={styles.gridContainer}>
      <div ref={gridRef} className={styles.grid}>
        {cells}
      </div>
    </div>
  )
} 