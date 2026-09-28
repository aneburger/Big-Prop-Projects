import "../styles/About.css"
import personImg from "../assets/person.jpeg"

function AboutMemberCard() {
  return (
    <div className="about-member-card-div">
        <img src={personImg} alt="big-prop employee"/>

        <p className="member-name">ROELOF VAN HEERDEN</p>
        <p className="member-role">MANAGING DIRECTOR</p>
    </div>
  )
}

export default AboutMemberCard
