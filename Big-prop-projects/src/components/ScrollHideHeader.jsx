import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { Link } from "react-router-dom"
import { useState } from "react"
import Sidebar from "./SideBar"
import "../styles/NavBar.css"
import logoImage from "../assets/full-logo.svg"
import '../styles/ButtonEffects.css';

export default function ScrollHideHeader() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [show, setShow] = useState(false)

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0
        setHidden(current > previous && current > 150)
    })

    return (
        <div id="example">
            <motion.header
                className="header"
                animate={{
                    y: hidden && !show ? -140 : 0,
                    opacity: hidden && !show ? 0 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
            >
                <div className="header-content">
                    <div className="logo-div">
                        <Link to="/">
                            <img src={logoImage} alt="Big Prop Projects white logo with transparent background" className="big-prop-logo"/>
                        </Link>
                    </div>
                    

                    <div className="number-div">
                        <span>CALL <a href="tel:+27810450505" className="big-prop-number">+27 81 045 0505</a></span>
                    </div>

                    <div className="menu-div">
                        <button type="button" className="menu-toggle" onClick={() => setShow(true)} aria-expanded={show} aria-label="Open navigation menu">
                            Menu
                        </button>
                    </div>
                    
                </div>

                
            </motion.header>
            <Sidebar open={show} onOpenChange={setShow}/>
        </div>
    )
}
