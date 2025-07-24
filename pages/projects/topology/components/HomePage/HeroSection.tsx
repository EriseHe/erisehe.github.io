'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import styles from '../../styles/HomePage.module.css'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
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
    .fromTo(titleRef.current, {
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
      <div className={styles.heroContent}>
        <h1 ref={titleRef} className={styles.heroTitle}>
          Erise He
        </h1>
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