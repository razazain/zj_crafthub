import React, { useEffect, useState } from "react";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Loader2,
  MessageCircle,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { API_URL } from "../config";
import { useNavigate } from "react-router-dom";

interface CartItem {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: { url: string; alt: string }[];
  };
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // ✅ Helper functions for safe data access
  const getSafeProductId = (product: any): string => {
    return product?._id || `temp-${Math.random()}`;
  };

  const getSafeProductName = (product: any): string => {
    return product?.name || "Product Name Not Available";
  };

  const getSafeProductDescription = (product: any): string => {
    return product?.description || "No description available";
  };

  const getSafeProductPrice = (product: any): number => {
    const price = product?.price;
    return typeof price === 'number' && !isNaN(price) ? price : 0;
  };

  const getSafeProductImages = (product: any): { url: string; alt: string }[] => {
    return Array.isArray(product?.images) ? product.images : [];
  };

  const getSafeImageUrl = (images: any[]): string | null => {
    if (!Array.isArray(images) || images.length === 0) return null;
    const firstImage = images[0];
    return firstImage?.url || null;
  };

  const getSafeImageAlt = (images: any[], productName: string): string => {
    if (!Array.isArray(images) || images.length === 0) return productName;
    const firstImage = images[0];
    return firstImage?.alt || productName;
  };

  const getSafeQuantity = (item: any): number => {
    const qty = item?.quantity;
    return typeof qty === 'number' && !isNaN(qty) && qty > 0 ? qty : 1;
  };

  // ✅ Validate cart item
  const isValidCartItem = (item: any): boolean => {
    return item && item.product && item.product._id;
  };

  // ✅ Fetch Cart
  const fetchCart = async () => {
    if (!token) {
      toast.error("Please log in to view your cart 🛒");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success && data.cart?.items) {
        // Filter out invalid items and ensure all data is safe
        const validItems = (data.cart.items || [])
          .filter(isValidCartItem)
          .map((item: any) => ({
            product: {
              _id: getSafeProductId(item.product),
              name: getSafeProductName(item.product),
              description: getSafeProductDescription(item.product),
              price: getSafeProductPrice(item.product),
              images: getSafeProductImages(item.product),
            },
            quantity: getSafeQuantity(item),
          }));
        setCart(validItems);
      } else {
        setCart([]);
        toast.error("Failed to load cart");
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      toast.error("Error loading cart ❌");
      setCart([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🧮 Update Quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    if (!productId || quantity < 1) return;
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      const data = await res.json();
      if (data.success) {
        fetchCart();
      } else {
        toast.error(data.message || "Could not update quantity");
      }
    } catch (error) {
      console.error("Quantity update error:", error);
      toast.error("Could not update quantity ❌");
    }
  };

  // 🗑️ Remove Single Item
  const removeItem = async (productId: string) => {
    if (!productId) {
      toast.error("Invalid product");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Item removed 🩷");
        setCart((prev) => prev.filter((item) => item.product._id !== productId));
      } else {
        toast.error(data.message || "Could not remove item");
      }
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error("Could not remove item ❌");
    }
  };

  // ❌ Clear Entire Cart
  const clearCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Cart cleared 🛍️");
        setCart([]);
      } else {
        toast.error(data.message || "Could not clear cart");
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Could not clear cart ❌");
    }
  };

  // 💬 WhatsApp
  const handleWhatsApp = (productName: string) => {
    const safeProductName = productName || "this product";
    const phone = "923003123154";
    const message = `Hello! I'm interested in "${safeProductName}". Could you please tell me the price?`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // 🧾 Price Calculations with safe values
  const deliveryCharge = 300;
  const subtotal = cart.reduce(
    (sum, item) => sum + (getSafeProductPrice(item.product) * getSafeQuantity(item)),
    0
  );
  const total = subtotal + deliveryCharge;

  // 🚀 Go to Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    
    navigate("/checkout", {
      state: { 
        cart, 
        subtotal, 
        deliveryCharge, 
        total 
      },
    });
  };

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
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

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-8xl font-bold text-center text-[#d0a19b] mb-10 custom-font">
          Your Cart
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#d0a19b]" />
          </div>
        ) : cart.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <ShoppingBag className="mx-auto w-12 h-12 mb-3 text-[#d0a19b]" />
            <p>Your cart is empty. Start shopping!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {/* 🛒 Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {cart.map((item, i) => {
                // Safely extract product data
                const product = item.product || {};
                const productId = getSafeProductId(product);
                const productName = getSafeProductName(product);
                const productDescription = getSafeProductDescription(product);
                const productPrice = getSafeProductPrice(product);
                const productImages = getSafeProductImages(product);
                const imageUrl = getSafeImageUrl(productImages);
                const imageAlt = getSafeImageAlt(productImages, productName);
                const quantity = getSafeQuantity(item);
                const itemTotal = productPrice * quantity;

                return (
                  <div
                    key={productId}
                    className="flex flex-col md:flex-row items-center bg-white shadow-sm border border-pink-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                  >
                    {/* Product Image with fallback */}
                    <div className="w-28 h-28 rounded-xl mb-4 md:mb-0 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={imageAlt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).parentElement!.innerHTML = 
                              '<div class="w-full h-full flex items-center justify-center text-gray-400 text-xs">No image</div>';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="flex-1 md:ml-6 text-center md:text-left">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {productName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {productDescription}
                      </p>
                      <p className="text-[#d0a19b] font-semibold mt-2">
                        Rs {productPrice.toLocaleString()} × {quantity} ={" "}
                        <span className="text-gray-800">
                          Rs {itemTotal.toLocaleString()}
                        </span>
                      </p>

                      <button
                        onClick={() => handleWhatsApp(productName)}
                        className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-5 py-2 rounded-full hover:scale-105 transition-transform w-fit mx-auto md:mx-0"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Contact For Customization
                      </button>
                    </div>

                    <div className="flex items-center gap-3 mt-4 md:mt-0">
                      <button
                        onClick={() => updateQuantity(productId, quantity - 1)}
                        disabled={quantity <= 1}
                        className="p-2 bg-[#f6dfd7] rounded-full hover:bg-[#e8c3bd] transition disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Minus className="w-4 h-4 text-gray-700" />
                      </button>

                      <span className="text-gray-800 font-medium w-6 text-center">
                        {quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(productId, quantity + 1)}
                        className="p-2 bg-[#f6dfd7] rounded-full hover:bg-[#e8c3bd] transition"
                      >
                        <Plus className="w-4 h-4 text-gray-700" />
                      </button>

                      <button
                        onClick={() => removeItem(productId)}
                        className="ml-4 p-2 bg-red-50 rounded-full hover:bg-red-100 transition"
                      >
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                );
              })}

              <div className="text-right mt-6">
                <button
                  onClick={clearCart}
                  className="bg-[#f6dfd7] text-gray-700 px-5 py-2 rounded-full hover:bg-[#e8c3bd] transition"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* 💰 Summary Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 h-fit sticky top-24">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Order Summary
              </h3>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Delivery Charges</span>
                <span>Rs {deliveryCharge.toLocaleString()}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>

              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className="bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium px-8 py-3 rounded-full hover:scale-105 transition-transform mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;