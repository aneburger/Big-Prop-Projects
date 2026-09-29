import "../styles/Services.css"
import { IoIosArrowBack } from "react-icons/io";
import serviceImg from "../assets/painting-service.jpeg";
import { Link } from "react-router-dom";

function ServicesTypes() {
  return (
    <div>
        <div className="back-to-services">
          <Link to="/">
            <IoIosArrowBack />
            <p>BACK</p>
          </Link>
        </div>

        <h1>Painting Services</h1>
        <img src={serviceImg} alt="guy painting a wall" />
    </div>
  )
}

export default ServicesTypes
