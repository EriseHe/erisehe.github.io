'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { getFeaturedProjects } from '../../lib/projects'
import ProjectCard from './ProjectCard'
import styles from '../../styles/HomePage.module.css'

export default function ProjectGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const projects = getFeaturedProjects()

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.fromTo(titleRef.current, {
      autoAlpha: 0,
      y: 30
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === galleryRef.current || trigger.trigger === titleRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section id="project-gallery" className={styles.projectGallery} ref={galleryRef} data-speed="0.9">
      <div className={styles.galleryContainer}>
        <h2 ref={titleRef} className={styles.galleryTitle}>
          Projects
        </h2>
        
        <div className={styles.projectGrid}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
          
          {/* Coming Soon Card */}
          <div className={styles.comingSoonCard}>
            <div className={styles.comingSoonContent}>
              <span className={styles.comingSoonText}>More projects coming soon...</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 