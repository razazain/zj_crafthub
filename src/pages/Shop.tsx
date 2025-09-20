import React from 'react'
import Products from '../components/Products'

const Shop: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-8">
          <h2 className="text-5xl md:text-8xl text-[#f6dfd7] mb-2 custom-font">
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
            <span className="text-lg md:text-4xl text-black font-medium">Making & crafting</span>

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

      <Products />
    </div>
  )
}

export default Shop