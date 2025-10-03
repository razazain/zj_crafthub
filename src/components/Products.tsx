import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

// 👉 Product Images
import tomjerrykeychain from '../assets/images/products/tomjerrykeychain.webp';
import beadedflowerkeychain from '../assets/images/products/beadskeychain.webp';
import personalizedbracelates from '../assets/images/products/bluebracelate.webp';
import couplebracelate from '../assets/images/products/couplebracelate.webp';
import pen from '../assets/images/products/pen.webp';
import pinkbracelate from '../assets/images/products/pinkbracelate.webp';

const Products = () => {
  // 👉 Product List
  const products = [
    { name: 'Cute keychains featuring everyone`s fav cartoon duo', category: 'Keychains', bestSeller: true, price: 'Contact Us', image: tomjerrykeychain, rating: 4.8 },
    { name: 'Adorable beaded flower keychains', category: 'Keychains', bestSeller: true, price: 'Contact Us', image: beadedflowerkeychain, rating: 4.9 },
    { name: 'Personalized letter beads bracelets', category: 'Bracelets', bestSeller: false, price: 'Contact Us', image: personalizedbracelates, rating: 4.7 },
    { name: 'Perfect pair for a perfect bond', category: 'Bracelets', bestSeller: true, price: 'Contact Us', image: couplebracelate, rating: 4.6 },
    { name: 'Custom handmade pen', category: 'Pens', bestSeller: false, price: 'Contact Us', image: pen, rating: 4.8 },
    { name: 'Customize any name and any color in them', category: 'Bracelets', bestSeller: false, price: 'Contact Us', image: pinkbracelate, rating: 4.5 },
  ];

  // 👉 Categories (for sidebar)
  const categories = ['All', 'Keychains', 'Bracelets', 'Pens'];

  // 👉 State for filters
  const [activeTab, setActiveTab] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 👉 Filter products
  const filteredProducts = products.filter((product) => {
    const tabMatch = activeTab === 'All' || product.bestSeller;
    const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
    return tabMatch && categoryMatch;
  });

  return (
    <section className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* ====== Header Tabs ====== */}
        <div className="flex space-x-6 border-b border-gray-200 pb-4 mb-6">
          {['All', 'Best Sellers'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-lg font-medium border-b-2 transition-colors duration-200 ${
                activeTab === tab
                  ? 'border-[#d0a19b] text-[#d0a19b]'
                  : 'border-transparent text-black hover:text-[#d0a19b]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-8">
          
          {/* ====== Sidebar ====== */}
          <aside className="w-64 bg-white p-4 rounded-lg shadow-sm h-fit">
            <h3 className="text-lg font-semibold text-black mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-colors duration-200 ${
                      selectedCategory === cat
                        ? 'bg-[#d0a19b] text-white font-medium'
                        : 'text-black hover:bg-[#f5e6e2]'
                    }`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* ====== Product Grid ====== */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group"
                  >
                    {/* Product Image */}
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Wishlist Icon */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50">
                          <Heart className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      {/* Add to Cart Button */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                        <button className="bg-[#d0a19b] text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-medium text-black mb-2 line-clamp-2">{product.name}</h3>

                      <div className="flex items-center mb-2">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
                      </div>

                      <span className="font-bold text-black">{product.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No products found for the selected filters.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
