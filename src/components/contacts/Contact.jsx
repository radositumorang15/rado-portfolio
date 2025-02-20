import { RevealOnScroll } from "../side/RevealOnScroll";
import { useState } from "react";
import { Github, Linkedin, Package, MessageSquare } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <RevealOnScroll>
    <div id="contact" className="max-w-3xl mx-auto p-6 space-y-8">
      <h2 className="text-xl font-semibold mb-6">Find me on</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=" rounded-lg p-6 relative border-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Explore the code</h3>
            <p className="text-gray-600">
              Explore the source code for all my projects on GitHub.
            </p>
            <a
              href="https://github.com/radositumorang15"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              Go to GitHub
            </a>
          </div>
          <div className="absolute top-6 right-6">
            <Github size={32} className="text-gray-900" />
          </div>
        </div>
        <div className=" rounded-lg p-6 relative border-2">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Let's connect</h3>
            <p className="text-blue-600">
              Connect for collaboration or explore my professional experience.
            </p>
            <a
              href="https://www.linkedin.com/in/radositumorang/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Go to LinkedIn
            </a>
          </div>
          <div className="absolute top-6 right-6">
            <Linkedin size={32} className="text-blue-600" />
          </div>
        </div>
      </div>


      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-6">Or send me a message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-3 rounded-md hover:bg-gray-700 transition-colors"
          >
            Send Email
          </button>
        </form>
      </div>
    </div>
     </RevealOnScroll>
  );
};

export default Contact;
