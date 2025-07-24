'use client'

import { useEffect, useState } from 'react'
import styles from '../../styles/NavBar.module.css'

export default function NavBar() {
  const [activeSection, setActiveSection] = useState<'home' | 'project' | 'about' | 'contact'>('home')

  const handleSectionChange = (section: 'home' | 'project' | 'about' | 'contact') => {
    setActiveSection(section)
  }

  return (
    <nav className={styles.navBar}>
      <div className={styles.control}>
        <div className={styles.controlTrack}>
          <div className={styles.indicator}></div>
          
          <label htmlFor="home">Home</label>
          <input 
            className={styles.srOnly} 
            type="radio" 
            name="navigation" 
            id="home" 
            checked={activeSection === 'home'}
            onChange={() => handleSectionChange('home')}
          />
          
          <label htmlFor="project">Project</label>
          <input 
            className={styles.srOnly} 
            type="radio" 
            name="navigation" 
            id="project" 
            checked={activeSection === 'project'}
            onChange={() => handleSectionChange('project')}
          />
          
          <div className={styles.more}>
            <div className={styles.indicator}></div>
            <label htmlFor="about">
              <span>About</span>
            </label>
            <input 
              className={styles.srOnly} 
              type="radio" 
              name="navigation" 
              id="about" 
              checked={activeSection === 'about'}
              onChange={() => handleSectionChange('about')}
            />
            <label htmlFor="contact">
              <span>Contact</span>
            </label>
            <input 
              className={styles.srOnly} 
              type="radio" 
              name="navigation" 
              id="contact" 
              checked={activeSection === 'contact'}
              onChange={() => handleSectionChange('contact')}
            />
          </div>
        </div>
      </div>
    </nav>
  )
} 