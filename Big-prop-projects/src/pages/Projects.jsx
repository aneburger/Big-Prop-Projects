import AllProjects from '../components/AllProjects';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';
import Partners from '../components/Partners';

function Projects() {
  return (
    <div className="projects-page">
      <AllProjects />
      <Partners />
      <ContactUs />
      <Footer />
    </div>
  );
}

export default Projects;
