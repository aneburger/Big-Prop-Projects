import { IoIosArrowForward } from "react-icons/io";
import "../styles/Projects.css"
import AllProjectsCard from "./AllProjectsCard";

function AllProjects() {
  return (
    <div className="all-projects-div">
        <div className="all-projects">
            <IoIosArrowForward />
            <p>ALL PROJECTS</p>
        </div>

        <div className="project-type-filter">
            <button>All</button>
            <button>Painting</button>
            <button>Waterproofing</button>
            <button>Residential Renovation</button>
            <button>Commercial Renovation</button>
            <button>Development</button>
        </div>

        <div className="projects-grid">
            <AllProjectsCard />
            <AllProjectsCard />
            <AllProjectsCard />
        </div>

    </div>
  )
}

export default AllProjects
