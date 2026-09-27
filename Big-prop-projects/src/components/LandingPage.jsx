import "../styles/LandingPage.css"
import personImg from "../assets/person.jpeg"
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

function LandingPage() {
  return (
    <div>
        <div className="landing-body">
            <section className="landing-body-titles">
                <h2 className="landing-body-h1">Protect what you have.</h2>
                <h2 className="landing-body-h2">Build on what's possible.</h2>
                

                <div className="landing-body-text-div">
                    <h3 className="landing-body-h3">Big project or small fix, we're here to help.</h3>
                    {/* <p className="landing-body-p"> We keep your property at its best today and help you shape what it could become tomorrow. 
                            Whether we're maintaining or transforming your space, 
                            we believe in work that lasts and relationships that do too.</p> */}

                    <div className="landing-buttons-div">
                        <button className="landing-quote-btn">Get a Quote</button>
                        <button className="landing-services-btn">Services {/* <span><FaArrowRightLong /></span>*/}</button>
                    </div>
                </div>

            </section>
        </div>
           
    </div>
  )
}

export default LandingPage
