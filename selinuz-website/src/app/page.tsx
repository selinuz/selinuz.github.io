import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen p-8 sm:p-20">
        <h1 className="text-3xl font-bold">Selin Uz</h1>
        {/* Add Landing, About, etc. components here later */}
      </main>
    </>
  );
}
