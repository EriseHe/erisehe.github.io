'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { useEffect, useRef } from 'react'
import { getFeaturedProjects } from '../../lib/projects'
import { getPublications } from '../../lib/publications'
import styles from '../../styles/HomePage.module.css'
import publicationStyles from '../../styles/Publications.module.css'
import ProjectCard from './ProjectCard'

export default function ProjectGallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const galleryGridRef = useRef<HTMLDivElement>(null)
  const publicationsRef = useRef<HTMLDivElement>(null)
  const projects = getFeaturedProjects()
  const publications = getPublications()

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Restore original profile section animation from left
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

    // Restore original gallery grid animation from right
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
    
    // Publications section animation
    gsap.fromTo(publicationsRef.current, {
      autoAlpha: 0,
      y: 20
    }, {
      autoAlpha: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: publicationsRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === galleryRef.current || 
            trigger.trigger === profileRef.current || 
            trigger.trigger === galleryGridRef.current ||
            trigger.trigger === publicationsRef.current) {
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
            <img 
              src="/static/profile.png" 
              alt="Erise He Profile" 
              className={styles.avatarImage}
            />
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
              <a href="#publications" className={styles.profileLink}>Publications</a>
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
          
          {/* Compact Academic Publications Section */}
          <div id="publications" className={publicationStyles.compactPublications} ref={publicationsRef}>
            <div className={publicationStyles.compactPublicationsHeader}>
              <h3 className={publicationStyles.compactPublicationsTitle}>Academic Publications</h3>
            </div>
            
            <div className={publicationStyles.compactPublicationsList}>
              {publications.map((publication, index) => (
                <div key={publication.id} className={publicationStyles.publicationItem}>
                  <div className={publicationStyles.publicationContent}>
                    <h4 className={publicationStyles.publicationTitle}>
                      <a href={publication.url} target="_blank" rel="noopener noreferrer">
                        {publication.title}
                      </a>
                    </h4>
                    
                    <p className={publicationStyles.publicationAuthors}>
                      {publication.authors.join(', ')}
                    </p>
                    
                    <div className={publicationStyles.publicationMeta}>
                      <span className={publicationStyles.publicationJournal}>{publication.journal}</span>
                      <span className={publicationStyles.publicationYear}>{publication.year}</span>
                      {publication.doi && (
                        <span className={publicationStyles.publicationDoi}>
                          <a href={`https://doi.org/${publication.doi}`} target="_blank" rel="noopener noreferrer">
                            DOI: {publication.doi}
                          </a>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 