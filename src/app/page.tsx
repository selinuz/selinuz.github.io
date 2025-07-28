import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import About from "../components/About";
import Projects from "../components/Projects";
import CoreValues from "../components/CoreValues";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <About />
        <Projects />
        <CoreValues />
        <Contact />
      </main>
    </>
  );
}
