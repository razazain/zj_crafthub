import React from 'react';

const PromotionalStrips = () => {
  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Promotional Message */}
        <div className="text-center mb-8">
          <h2 className="text-5xl md:text-8xl text-[#d0a19b] mb-2 custom-font">
            Just for you
          </h2>
          <div className="flex items-center justify-center gap-3 text-gray-600">
            {/* Left Heart */}
            <svg
              className="w-8 h-8 md:w-10 md:h-10"
              viewBox="0 0 24 24"
              fill="#f6dfd7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                2 6.01 4.01 4 6.5 4 
                c1.74 0 3.41 1.01 4.13 2.44 
                H13.5c.72-1.43 2.39-2.44 4.13-2.44 
                C19.99 4 22 6.01 22 8.5 
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>

            {/* Text */}
            <span className="text-md md:text-3xl text-gray font-medium font-serif">Making & crafting</span>

            {/* Right Heart */}
            <svg
              className="w-8 h-8 md:w-10 md:h-10"
              viewBox="0 0 24 24"
              fill="#f6dfd7"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 6.01 4.01 4 6.5 4 
              c1.74 0 3.41 1.01 4.13 2.44 
              H13.5c.72-1.43 2.39-2.44 4.13-2.44 
              C19.99 4 22 6.01 22 8.5 
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>

        {/* Side-by-Side Offers */}
        {/* <div className="grid md:grid-cols-2 gap-6"> */}
          {/* Spring Sale */}
          {/* <div className="bg-gradient-to-r from-pink-100 to-pink-50 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-pink-200 opacity-50">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L13.5 2.5L16.17 5.17L10.5 10.84L11.91 12.25L15.83 8.33L17.5 10V9H21Z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Spring Sale 💐</h3>
              <div className="text-3xl font-bold text-pink-600 mb-4">40% OFF</div>
              <p className="text-gray-600 mb-4">Limited time offer on selected spring items</p>
              <button className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors font-medium">
                SHOP NOW
              </button>
            </div>
          </div> */}

          {/* Loyalty Discount */}
          {/* <div className="bg-gradient-to-r from-blue-100 to-blue-50 rounded-lg p-8 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-blue-200 opacity-50">
              <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Loyalty Discount 🎁</h3>
              <div className="text-3xl font-bold text-blue-600 mb-4">10% OFF</div>
              <p className="text-gray-600 mb-4">Your next purchase as a valued customer</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors font-medium">
                SHOP NOW
              </button>
            </div>
          </div> */}
        {/* </div> */}
      </div>
    </section>
  );
};

export default PromotionalStrips;