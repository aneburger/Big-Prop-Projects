import { FaRegClock } from "react-icons/fa6";
import { HiArrowLongRight } from "react-icons/hi2";
import { PiPhoneLight } from "react-icons/pi";
import { MdOutlineMail } from "react-icons/md";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import logoImage from "../assets/full-logo.svg"
import "../styles/Footer.css";
import { Link } from "react-router-dom";
import SectionReveal from './SectionReveal';
import { site } from '../seo/site';

function Footer() {
  return (
    <div>
        <div className="main-footer-div">
            <SectionReveal className="footer-title" margin="0px">
                <h2>YOUR NEXT PROJECT STARTS HERE.</h2>
            </SectionReveal>

            <SectionReveal className="free-quote-button" delay={0.2} margin="0px">
                <Link className="free-quote button-swap" to="/#contact-us" state={{ smoothSection: true }}>GET A FREE QUOTE <HiArrowLongRight /></Link>
            </SectionReveal>

            <SectionReveal className="footer-logo-div" delay={0.4} margin="0px">
                <Link to="/">
                    <img src={logoImage} alt="Big Prop Projects white logo with transparent background" className="footer-big-prop-logo"/>
                </Link>
            </SectionReveal>

            <SectionReveal className="get-in-touch-div" delay={0.2} margin="0px">
                <h3>GET IN TOUCH</h3>
                {/* <p>{site.street}, {site.locality}, {site.region}</p>
                <p>Serving Pretoria and the wider Gauteng province.</p> */}
                <div className="footer-call">
                    <PiPhoneLight />
                    <p><a href="tel:+27810450505" className="footer-big-prop-number">+27 81 045 0505</a></p>
                </div>

                <div className="footer-email">
                    <MdOutlineMail />
                    <p><a href="mailto:roelof@bigpropprojects.co.za" className="footer-big-prop-email">roelof@bigpropprojects.co.za</a></p>
                </div>
            </SectionReveal>

            <SectionReveal className="follow-us-div" delay={0.4} margin="0px">
                <h3>FOLLOW US</h3>
                <div className="socials-logos">
                    <a href="https://www.instagram.com/bigpropprojects?stkn=dmVuZXhrNXBjMzlw"><FaSquareInstagram /></a>
                    <a href="https://www.facebook.com/profile.php?id=61564967286594"><FaFacebookSquare /></a>
                </div>
            </SectionReveal>

            <SectionReveal className="quick-links-div" delay={0.6} margin="0px">
                <h3>QUICK LINKS</h3>
                <div className="quick-link-items">
                    <Link to="/">Home</Link>
                    <Link to="/about">About</Link>
                    <Link to="/#servicesH1" state={{ smoothSection: true }}>Services</Link>
                    <Link to="/projects">Projects</Link>
                    <Link to="/#contact-us" state={{ smoothSection: true }}>Contact</Link>
                </div>
            </SectionReveal>

        </div>

        <div className="mini-footer-div">
            <SectionReveal as="p" margin="0px">© 2026 Big Prop Projects. All rights reserved.</SectionReveal>
            <SectionReveal as="p" className="hours" delay={0.2} margin="0px"><span><FaRegClock /></span>Mon - Fri: 09:00 - 17:00</SectionReveal>
        </div>
    </div>
  )
}

export default Footer
