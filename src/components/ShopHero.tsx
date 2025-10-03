import React from 'react';
import shopBg from '../assets/images/shop-hero.png'; // 👉 replace with your image

const ShopHero = () => {
  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background image */}
      <img
        src={shopBg}
        alt="Shop"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center px-8 md:px-20">
        <div className="text-white">
          <h1 className="text-[#d0a19b] custom-font text-9xl md:text-9xl font-bold ml-40 mb-4 tracking-wide">
            Shop    
          </h1>
          <p className="text-lg md:text-xl font-light">
            Home <span className="mx-2">{'>'}</span> Products
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShopHero;
