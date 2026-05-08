import { useEffect, useState } from "react";
import AboutMe from "../components/AboutMe";
import Hero from "../components/Hero";
import MyProjects from "../components/MyProjects";
import NavBar from "../components/NavBar";
import { getAllProjects } from "../services/projectService";
import ContactMe from "../components/ContactMe";
import Footer from "../components/Footer";

function HomePage () {
  const [projects, setProjects] = useState([]);

  // fetch projects
  useEffect(() => {

    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProjects();

  }, []);

  return (
    <div 
    id="homePage"
    className="min-h-screen bg-amber-50">
      <NavBar />
      <Hero />
      <AboutMe />
      <MyProjects
      projects={projects} 
      />
      <ContactMe />
      <Footer />

    </div>
  );
};

export default HomePage;