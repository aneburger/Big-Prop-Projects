import "../styles/About.css"
import guysImg from "../assets/guys.jpeg"
import ScrollRevealText from './ScrollRevealText';

function AboutUsStory() {
  return (
    <div className="about-story-div">
        <div className="about-story-media">
            <img className="about-story-image" src={guysImg} alt="big-prop painters" />
        </div>
        <div className="about-story-text">
            <ScrollRevealText as="h2" text="Big Prop started with a simple belief: Good work and good relationships should go hand in hand." />
            
            {/* <ScrollRevealText text="Established in 2023, we've grown into a team that takes pride in looking after our clients' properties and, just as importantly, the people behind them." />

            <ScrollRevealText text="As we grow, we want to hold onto what got us here. Being honest, doing the job properly and treating every client with the same care and respect. Because for us, success isn't only measured by the work we leave behind, but by the trust we earn along the way." /> */}
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
