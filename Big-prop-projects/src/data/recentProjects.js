import oliveHill from '../assets/olive-hill.jpg';
import oliveHillLarge from '../assets/olive-hill-large.png';
import century from '../assets/century.png';
import theFalls from '../assets/theFalls.png';
import eldo from '../assets/eldo-junction.png';

export const recentProjects = [
  {
    id: 'olive-hill', title: 'Olive Hill', location: 'Brentwood Park, Benoni',
    description: 'Modern residential development with premium finishes', image: oliveHill, galleryImage: oliveHillLarge
  },
  {
    id: 'century-skye', title: 'Century Skye', location: 'Die Hoewes, Centurion',
    description: 'Complete waterproofing solution for commercial property', image: century
  },
  {
    id: 'the-falls-2', title: 'The Falls 2 Lifestyle Estate', location: 'Wilgeheuwel, Roodepoort',
    description: 'Professional painting services for commercial property', image: theFalls
  },
  {
    id: 'eldo-junction', title: 'Eldo Junction', location: 'Eldoraigne, Centurion',
    description: 'Professional painting services for commercial property', image: eldo
  },
].map(project => ({
  ...project,
  date: 'February 2025', dateTime: '2025-02',
  // Replace these repeated photos with distinct images when available.
  images: Array.from({ length: 5 }, (_, index) => ({
    id: `${project.id}-${index + 1}`, src: project.galleryImage || project.image,
    alt: project.title,
  })),
}));
