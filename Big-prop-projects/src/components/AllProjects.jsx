import { useId, useState } from 'react';
import { Select } from '@base-ui/react/select';
import { IoIosArrowForward } from 'react-icons/io';
import { HiChevronDown, HiCheck } from 'react-icons/hi2';
import AllProjectsCard from './AllProjectsCard';
import SectionReveal from './SectionReveal';
import '../styles/Projects.css';

const projectTypes = [
  { value: 'all', label: 'All' },
  { value: 'painting', label: 'Painting' },
  { value: 'waterproofing', label: 'Waterproofing' },
  { value: 'residential', label: 'Residential Renovation' },
  { value: 'commercial', label: 'Commercial Renovation' },
  { value: 'development', label: 'Development' },
];

function AllProjects() {
  const id = useId();
  // Visual selection only: no filtering or backend request is performed yet.
  // Both controls share state so the selection survives viewport changes.
  const [projectType, setProjectType] = useState('all');

  return (
    <main className="all-projects-div">
      <SectionReveal className="all-projects" onEnter delay={0.2}>
        <IoIosArrowForward aria-hidden="true" />
        <h1>ALL PROJECTS</h1>
      </SectionReveal>

      <SectionReveal className="project-type-filter" delay={0.4} role="group" aria-label="Filter by project type">
        {projectTypes.map(({ value, label }) => (
          <button key={value} type="button" aria-pressed={projectType === value}
            onClick={() => setProjectType(value)}>{label}</button>
        ))}
      </SectionReveal>

      <SectionReveal className="project-filter-mobile" delay={0.4}>
        <label id={id + '-label'} htmlFor={id}>Filter by project type:</label>
        <Select.Root items={projectTypes} value={projectType} onValueChange={setProjectType}>
          <Select.Trigger id={id} aria-labelledby={id + '-label'} className="project-filter-trigger">
            <Select.Value />
            <Select.Icon className="project-filter-icon"><HiChevronDown aria-hidden="true" /></Select.Icon>
          </Select.Trigger>
          <Select.Portal>
            <Select.Positioner className="project-filter-positioner" sideOffset={6} alignItemWithTrigger={false}>
              <Select.Popup className="project-filter-popup">
                <Select.List className="project-filter-list">
                  {projectTypes.map(({ value, label }) => (
                    <Select.Item key={value} value={value} className="project-filter-item">
                      <Select.ItemText>{label}</Select.ItemText>
                      <Select.ItemIndicator className="project-filter-check"><HiCheck aria-hidden="true" /></Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Popup>
            </Select.Positioner>
          </Select.Portal>
        </Select.Root>
      </SectionReveal>

      <div className="projects-grid">
        <SectionReveal className="project-card-reveal" delay={0.2}><AllProjectsCard /></SectionReveal>
        <SectionReveal className="project-card-reveal" delay={0.4}><AllProjectsCard /></SectionReveal>
        <SectionReveal className="project-card-reveal" delay={0.6}><AllProjectsCard /></SectionReveal>
      </div>
    </main>
  );
}

export default AllProjects;
