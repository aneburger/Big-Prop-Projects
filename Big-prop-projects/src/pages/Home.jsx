import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer"
import LandingPage from "../components/LandingPage"
import Partners from "../components/Partners"
import Services from "../components/Services"
import WhatWeDo from "../components/WhatWeDo"

import "../styles/Home.css"

function Home() {
  return (
    <div>
        <LandingPage />
        <WhatWeDo />
        <Services />

        <div className="home-footer-section">
          <Partners />
          <ContactUs />
          <Footer />
        </div>
    </div>
  )
}

export default Home
