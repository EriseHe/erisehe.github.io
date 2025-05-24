import React from 'react'
import { DocsThemeConfig, useTheme } from 'nextra-theme-docs'

// Add CSS for the Century Schoolbook font
const fontStyles = `
@font-face {
  font-family: 'Century Schoolbook';
  src: url('/static/fonts/EVA/Century-Schoolbook.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
`;

const LogoComponent = () => {
  const { theme } = useTheme()
  const isDarkTheme = theme === 'dark'
  
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fontStyles }} />
      <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <img 
          src="/static/topo.png" 
          alt="Topology logo" 
          width="30" 
          height="30" 
          style={{ 
            filter: isDarkTheme ? 'invert(1)' : 'none',
            transition: 'filter 0.3s ease'
          }} 
        />
        <span style={{ fontFamily: "'Century Schoolbook', serif", fontSize: '1.5em' }}>人工主体補完計画</span>
      </span>
    </>
  )
}

const config: DocsThemeConfig = {
  logo: <LogoComponent />,
  project: {
    link: 'https://github.com/EriseHe/topo-book',
  },
  docsRepositoryBase: 'https://github.com/shuding/nextra-docs-template',
  footer: {
    text: 'Copyright © 2025 Topological Instrumentality Project',
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
