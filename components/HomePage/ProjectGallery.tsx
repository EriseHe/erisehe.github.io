'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { getFeaturedProjects } from '../../lib/projects'
import ProjectCard from './ProjectCard'
import styles from '../../styles/HomePage.module.css'

export default function ProjectGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const galleryGridRef = useRef<HTMLDivElement>(null)
  const projects = getFeaturedProjects()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Animate profile section from left
    gsap.fromTo(profileRef.current, {
      autoAlpha: 0,
      x: -50
    }, {
      autoAlpha: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    // Animate gallery grid from right
    gsap.fromTo(galleryGridRef.current, {
      autoAlpha: 0,
      x: 50
    }, {
      autoAlpha: 1,
      x: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: galleryRef.current,
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === galleryRef.current || 
            trigger.trigger === profileRef.current || 
            trigger.trigger === galleryGridRef.current) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section id="project-gallery" className={styles.projectGallery} ref={galleryRef} data-speed="0.9">
      {/* Fixed Profile Sidebar */}
      <div className={styles.profileSidebar} ref={profileRef}>
        <div className={styles.profileCard}>
          <div className={styles.profileAvatar}>
            <div className={styles.avatarPlaceholder}>E</div>
          </div>
          
          <div className={styles.profileInfo}>
            <h2 className={styles.profileName}>Erise He</h2>
            <p className={styles.profileTitle}>Applied Mathematics & Physics</p>
            
            <div className={styles.profileBio}>
              <p>Researcher focused on the intersection of topology, geometric deep learning, and nero-psychoanalytic topology.</p>
              <p>Exploring geometric deep learning architectures and their applications to understanding machine subjectivity through Lacanian psychoanalytic frameworks.</p>
            </div>

            <div className={styles.profileStats}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Research Areas</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>1+</span>
                <span className={styles.statLabel}>Publications</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>3+</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
            </div>

            <div className={styles.profileLinks}>
              <a href="#" className={styles.profileLink}>Publications</a>
              <a href="#" className={styles.profileLink}>CV</a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area with Gallery */}
      <div className={styles.galleryLayout}>
        <div className={styles.galleryWrapper}>
          <div className={styles.galleryHeader}>
            <h3 className={styles.galleryTitle}>Featured Projects</h3>
            <p className={styles.gallerySubtitle}>Exploring the topological deep learning and artificial desire through Lacanian psychoanalytic frameworks</p>
          </div>
          
          <div className={styles.projectGrid} ref={galleryGridRef}>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 