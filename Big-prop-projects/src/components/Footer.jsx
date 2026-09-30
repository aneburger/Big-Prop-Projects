import { FaRegClock } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiPhoneLight } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import logoImage from "../assets/full-logo.svg"
import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
        <div className="main-footer-div">
            <div className="footer-title">
                <h2>YOUR NEXT PROJECT STARTS HERE.</h2>
            </div>

            <div className="free-quote-button">
                <Link className="free-quote button-swap" to="/#contact-us" state={{ smoothSection: true }}>GET A FREE QUOTE <HiArrowLongRight /></Link>
            </div>

            <div className="footer-logo-div">
                <Link to="/">
                    <img src={logoImage} alt="Big Prop Projects white logo with transparent background" className="footer-big-prop-logo"/>
                </Link>
            </div>

            <div className="get-in-touch-div">
                <h3>GET IN TOUCH</h3>
                <div className="footer-call">
                    <PiPhoneLight />
                    <p><a href="tel:+27810450505" className="footer-big-prop-number">+27 81 045 0505</a></p>
                </div>

                <div className="footer-email">
                    <MdOutlineMail />
                    <p><a href="mailto:roelof@bigpropprojects.co.za" className="footer-big-prop-email">roelof@bigpropprojects.co.za</a></p>
                </div>
            </div>

            <div className="follow-us-div">
                <h3>FOLLOW US</h3>
                <div className="socials-logos">
                    <a href="https://instagram.com"><FaSquareInstagram /></a>
                    <a href="https://facebook.com"><FaFacebookSquare /></a>
                </div>
            </div>

            <div className="quick-links-div">
                <h3>QUICK LINKS</h3>
                <div className="quick-link-items">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/#servicesH1" state={{ smoothSection: true }}>Services</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/#contact-us" state={{ smoothSection: true }}>Contact</Link>
                </div>
            </div>

        </div>

        <div className="mini-footer-div">
            <p>© 2026 Big Prop Projects. All rights reserved.</p>
            <p className="hours"><span><FaRegClock /></span>Mon - Fri: 09:00 - 17:00</p>
        </div>
    </div>
  )
}

export default Footer
