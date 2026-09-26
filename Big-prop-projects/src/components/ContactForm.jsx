function ContactForm() {
  return (
    <div>
        <form className="contact-form-section">
            <input className="fullnameInput" type="text" name="fullName" placeholder="Full Name *" required/>

            <input className="emailInput" type="email" name="email" placeholder="Email Address *" required/>

            <input className="areaInput" type="text" name="area" placeholder="Area *" required/>

            <input className="companyInput" type="text" name="company" placeholder="Company Name (optional)" required/>

            <select className="project-type-select">
              <option defaultValue="Project Type *" disabled selected>Project Type *</option>
              <option defaultValue="painting">Painting</option>
              <option defaultValue="waterproofing">Waterproofing</option>
              <option defaultValue="roofing">Roofing</option>
              <option defaultValue="renovations">Residential & Commercial Renovations</option>
            </select>

            <select className="budget-select">
              <option defaultValue="Budget *" disabled selected>Budget *</option>
              <option defaultValue="under10">Under R10,000</option>
              <option defaultValue="10-30">R10,000 - R30,000</option>
              <option defaultValue="30-75">R30,000 - R75,000</option>
              <option defaultValue="75-150">R75,000 - R150,000</option>
              <option defaultValue="over150">R150,000+</option>
              <option defaultValue="not-sure">Not sure yet</option>
            </select>

            <textarea placeholder="Brief description of project needs *" required/>

            <div className="radio-buttons-div">
              <p>When are you looking to get started? *</p>

              <div className="radio-items">
                <input type="radio" id="exploring" name="timeline" value="explore-option" />
                <label htmlFor="exploring">Just exploring</label>

                <input type="radio" id="future" name="timeline" value="future-option" />
                <label htmlFor="future">In the near future</label>

                <input type="radio" id="asap" name="timeline" value="asap-option" />
                <label htmlFor="asap">As soon as possible</label>
              </div>
            </div>

            <div className="form-buttons">
              <button className="submit-btn">Submit</button>
              <button className="clear-btn">Clear</button>
            </div>

        </form>
    </div>
  )
}

export default ContactForm
