import { useEffect, useState } from 'react';
import bg1 from '../assets/images/bg1.jpeg';
import bg2 from '../assets/images/bg2.jpeg';
import bg3 from '../assets/images/bg3.jpeg';

const backgroundImages = [bg1, bg2, bg3];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
      {/* Background Slider Layer */}
      <div className="absolute inset-0 z-0">
        {backgroundImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block mb-8">
            <div className="w-80 h-80 bg-white border-4 border-[#f6dfd7] rounded-full shadow-xl flex items-center justify-center relative">

              {/* Heart Icons */}
              <div className="absolute top-8 flex items-center gap-2">
                {/* Heart 1 */}
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="#f6dfd7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 6.01 4.01 4 6.5 4 
              c1.74 0 3.41 1.01 4.13 2.44 
              H13.5c.72-1.43 2.39-2.44 4.13-2.44 
              C19.99 4 22 6.01 22 8.5 
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>

                {/* Heart 2 */}
                <svg className="w-6 h-6 md:w-8 md:h-8" viewBox="0 0 24 24" fill="#f6dfd7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 6.01 4.01 4 6.5 4 
              c1.74 0 3.41 1.01 4.13 2.44 
              H13.5c.72-1.43 2.39-2.44 4.13-2.44 
              C19.99 4 22 6.01 22 8.5 
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>

                {/* Heart 3 */}
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="#f6dfd7" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 6.01 4.01 4 6.5 4 
              c1.74 0 3.41 1.01 4.13 2.44 
              H13.5c.72-1.43 2.39-2.44 4.13-2.44 
              C19.99 4 22 6.01 22 8.5 
              c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>

              {/* Text */}
              <div className="text-center mt-12 px-4">
                <h2 className="text-4xl md:text-5xl  text-black mb-2 custom-font">
                  Handicraft Shop
                </h2>
                <p className="text-[#d0a19b] mb-4 text-lg font-serif">Just for you</p>

                <button className="relative group text-black font-medium transition-all">
                  SHOP NOW
                  <span className="block h-[2px] w-0 bg-[#f6dfd7] transition-all duration-300 group-hover:w-full"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Decorative dots */}
      <div className="absolute top-1/4 left-10 opacity-30 z-10">
        <div className="w-2 h-2 bg-[#f6dfd7] rounded-full mb-2"></div>
        <div className="w-2 h-2 bg-[#f6dfd7] rounded-full mb-2"></div>
        <div className="w-2 h-2 bg-[#f6dfd7] rounded-full"></div>
      </div>

      <div className="absolute bottom-1/4 right-10 opacity-30 z-10">
        <div className="w-3 h-3 bg-[#f6dfd7] rounded-full mb-2"></div>
        <div className="w-3 h-3 bg-[#f6dfd7] rounded-full mb-2"></div>
        <div className="w-3 h-3 bg-[#f6dfd7] rounded-full"></div>
      </div>

    </section>
  );
};

export default Hero;
