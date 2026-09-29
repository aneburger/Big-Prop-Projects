import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About";
import Projects from "./pages/Projects";
import IndividualProject from "./pages/IndividualProject";
import NavBar from "./components/NavBar";
import ScrollManager from "./components/ScrollManager";
import './styles/App.css'
import ServicesTypes from "./components/ServicesTypes";

function App() {
  return (
    <BrowserRouter>
        <ScrollManager />
        <NavBar/>

        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/about" element={ <About/> } />
            <Route path="/projects" element={ <Projects/> } />
            <Route path="/project" element={ <IndividualProject/> } />
            <Route path="/service" element={ <ServicesTypes/> } />
            {/* <Route path="*" element={ <NotFound/> } /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
