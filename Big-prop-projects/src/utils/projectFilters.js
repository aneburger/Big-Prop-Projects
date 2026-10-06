// Values match the projectType dropdown in the Sanity project schema.
export const projectTypes = [
  { value: 'all', label: 'All' },
  { value: 'painting', label: 'Painting' },
  { value: 'waterproofing', label: 'Waterproofing' },
  { value: 'residential', label: 'Residential Renovation' },
  { value: 'commercial', label: 'Commercial Renovation' },
  { value: 'development', label: 'Development' },
];

export function filterProjectsByType(projects, type) {
  const list = projects || [];
  return type === 'all' ? list : list.filter(project => project.projectType === type);
}
