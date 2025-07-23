/** @type {import('next').NextConfig} */
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  // Disable git-related features that cause native dependency issues
  gitTimestamp: false,
  readingTime: false,
})

module.exports = withNextra({
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  // Additional webpack config to handle problematic dependencies
  webpack: (config, { isServer }) => {
    // Exclude problematic native modules from client bundle
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
        // Fallback for the problematic git dependency
        '@napi-rs/simple-git': false,
      }
    }
    
    // Try to exclude the problematic module entirely if it causes issues
    config.externals = config.externals || []
    if (Array.isArray(config.externals)) {
      config.externals.push({
        '@napi-rs/simple-git': 'commonjs @napi-rs/simple-git',
        '@napi-rs/simple-git-linux-x64-gnu': 'commonjs @napi-rs/simple-git-linux-x64-gnu',
      })
    }
    
    return config
  }
})
