import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../config";

interface WishlistItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: { url: string; alt: string }[];
  };
}

const Wishlist: React.FC = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  // ✅ Fetch Wishlist
  const fetchWishlist = async () => {
    try {
      const res = await fetch(`${API_URL}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setWishlist(data.wishlist || []);
      }
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      if (data.success) {
        setWishlist((prev) => prev.filter((item) => item.product._id !== productId));
        toast.success("Removed from wishlist");
      } else {
        toast.error(data.message || "Error removing item");
      }
    } catch (err) {
      console.error("Error removing wishlist item:", err);
      toast.error("Failed to remove item");
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
                    <p className="text-sm text-gray-500 line-clamp-2">
                      {item.product.description}
                    </p>

                    <div className="mt-4 flex justify-between items-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          const phoneNumber = "923003123154";
                          const message = `Hello! I'm interested in the product: *${item.product.name}*. Can you share more details?`;
                          const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="px-4 py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] w-100 text-white rounded-full text-sm font-medium transition-all duration-300 hover:shadow-lg"
                      >
                        Contact Us
                      </motion.button>

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
    </section>
  );
};

export default Wishlist;
