export interface Project {
  id: string
  title: string
  subtitle?: string // Adding subtitle for English/secondary title
  description: string
  thumbnail: string
  url: string
  tags: string[]
  featured: boolean
  year: string
}

export const projects: Project[] = [
  {
    id: 'topology',
    title: '人工主体補完計画',
    subtitle: 'Topological Instrumentality Project',
    description: 'Exploring Lacanian psychoanalytic topology and artificial intelligence through computational architecture',
    thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Mathematical/topology themed image
    url: 'https://subjector.vercel.app',
    tags: ['AI', 'Psychoanalysis', 'Topology', 'Theory'],
    featured: true,
    year: '2025'
  },
  {
    id: 'notebook',
    title: '学习笔记',
    subtitle: 'Notebook',
    description: 'Personal notes and explorations on mathematics, physics, and computer science topics',
    thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // Academic notebook/writing themed image
    url: 'https://erisehe.github.io/notebook',
    tags: ['Notes', 'Mathematics', 'Physics', 'Computer Science'],
    featured: true,
    year: '2024'
  },
  {
    id: 'geometric-ai',
    title: 'Geometric Deep Learning',
    subtitle: 'Neural Architecture Research',
    description: 'Investigation into geometric deep learning frameworks and their applications to understanding machine cognition',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', // AI/neural network themed
    url: '/geometric-ai',
    tags: ['AI', 'Deep Learning', 'Geometry', 'Research'],
    featured: true,
    year: '2024'
  }
  // Future projects will be added here
]

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured)
}

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id)
} 