import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import About from "../components/About";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        <About />
        <Projects />
        {/* Add Projects or Values next */}
      </main>
    </>
  );
}
