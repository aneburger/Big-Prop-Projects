import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import About from "./pages/About";
import Projects from "./pages/Projects";
import IndividualProject from "./pages/IndividualProject";
import NavBar from "./components/NavBar";
import ScrollManager from "./components/ScrollManager";
import './styles/App.css'
import ServicesTypes from "./components/ServicesTypes";
import RouteSeo from './components/RouteSeo';
import LegacyRedirect from './components/LegacyRedirect';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
        <ScrollManager />
        <RouteSeo />
        <NavBar/>

        <Routes>
            <Route path="/" element={ <Home/> } />
            <Route path="/about" element={ <About/> } />
            <Route path="/projects" element={ <Projects/> } />
            <Route path="/projects/:slug" element={ <IndividualProject/> } />
            <Route path="/services/:type" element={ <ServicesTypes/> } />
            <Route path="/project" element={<LegacyRedirect kind="project" />} />
            <Route path="/service" element={<LegacyRedirect kind="service" />} />
            <Route path="*" element={<NotFound />} />
            {/* <Route path="*" element={ <NotFound/> } /> */}
        </Routes>
    </BrowserRouter>
  )
}

export default App
