import "../styles/RecentProjects.css"
import oliveHillImg from "../assets/olive-hill.jpg"
import centuryImg from "../assets/century.png"
import theFallsImg from "../assets/theFalls.png"
import eldoImg from "../assets/eldo-junction.png"
import { Link } from "react-router-dom";

function RecentProjectCard() {
  return (
    <div className="recent-project-div">
        <img src={oliveHillImg} alt="olive-hill building"/>
        <p className="recent-project-date">February 2025</p>
        <div className="recent-project-text">
            <h2>The Falls 2 Lifestyle Estate</h2>
            <p className="recent-project-location">BRENTWOODPARK, BENONI</p>
            <p className="recent-project-description">Modern residential development with premium finishes</p>
            {/* Add arrow svg here */}
        </div>
    </div>
  )
}

export default RecentProjectCard
