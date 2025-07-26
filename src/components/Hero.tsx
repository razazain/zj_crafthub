import React from 'react';

const Hero = () => {
  return (
    <section className="relative h-96 bg-gradient-to-r from-orange-100 to-orange-50 overflow-hidden">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-16 h-16 bg-orange-200 rounded-full"></div>
        <div className="absolute top-20 right-20 w-8 h-8 bg-green-200 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-yellow-200 rounded-full"></div>
        <div className="absolute bottom-10 right-1/3 w-6 h-6 bg-pink-200 rounded-full"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          {/* Circular Badge */}
          <div className="relative inline-block mb-8">
            <div className="w-48 h-48 bg-white rounded-full shadow-lg flex items-center justify-center relative">
              {/* Bird Icon */}
              <div className="absolute top-8 text-green-600">
                <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.91 12.25L15.83 8.33L17.5 10V9H21Z"/>
                </svg>
              </div>
              
              {/* Text Content */}
              <div className="text-center mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Handicraft Shop</h2>
                <p className="text-gray-600 mb-4">Just for you</p>
                <button className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-colors font-medium">
                  SHOP NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 opacity-30">
        <div className="w-2 h-2 bg-green-400 rounded-full mb-2"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full mb-2"></div>
        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
      </div>
      
      <div className="absolute bottom-1/4 right-10 opacity-30">
        <div className="w-3 h-3 bg-orange-400 rounded-full mb-2"></div>
        <div className="w-3 h-3 bg-orange-400 rounded-full mb-2"></div>
        <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;