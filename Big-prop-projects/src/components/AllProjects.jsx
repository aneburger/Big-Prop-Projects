import { useId, useState } from 'react';
import { Select } from '@base-ui/react/select';
import { IoIosArrowForward } from 'react-icons/io';
import { HiChevronDown, HiCheck } from 'react-icons/hi2';
import AllProjectsCard from './AllProjectsCard';
import SectionReveal from './SectionReveal';
import useProjects from '../hooks/useProjects';
import ProjectsStatus from './ProjectsStatus';
import { filterProjectsByType, projectTypes } from '../utils/projectFilters';
import '../styles/Projects.css';

function AllProjects() {
  const id = useId();
  const { data: projects = [], ...status } = useProjects();
  // Filter the fetched list locally; both controls share the same selection.
  const [projectType, setProjectType] = useState('all');
  const filteredProjects = filterProjectsByType(projects, projectType);
  const selectedLabel = projectTypes.find(type => type.value === projectType)?.label || 'All';
  const gridId = id + '-projects';

  return (
    <main className="all-projects-div">
      <SectionReveal className="all-projects" onEnter delay={0.2}>
        <IoIosArrowForward aria-hidden="true" />
        <h1>ALL PROJECTS</h1>
      </SectionReveal>

      <SectionReveal className="project-type-filter" delay={0.4} role="group" aria-label="Filter by project type">
        {projectTypes.map(({ value, label }) => (
          <button key={value} type="button" aria-pressed={projectType === value} aria-controls={gridId}
            onClick={() => setProjectType(value)}>{label}</button>
        ))}
      </SectionReveal>

      <SectionReveal className="project-filter-mobile" delay={0.4}>
        <label id={id + '-label'} htmlFor={id}>Filter by project type:</label>
        <Select.Root items={projectTypes} value={projectType} onValueChange={value => setProjectType(value || 'all')}>
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

      <div key={projectType} id={gridId} className="projects-grid" aria-busy={status.loading}>
        {(status.loading || status.error || !filteredProjects.length) && (
          <ProjectsStatus {...status} empty={projectType === 'all'
            ? 'No projects have been published yet.'
            : `No ${selectedLabel.toLowerCase()} projects have been published yet. Select All to view other projects.`} />
        )}
        {filteredProjects.map((project, index) => (
          <SectionReveal key={project.id} className="project-card-reveal" delay={(index % 3 + 1) * 0.2}>
            <AllProjectsCard title={project.title} image={project.cardImage} imageAlt={project.imageAlt} to={project.to} />
          </SectionReveal>
        ))}
      </div>
    </main>
  );
}

export default AllProjects;
