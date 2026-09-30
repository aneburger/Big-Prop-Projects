import { IoIosArrowForward } from "react-icons/io";
import "../styles/About.css"
import SectionReveal from './SectionReveal';

function AboutUsSetApart() {
  return (
    <div className="about-set-apart-div">
        <SectionReveal className="what-sets-us-apart">
            <IoIosArrowForward />
            <p>WHAT SETS US APART</p>
        </SectionReveal>

        <div className="about-set-apart-text">
            <SectionReveal as="h2" delay={0.3}>Quality gets the job done. Trust brings people back.</SectionReveal>
            <SectionReveal as="p" delay={0.6}> We combine dependable workmanship and cost-effective 
                solutions with a personal approach that puts long-term 
                relationships ahead of short-term business.</SectionReveal>
        </div>
    </div>
  )
}

export default AboutUsSetApart
