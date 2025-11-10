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
        setCart(data.cart.items);
      } else {
        toast.error("Failed to load cart");
      }
    } catch (error) {
      console.error("Cart fetch error:", error);
      toast.error("Error loading cart ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🧮 Update Quantity
  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) return;
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
      }
    } catch (error) {
      console.error("Quantity update error:", error);
      toast.error("Could not update quantity ❌");
    }
  };

  // 🗑️ Remove Single Item
  const removeItem = async (productId: string) => {
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Item removed 🩷");
        setCart((prev) => prev.filter((item) => item.product._id !== productId));
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
      }
    } catch (error) {
      console.error("Clear cart error:", error);
      toast.error("Could not clear cart ❌");
    }
  };

  // 💬 WhatsApp
  const handleWhatsApp = (productName: string) => {
    const phone = "923003123154";
    const message = `Hello! I'm interested in "${productName}". Could you please tell me the price?`;
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  // 🧾 Price Calculations
  const deliveryCharge = 300;
  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const total = subtotal + deliveryCharge;

  // 🚀 Go to Checkout
  const handleCheckout = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const deliveryCharge = 300;
    const total = subtotal + deliveryCharge;

    navigate("/checkout", {
      state: { cart, subtotal, deliveryCharge, total },
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
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row items-center bg-white shadow-sm border border-pink-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300"
                >
                  <img
                    src={item.product.images[0]?.url}
                    alt={item.product.name}
                    className="w-28 h-28 object-cover rounded-xl mb-4 md:mb-0"
                  />

                  <div className="flex-1 md:ml-6 text-center md:text-left">
                    <h3 className="font-semibold text-gray-800 text-lg">
                      {item.product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.product.description}
                    </p>
                    <p className="text-[#d0a19b] font-semibold mt-2">
                      Rs {item.product.price} × {item.quantity} ={" "}
                      <span className="text-gray-800">
                        Rs {item.product.price * item.quantity}
                      </span>
                    </p>

                    <button
                      onClick={() => handleWhatsApp(item.product.name)}
                      className="mt-3 flex items-center justify-center gap-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-5 py-2 rounded-full hover:scale-105 transition-transform w-fit mx-auto md:mx-0"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Contact For Customization
                    </button>
                  </div>

                  <div className="flex items-center gap-3 mt-4 md:mt-0">
                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity - 1)
                      }
                      className="p-2 bg-[#f6dfd7] rounded-full hover:bg-[#e8c3bd] transition"
                    >
                      <Minus className="w-4 h-4 text-gray-700" />
                    </button>

                    <span className="text-gray-800 font-medium w-6 text-center">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        updateQuantity(item.product._id, item.quantity + 1)
                      }
                      className="p-2 bg-[#f6dfd7] rounded-full hover:bg-[#e8c3bd] transition"
                    >
                      <Plus className="w-4 h-4 text-gray-700" />
                    </button>

                    <button
                      onClick={() => removeItem(item.product._id)}
                      className="ml-4 p-2 bg-red-50 rounded-full hover:bg-red-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}

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
                <span>Rs {subtotal}</span>
              </div>

              <div className="flex justify-between text-gray-700 mb-2">
                <span>Delivery Charges</span>
                <span>Rs {deliveryCharge}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between text-lg font-semibold text-gray-800">
                <span>Total</span>
                <span>Rs {total}</span>
              </div>

              <button
                onClick={handleCheckout}
                className="bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white font-medium px-8 py-3 rounded-full hover:scale-105 transition-transform mt-6"
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
