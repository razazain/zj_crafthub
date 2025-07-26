import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 text-green-400">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.91 12.25L15.83 8.33L17.5 10V9H21Z"/>
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold tracking-wide">LEARTS</h3>
                <p className="text-xs text-gray-400 -mt-1">HANDMADE</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Crafting beautiful, unique handmade items with love and attention to detail. Every piece tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">ABOUT US</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">STORE LOCATIONS</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">CONTACT</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">SUPPORT</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Policies</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">POLICY</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            <div className="flex space-x-2 mb-4">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-green-500 text-sm"
              />
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors text-sm font-medium">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © 2019 Learts. All Rights Reserved
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>Call us: 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>learts@domain.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;