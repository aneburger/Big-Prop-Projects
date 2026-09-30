import { IoIosArrowForward } from "react-icons/io";
import "../styles/About.css"
import SectionReveal from './SectionReveal';

function AboutUsHero() {
  return (
    <div className="about-hero-div">
        <SectionReveal className="about-us" onEnter delay={0.2}>
            <IoIosArrowForward />
            <p>ABOUT US</p>
        </SectionReveal>

        <div className="about-us-titles">
            <SectionReveal as="h1" onEnter delay={0.65}>We're here to look after{' '}
                what you've built —{' '}
                and help shape what comes next.</SectionReveal>

            <SectionReveal as="h2" onEnter delay={1.1}>Big Prop brings maintenance and renovations{' '}
                together with dependable workmanship and a{' '}
                relationship-first way of doing business.</SectionReveal>
        </div>
    </div>
  )
}

export default AboutUsHero
