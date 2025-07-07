import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Cybersoft Movie</h2>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Cybersoft Movie</h2>
            <p className="text-gray-400">
              Your ultimate destination for movies. Book tickets, watch trailers, and get the latest updates on upcoming blockbusters.
            </p>
          </div>``

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Movies</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Theaters</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Promotions</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-500 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaFacebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaInstagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><FaYoutube size={24} /></a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Cybersoft Movie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;