'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/router'
import { ScrollSmoother } from 'gsap/dist/ScrollSmoother'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import styles from '../../styles/NavigationToggle.module.css'

type NavigationSection = 'home' | 'project' | 'about' | 'contact'

export default function NavigationToggle() {
  const router = useRouter()
  const [selectedSection, setSelectedSection] = useState<NavigationSection>('home')

  const setupScrollTracking = useCallback(() => {
    if (typeof window === 'undefined') return null

    // Only track scroll on homepage
    if (router.pathname !== '/') return null

    // Track scroll position to update navigation state
    const trigger = ScrollTrigger.create({
      trigger: '#project-gallery',
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        if (self.isActive) {
          setSelectedSection('project')
        } else {
          setSelectedSection('home')
        }
      }
    })

    return trigger
  }, [router.pathname])

  // Update selected section based on current route and setup scroll tracking
  useEffect(() => {
    if (router.pathname === '/') {
      setSelectedSection('home')
      
      // Set up scroll tracking for home page sections
      const trigger = setupScrollTracking()
      
      // Cleanup function
      return () => {
        if (trigger) {
          trigger.kill()
        }
      }
    }
    // Note: About and Contact navigation removed - only visual indicators remain
  }, [router.pathname, setupScrollTracking])

  const handleNavigation = (section: NavigationSection) => {
    setSelectedSection(section)
    
    switch (section) {
      case 'home':
        if (router.pathname !== '/') {
          router.push('/')
        } else {
          // Use GSAP ScrollSmoother for smooth scrolling
          const smoother = ScrollSmoother.get()
          if (smoother) {
            smoother.scrollTo(0, true, 'power2.inOut')
          }
        }
        break
        
      case 'project':
        if (router.pathname !== '/') {
          router.push('/')
        } else {
          // Use GSAP ScrollSmoother to scroll to project section
          const smoother = ScrollSmoother.get()
          const projectSection = document.querySelector('#project-gallery')
          if (smoother && projectSection) {
            smoother.scrollTo(projectSection, true, 'power2.inOut')
          }
        }
        break
        
      case 'about':
        // Keep the visual state but remove navigation
        // No action - just visual indicator
        break
        
      case 'contact':
        // Keep the visual state but remove navigation
        // No action - just visual indicator
        break
    }
  }

  return (
    <div className={styles.control}>
      <div className={styles.controlTrack}>
        <div className={styles.indicator}></div>
        <label htmlFor="free" onClick={() => handleNavigation('home')}>
          Erise He
        </label>
        <input 
          className={styles.srOnly} 
          type="radio" 
          name="tier" 
          id="free" 
          checked={selectedSection === 'home'}
          onChange={() => handleNavigation('home')}
        />
        <label htmlFor="project" onClick={() => handleNavigation('project')}>
          Project
        </label>
        <input 
          className={styles.srOnly} 
          type="radio" 
          name="tier" 
          id="project" 
          checked={selectedSection === 'project'}
          onChange={() => handleNavigation('project')}
        />
        <div className={styles.premium}>
          <div className={styles.indicator}></div>
          <label htmlFor="solo" onClick={() => handleNavigation('about')}>
            <span>About</span>
            <span className={styles.srOnly}>More About</span>
          </label>
          <input 
            className={styles.srOnly} 
            type="radio" 
            name="tier" 
            id="solo" 
            checked={selectedSection === 'about'}
            onChange={() => handleNavigation('about')}
          />
          <label htmlFor="team" onClick={() => handleNavigation('contact')}>
            <span>Contact</span>
            <span className={styles.srOnly}>More Contact</span>
          </label>
          <input 
            className={styles.srOnly} 
            type="radio" 
            name="tier" 
            id="team" 
            checked={selectedSection === 'contact'}
            onChange={() => handleNavigation('contact')}
          />
        </div>
      </div>
    </div>
  )
} 