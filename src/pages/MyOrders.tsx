import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../config";
import { Loader2, ShoppingBag } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

interface OrderProduct {
  product: {
    _id: string;
    name: string;
    price: number;
    images: { url: string; alt: string }[];
  };
  quantity: number;
}

interface Order {
  _id: string;
  orderNumber: number;
  products: OrderProduct[];
  subtotal: number;
  deliveryCharges: number;
  total: number;
  paymentScreenshot: string;
  status: string;
  createdAt: string;
}

const MyOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/profile");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          setOrders(data.orders || []);
        } else {
          toast.error("Failed to load orders");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  return (
    <section className="py-16 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-8xl font-bold text-center text-[#d0a19b] mb-10 custom-font">
          My Orders
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-[#d0a19b]" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            <ShoppingBag className="mx-auto w-12 h-12 mb-3 text-[#d0a19b]" />
            <p>No orders found. Start shopping!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white shadow-sm border border-pink-100 rounded-2xl p-6 hover:shadow-md transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Order #{order.orderNumber}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {order.products.map((item) => (
                    <div
                      key={item.product._id}
                      className="flex items-center gap-3 border p-2 rounded-xl"
                    >
                      <img
                        src={item.product.images[0]?.url}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.product.name}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          Quantity: {item.quantity}
                        </p>
                        <p className="text-[#d0a19b] font-semibold">
                          Rs. {item.product.price * item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end flex-col sm:flex-row sm:justify-between items-center gap-2 border-t border-gray-200 pt-3 mt-3">
                  <div className="text-gray-700 space-y-1 text-sm">
                    <p>Subtotal: Rs. {order.subtotal}</p>
                    <p>Delivery: Rs. {order.deliveryCharges}</p>
                    <p className="font-semibold text-[#d0938b]">
                      Total: Rs. {order.total}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <a
                      href={order.paymentScreenshot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white rounded-full text-sm font-medium hover:scale-105 transition-transform"
                    >
                      View Payment
                    </a>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.status === "pending_verification"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status.replace(/_/g, " ")}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;
