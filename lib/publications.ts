export interface Publication {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  url: string;
  abstract?: string;
  tags: string[];
}

export const publications: Publication[] = [
  {
    id: 'equipment-wear',
    title: 'Quantitative Hybrid Structure Analysis of Equipment Wear under Dynamic Pressure based on Digital Intelligent Algorithm',
    authors: ['Erise He', 'et al.'], // You can replace with full author list
    journal: 'IEEE Conference',
    year: 'May 2025',
    doi: '10.1109/ICDSIS65355.2025.11071008',
    url: 'https://ieeexplore.ieee.org/document/11071008/',
    abstract: 'This paper presents a quantitative hybrid structure analysis approach for equipment wear under dynamic pressure conditions using digital intelligent algorithms.',
    tags: ['Equipment Wear', 'Digital Intelligence', 'Hybrid Analysis', 'Dynamic Pressure']
  }
  // You can add more publications here
];

export const getPublications = () => {
  return publications;
}; 