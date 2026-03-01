import React, { useEffect, useState, useCallback } from "react";
import Slider from "react-slick";
import { API_URL } from "../config";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

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

// Add pagination interface
interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const CategoryHighlights: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  
  // Pagination states
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 6, // Show 6 products per page (2 rows of 3 in grid)
    totalPages: 0
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Cart Quantity Modal
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  // ✅ Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/categories?status=active`);
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

  // ✅ Slider settings
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 3 } },
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  // ✅ Fetch products by category with pagination
  const fetchProductsByCategory = useCallback(async (category: Category, page: number = 1) => {
    setSelectedCategory(category);
    setShowModal(true);
    setModalLoading(true);
    setProducts([]);

    try {
      const res = await fetch(
        `${API_URL}/products/category/${category._id}?page=${page}&limit=${pagination.limit}&status=active`
      );
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.page);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setModalLoading(false);
    }
  }, [pagination.limit]);

  // Handle page change
  const handlePageChange = useCallback(async (newPage: number) => {
    if (!selectedCategory) return;
    
    setModalLoading(true);
    try {
      const res = await fetch(
        `${API_URL}/products/category/${selectedCategory._id}?page=${newPage}&limit=${pagination.limit}&status=active`
      );
      const data = await res.json();
      if (data.success && data.products) {
        setProducts(data.products);
        setPagination(data.pagination);
        setCurrentPage(data.pagination.page);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setModalLoading(false);
    }
  }, [selectedCategory, pagination.limit]);

  // Reset pagination when opening new category
  const handleCategoryClick = (category: Category) => {
    setCurrentPage(1);
    fetchProductsByCategory(category, 1);
  };

  // ✅ Handle Add to Cart Click
  const handleAddToCart = (product: Product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in to add to your cart 🛒");
      setTimeout(() => navigate("/profile"), 1500);
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setShowCartModal(true);
  };

  // ✅ Handle Cart Submission
  const submitToCart = async () => {
    if (!selectedProduct) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first 🛒");
      setTimeout(() => navigate("/profile"), 1500);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Product added to cart successfully 🛍️");
        setShowCartModal(false);
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong!");
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
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Slider {...settings}>
          {categories.map((cat, index) => (
            <motion.div
              key={cat._id}
              className="px-3 sm:px-4 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="flex flex-col rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white">
                <div className="aspect-[4/3] sm:aspect-[16/10] overflow-hidden">
                  <img
                    src={cat.images?.[0]?.url}
                    alt={cat.images?.[0]?.alt || cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
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

      {/* ✨ Product Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 px-3 sm:px-6 overflow-y-auto py-6 sm:py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-2xl p-4 sm:p-6 relative"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-1.5 text-gray-700"
              >
                ✕
              </button>

              <h2 className="text-lg sm:text-2xl font-semibold text-center text-gray-800 mb-5">
                {selectedCategory?.name} Products
              </h2>

              {modalLoading ? (
                <div className="text-center text-gray-500 animate-pulse">
                  Loading products...
                </div>
              ) : products.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {products.map((p) => (
                      <motion.div
                        key={p._id}
                        className="border rounded-xl p-3 sm:p-4 hover:shadow-lg transition-all duration-300 bg-white"
                        whileHover={{ scale: 1.02 }}
                      >
                        <img
                          src={p.images?.[0]?.url}
                          alt={p.images?.[0]?.alt || p.name}
                          className="w-full h-40 sm:h-48 object-cover rounded-lg"
                        />
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mt-2 truncate">
                          {p.name}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                          {p.description}
                        </p>
                        <p className="text-md font-semibold text-[#d0938b] mt-2">
                          Rs. {p.price}
                        </p>
                        <button
                          onClick={() => handleAddToCart(p)}
                          className="relative w-full mt-4 py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                        >
                          <span className="relative z-10">Add to Cart</span>
                          <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                        </button>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Controls */}
                  {pagination.totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-6">
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#d0a19b] text-white hover:bg-[#b58983]"
                        } transition-colors duration-200`}
                      >
                        Previous
                      </button>
                      
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded-md ${
                            currentPage === page
                              ? "bg-[#d0938b] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          } transition-colors duration-200`}
                        >
                          {page}
                        </button>
                      ))}
                      
                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.totalPages}
                        className={`px-3 py-1 rounded-md ${
                          currentPage === pagination.totalPages
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-[#d0a19b] text-white hover:bg-[#b58983]"
                        } transition-colors duration-200`}
                      >
                        Next
                      </button>
                    </div>
                  )}

                  <p className="text-center text-sm text-gray-500 mt-2">
                    Showing {products.length} of {pagination.total} products
                  </p>
                </>
              ) : (
                <p className="text-center text-gray-500">Product Coming Soon</p>
              )}

              {!modalLoading && products.length > 0 && (
                <div className="text-center mt-8 sm:mt-12">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/shop"
                      className="bg-[#f6dfd7] text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium border-2 border-transparent hover:border-[#b58983] transition-all duration-300"
                    >
                      View All Products
                    </Link>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🛒 Cart Quantity Modal */}
      <AnimatePresence>
        {showCartModal && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              {/* ✖ Close Button */}
              <button
                onClick={() => setShowCartModal(false)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-1 text-gray-700"
              >
                ✕
              </button>

              {/* 🖼️ Product Image */}
              {selectedProduct?.images?.[0]?.url && (
                <img
                  src={selectedProduct.images[0].url}
                  alt={selectedProduct.images[0].alt || selectedProduct.name}
                  className="w-28 h-28 object-cover rounded-xl mx-auto mb-3 shadow-sm"
                />
              )}

              {/* 🛒 Title & Product Name */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Add to Cart
              </h3>
              <p className="text-sm text-gray-500 mb-1">{selectedProduct?.name}</p>
              <p className="text-md font-semibold text-[#d0938b] mb-4">
                Rs. {selectedProduct?.price}
              </p>

              {/* 🔢 Quantity Input */}
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg w-full p-2 text-center focus:ring-2 focus:ring-[#d0a19b] outline-none mb-4"
              />

              {/* ✅ Confirm Button */}
              <button
                onClick={submitToCart}
                className="w-full bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium rounded-full py-2 hover:scale-105 transition-transform"
              >
                Confirm
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default CategoryHighlights;