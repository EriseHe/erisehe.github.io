/** @type {import('next').NextConfig} */
// Main portfolio configuration with Nextra support for topology project
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
})

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

// Apply Nextra to the entire project for simplicity during development
module.exports = withNextra(nextConfig)
