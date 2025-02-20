import { useState, useEffect } from "react";
import { RevealOnScroll } from "../side/RevealOnScroll";

export const HeroText = () => {
  const texts = [
    "Hi, I'm Rado Nelson Dela Sadrak Situmorang",
    "I'm a Front-end and Android Dev",
    "Let's create something amazing!"
  ];

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setFade(true);
      }, 900);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1
      className={`text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent leading-tight transition-opacity duration-500 ${fade ? "opacity-100" : "opacity-0"}`}
    >
      {texts[index]}
    </h1>
  );
};

export const Home = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative">
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <HeroText />

          <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
            I’m a Front-end and Android developer who loves crafting clean, scalable web or
            applications. My goal is to build solutions that offer both
            exceptional performance and a delightful user experience.
          </p>

          <div className="flex justify-center space-x-4">
            <a
              href="#projects"
              className="bg-green-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]"
            >
              View Projects
            </a>

            <a
              href="https://drive.google.com/uc?export=download&id=1B5S9tXjWpp23MwhWox9wenDoDaS_coMD"
              download="Rado_Nelson_CV.pdf"
              className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 
    hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10"
            >
              Download CV
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
