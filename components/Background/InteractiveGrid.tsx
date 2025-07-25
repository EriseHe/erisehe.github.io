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

  // Highly optimized space-time curvature constants with strong visual impact
  const maxInfluenceRange = 600          // Larger influence radius for better visual effect
  const longRangeFactor = 200000         // Increased gravitational strength for more visible effect
  const maxDisplacement = 120            // Increased displacement for clear movement
  const dampingFactor = 0.85             // Slightly less damping for more responsive motion
  const gap = 60                         // Match CSS --gap value

  // Performance optimization: smart throttling and spatial culling
  const lastMousePos = useRef({ x: -1000, y: -1000 })
  const isAnimating = useRef(false)
  const lastUpdateTime = useRef(0)
  const updateThreshold = 20             // Slightly reduced frequency for better performance
  const frameSkipCounter = useRef(0)     // Skip frames for distant cells

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
        
        ;(cell as any).center_position = {
          x: cellRect.left + cellRect.width / 2 - containerRect.left,
          y: cellRect.top + cellRect.height / 2 - containerRect.top,
        }
        // Initialize physics properties
        ;(cell as any).velocity = { x: 0, y: 0 }
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

  // Highly optimized space-time curvature calculation with spatial culling
  const updateGravitationalField = () => {
    if (!gridContainerRef.current) return

    const now = Date.now()
    if (now - lastUpdateTime.current < updateThreshold) {
      if (isAnimating.current) {
        animationFrameRef.current = requestAnimationFrame(updateGravitationalField)
      }
      return
    }
    lastUpdateTime.current = now

    const mouseX = lastMousePos.current.x
    const mouseY = lastMousePos.current.y
    const updates: Array<{ cell: HTMLDivElement; x: number; y: number }> = []
    
    // Frame skipping for even better performance
    frameSkipCounter.current = (frameSkipCounter.current + 1) % 2

    for (let i = 0; i < cellsRef.current.length; i++) {
      const cell = cellsRef.current[i]
      if (!cell || !(cell as any).center_position) continue

      const cellX = (cell as any).center_position.x
      const cellY = (cell as any).center_position.y
      
      // Fast distance-squared calculation for spatial culling
      const dx = mouseX - cellX
      const dy = mouseY - cellY
      const distanceSquared = dx * dx + dy * dy
      
             // MAJOR OPTIMIZATION: Skip cells outside influence range (eliminates ~50% of calculations)
       if (distanceSquared > maxInfluenceRange * maxInfluenceRange) continue
       
       // Skip every other frame for very distant cells only (lighter optimization)
       if (distanceSquared > 25000 && frameSkipCounter.current === 0) continue

       // Enhanced long-range space-time curvature with better visual impact
       const distance = Math.sqrt(distanceSquared)
       const invDistanceSquared = 1 / Math.max(distanceSquared, 300) // Stronger close-range effect
       
       // More visible gravitational effect with distance-based scaling
       let force = longRangeFactor * invDistanceSquared
       
       // Boost force for medium-range interactions (sweet spot for visibility)
       if (distance < 200) {
         force *= 1.5 // 50% boost for close-range visibility
       }
       
       force = Math.min(force, maxDisplacement)
       
       // Improved direction calculation for smoother motion
       const invDistance = 1 / distance
       const directionX = dx * invDistance * force
       const directionY = dy * invDistance * force
       
       // Enhanced velocity integration for more responsive movement
       const velocity = (cell as any).velocity || { x: 0, y: 0 }
       velocity.x = (velocity.x + directionX * 0.08) * dampingFactor
       velocity.y = (velocity.y + directionY * 0.08) * dampingFactor
      
      ;(cell as any).velocity = velocity
      updates.push({ cell, x: velocity.x, y: velocity.y })
    }

    // Batch apply all transforms (unchanged - already optimized)
    for (let i = 0; i < updates.length; i++) {
      const { cell, x, y } = updates[i]
      cell.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    if (isAnimating.current) {
      animationFrameRef.current = requestAnimationFrame(updateGravitationalField)
    }
  }

  const handlePointerMove = (e?: MouseEvent) => {
    if (!gridContainerRef.current) return

    const containerRect = gridContainerRef.current.getBoundingClientRect()
    
    // Update mouse position with throttling
    if (e) {
      const newX = e.clientX - containerRect.left
      const newY = e.clientY - containerRect.top
      
      // Only update if position changed significantly (reduces calculations)
      const deltaX = Math.abs(newX - lastMousePos.current.x)
      const deltaY = Math.abs(newY - lastMousePos.current.y)
      
      if (deltaX > 2 || deltaY > 2) { // 2px threshold for updates
        lastMousePos.current = { x: newX, y: newY }
      }
    } else {
      // Mouse left - gravitational source moves off-screen
      lastMousePos.current = { x: -1000, y: -1000 }
    }

    // Start animation loop if not running
    if (!isAnimating.current) {
      isAnimating.current = true
      updateGravitationalField()
    }
  }

  const handlePointerLeave = () => {
    // Gradually return all nodes to rest state
    isAnimating.current = false
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    cellsRef.current.forEach((cell) => {
      if (cell) {
        ;(cell as any).velocity = { x: 0, y: 0 }
        gsap.to(cell, {
          duration: 3,
          x: 0,
          y: 0,
          ease: "elastic.out(1, 0.3)",
        })
      }
    })
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