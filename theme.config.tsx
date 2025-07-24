import React from 'react'
import { useRouter } from 'next/router'
import { DocsThemeConfig, useTheme } from 'nextra-theme-docs'

// Add CSS for the Century Schoolbook font
const fontStyles = `
@font-face {
  font-family: 'Century Schoolbook';
  src: url('/fonts/EVA/Century-Schoolbook.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;

const LogoComponent = () => {
  const { theme } = useTheme()
  const router = useRouter()
  const isDarkTheme = theme === 'dark'
  
  // Only show the Nextra logo for topology project pages
  if (!router.asPath.startsWith('/projects/topology')) {
    return null
  }
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img 
          src="/topo.png" 
          alt="Topology logo" 
          width="30" 
          height="30" 
          style={{ 
            filter: isDarkTheme ? 'invert(1)' : 'none',
            transition: 'filter 0.3s ease'
          }} 
        />
        <span style={{ fontFamily: "'Century Schoolbook', serif", fontSize: '1.2em' }}>人工主体補完計画</span>
      </span>
    </>
  )
}

const config: DocsThemeConfig = {
  logo: <LogoComponent />,
  project: {
    link: 'https://github.com/erisehe/erisehe.github.io',
  },
  docsRepositoryBase: 'https://github.com/erisehe/erisehe.github.io/tree/main/pages/projects/topology',
  footer: {
    text: 'Copyright © 2025 Topological Instrumentality Project',
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    
    // Only apply Nextra SEO for topology project pages
    if (asPath.startsWith('/projects/topology')) {
      return {
        titleTemplate: '%s – 人工主体補完計画'
      }
    }
    
    return {}
  },
  head: (
    <>
      <style>{`
        .nx-nav-header {
          background-color: gray !important; 
        }
        .nx-nav-header button,
        .nx-nav-header a,
        .nx-nav-header input {
          color: black !important;
        }
      `}</style>
    </>
  ),
}

export default config
