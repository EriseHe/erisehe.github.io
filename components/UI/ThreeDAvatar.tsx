'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

interface ThreeDAvatarProps {
  size?: number
}

export default function ThreeDAvatar({ size = 45 }: ThreeDAvatarProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const [isClient, setIsClient] = useState(false)
  const frameRef = useRef<number>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const meshRef = useRef<THREE.Mesh>()

  // Ensure client-side rendering for Three.js
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!mountRef.current || !isClient) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup - positioned close to mesh for maximum size in 45px container
    const camera = new THREE.PerspectiveCamera(75, 1, 1, 1000) // Aspect ratio 1:1 for square avatar
    camera.position.z = 210 // Much closer to fill the 45px avatar space
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true // Transparent background
    })
    renderer.setSize(size, size)
    renderer.setClearColor(0x000000, 0) // Transparent background
    rendererRef.current = renderer

    // Geometry - Icosahedron wireframe (matching your aesthetic)
    const geometry = new THREE.IcosahedronGeometry(120, 1) // Very large, prominent wireframe mesh
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, // Pure white wireframe for clean, striking appearance
      wireframe: true,
      wireframeLinewidth: 0.1 // Very thin, delicate wireframe lines
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    meshRef.current = mesh

    // Add to DOM
    mountRef.current.appendChild(renderer.domElement)

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate)

      if (meshRef.current) {
        meshRef.current.rotation.x += 0.015 // Slightly slower for elegance
        meshRef.current.rotation.y += 0.01
        meshRef.current.rotation.z += 0.005 // Add subtle z-axis rotation
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup function
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
      if (rendererRef.current) {
        rendererRef.current.dispose()
      }
      if (mountRef.current && rendererRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement)
      }
    }
  }, [size, isClient])

  // Show placeholder until client-side rendering is ready
  if (!isClient) {
    return (
      <div 
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'rgb(255, 255, 255)',
          fontSize: '12px',
          fontWeight: 'bold'
        }}
      >
        3D
      </div>
    )
  }

  return (
    <div 
      ref={mountRef}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        background: 'transparent',
        position: 'relative'
      }}
    />
  )
} 