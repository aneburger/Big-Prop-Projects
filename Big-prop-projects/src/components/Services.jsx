import "../styles/Services.css"

function Services() {
  return (
    <div className="services-div">
        <div className="services-content">
            <div className="services-left-section">
                <h1 className="services-title"><span className="blue-title">The right workmanship and the right people </span>
                    to maintain, protect and transform your property.
                </h1>

                <div className="services-buttons">
                    <button className="services-contact-btn">
                        Contact Us
                    </button>
                    <a href="tel:+27810450505" className="services-nr-btn">+27 81 045 0505</a>
                </div>
            </div>

            <div className="services-right-section">
                <section className="paint-section">
                    <h3>PAINTING AND WATERPROOFING</h3>
                    <p>Comprehensive painting and waterproofing services to protect and enhance your property.</p>
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
