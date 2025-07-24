'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'
import InteractiveGrid from '../Background/InteractiveGrid'
import styles from '../../styles/HomePage.module.css'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const tl = gsap.timeline({ delay: 0.5 })

    tl.fromTo(heroRef.current, {
      autoAlpha: 0,
      yPercent: 20
    }, {
      autoAlpha: 1,
      yPercent: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .fromTo(cardRef.current, {
      autoAlpha: 0,
      y: 30
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5')
    .fromTo(subtitleRef.current, {
      autoAlpha: 0,
      y: 20
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3')
    .fromTo(indicatorRef.current, {
      autoAlpha: 0
    }, {
      autoAlpha: 1,
      duration: 0.5
    }, '-=0.2')

    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className={styles.heroSection} ref={heroRef}>
      {/* Interactive Grid Background */}
      <InteractiveGrid />
      
      <div className={styles.heroContent}>
        {/* Wireframe Business Card */}
        <div ref={cardRef} className={styles.businessCard}>
          {/* Corner vertices */}
          <div className={styles['vertex-tl']}></div>
          <div className={styles['vertex-tr']}></div>
          <div className={styles['vertex-bl']}></div>
          <div className={styles['vertex-br']}></div>
          
          <div className={styles.businessCardAvatar}>
            {/* Profile image with fallback */}
            <div className={styles.businessCardPlaceholder}>E</div>
            {/* Uncomment and provide actual image path when available */}
            {/* <Image 
              src="/static/images/profile.jpg" 
              alt="Erise He"
              width={50}
              height={50}
              priority
            /> */}
          </div>
          
          <div className={styles.businessCardContent}>
            <h1 className={styles.businessCardName}>Erise He</h1>
            <p className={styles.businessCardTitle}>Applied Mathematics & Physics</p>
            
            <div className={styles.businessCardLinks}>
              <a href="https://linkedin.com/" className={styles.businessCardLink} aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://github.com/" className={styles.businessCardLink} aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <p ref={subtitleRef} className={styles.heroSubtitle}>
          Hi, I'm Erise — an applied mathematics and physics student working on the topology of data, 
          the geometric deep learning, and the psychoanalysis of cognition.
        </p>
        
        <div ref={indicatorRef} className={styles.scrollIndicator}>
          <div className={styles.scrollPointer}>
            ↓
          </div>
          <span className={styles.scrollText}>Scroll to explore</span>
        </div>
      </div>
    </section>
  )
} 