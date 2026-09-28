import AboutUsHero from "../components/AboutUsHero"
import AboutUsSetApart from "../components/AboutUsSetApart"
import AboutUsStory from "../components/AboutUsStory"
import AboutUsWhoWeAre from "../components/AboutUsWhoWeAre"
import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import Partners from "../components/Partners"

function About() {
  return (
    <div className="about-page">
        <AboutUsHero />
        <AboutUsStory />
        <AboutUsSetApart />
        <AboutUsWhoWeAre />

        <Partners />
        <ContactUs />
        <Footer />
    </div>
  )
}

export default About
