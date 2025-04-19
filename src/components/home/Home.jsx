import { useRef, useState, useEffect } from "react";
import { RevealOnScroll } from "../side/RevealOnScroll";  // Assuming this component exists
import VariableProximity from "../text/VariableProximity";  // Assuming this component exists
import { HeroText } from "../text/HeroText";

export const Home = () => {
  const containerRef = useRef(null);  

  const texts = [
    "Hi, I'm Rado Nelson Dela Sadrak Situmorang",
    "I'm a Front-end and Android Dev",
    "Let's create something amazing!",
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
    <section
      id="home"
      ref={containerRef}  
      className="min-h-auto flex items-center justify-center relative"
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
          <HeroText fade={fade} texts={texts} index={index} />
          <VariableProximity
            label="I’m a Front-end and Android developer who loves crafting clean, scalable web or applications. My goal is to build solutions that offer both exceptional performance and a delightful user experience."
            className="variable-proximity-demo text-center  font-light text-gray-200 tracking-wide"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 1000, 'opsz' 40"
            containerRef={containerRef}
            radius={100}
            falloff="linear"
            style={{ fontSize: '19px' }} 
          />
          <div className="flex justify-center space-x-4 mt-8">
            <a
              href="https://drive.google.com/uc?export=download&id=1ltqrS4iru-7x8C4zuUvlqhpX1gXN7s9A"
              download="Portofoliorado.pdf"
              className="bg-green-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)]"
            >
              View Projects
            </a>

            <a
              href="https://drive.google.com/uc?export=download&id=1D3jJ_JkYWiyzcwq14wRNssM1seEIorxQ"
              download="Rado_Nelson_CV.pdf"
              className="border border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10"
            >
              Download CV
            </a>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
