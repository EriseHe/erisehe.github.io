'use client'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
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

    // Simplified card animation with better performance
    gsap.set(cardRef.current, { autoAlpha: 0, y: 30 })

    const trigger = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 85%',
      onEnter: () => {
        gsap.to(cardRef.current, {
          autoAlpha: 1,
          y: 0,
          duration: 0.5, // Faster animation
          ease: 'power1.out', // Much lighter easing
          delay: index * 0.05 // Reduced stagger
        })
      }
    })

    return () => {
      trigger.kill()
    }
  }, [index])

  return (
    <div className={styles.projectCard} ref={cardRef}>
      <Link 
        href={project.url} 
        className={styles.projectLink}
        target={project.url.startsWith('http') ? '_blank' : undefined}
        rel={project.url.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        <div className={styles.projectThumbnail}>
          <img 
            src={project.thumbnail} 
            alt={`${project.title} thumbnail`}
            className={styles.projectImage}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.appendChild(
                Object.assign(document.createElement('div'), {
                  className: styles.projectPlaceholder,
                  textContent: project.id === 'topology' ? 'T' : project.id === 'notebook' ? 'N' : project.id[0].toUpperCase()
                })
              );
            }}
          />
        </div>
        
        <div className={styles.projectInfo}>
          <h3 className={styles.projectTitle}>
            {project.title}
            {project.subtitle && <span className={styles.projectSubtitle}>{project.subtitle}</span>}
          </h3>
          <p className={styles.projectDescription}>{project.description}</p>
          
          <div className={styles.projectMeta}>
            <span className={styles.projectYear}>{project.year}</span>
            <div className={styles.projectTags}>
              {project.tags.slice(0, 2).map((tag, idx) => (
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