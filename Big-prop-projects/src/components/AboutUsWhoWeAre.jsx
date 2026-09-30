import { IoIosArrowForward } from "react-icons/io";
import "../styles/About.css"
import AboutMemberCard from "./AboutMemberCard";
import SectionReveal from './SectionReveal';

function AboutUsWhoWeAre() {
  return (
    <div className="about-who-we-are-div">
        <SectionReveal className="who-we-are">
            <IoIosArrowForward />
            <p>WHO WE ARE</p>
        </SectionReveal>

        <div className="members-grid">
            <SectionReveal className="about-member-reveal" delay={0.3}><AboutMemberCard /></SectionReveal>
            <SectionReveal className="about-member-reveal" delay={0.6}><AboutMemberCard /></SectionReveal>
            <SectionReveal className="about-member-reveal" delay={0.9}><AboutMemberCard /></SectionReveal>
        </div>
    </div>
  )
}

export default AboutUsWhoWeAre
