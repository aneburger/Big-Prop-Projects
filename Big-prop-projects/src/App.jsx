import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About";
import Projects from "./pages/Projects";
import IndividualProject from "./pages/IndividualProject";
import NavBar from "./components/NavBar";
import './styles/App.css'

function App() {
  return (
    <BrowserRouter>
        <NavBar/>

        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/about" element={ <About/> } />
            <Route path="/projects" element={ <Projects/> } />
            <Route path="/project" element={ <IndividualProject/> } />
            {/* <Route path="*" element={ <NotFound/> } /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
