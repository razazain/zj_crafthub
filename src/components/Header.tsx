import React from 'react';
import { Search, User, Heart, ShoppingCart, Facebook, Twitter, Instagram } from 'lucide-react';

const Header = () => {
  return (
    <>
      {/* Top Promotional Bar */}
      <div className="bg-green-600 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span>Free shipping for orders over $99</span>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-3">
              <Facebook className="w-4 h-4 hover:opacity-75 cursor-pointer transition-opacity" />
              <Twitter className="w-4 h-4 hover:opacity-75 cursor-pointer transition-opacity" />
              <Instagram className="w-4 h-4 hover:opacity-75 cursor-pointer transition-opacity" />
              <div className="w-4 h-4 hover:opacity-75 cursor-pointer transition-opacity">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </div>
            </div>
            
            {/* Language & Currency */}
            <div className="flex items-center space-x-4">
              <select className="bg-transparent text-white text-sm border-none outline-none cursor-pointer">
                <option value="en" className="text-black">English</option>
                <option value="fr" className="text-black">French</option>
                <option value="es" className="text-black">Spanish</option>
              </select>
              <select className="bg-transparent text-white text-sm border-none outline-none cursor-pointer">
                <option value="usd" className="text-black">USD</option>
                <option value="eur" className="text-black">EUR</option>
                <option value="gbp" className="text-black">GBP</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 text-green-600">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.91 12.25L15.83 8.33L17.5 10V9H21ZM1 15H3V17H1V15ZM5 15H7V17H5V15ZM1 19H3V21H1V19ZM5 19H7V21H5V19Z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-wide">LEARTS</h1>
                <p className="text-xs text-gray-500 -mt-1">HANDMADE</p>
              </div>
            </div>

            {/* Main Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-900 hover:text-green-600 font-medium transition-colors">HOME</a>
              <a href="#" className="text-gray-900 hover:text-green-600 font-medium transition-colors">SHOP</a>
              <a href="#" className="text-gray-900 hover:text-green-600 font-medium transition-colors">PROJECT</a>
              <a href="#" className="text-gray-900 hover:text-green-600 font-medium transition-colors">ELEMENTS</a>
              <a href="#" className="text-gray-900 hover:text-green-600 font-medium transition-colors">BLOG</a>
              <a href="#" className="text-gray-900 hover:text-green-600 font-medium transition-colors">PAGES</a>
            </nav>

            {/* Utility Icons */}
            <div className="flex items-center space-x-4">
              <Search className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer transition-colors" />
              <User className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer transition-colors" />
              <div className="relative">
                <Heart className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
              </div>
              <div className="relative">
                <ShoppingCart className="w-5 h-5 text-gray-600 hover:text-green-600 cursor-pointer transition-colors" />
                <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;