'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import styles from '../../styles/InteractiveGrid.module.css'

export default function InteractiveGrid() {
  const gridRef = useRef<HTMLDivElement>(null)
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const cellsRef = useRef<HTMLDivElement[]>([])
  const animationFrameRef = useRef<number>()
  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 })

  // Optimized physics constants for global gravitational field
  const gravitationalConstant = 400000   // Dramatically increased for strong visual effect
  const maxForce = 150                   // Much higher maximum displacement
  const dampingFactor = 0.88             // Lower damping for faster, more responsive movement
  const minDistance = 15                 // Slightly closer minimum distance
  const gap = 60                         // Match CSS --gap value

  // Performance optimization: batch updates with throttling
  const lastMousePos = useRef({ x: -1000, y: -1000 })
  const isAnimating = useRef(false)
  const lastUpdateTime = useRef(0)
  const updateThreshold = 16             // ~60fps limit (16ms)

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

  // Optimized global gravitational field calculation
  const updateGravitationalField = () => {
    if (!gridContainerRef.current) return

    const now = Date.now()
    if (now - lastUpdateTime.current < updateThreshold) {
      // Continue animation loop but skip calculation
      if (isAnimating.current) {
        animationFrameRef.current = requestAnimationFrame(updateGravitationalField)
      }
      return
    }
    lastUpdateTime.current = now

    const mouseX = lastMousePos.current.x
    const mouseY = lastMousePos.current.y

    // Optimized batch processing with reduced calculations
    const updates: Array<{ cell: HTMLDivElement; x: number; y: number }> = []
    const cellCount = cellsRef.current.length

    for (let i = 0; i < cellCount; i++) {
      const cell = cellsRef.current[i]
      if (!cell || !(cell as any).center_position) continue

      const cellX = (cell as any).center_position.x
      const cellY = (cell as any).center_position.y
      
      // Calculate distance vector (global field - no radius limit)
      const diff_x = mouseX - cellX
      const diff_y = mouseY - cellY
      const distanceSquared = diff_x * diff_x + diff_y * diff_y
      const distance = Math.max(Math.sqrt(distanceSquared), minDistance)

      // Optimized Einstein's spacetime curvature: F = G*M / r²
      const gravitationalForce = gravitationalConstant / distanceSquared
      
      // Simplified force calculation for better performance
      const baseForce = gravitationalForce * 2
      const distanceBoost = distance < 100 ? 1 : (1 + distance * 0.008)
      const smoothingFactor = 1 / (1 + distance * 0.0001)
      
      const force = Math.min(baseForce * distanceBoost * smoothingFactor, maxForce)
      
      // Normalize direction vector (optimized)
      const invDistance = 1 / distance
      const directionX = diff_x * invDistance
      const directionY = diff_y * invDistance
      
      // Apply spacetime curvature displacement
      const currentVelocity = (cell as any).velocity || { x: 0, y: 0 }
      
      // Physics integration with optimized acceleration
      const acceleration = force * 0.05
      const accelerationX = directionX * acceleration
      const accelerationY = directionY * acceleration
      
      // Update velocity with damping
      currentVelocity.x = (currentVelocity.x + accelerationX) * dampingFactor
      currentVelocity.y = (currentVelocity.y + accelerationY) * dampingFactor
      
      // Store velocity for next frame
      ;(cell as any).velocity = currentVelocity
      
      // Batch the update
      updates.push({ cell, x: currentVelocity.x, y: currentVelocity.y })
    }

    // Apply all updates in a single batch using native transforms for performance
    for (let i = 0; i < updates.length; i++) {
      const { cell, x, y } = updates[i]
      cell.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    // Continue animation loop
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