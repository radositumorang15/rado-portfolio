import { RevealOnScroll } from "../side/RevealOnScroll";

export const About = () => {
  const frontendSkills = [
    "React",
    "Vue",
    "Bootstrap",
    "TailwindCSS",
  ];

  const android = ["Kotlin", "XML", "SDK", "Dart", "Flutter"];

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            {" "}
            About Me
          </h2>

          <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
              Final-year Informatics Engineering Education student at Sebelas Maret University. Passionate about mobile and web development, specializing in scalable Android apps with clean architecture and responsive frontend interfaces. Focused on performance, user experience, and innovation in digital solutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  {frontendSkills.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-6 hover:-translate-y-1 transition-all">
                <h3 className="text-xl font-bold mb-4"> Android</h3>
                <div className="flex flex-wrap gap-2">
                  {android.map((tech, key) => (
                    <span
                      key={key}
                      className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 
                                    hover:shadow-[0_2px_8px_rgba(59,130,2246,0.2)] transition
                    "
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4"> 🏫 Education </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  <strong> B.E. in Informatics Education </strong> - Sebelas Maret University
                  (2021-Current)
                </li>
                <li>
                  Relevant Coursework: Mobile App Dev, Web Development, AI
                </li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border-white/10 border hover:-translate-y-1 transition-all">
              <h3 className="text-xl font-bold mb-4"> 💼 Work Experience </h3>
              <div className="space-y-4 text-gray-300">
                <div>
                  <h4 className="font-semibold">
                    {" "}

                    Frontend Developer at Detik.com (Aug 2023 - Dec 2023){" "}
                  </h4>
                  <p>
                  built the Frontend Alumni Forum Website for CT Arsa School, ensuring responsive design, integrating the backend with CodeIgniter 3, and fixing bugs to improve functionality.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">
                    {" "}
                    Mobile Development Cohort at Bangkit Academy led by Google, Tokopedia, Gojek, & Traveloka (2019){" "}
                  </h4>
                  <p>
                  Developed an application called siGizi to help Indonesian mothers reduce stunting and educate them about nutrition. Utilized machine learning for advanced analysis.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
