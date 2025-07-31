import { Search, User, Heart, ShoppingCart } from 'lucide-react';
import logo from '../assets/images/logo.jpeg';

const Header = () => {
  return (
    <>
      
      {/* Main Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className=" text-green-600">
                <img src={logo} alt="zj crafts hub"  style={{ width: '100px', height: '100px' }}/>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-wide">ZJ</h1>
                <p className="text-m text-gray-500 -mt-1 custom-font">Crafts hub</p>
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