'use client'

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useEffect, useRef } from 'react';
import { getPublications } from '../../lib/publications';
import styles from '../../styles/Publications.module.css';
import PublicationItem from './PublicationItem';

export default function PublicationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const publications = getPublications();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for the publications section title
    gsap.fromTo(titleRef.current, 
      { opacity: 0, y: 20 }, 
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Animation for the publications list with staggered effect
    gsap.fromTo(listRef.current?.children, 
      { opacity: 0, y: 30 }, 
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: listRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current || 
            trigger.vars.trigger === titleRef.current ||
            trigger.vars.trigger === listRef.current) {
          trigger.kill();
        }
      });
    };
  }, []);
  
  return (
    <section id="publications" className={styles.publicationsSection} ref={sectionRef}>
      <div className={styles.publicationsContainer}>
        <div className={styles.publicationsHeader} ref={titleRef}>
          <h2 className={styles.publicationsTitle}>Academic Publications</h2>
          <p className={styles.publicationsSubtitle}>
            Recent research papers and conference proceedings
          </p>
        </div>
        
        <div className={styles.publicationsList} ref={listRef}>
          {publications.map((publication, index) => (
            <PublicationItem 
              key={publication.id}
              publication={publication}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
} 