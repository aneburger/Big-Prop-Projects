import { IoIosArrowForward } from "react-icons/io";
import "../styles/About.css"
import AboutMemberCard from "./AboutMemberCard";

function AboutUsWhoWeAre() {
  return (
    <div className="about-who-we-are-div">
        <div className="who-we-are">
            <IoIosArrowForward />
            <p>WHO WE ARE</p>
        </div>

        <div className="members-grid">
            <AboutMemberCard />
            <AboutMemberCard />
            <AboutMemberCard />
        </div>
    </div>
  )
}

export default AboutUsWhoWeAre
