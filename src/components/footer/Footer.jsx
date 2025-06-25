import React from 'react';

// Footer component to hold general site links and information.
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-8 mt-12 rounded-t-lg">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-gray-400 mb-4">
          © {new Date().getFullYear()} Rado . All rights reserved.
        </p>
        <nav className="flex justify-center space-x-6">
          <a
            href="https://footballredditstream.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
          >
            Football Reddit Stream
          </a>
          {/* You can add more links here, e.g., Privacy Policy, Terms of Service, etc. */}
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            Privacy Policy
          </a>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
            Terms of Service
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;