# 人工主体補完計画 (Topological Instrumentality Project)

A personal website for exploring Lacanian psychoanalytic topology and artificial intelligence, built with [Nextra](https://nextra.site/) and deployed on GitHub Pages.

🌐 **Live Site**: [https://erisehe.github.io](https://erisehe.github.io)

## 🏗️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) 13.5.0
- **Documentation**: [Nextra](https://nextra.site/) 2.10.0 (stable version)
- **Hosting**: GitHub Pages (static export)
- **Deployment**: GitHub Actions

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📁 Content Structure

- `pages/` - MDX content files
  - `Lacanian Psychoanalytic Topology/` - Core theoretical work
  - `Subjector/` - AI subject simulation project
  - `Deep Learning/` - Machine learning procedures
- `static/` - Images, fonts, and static assets
- `theme.config.tsx` - Nextra theme configuration

## ⚙️ Configuration Notes

### GitHub Pages Deployment

This project uses a **custom GitHub Actions workflow** optimized for Nextra sites. Key insights:

1. **No Auto-Injection**: GitHub's `configure-pages@v5` with `static_site_generator: next` **conflicts** with Nextra's `withNextra()` wrapper function. We handle static export configuration manually.

2. **Stable Dependencies**: Uses Nextra 2.10.0 to avoid native dependency issues (`@napi-rs/simple-git`) that occur in newer versions.

3. **Manual Configuration**: The `output: 'export'` setting is handled manually in `next.config.js` rather than relying on GitHub's auto-injection.

### Workflow Structure

The deployment workflow (`.github/workflows/pages.yml`) is based on GitHub's official Next.js template but removes the problematic auto-injection step.

## 🔧 Troubleshooting

If you encounter build issues:

1. **Auto-injection errors**: Ensure no `static_site_generator: next` in workflow
2. **Native dependency errors**: Use Nextra 2.10.0 (stable version)
3. **Multiple workflows**: Check only one workflow file exists in `.github/workflows/`

## 📝 License

MIT License - See [LICENSE](LICENSE) for details.

---

*Exploring the intersection of psychoanalytic topology and computational architectures.*
