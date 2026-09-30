import { IoIosArrowForward } from "react-icons/io";
import { HiArrowLongRight } from "react-icons/hi2";
import "../styles/RecentProjects.css"
import { Link } from "react-router-dom";

function RecentProjects() {
  return (
    <div className="projects-div">
        <div className="recent-projects">
            <IoIosArrowForward />
            <p>RECENT PROJECTS</p>
        </div>

        <div className="recent-project-sections">

        </div>

        <div className="view-all-projects">
            <Link to="/projects" className="button-swap view-all-projects-button">View all projects <HiArrowLongRight /></Link>
        </div>
    </div>
  )
}

export default RecentProjects
