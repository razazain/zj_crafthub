import React from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

const BestSellers = () => {
  const products = [
    { name: 'Baba Board Mug', price: '£35.00', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8 },
    { name: 'Motorized Tricycle', price: '£35.00', image: 'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.9 },
    { name: 'Walnut Cutting Board', price: '£100.00', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.7 },
    { name: 'Pizza Plate Tray', price: '£35.00', image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.6 },
    { name: 'Minimalist Ceramic Vase', price: '£19.00', image: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8 },
    { name: 'Clear Silicon Teapot', price: '£19.00', image: 'https://images.pexels.com/photos/230477/pexels-photo-230477.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.5 },
    { name: 'Lucky Wooden Elephant', price: '£35.00', image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.9 },
    { name: 'Decorative Christmas Fox', price: '£19.00', image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.7 },
    { name: 'Aluminum Eggpan', price: '£100.00', image: 'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.6 },
    { name: 'Fish Cut Car Set', price: '£9.00', image: 'https://images.pexels.com/photos/163077/mario-luigi-yoschi-figures-163077.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8 },
    { name: 'Electric Egg Beater', price: '£100.00', image: 'https://images.pexels.com/photos/4099354/pexels-photo-4099354.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.4 },
    { name: 'Open Cottage Playhouse', price: '£35.00', image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.9 },
    { name: 'Round Popcorn Bowl', price: '£19.00', image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.7 },
    { name: 'Abstract Folded Pots', originalPrice: '£50.00', price: '£35.00', image: 'https://images.pexels.com/photos/1738986/pexels-photo-1738986.jpeg?auto=compress&cs=tinysrgb&w=300', rating: 4.8, onSale: true }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop now — Shop our best-sellers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover why these handcrafted pieces are loved by our community of artisan enthusiasts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.onSale && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                    SALE
                  </div>
                )}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors">
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                  <button className="bg-green-600 text-white px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 flex items-center space-x-2">
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.rating})</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                  <span className="font-bold text-gray-900">{product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-colors font-medium">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSellers;