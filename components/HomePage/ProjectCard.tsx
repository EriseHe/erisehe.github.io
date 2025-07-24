'use client'

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Project } from '../../lib/projects'
import styles from '../../styles/HomePage.module.css'

interface ProjectCardProps {
  project: Project
  index: number
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.fromTo(cardRef.current, {
      autoAlpha: 0,
      y: 50,
      scale: 0.95
    }, {
      autoAlpha: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      },
      delay: index * 0.1
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === cardRef.current) {
          trigger.kill()
        }
      })
    }
  }, [index])

  return (
    <div className={styles.projectCard} ref={cardRef}>
      <Link href={project.url} className={styles.projectLink}>
        <div className={styles.projectThumbnail}>
          <div className={styles.projectPlaceholder}>
            {project.title}
          </div>
        </div>
        
        <div className={styles.projectInfo}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <p className={styles.projectDescription}>{project.description}</p>
          
          <div className={styles.projectMeta}>
            <span className={styles.projectYear}>{project.year}</span>
            <div className={styles.projectTags}>
              {project.tags.map((tag, idx) => (
                <span key={idx} className={styles.projectTag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
} 