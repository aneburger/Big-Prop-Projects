import { IoIosArrowForward } from "react-icons/io";
import "../styles/Partners.css"
import duluxImg from "../assets/logos/dulux.png"
import plasconImg from "../assets/logos/plascon.png"
import fotonImg from "../assets/logos/foton.png"
import catImg from "../assets/logos/cat.png"
import safalImg from "../assets/logos/safal.png"
import bertsImg from "../assets/logos/berts.png"
import SectionReveal from './SectionReveal';

function Partners() {
  return (
        <div className="partners-div">
            <SectionReveal className="partners-and-clients">
              <IoIosArrowForward />
              <p>TRUSTED BY OUR CLIENTS & PARTNERS</p>
            </SectionReveal>

            <div className="partners-grid">
              <SectionReveal className="duluxDiv" delay={0.15}>
                <img src={duluxImg} alt="dulux logo" />
              </SectionReveal>

              <SectionReveal className="plasconDiv" delay={0.3}>
                <img src={plasconImg} alt="plascon logo" />
              </SectionReveal>

              <SectionReveal className="fotonDiv" delay={0.45}>
                <img src={fotonImg} alt="foton logo" />
              </SectionReveal>

              <SectionReveal className="catDiv" delay={0.6}>
                <img src={catImg} alt="cat logo" />
              </SectionReveal>
              <SectionReveal className="safalDiv" delay={0.75}>
                <img src={safalImg} alt="safal logo" />
              </SectionReveal>
              <SectionReveal className="bertsDiv" delay={0.9}>
                <img src={bertsImg} alt="berts logo" />
              </SectionReveal>
            </div>
        </div>
  )
}

export default Partners
