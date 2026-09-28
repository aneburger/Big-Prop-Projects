import { HiArrowLongRight } from "react-icons/hi2";
import "../styles/Projects.css"
import projectImg from "../assets/olive-hill.jpg"
import { Link } from "react-router-dom"


function AllProjectsCard() {
  return (
    <div className="all-projects-card-div">
        {/* <Link> */}
            <img src={projectImg} alt="olive hill building"/>

            <div className="card-text">
                <p className="project-title">Olive Hill</p>
                <HiArrowLongRight />
            </div>
        {/* </Link> */}
    </div>
  )
}

export default AllProjectsCard
