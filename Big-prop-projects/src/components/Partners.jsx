import { IoIosArrowForward } from "react-icons/io";
import "../styles/Partners.css"
import duluxImg from "../assets/logos/dulux.png"
import plasconImg from "../assets/logos/plascon.png"
import fotonImg from "../assets/logos/foton.png"
import catImg from "../assets/logos/cat.png"
import safalImg from "../assets/logos/safal.png"
import bertsImg from "../assets/logos/berts.png"

function Partners() {
  return (
        <div>
            <div className="partners-and-clients">
              <IoIosArrowForward />
              <p>TRUSTED BY OUR CLIENTS & PARTNERS</p>
            </div>

            <div className="partners-grid">
              <div className="duluxDiv">
                <img src={duluxImg} alt="dulux logo" />
              </div>

              <div className="plasconDiv">
                <img src={plasconImg} alt="plascon logo" />
              </div>

              <div className="fotonDiv">
                <img src={fotonImg} alt="foton logo" />
              </div>

              <div className="catDiv">
                <img src={catImg} alt="cat logo" />
              </div>
              <div className="safalDiv">
                <img src={safalImg} alt="safal logo" />
              </div>
              <div className="bertsDiv">
                <img src={bertsImg} alt="berts logo" />
              </div>
            </div>
        </div>
  )
}

export default Partners
