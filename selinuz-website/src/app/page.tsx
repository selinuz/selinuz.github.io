import Navbar from "./components/Navbar";
import Landing from "./components/Landing";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Landing />
        {/* Add About, Projects, etc. here later */}
      </main>
    </>
  );
}
