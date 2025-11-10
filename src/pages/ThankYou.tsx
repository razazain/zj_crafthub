import React from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const ThankYou: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-md border border-pink-100 p-10 text-center max-w-lg mx-4">
        <CheckCircle className="w-16 h-16 text-[#d0a19b] mx-auto mb-6" />
        <h2 className="text-6xl font-bold text-[#d0a19b] mb-4 custom-font">
          Thank You!
        </h2>
        <p className="text-gray-700 mb-2">
          Check your email for order status.
        </p>
        <p className="text-gray-700 mb-6">
          We will contact you on your phone number for further process.
        </p>
        <button
          onClick={() => navigate("/my-orders")}
          className="bg-gradient-to-r from-[#d0a19b] to-[#e8c3bd] text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition-transform"
        >
          Go to My Orders
        </button>
      </div>
    </section>
  );
};

export default ThankYou;
