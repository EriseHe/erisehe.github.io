import Head from 'next/head'
import { useEffect } from 'react'
import HeroSection from '../components/HomePage/HeroSection'
import ProjectGallery from '../components/HomePage/ProjectGallery'
import ScrollWrapper from '../components/SmoothScroll/ScrollWrapper'
import IPadCursor from '../components/UI/iPadCursor'
import NavigationToggle from '../components/UI/NavigationToggle'

export default function Home() {
  useEffect(() => {
    // Add iPad cursor class to body
    document.body.classList.add('ipad-cursor-active')
    
    return () => {
      document.body.classList.remove('ipad-cursor-active')
    }
  }, [])

  return (
    <>
      <Head>
        <title>Erise He - Applied Mathematics & AI Research</title>
        <meta name="description" content="Applied mathematics and physics student working on topology of data, geometric deep learning, and psychoanalysis of cognition." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://erisehe.github.io/" />
        <meta property="og:title" content="Erise He - Applied Mathematics & AI Research" />
        <meta property="og:description" content="Applied mathematics and physics student working on topology of data, geometric deep learning, and psychoanalysis of cognition." />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://erisehe.github.io/" />
        <meta property="twitter:title" content="Erise He - Applied Mathematics & AI Research" />
        <meta property="twitter:description" content="Applied mathematics and physics student working on topology of data, geometric deep learning, and psychoanalysis of cognition." />
        
        {/* Optimized Fonts - Preload critical font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
        <link 
          rel="preload"
          href="https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>

      {/* iPad-style Cursor */}
      <IPadCursor />

      {/* Fixed Navigation */}
      <div className="fixed-navigation">
        <NavigationToggle />
      </div>

      <ScrollWrapper>
        <main>
          <HeroSection />
          <ProjectGallery />
        </main>
      </ScrollWrapper>
    </>
  )
} 