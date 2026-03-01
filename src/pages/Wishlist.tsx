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
      if (data.success) {
        // Filter out invalid wishlist items
        const validWishlist = (data.wishlist || []).filter((item: any) => 
          item && item._id && item.product && item.product._id
        );
        setWishlist(validWishlist);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      console.error("Error fetching wishlist:", err);
      toast.error("Failed to load wishlist");
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove from Wishlist
  const removeFromWishlist = async (productId: string) => {
    if (!productId) return;
    
    try {
      const res = await fetch(`${API_URL}/wishlist/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();

      if (data.success) {
        setWishlist((prev) => prev.filter((item) => item.product?._id !== productId));
        toast.success("Removed from wishlist");
      } else toast.error(data.message || "Error removing item");
    } catch (err) {
      console.error("Error removing wishlist item:", err);
      toast.error("Failed to remove item");
    }
  };

  // ✅ Add to Cart
  const submitToCart = async () => {
    if (!selectedProduct || !selectedProduct._id) return;
    
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: selectedProduct._id,
          quantity: quantity || 1,
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

  // Helper function to safely get image URL
  const getSafeImageUrl = (images: any[] | undefined) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return null;
    }
    const firstImage = images[0];
    return firstImage && firstImage.url ? firstImage.url : null;
  };

  // Helper function to safely get image alt text
  const getSafeImageAlt = (images: any[] | undefined, productName: string) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return productName || "Product image";
    }
    const firstImage = images[0];
    return (firstImage && firstImage.alt) || productName || "Product image";
  };

  // Helper function to safely get product name
  const getSafeProductName = (name: string | undefined) => {
    return name || "Product Name Not Available";
  };

  // Helper function to safely get product description
  const getSafeDescription = (description: string | undefined) => {
    return description || "No description available";
  };

  // Helper function to safely get product price
  const getSafePrice = (price: number | undefined) => {
    return typeof price === 'number' && !isNaN(price) ? price : 0;
  };

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
        ) : !wishlist || wishlist.length === 0 ? (
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
              {wishlist.map((item) => {
                // Safely extract product data with fallbacks
                const product = item.product || {};
                const productId = product._id || item._id;
                const productName = getSafeProductName(product.name);
                const productDescription = getSafeDescription(product.description);
                const productPrice = getSafePrice(product.price);
                const productImages = product.images || [];
                const imageUrl = getSafeImageUrl(productImages);
                const imageAlt = getSafeImageAlt(productImages, productName);

                return (
                  <motion.div
                    key={item._id || `wishlist-${Math.random()}`}
                    className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={imageAlt}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          onError={(e) => {
                            // Handle image load error
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-gray-400">Image not available</span>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <span>No image available</span>
                        </div>
                      )}
                    </div>

                    <div className="mt-3">
                      <h3 className="text-lg font-semibold text-gray-800 truncate">
                        {productName}
                      </h3>
                      <p className="text-[#d0a19b] font-medium text-md">
                        Rs {productPrice.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {productDescription}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2 justify-between items-center">
                        {/* WhatsApp Button */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            const phoneNumber = "923003123154";
                            const message = `Hello! I'm interested in the product: *${productName}*. Can you share more details?`;
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
                            if (productId) {
                              setSelectedProduct(product as WishlistItem["product"]);
                              setShowCartModal(true);
                            } else {
                              toast.error("Product information is incomplete");
                            }
                          }}
                          className="px-4 py-2 bg-[#d0a19b]/10 text-[#d0a19b] rounded-full text-sm font-medium hover:bg-[#d0a19b]/20 transition"
                        >
                          Add to Cart
                        </motion.button>

                        {/* Remove */}
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            if (productId) {
                              removeFromWishlist(productId);
                            } else {
                              toast.error("Cannot remove item - invalid product");
                            }
                          }}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                        >
                          Remove
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ✅ Add to Cart Modal */}
      <AnimatePresence>
        {showCartModal && selectedProduct && (
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

              {/* Safely render modal content */}
              {selectedProduct.images && selectedProduct.images[0]?.url ? (
                <img
                  src={selectedProduct.images[0].url}
                  alt={selectedProduct.images[0].alt || selectedProduct.name || "Product"}
                  className="w-32 h-32 object-cover mx-auto rounded-lg mb-3"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<div class="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">No image</div>';
                  }}
                />
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg mx-auto mb-3 flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}

              <p className="text-sm text-gray-600 mb-1">
                {getSafeProductName(selectedProduct.name)}
              </p>
              <p className="text-[#d0a19b] font-semibold mb-4">
                Rs {getSafePrice(selectedProduct.price).toLocaleString()}
              </p>

              <input
                type="number"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
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