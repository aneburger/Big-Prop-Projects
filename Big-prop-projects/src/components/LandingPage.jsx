import "../styles/LandingPage.css"
import { Link } from 'react-router-dom';
import '../styles/ButtonEffects.css';

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
                        <Link className="landing-quote-btn button-swap" to="/#contact-us" state={{ smoothSection: true }}>Get a Quote</Link>
                        <Link className="landing-services-btn button-swap" to="/#servicesH1" state={{ smoothSection: true }}>Services</Link>
                    </div>
                </div>

            </section>
        </div>
           
    </div>
  )
}

export default LandingPage
