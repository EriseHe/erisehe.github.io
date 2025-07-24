export interface Project {
  id: string
  title: string
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
    description: 'Exploring Lacanian psychoanalytic topology and artificial intelligence through computational architecture',
    thumbnail: '/projects/topology-thumb.png',
    url: '/projects/topology',
    tags: ['AI', 'Psychoanalysis', 'Topology', 'Theory'],
    featured: true,
    year: '2024'
  },
  // Future projects will be added here
]

export const getFeaturedProjects = () => {
  return projects.filter(project => project.featured)
}

export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id)
} 