import "../styles/Services.css"
import { Link } from "react-router-dom"

function Services() {
  return (
    <div className="services-div" id="servicesH1">
        <div className="services-content">
            <div className="services-left-section">
                <h1 className="services-title" ><span className="blue-title">The right workmanship and the right people </span>
                    <br/>to maintain, protect and transform your property.
                </h1>

                <div className="services-buttons">
                    <button className="services-contact-btn">
                        Contact Us
                    </button>
                    <a href="tel:+27810450505" className="services-nr-btn">+27 81 045 0505</a>
                </div>
            </div>

            <div className="services-right-section">
                {/* <Link to="/service"> */}
                    <section className="paint-section">
                        <h3>PAINTING SERVICES</h3>
                        <p>Comprehensive painting services to enhance your property.</p>
                    </section>
                {/* </Link> */}
                <section className="waterproof-section">
                    <h3>WATERPROOFING SERVICES</h3>
                    <p>Comprehensive waterproofing services to protect your property.</p>
                </section>
                <section className="roof-section">
                    <h3>ROOF INSTALLATION AND MAINTENANCE</h3>
                    <p>Expert roofing solutions including repairs, maintenance, and complete roof installations.</p>
                </section>
                <section className="reno-section">
                    <h3>RESIDENTIAL & COMMERCIAL RENOVATIONS</h3>
                    <p>Transform existing spaces with expert renovation and alteration services tailored to your vision.</p>
                </section>
            </div>
        </div>
    </div>
  )
}

export default Services
