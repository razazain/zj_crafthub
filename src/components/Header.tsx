import { useState } from 'react';
import logo from '../assets/images/logo.jpeg';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <>
      {/* Main Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100 relative z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo & Brand */}
            <div className="flex items-center space-x-2">
              <div className="text-green-600">
                <img src={logo} alt="zj crafts hub" style={{ width: '80px', height: '80px' }} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-600 font-serif">ZJ</h1>
                <p className="text-2xl text-gray-500 -mt-1 custom-font">Crafts hub</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['HOME', 'SHOP', 'CONTACT US'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="group relative font-serif text-gray-900 font-medium transition-colors duration-300 hover:text-[#d0a19b]"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d0a19b] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={toggleDrawer} className="text-gray-800">
                {isDrawerOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isDrawerOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-gray-100 absolute w-full left-0 top-full z-40">
            <nav className="flex flex-col items-start px-4 py-4 space-y-4">
              {['HOME', 'SHOP', 'CONTACT US'].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className="group relative font-serif text-gray-900 font-medium transition-colors duration-300 hover:text-[#d0a19b]"
                >
                  {item}
                  <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#d0a19b] transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
