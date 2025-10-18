import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Link } from "react-router-dom";
import logo from '../assets/images/logo-favicon.png';


const Footer = () => {
  return (
    <footer className="bg-[#f6dfd7] text-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-12 text-center">
        {/* Logo */}
        <div className="mb-6 flex flex-col items-center text-center">
          {/* Logo */}
          <img
            src={logo}
            alt="zj crafts hub"
            style={{ width: '80px', height: '80px' }}
            className="mb-2"
          />

          {/* Text in one line */}
          <div className="flex items-baseline space-x-2">
            <h1 className="text-xl font-bold text-gray-600 font-serif">ZJ</h1>
            <span className="text-2xl text-gray-500 custom-font">Crafts hub</span>
          </div>
        </div>


        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium mb-8">
          <Link to="/aboutus" className="hover:text-black">ABOUT US</Link>
          <Link to="/contact" className="hover:text-black">CONTACT</Link>
          <Link to="/policy" className="hover:text-black">POLICY</Link>
          <Link to="/faqs" className="hover:text-black">FAQS</Link>
        </nav>

        {/* Newsletter */}
        <div className="flex justify-center items-center max-w-md mx-auto mb-8">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 px-4 py-3 rounded-l-full border border-gray-300 focus:outline-none text-sm"
          />
          <button className="bg-[#d0a19b] text-white px-6 py-3 rounded-r-full text-sm font-semibold hover:bg-[#d0a19b] transition-colors">
            SUBSCRIBE
          </button>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-6 mb-6 text-gray-600">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>

        {/* Bottom Info */}
        <div className="text-sm text-gray-500">
          MADE BY LOVE |
          <a
            href="https://wa.me/923003123154"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-gray-700 hover:text-[#d0a19b] transition-colors duration-300"
          >
            {' '}(+92) 300 3123154{' '}
          </a>
          |
        </div>
      </div>
    </footer>
  );
};

export default Footer;