/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  // Disable features that require native dependencies
  gitTimestamp: false,
  readingTime: false,
})

const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
}

module.exports = withNextra(nextConfig)
