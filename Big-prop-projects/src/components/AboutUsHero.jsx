import { IoIosArrowForward } from "react-icons/io";
import "../styles/About.css"

function AboutUsHero() {
  return (
    <div className="about-hero-div">
        <div className="about-us">
            <IoIosArrowForward />
            <p>ABOUT US</p>
        </div>

        <div className="about-us-titles">
            <h1>We're here to look after{' '}
                what you've built —{' '}
                and help shape what comes next.</h1>

            <h2>Big Prop brings maintenance and renovations{' '}
                together with dependable workmanship and a{' '}
                relationship-first way of doing business.</h2>
        </div>
    </div>
  )
}

export default AboutUsHero
