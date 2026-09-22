import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom"
import "../styles/WhatWeDo.css"

function WhatWeDo() {
  return (
    <div className="what-we-do-div">
        <div className="what-we-do-content">
            <div className="what-we-do">
                <IoIosArrowForward />
                <p>WHAT WE DO</p>
            </div>
            
            <h1>WE TAKE CARE OF WHAT MATTERS</h1>

            <h3>Professional property maintenance and renovation solutions for homeowners, businesses, and commercial properties.</h3>

            <div className="about-us-btn">
                <Link to="/about">About Us</Link>
                <IoIosArrowRoundForward />
            </div>
        </div>
    </div>
  )
}

export default WhatWeDo
