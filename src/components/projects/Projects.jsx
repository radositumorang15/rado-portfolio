import { RevealOnScroll } from "../side/RevealOnScroll";

export const Projects = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://i.ibb.co.com/M5gv9KkL/xc-Capture.png" 
                  alt="Monggo Sare Project"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Monggo Sare</h3>
              <p className="text-gray-400 mb-4">
                A hotel reservation website with admin feature
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Bootstrap 5", "JS", "PHP"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/radositumorang15/Monggosare"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            <div className="glass p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://i.ibb.co.com/Wvs0K3p6/zx-Capture.png" 
                  alt="Sigizi Project"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Sigizi</h3>
              <p className="text-gray-400 mb-4">
                For my Capstone project at Bangkit Academy, I developed siGizi, an innovative app aimed at helping
                Indonesian mothers combat stunting and enhance their understanding of nutrition. The app leverages
                machine learning for advanced analysis and includes features such as detailed nutritional analysis,
                informative articles, engaging quizzes, and personalized food recommendations.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["Kotlin", "XML", "TensorFlow", "room", "Express JS"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://github.com/radositumorang15/SiGizi"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            <div className="glass p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://i.ibb.co.com/FktsYrbc/sd-Capture.png" 
                  alt="Ctarsa Alumni Project"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Ctarsa Alumni and Arsanote</h3>
              <p className="text-gray-400 mb-4">
                During my intern in detik.com i develop forum website call ctarsa alumni for ctarsa school alumni to connect each other and make a project managament app call arsanote
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["JS", "CI3", "Bootstrap 5", "SQL"].map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://alumnismau.ctarsa.id/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
            <div className="glass p-6 rounded-xl border border-white/10 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_rgba(59,130,246,0.1)] transition-all">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img 
                  src="https://i.ibb.co.com/357dMc5k/zzx-Capture.png" 
                  alt="Titik Makan Project"
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2">Titik makan Website</h3>
              <p className="text-gray-400 mb-4">
                Restaurant and cafe landing page with order feature
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {["bootsrap 5", "JS", "PHP"].map((tech, key) => (
                  <span
                    key={key}
                    className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm transition hover:bg-blue-500/20 hover:-translate-y-0.5 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex justify-between items-center">
                <a
                  href="https://titikmakan.netlify.app/"
                  className="text-blue-400 hover:text-blue-300 transition-colors my-4"
                >
                  View Project →
                </a>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};