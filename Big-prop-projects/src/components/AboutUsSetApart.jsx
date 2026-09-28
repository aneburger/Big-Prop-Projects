import { IoIosArrowForward } from "react-icons/io";
import "../styles/About.css"

function AboutUsSetApart() {
  return (
    <div className="about-set-apart-div">
        <div className="what-sets-us-apart">
            <IoIosArrowForward />
            <p>WHAT SETS US APART</p>
        </div>

        <div className="about-set-apart-text">
            <h2>Quality gets the job done. Trust brings people back.</h2>
            <p> We combine dependable workmanship and cost-effective 
                solutions with a personal approach that puts long-term 
                relationships ahead of short-term business.</p>
        </div>
    </div>
  )
}

export default AboutUsSetApart
