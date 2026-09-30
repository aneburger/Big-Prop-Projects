import { HiArrowLongRight } from "react-icons/hi2";
import ContactForm from "./ContactForm";
import "../styles/ContactUs.css"
import SectionReveal from './SectionReveal';

function ContactUs() {
  return (
    <div className="contact-us-div" id="contact-us">
        <div className="contact-us-titles">
          <SectionReveal as="h1">Big plans for <br/> your property?</SectionReveal>
          <SectionReveal className="tell-us" delay={0.3}>
              <p>TELL US WHAT YOU NEED</p>
              <HiArrowLongRight />
          </SectionReveal>
        </div>

        <SectionReveal className="contact-form" delay={0.6} amount={0.08}>
          <ContactForm />
        </SectionReveal>
    </div>
  )
}

export default ContactUs
