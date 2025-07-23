/** @type {import('next').NextConfig} */
// Nextra configuration with GitHub Pages optimization
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true, // Enable LaTeX support for mathematical content
})

// Export configuration for static hosting on GitHub Pages
// Note: We handle 'output: export' manually to avoid conflicts with GitHub's auto-injection
module.exports = withNextra({
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
})
