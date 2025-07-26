import React from 'react';

const CategoryHighlights = () => {
  const categories = [
    {
      title: 'Gift Ideas 🎁',
      image: 'https://images.pexels.com/photos/264917/pexels-photo-264917.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Unique handmade gifts for your loved ones'
    },
    {
      title: 'Home Decor 🏠',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Beautiful pieces to enhance your living space'
    },
    {
      title: 'Kids & Babies 👶',
      image: 'https://images.pexels.com/photos/1679618/pexels-photo-1679618.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Safe and delightful items for little ones'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collections of handmade treasures, each piece crafted with love and attention to detail.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square mb-4">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-90 rounded-lg p-4 text-center group-hover:bg-opacity-100 transition-all duration-300">
                    <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                  </div>
                </div>
              </div>
              <p className="text-center text-gray-600 group-hover:text-gray-900 transition-colors">
                {category.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;