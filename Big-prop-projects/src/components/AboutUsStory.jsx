import "../styles/About.css"
import guysImg from "../assets/guys.jpeg"

function AboutUsStory() {
  return (
    <div className="about-story-div">
        {/* <div className="about-story-image"> */}
            <img className="about-story-image" src={guysImg} alt="big-prop painters" />
        {/* </div> */}
        <div className="about-story-text">
            <h2>Big Prop started with a simple belief: Good work and good relationships should go hand in hand.</h2>
            
            <p> Established in 2023, we've grown into a team that 
                takes pride in looking after our clients' properties 
                and, just as importantly, the people behind them.</p>

            <p> As we grow, we want to hold onto what got us here. 
                Being honest, doing the job properly and treating 
                every client with the same care and respect. Because 
                for us, success isn't only measured by the work we 
                leave behind, but by the trust we earn along the way.</p>
        </div>
    </div>
  )
}

export default AboutUsStory
