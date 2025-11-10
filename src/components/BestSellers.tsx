import React, { useEffect, useState } from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);

  // 🛒 Add to Cart Modal State
  const [cartModal, setCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await fetch(`${API_URL}/products/filter/bestseller`);
        const data = await res.json();
        if (data.success) setProducts(data.products);
      } catch (error) {
        console.error("Error fetching best sellers:", error);
      }
    };
    fetchBestSellers();
  }, []);

  // ❤️ Add to Wishlist
  const handleAddToWishlist = async (productId) => {
    if (!token) {
      toast.error("Please log in to add to your wishlist 💕");
      setTimeout(() => navigate("/profile"), 1500);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId }),
      });

      const data = await res.json();
      if (data.success) {
        showFeedback("Added to Wishlist 💖");
        toast.success("Added to Wishlist 💖");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Wishlist Error:", error);
      toast.error("Wishlist Error ❌");
    }
  };

  // 🛒 Open Modal for Add to Cart
  const openCartModal = (product) => {
    if (!token) {
      toast.error("Please log in to add to your cart 🛒");
      setTimeout(() => navigate("/profile"), 1500);
      return;
    }
    setSelectedProduct(product);
    setQuantity(1);
    setCartModal(true);
  };

  // 🛍️ Confirm Add to Cart
  const handleAddToCart = async () => {
    if (!selectedProduct || !quantity || quantity <= 0) {
      toast.error("Please enter a valid quantity");
      return;
    }

    setAddingToCart(true);

    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity: Number(quantity),
        }),
      });

      const data = await res.json();
      if (data.success) {
        showFeedback("Added to Cart 🛍️");
        toast.success("Added to Cart 🛍️");
        setCartModal(false);
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Cart Error:", error);
      toast.error("Cart Error ❌");
    } finally {
      setAddingToCart(false);
    }
  };

  const showFeedback = (message) => {
    setFeedback(message);
    setTimeout(() => setFeedback(null), 2000);
  };


  // 🖼️ Image Modal Logic
  const openModal = (images, index = 0) => {
    setSelectedImages(images || []);
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % selectedImages.length);
  const prevImage = () =>
    setCurrentImageIndex((prev) =>
      prev === 0 ? selectedImages.length - 1 : prev - 1
    );

     
  return (
    <section className="py-16 bg-gray-50 relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: "#fff",
            border: "1px solid #f3c6c3",
            color: "#333",
            fontSize: "14px",
          },
          success: { iconTheme: { primary: "#d0a19b", secondary: "#fff" } },
        }}
      />

      <div className="max-w-7xl mx-auto px-4">
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              <div className="relative overflow-hidden cursor-pointer">
                <img
                  src={product.images && product.images[0]?.url}
                  alt={product.name}
                  className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  onClick={() => openModal(product.images)}
                />

                <div className="absolute top-2 right-2 flex flex-col space-y-2">
                  <button
                    onClick={() => handleAddToWishlist(product._id)}
                    className="bg-white p-2 rounded-full shadow-md hover:bg-pink-50 transition transform hover:scale-110"
                  >
                    <Heart className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between h-48">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-lg font-semibold text-[#d0a19b] mt-1">
                    Rs. {product.price}
                  </p>

                  {/* <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.ratings?.average || 0)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      ({(product.ratings?.average || 0).toFixed(1)})
                    </span>
                  </div> */}

                  
                </div>

                {/* 🛒 Replaced "Contact Us" with Add to Cart Button */}
                <button
                  onClick={() => openCartModal(product)}
                  className="relative mt-4 py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium rounded-full overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="relative z-10">
                    Add to Cart
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            to="/shop"
            className="bg-[#f6dfd7] text-black px-8 py-3 rounded-full font-medium border-2 border-transparent hover:border-[#b58983] transition-all duration-300 hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* 🛍️ Add to Cart Modal */}
      <AnimatePresence>
        {cartModal && selectedProduct && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setCartModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
                Add to Cart
              </h2>

              <div className="flex flex-col items-center">
                <img
                  src={selectedProduct.images?.[0]?.url}
                  alt={selectedProduct.name}
                  className="w-32 h-32 object-cover rounded-xl mb-3"
                />
                <h3 className="text-lg font-medium text-gray-700 text-center">
                  {selectedProduct.name}
                </h3>
                <p className="text-[#d0a19b] font-semibold mt-1">
                  Rs. {selectedProduct.price}
                </p>
              </div>

              <div className="mt-5">
                <label className="block text-gray-600 font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#e8c3bd]"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="mt-6 w-full py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-60"
              >
                {addingToCart ? "Adding..." : "Add to Cart"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🖼️ Image Preview Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative max-w-3xl w-full mx-4">
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300"
              onClick={closeModal}
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedImages[currentImageIndex]?.url}
              alt="Product"
              className="w-full h-[500px] object-contain rounded-lg"
            />
            {selectedImages.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ✅ Floating feedback */}
      {feedback && (
        <div className="fixed top-6 right-6 bg-white shadow-lg border border-pink-200 px-6 py-3 rounded-full flex items-center space-x-2 animate-bounce z-50">
          <CheckCircle className="text-pink-400 w-5 h-5" />
          <span className="text-gray-700 font-medium">{feedback}</span>
        </div>
      )}
    </section>
  );
};

export default BestSellers;
