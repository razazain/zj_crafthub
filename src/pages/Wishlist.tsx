import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../config";

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    images: { url: string; alt: string }[];
  };
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WishlistItem["product"] | null>(null);
  const [quantity, setQuantity] = useState(1);

  const token = localStorage.getItem("token");

  // ✅ Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setWishlist(data.wishlist || []);
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      toast.error("Failed to load wishlist");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove from Wishlist
  const removeFromWishlist = async (productId: string) => {
    try {
      const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setWishlist((prev) => prev.filter((item) => item.product._id !== productId));
        toast.success("Removed from wishlist");
      } else toast.error(data.message || "Error removing item");
    } catch (err) {
      console.error("Error removing wishlist item:", err);
      toast.error("Failed to remove item");
    }
  };

  // ✅ Add to Cart
  const submitToCart = async () => {
    if (!selectedProduct) return;
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

      if (data.success) {
        toast.success("Added to cart successfully");
        setShowCartModal(false);
        setQuantity(1);
      } else {
        toast.error(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Error adding to cart");
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <section className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-10">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-8xl font-bold text-[#d0a19b] text-center mb-6 custom-font"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Wishlist
        </motion.h2>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-500 animate-pulse">
            Loading wishlist...
          </div>
        ) : wishlist.length === 0 ? (
          <motion.div
            className="text-center text-gray-500 py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-lg">Your wishlist is empty 🩷</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {wishlist.map((item) => (
                <motion.div
                  key={item._id}
                  className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-xl">
                    <img
                      src={item.product.images?.[0]?.url}
                      alt={item.product.images?.[0]?.alt || item.product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="mt-3">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {item.product.name}
                    </h3>
                    <p className="text-[#d0a19b] font-medium text-md">
                      Rs {item.product.price}
                    </p>
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.product.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
                      {/* WhatsApp Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const phoneNumber = "923003123154";
                          const message = `Hello! I'm interested in the product: *${item.product.name}*. Can you share more details?`;
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                      >
                        For Customization
                      </motion.button>

                      {/* Add to Cart */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedProduct(item.product);
                          setShowCartModal(true);
                        }}
                        className="px-4 py-2 bg-[#d0a19b]/10 text-[#d0a19b] rounded-full text-sm font-medium hover:bg-[#d0a19b]/20 transition"
                      >
                        Add to Cart
                      </motion.button>

                      {/* Remove */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => removeFromWishlist(item.product._id)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                      >
                        Remove
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ✅ Add to Cart Modal */}
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
              <button
                onClick={() => setShowCartModal(false)}
                className="absolute top-3 right-3 bg-gray-100 hover:bg-gray-200 rounded-full p-1 text-gray-700"
              >
                ✕
              </button>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Add to Cart
              </h3>

              <img
                src={selectedProduct?.images?.[0]?.url}
                alt={selectedProduct?.name}
                className="w-32 h-32 object-cover mx-auto rounded-lg mb-3"
              />

              <p className="text-sm text-gray-600 mb-1">{selectedProduct?.name}</p>
              <p className="text-[#d0a19b] font-semibold mb-4">
                Rs {selectedProduct?.price}
              </p>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border rounded-lg w-full p-2 text-center focus:ring-2 focus:ring-[#d0a19b] outline-none mb-4"
              />
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

export default Wishlist;
