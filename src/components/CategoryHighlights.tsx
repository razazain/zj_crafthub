import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { API_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";

interface Category {
  _id: string;
  name: string;
  images: { url: string; alt: string }[];
  description: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string; alt: string }[];
}

const CategoryHighlights: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories`);
        const data = await res.json();
        if (data.success && data.categories) {
          setCategories(data.categories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // Fetch products by category
  const fetchProductsByCategory = async (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
    setModalLoading(true);

    try {
      const res = await fetch(`${API_URL}/products/category?${category._id}`);
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products.slice(0, 3)); // show only first 3
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setModalLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-16 bg-white flex justify-center items-center">
        <div className="animate-pulse text-gray-500 text-lg">Loading...</div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {categories.map((cat, index) => (
            <motion.div
              key={cat._id}
              className="px-4 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => fetchProductsByCategory(cat)}
            >
              <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.images?.[0]?.url}
                    alt={cat.images?.[0]?.alt || cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 truncate">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                  <div className="mt-3 w-16 h-[2px] bg-gray-300 rounded"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </Slider>
      </div>

      {/* ✨ Modal Section */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 relative overflow-hidden"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-1"
              >
                ❌
              </button>

              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-5">
                {selectedCategory?.name} Products
              </h2>

              {modalLoading ? (
                <div className="text-center text-gray-500 animate-pulse">
                  Loading products...
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {products.map((p) => (
                    <motion.div
                      key={p._id}
                      className="border rounded-xl p-3 hover:shadow-lg transition-all duration-300"
                      whileHover={{ scale: 1.03 }}
                    >
                      <img
                        src={p.images?.[0]?.url}
                        alt={p.images?.[0]?.alt || p.name}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <h4 className="text-base font-semibold text-gray-800 mt-2 truncate">
                        {p.name}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {p.description}
                      </p>
                      <p className="text-pink-600 font-bold mt-2">${p.price}</p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No products found.</p>
              )}

              {/* View All Button */}
              {!modalLoading && products.length > 0 && (
                <div className="flex justify-center mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full shadow-md transition-all"
                    onClick={() =>
                      window.location.href = `/category/${selectedCategory?._id}`
                    }
                  >
                    View All Products
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CategoryHighlights;
