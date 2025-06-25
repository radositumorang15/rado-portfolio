import { useState } from "react";
import "./App.css";
import {LoadingScreen} from "./components/side/LoadingScreen"
import { Navbar } from "./components/nav/Navbar";
import { MobileMenu } from "./components/nav/MobileMenu";
import { Home } from "./components/home/Home";
import { About } from "./components/about/About";
import { Projects } from "./components/projects/Projects";
import { Blog } from "./components/blog/Blog"
import "./index.css";
import { Contact } from "./components/contacts/Contact";
import Lanyard from "./components/lanyard/Lanyard";
import {Footer} from "./components/footer/Footer";


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{" "}
      <div
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
        <Home />
        <About />
        <Projects />
        <Blog/>
        <Contact />
        <Footer/>
      </div>
    </>
  );
}

export default App;
