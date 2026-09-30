import { HiArrowLongRight } from "react-icons/hi2";
import ContactForm from "./ContactForm";
import "../styles/ContactUs.css"

function ContactUs() {
  return (
    <div className="contact-us-div" id="contact-us">
        <div className="contact-us-titles">
          <h1>Big plans for <br/> your property?</h1>
          <div className="tell-us">
              <p>TELL US WHAT YOU NEED</p>
              <HiArrowLongRight />
          </div>
        </div>

        <div className="contact-form">
          <ContactForm />
        </div>
    </div>
  )
}

export default ContactUs
