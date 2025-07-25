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
    thumbnail: '/projects/topology-thumb.png',
    url: '/topo-book',
    tags: ['AI', 'Psychoanalysis', 'Topology', 'Theory'],
    featured: true,
    year: '2025'
  },
  {
    id: 'notebook',
    title: '学习笔记',
    subtitle: 'Notebook',
    description: 'Personal notes and explorations on mathematics, physics, and computer science topics',
    thumbnail: '/projects/notebook-thumb.png',
    url: '/notebook',
    tags: ['Notes', 'Mathematics', 'Physics', 'Computer Science'],
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